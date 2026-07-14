/**
 * Turbo Dashboard Worker — multi-tenant
 * Rotas: POST /webhook · GET / · GET /insights · GET /export.csv
 * Cron : snapshot diário 23:59
 * Binding obrigatório: DB (D1)
 * Vars : CLIENTE_ID, LANCAMENTO_ID
 * Secrets: ALERT_WEBHOOK_URL, EXPORT_TOKEN, CLAUDE_API_KEY (opcional)
 */

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: CORS });

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });

    const url = new URL(request.url);
    try {
      if (url.pathname === "/webhook" && request.method === "POST") return await handleWebhook(request, env);
      if (url.pathname === "/insights")   return json(await buildInsights(env));
      if (url.pathname === "/export.csv") return await handleExport(request, env);
      if (url.pathname === "/" || url.pathname === "") return json(await buildAggregate(env));
      return json({ error: "not_found" }, 404);
    } catch (err) {
      return json({ error: String(err?.message || err) }, 500);
    }
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(saveSnapshot(env));
  },
};

// ────────────────────────────────────────────────────────────── WEBHOOK

async function handleWebhook(request, env) {
  const raw = await request.json();
  const lanc = await loadLancamento(env);
  if (!lanc) return json({ error: "lancamento_nao_encontrado" }, 404);

  const config = JSON.parse(lanc.config_json || "{}");
  const venda  = normalize(raw, config);
  if (!venda) return json({ ok: true, ignored: true });

  venda.lancamento_id = env.LANCAMENTO_ID;
  venda.cliente_id    = env.CLIENTE_ID;

  await env.DB.prepare(`
    INSERT OR IGNORE INTO vendas
      (id, lancamento_id, cliente_id, produto, tipo, valor, pagamento, status,
       contact_id, utm_source, utm_medium, utm_campaign, dia, criado_em)
    VALUES (?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12,?13,?14)
  `).bind(
    venda.id, venda.lancamento_id, venda.cliente_id, venda.produto, venda.tipo,
    venda.valor, venda.pagamento, venda.status, venda.contact_id,
    venda.utm_source, venda.utm_medium, venda.utm_campaign, venda.dia, venda.criado_em
  ).run();

  if (venda.status === "aprovada") await evaluateAlerts(env, lanc, config);
  return json({ ok: true });
}

function normalize(raw, config) {
  const plat = (config.plataforma || "guru").toLowerCase();
  let v;
  if (plat === "guru") v = fromGuru(raw);
  else if (plat === "hotmart") v = fromHotmart(raw);
  else if (plat === "kiwify")  v = fromKiwify(raw);
  else if (plat === "eduzz")   v = fromEduzz(raw);
  else if (plat === "perfectpay") v = fromPerfectPay(raw);
  else return null;
  if (!v || !v.id) return null;
  const prod = matchProduto(v.produto, config.produtos || []);
  v.tipo = prod?.tipo || "outro";
  v.produto_id = prod?.id || "outro";
  v.dia = v.criado_em ? new Date(v.criado_em).toISOString().slice(8, 10) + "/" + new Date(v.criado_em).toISOString().slice(5, 7) : "";
  return v;
}

function matchProduto(nome, lista) {
  const n = (nome || "").toLowerCase();
  return lista.find(p => (p.match || []).some(m => n.includes(m.toLowerCase())));
}

function fromGuru(r) {
  return {
    id: r.id || r.order_id,
    produto: r?.product?.name,
    valor: Number(r.total || 0),
    pagamento: (r.payment_method || "").toLowerCase(),
    status: r.status === "aprovada" ? "aprovada" : r.status,
    contact_id: r?.contact?.id,
    utm_source: r?.utm?.source, utm_medium: r?.utm?.medium, utm_campaign: r?.utm?.campaign,
    criado_em: r.approved_at || r.created_at || new Date().toISOString(),
  };
}
function fromHotmart(r) {
  const p = r?.data?.purchase || r?.purchase || {};
  return {
    id: p.transaction || r?.data?.transaction,
    produto: r?.data?.product?.name || r?.prod?.prod_name,
    valor: Number(p?.price?.value || 0),
    pagamento: (p?.payment?.type || "").toLowerCase(),
    status: String(p.status || "").toLowerCase() === "approved" ? "aprovada" : String(p.status).toLowerCase(),
    contact_id: r?.data?.buyer?.email,
    utm_source: r?.data?.tracking?.source, utm_campaign: r?.data?.tracking?.campaign,
    criado_em: p.order_date || new Date().toISOString(),
  };
}
function fromKiwify(r) {
  return {
    id: r.order_id || r.OrderId,
    produto: r?.Product?.ProductName || r?.product_name,
    valor: Number(r.OrderTotalAmount || r.order_total || 0),
    pagamento: (r.PaymentMethod || r.payment_method || "").toLowerCase(),
    status: (r.order_status || r.status) === "paid" ? "aprovada" : (r.order_status || r.status),
    contact_id: r?.Customer?.email || r?.customer?.email,
    utm_source: r?.TrackingParameters?.utm_source, utm_campaign: r?.TrackingParameters?.utm_campaign,
    criado_em: r.created_at || new Date().toISOString(),
  };
}
function fromEduzz(r) {
  return {
    id: r?.content?.sale_id || r?.sale_id,
    produto: r?.product?.name,
    valor: Number(r?.content?.total || 0),
    pagamento: (r?.payment?.method || "").toLowerCase(),
    status: String(r?.content?.status) === "3" ? "aprovada" : String(r?.content?.status),
    contact_id: r?.customer?.email,
    criado_em: r?.content?.date || new Date().toISOString(),
  };
}
function fromPerfectPay(r) {
  return {
    id: r.sale_id || r.transaction_code,
    produto: r.product_name,
    valor: Number(r.sale_amount || 0),
    pagamento: (r.payment_type || "").toLowerCase(),
    status: r.sale_status_enum === "approved" ? "aprovada" : r.sale_status_enum,
    contact_id: r?.customer?.email,
    criado_em: r.date_approved || new Date().toISOString(),
  };
}

// ────────────────────────────────────────────────────────────── AGREGADO

async function buildAggregate(env) {
  const lanc = await loadLancamento(env);
  if (!lanc) return { error: "lancamento_nao_encontrado" };
  const config = JSON.parse(lanc.config_json || "{}");

  const { results: vendas } = await env.DB.prepare(
    `SELECT * FROM vendas WHERE lancamento_id = ?1 AND status = 'aprovada' ORDER BY criado_em ASC`
  ).bind(env.LANCAMENTO_ID).all();

  const kpis = computeKPIs(vendas, lanc, config);
  const series = computeSeries(vendas);
  const forecast = computeForecast(vendas, lanc, config);
  const gatilhos = computeGatilhos(kpis, config);
  const coortes = computeCoortes(vendas);
  const cross = await computeCross(env, kpis);

  return { lancamento: lanc.nome, meta: lanc.meta_inscritos, kpis, series, forecast, gatilhos, coortes, cross, atualizado_em: new Date().toISOString() };
}

function computeKPIs(vendas, lanc, config) {
  const principais = vendas.filter(v => v.tipo === "principal");
  const obs        = vendas.filter(v => v.tipo === "orderbump");
  const inscritos  = new Set(principais.map(v => v.contact_id)).size;
  const compradoresComOB = new Set(obs.map(v => v.contact_id)).size;
  const receita_principal = sum(principais.map(v => v.valor));
  const receita_ob        = sum(obs.map(v => v.valor));
  const receita_total     = receita_principal + receita_ob;

  return {
    inscritos,
    meta: lanc.meta_inscritos,
    progresso_meta: lanc.meta_inscritos ? inscritos / lanc.meta_inscritos : 0,
    receita_principal,
    receita_ob,
    receita_total,
    pct_ob_do_total: receita_total ? receita_ob / receita_total : 0,
    compradores_com_ob: compradoresComOB,
    ob_attach_rate: inscritos ? compradoresComOB / inscritos : 0,
    lote_ativo: config.lote_ativo || null,
    velocidade_vph: velocidade(vendas, config?.forecast?.janela_velocidade_horas || 6),
  };
}

function velocidade(vendas, janelaHoras) {
  const limite = Date.now() - janelaHoras * 3600 * 1000;
  const recentes = vendas.filter(v => new Date(v.criado_em).getTime() >= limite);
  return recentes.length / janelaHoras;
}

function computeSeries(vendas) {
  const porDia = {}, porPag = {}, porUTM = {};
  for (const v of vendas) {
    porDia[v.dia] ??= { dia: v.dia, principal: 0, orderbump: 0, count: 0 };
    porDia[v.dia][v.tipo === "orderbump" ? "orderbump" : "principal"] += v.valor;
    porDia[v.dia].count += v.tipo === "principal" ? 1 : 0;
    porPag[v.pagamento || "outro"] = (porPag[v.pagamento || "outro"] || 0) + v.valor;
    if (v.utm_source) porUTM[v.utm_source] = (porUTM[v.utm_source] || 0) + v.valor;
  }
  return {
    por_dia: Object.values(porDia).sort((a, b) => a.dia.localeCompare(b.dia)),
    por_pagamento: porPag,
    por_utm: porUTM,
  };
}

function computeForecast(vendas, lanc, config) {
  const min_v = config?.forecast?.min_vendas_para_exibir ?? 20;
  const min_h = config?.forecast?.min_horas_para_exibir ?? 6;
  const agora = Date.now();
  const inicio = new Date(lanc.data_inicio).getTime();
  const fim    = new Date(lanc.data_fim).getTime();
  const horas_rodando = (agora - inicio) / 3600000;

  if (vendas.length < min_v || horas_rodando < min_h) return { disponivel: false, motivo: "amostra_insuficiente" };

  const janela = config?.forecast?.janela_velocidade_horas || 6;
  const vph = velocidade(vendas, janela);
  const horas_restantes = Math.max(0, (fim - agora) / 3600000);
  const inscritos = new Set(vendas.filter(v => v.tipo === "principal").map(v => v.contact_id)).size;
  const projecao  = Math.round(inscritos + vph * horas_restantes);

  return {
    disponivel: true,
    vph,
    horas_restantes: Math.round(horas_restantes * 10) / 10,
    inscritos_atuais: inscritos,
    projecao_fechamento: projecao,
    pct_meta: lanc.meta_inscritos ? projecao / lanc.meta_inscritos : 0,
  };
}

function computeGatilhos(kpis, config) {
  const hoje = new Date().toISOString().slice(0, 10);
  return (config.gatilhos || []).map(g => {
    let status;
    if (g.data > hoje) status = "cinza";
    else if (kpis.inscritos >= g.minimo) status = "verde";
    else if (kpis.inscritos >= g.minimo * 0.7) status = "amarelo";
    else status = "vermelho";
    return { ...g, status };
  });
}

function computeCoortes(vendas) {
  const porHora = Array(24).fill(0);
  for (const v of vendas.filter(x => x.tipo === "principal")) {
    const h = new Date(v.criado_em).getUTCHours();
    porHora[h]++;
  }
  return { por_hora: porHora };
}

async function computeCross(env, kpis) {
  const { results } = await env.DB.prepare(
    `SELECT kpis_json FROM snapshots WHERE lancamento_id != ?1 ORDER BY tirado_em DESC LIMIT 1`
  ).bind(env.LANCAMENTO_ID).all();
  if (!results.length) return { disponivel: false };
  const anterior = JSON.parse(results[0].kpis_json);
  return {
    disponivel: true,
    delta_receita_pct: anterior.receita_total ? (kpis.receita_total - anterior.receita_total) / anterior.receita_total : null,
    delta_inscritos_pct: anterior.inscritos ? (kpis.inscritos - anterior.inscritos) / anterior.inscritos : null,
    delta_ob_attach_pp:  (kpis.ob_attach_rate - (anterior.ob_attach_rate || 0)),
  };
}

// ────────────────────────────────────────────────────────────── ALERTAS

async function evaluateAlerts(env, lanc, config) {
  if (!env.ALERT_WEBHOOK_URL) return;
  const agg = await buildAggregate(env);
  const { kpis, gatilhos } = agg;

  for (const g of gatilhos.filter(x => x.status === "vermelho")) {
    await maybeFire(env, "plano_b", `gatilho-${g.data}`, `Plano B: ${g.acao} — inscritos ${kpis.inscritos}/${g.minimo}`, 24);
  }

  const vph = kpis.velocidade_vph;
  const { results: lastSnap } = await env.DB.prepare(
    `SELECT kpis_json FROM snapshots WHERE lancamento_id = ?1 ORDER BY tirado_em DESC LIMIT 1`
  ).bind(env.LANCAMENTO_ID).all();
  if (lastSnap.length) {
    const prev = JSON.parse(lastSnap[0].kpis_json);
    const prevVph = prev.velocidade_vph || 0;
    const queda = config?.alertas?.queda_velocidade_pct || 0.4;
    if (prevVph > 0 && (prevVph - vph) / prevVph >= queda) {
      await maybeFire(env, "velocidade", "vel-drop", `Velocidade caiu ${Math.round((prevVph - vph) / prevVph * 100)}% (${prevVph.toFixed(1)} → ${vph.toFixed(1)} v/h)`, 3);
    }
  }

  const obMin = config?.alertas?.ob_attach_minimo || 0.3;
  if (kpis.inscritos >= 20 && kpis.ob_attach_rate < obMin) {
    await maybeFire(env, "ob_attach", "ob-low", `OB-attach baixo: ${(kpis.ob_attach_rate * 100).toFixed(0)}% (alvo ${(obMin * 100)}%)`, 24);
  }
}

async function maybeFire(env, tipo, chave, mensagem, debounceHoras) {
  const { results } = await env.DB.prepare(
    `SELECT disparado_em FROM alertas_log WHERE lancamento_id=?1 AND tipo=?2 AND payload_json LIKE ?3 ORDER BY disparado_em DESC LIMIT 1`
  ).bind(env.LANCAMENTO_ID, tipo, `%${chave}%`).all();

  if (results.length) {
    const ultimo = new Date(results[0].disparado_em).getTime();
    if (Date.now() - ultimo < debounceHoras * 3600 * 1000) return;
  }

  await fetch(env.ALERT_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: `[${env.LANCAMENTO_ID}] ${mensagem}` }),
  }).catch(() => {});

  await env.DB.prepare(
    `INSERT INTO alertas_log (lancamento_id, tipo, payload_json, disparado_em) VALUES (?1,?2,?3,?4)`
  ).bind(env.LANCAMENTO_ID, tipo, JSON.stringify({ chave, mensagem }), new Date().toISOString()).run();
}

// ────────────────────────────────────────────────────────────── INSIGHTS

async function buildInsights(env) {
  const agg = await buildAggregate(env);
  const { kpis, forecast, gatilhos, series } = agg;
  const bullets = [];

  const melhorDia = [...(series.por_dia || [])].sort((a, b) => (b.principal + b.orderbump) - (a.principal + a.orderbump))[0];
  if (melhorDia) bullets.push(`Melhor dia até agora: ${melhorDia.dia} com R$ ${fmt(melhorDia.principal + melhorDia.orderbump)}.`);

  const alerta = gatilhos.find(g => g.status === "vermelho") || gatilhos.find(g => g.status === "amarelo");
  if (alerta) bullets.push(`Atenção: gatilho ${alerta.data} em status ${alerta.status.toUpperCase()} — ${alerta.acao}.`);

  if (forecast?.disponivel) {
    const pct = Math.round(forecast.pct_meta * 100);
    bullets.push(`Projeção de fechamento: ${forecast.projecao_fechamento} inscritos (${pct}% da meta) ao ritmo atual de ${forecast.vph.toFixed(1)} v/h.`);
  }

  return { bullets, gerado_em: new Date().toISOString() };
}

// ────────────────────────────────────────────────────────────── EXPORT

async function handleExport(request, env) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || request.headers.get("Authorization")?.replace("Bearer ", "");
  if (!env.EXPORT_TOKEN || token !== env.EXPORT_TOKEN) return new Response("unauthorized", { status: 401, headers: CORS });

  const { results } = await env.DB.prepare(
    `SELECT * FROM vendas WHERE lancamento_id = ?1 ORDER BY criado_em`
  ).bind(env.LANCAMENTO_ID).all();

  const headers = Object.keys(results[0] || { id: "" });
  const csv = [
    headers.join(","),
    ...results.map(r => headers.map(h => JSON.stringify(r[h] ?? "")).join(",")),
  ].join("\n");

  return new Response(csv, {
    status: 200,
    headers: { ...CORS, "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${env.LANCAMENTO_ID}.csv"` },
  });
}

// ────────────────────────────────────────────────────────────── SNAPSHOT

async function saveSnapshot(env) {
  const agg = await buildAggregate(env);
  await env.DB.prepare(
    `INSERT INTO snapshots (lancamento_id, tirado_em, kpis_json) VALUES (?1,?2,?3)`
  ).bind(env.LANCAMENTO_ID, new Date().toISOString(), JSON.stringify(agg.kpis)).run();
}

// ────────────────────────────────────────────────────────────── HELPERS

async function loadLancamento(env) {
  const { results } = await env.DB.prepare(
    `SELECT * FROM lancamentos WHERE id = ?1 LIMIT 1`
  ).bind(env.LANCAMENTO_ID).all();
  return results[0] || null;
}

const sum = arr => arr.reduce((a, b) => a + (Number(b) || 0), 0);
const fmt = n => (n || 0).toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
