---
name: dash-lancamento-turbo
description: Skill multi-cliente para criar dashboards ao vivo de lançamentos digitais dentro do Squad Turbo (Leo Tabari / Turbo Academy e alunos). Usar SEMPRE que aparecer pedido de dashboard de lançamento, acompanhamento de vendas em tempo real, painel pro cliente/aluno, monitorar inscritos ao vivo, webhook de vendas, Cloudflare Worker para lançamento, D1 de vendas, orderbump conversion panel, forecast de meta, alertas de Plano B, painel de controle de lançamento. Entrega pipeline completo (plataforma → Worker → D1 → Dashboard HTML público) + camada de inteligência (forecast, alertas, coortes, cross-lançamento) + layout editorial com design-tokens-turbo + lovable-style-turbo. Paleta e identidade plugáveis por cliente — nunca hardcodar expert.
---

# Dashboard ao Vivo de Lançamento — Squad Turbo

Skill de infraestrutura + design + inteligência para montar dashboard de lançamento em tempo real para QUALQUER cliente ou aluno do Leo Tabari dentro do Turbo Academy. Plug-and-play por `cliente_id` e `lancamento_id`.

---

## Arquitetura

```
Plataforma (Guru / Hotmart / Kiwify / Eduzz / Perfect Pay)
    ↓ webhook
Cloudflare Worker  ──────┐
    ├── POST /webhook    │ normaliza + grava
    ├── GET  /           │ JSON agregado pro dashboard
    ├── GET  /insights   │ 3 bullets de leitura do dia (IA)
    ├── GET  /export.csv │ export operacional
    ├── CRON diário 23:59│ snapshot em `snapshots`
    └── Alertas → Slack / WhatsApp / Telegram (Plano B, queda de velocidade, OB-attach)
    ↓
Cloudflare D1 (multi-tenant: vendas, lancamentos, snapshots, alertas_log)
    ↓
Dashboard HTML (Netlify Drop) — editorial, dark/light, modo TV + modo operacional
```

Resultado: URL pública que o cliente/aluno compartilha com o time, atualiza sozinha, dispara alerta quando precisa acionar Plano B.

---

## Regras de autoridade (non-negotiable)

1. **Multi-cliente sempre.** Nunca hardcodar nome de expert, paleta ou produto. Tudo vem de `config.json` do lançamento.
2. **Design passa por `design-tokens-turbo`.** Proibido CSS vars soltas — importar `tokens.css` e aplicar paleta do cliente via override.
3. **Zero cara de IA visual.** Seguir `_shared/anti-ia-blacklist.md` (sem glassmorphism genérico, gradiente roxo-azul, ícones pretinhos flat, emoji em KPI).
4. **Dados reais ou nada.** Forecast e alertas operam sobre D1 real, nunca sobre mock. Se ainda não há vendas, mostrar estado vazio dignificado — não inventar número.
5. **Privacidade.** Nenhum email/CPF aparece no dashboard público. Só agregados. PII fica no D1, acessível via `/export.csv` autenticado.

---

## 1. Cloudflare Worker (`worker.js`)

Um arquivo, múltiplas rotas. **Binding obrigatório:** D1 com variable name `DB`. Variáveis de ambiente: `CLIENTE_ID`, `LANCAMENTO_ID`, `ALERT_WEBHOOK_URL`, `EXPORT_TOKEN`.

### CORS (completo — sem isso o browser bloqueia)

```js
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json",
};
// OPTIONS handler deve retornar 204, não 200
if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
```

### Schema D1 multi-tenant

```sql
CREATE TABLE IF NOT EXISTS lancamentos (
  id TEXT PRIMARY KEY,
  cliente_id TEXT NOT NULL,
  nome TEXT,
  produto_principal TEXT,
  meta_inscritos INTEGER,
  data_inicio TEXT,
  data_fim TEXT,
  config_json TEXT
);

CREATE TABLE IF NOT EXISTS vendas (
  id TEXT PRIMARY KEY,
  lancamento_id TEXT NOT NULL,
  cliente_id TEXT NOT NULL,
  produto TEXT,
  tipo TEXT,            -- principal | orderbump | upsell
  valor REAL,
  pagamento TEXT,       -- pix | cartao | boleto
  status TEXT,          -- aprovada | pendente | recusada | reembolsada
  contact_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  dia TEXT,             -- DD/MM
  criado_em TEXT,       -- ISO
  FOREIGN KEY (lancamento_id) REFERENCES lancamentos(id)
);
CREATE INDEX IF NOT EXISTS idx_vendas_lanc ON vendas(lancamento_id, status);

CREATE TABLE IF NOT EXISTS snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lancamento_id TEXT NOT NULL,
  tirado_em TEXT,
  kpis_json TEXT
);

CREATE TABLE IF NOT EXISTS alertas_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lancamento_id TEXT,
  tipo TEXT,            -- plano_b | velocidade | ob_attach
  payload_json TEXT,
  disparado_em TEXT
);
```

**Criar tabelas via Console do D1 na primeira vez** — `CREATE IF NOT EXISTS` no Worker é unreliable no cold start.

### Endpoints

- `POST /webhook` — normaliza evento por plataforma, `INSERT OR IGNORE` em `vendas`, avalia alertas
- `GET /` — KPIs agregados + forecast + series para gráficos + status dos gatilhos
- `GET /insights` — retorna 3 bullets de leitura do dia (lógica heurística ou Claude via REST)
- `GET /export.csv?token=...` — dump operacional (valida `EXPORT_TOKEN`)
- **CRON diário 23:59** — grava snapshot em `snapshots` para pós-mortem e comparativo cross-lançamento

### Forecast (em memória, no próprio agregador)

```js
// velocidade_ultimas_6h × horas_restantes = projecao_fechamento
const velocidade = vendasUlt6h / 6;                 // vendas/hora
const horasRestantes = (fim - agora) / 3600000;
const projecao = inscritosAtuais + velocidade * horasRestantes;
const progressoMeta = inscritosAtuais / meta;
const pctProjecao = projecao / meta;
```

### Alertas automáticos (rodar dentro do `POST /webhook`)

- **Plano B:** data >= gatilho.data && inscritos < gatilho.minimo → dispara 1x/dia
- **Queda de velocidade:** vendas/hora caíram >40% em janela de 3h → dispara 1x a cada 3h
- **OB-attach baixo:** % compradores com ≥1 OB < 30% após 20 vendas → dispara 1x

Debounce lendo `alertas_log` antes de disparar.

---

## 2. Dashboard HTML (`index.html`)

Um arquivo só, Chart.js via CDN, zero build. Importa `tokens.css` do `design-tokens-turbo` remotamente (ou inline em produção).

### Modos

- **`?mode=tv`** — full-screen, fontes grandes, rotaciona KPIs a cada 15s, ideal pra telão na sala do cliente
- **`?mode=ops`** (default) — operacional, Mari/aluno consulta no celular
- **`?theme=light|dark`** — auto por hora do dia, overridável

### KPIs obrigatórios (todos os lançamentos)

- Inscritos confirmados + barra de progresso da meta + % projeção fechamento
- Receita do produto principal
- Receita de orderbumps + % do total
- Compradores com ≥1 OB (taxa de attach)
- Lote ativo + preço
- Receita total
- Velocidade atual (vendas/hora, últimas 6h)
- Tempo restante até fechamento

### Gráficos

1. Receita bruta por dia — bar empilhado (principal + cada OB) com **linha pontilhada de projeção**
2. Mix de receita — donut
3. Ingressos por dia + acumulado — linha dupla, eixo Y secundário
4. Forma de pagamento — donut (PIX / Cartão / Boleto)
5. **Vs último lançamento** — linha comparativa mesma janela temporal (quando houver `snapshots` de lançamento anterior)
6. **Receita por UTM source** — horizontal bar (aparece só se houver UTMs)

### Painel de Gatilhos (Plano B)

Cards dinâmicos lidos do Worker:
- Verde — meta atingida
- Amarelo — atenção (entre 70–100% da meta parcial)
- Vermelho — acionar Plano B agora
- Cinza — gatilho futuro, ainda não chegou

### Micro-interações (zero cara de IA)

- CountUp animation nos KPIs (sem easing over-the-top)
- Sparkline de 24h em cada card
- Toast discreto quando nova venda entra (sem confete, sem som por padrão)
- Loading skeleton (não spinner genérico)

### Layout (direção editorial)

- Header hero: nome do lançamento, countdown até fechamento, status geral (1 palavra: "ACELERANDO", "ESTÁVEL", "REQUER AÇÃO")
- Grid 12 col desktop / stack mobile
- Tipografia do `design-tokens-turbo` (serif display + mono para dado + sans para corpo)
- Dark mode OKLCH, não `#fff invertido`

---

## 3. Design — integração obrigatória

**Antes de qualquer CSS**, importar:

```html
<link rel="stylesheet" href="https://tokens.turbo.academy/tokens.css">
<style>
  :root {
    /* override da paleta do cliente — vem do config.json */
    --brand-primary: var(--cliente-primary);
    --brand-accent:  var(--cliente-accent);
  }
</style>
```

Se o cliente não tiver brandbook próprio, usar paleta default **Turbo Academy** (não mais Ápis):

```css
--turbo-ink:     oklch(0.22 0.03 250);   /* header, totais */
--turbo-signal:  oklch(0.72 0.18 55);    /* CTA / destaque */
--turbo-mint:    oklch(0.78 0.12 165);   /* positivo / aprovada */
--turbo-alert:   oklch(0.65 0.20 25);    /* vermelho Plano B */
--turbo-paper:   oklch(0.98 0.01 90);    /* bg claro */
--turbo-graphite:oklch(0.18 0.01 250);   /* bg escuro */
```

Tipografia default: **DM Serif Display** (títulos) + **JetBrains Mono** (dados) + **Inter** (corpo). Cliente com brandbook sobrescreve via `config.json`.

Após aprovação do layout, rodar `/page-optimizer-turbo` pra performance (LCP < 1.5s, nenhum CLS).

---

## 4. Inteligência — camada que separa dashboard de copiloto

### `/insights` — leitura do dia em 3 bullets

Heurística local no Worker (sem custo de IA):
1. Destaque positivo (maior variação positiva)
2. Alerta (maior variação negativa OU gatilho laranja)
3. Recomendação acionável (ex: "velocidade caiu 40%, hora de reativar lista morna")

Se `CLAUDE_API_KEY` estiver configurada, Worker chama Claude com os agregados do dia e devolve 3 bullets em tom Leo Tabari (lido de `00-fundacao/voz.md`).

### Coortes automáticas

Query agrupa por:
- `utm_source` — de onde veio a venda
- `utm_campaign` — qual criativo performou
- `pagamento` — ticket médio por método
- hora do dia — quando o público compra
- dia do lançamento — curva de vendas

### Cross-lançamento

Se existir snapshot do lançamento anterior do mesmo `cliente_id`, dashboard mostra:
- Δ% receita na mesma janela temporal (D1, D2, D3… do lançamento)
- Δ% taxa de OB-attach
- Δ% velocidade de pico

Serve pra Leo e aluno calibrarem expectativa: "melhor que o último ou pior?"

---

## 5. Normalização por plataforma

| Plataforma | Status "aprovada" | Campos principais | Notas |
|---|---|---|---|
| Guru | `"aprovada"` | `product.name`, `total`, `payment_method`, `contact.id`, `approved_at` | Sem API REST pública — só webhook. Webhook em Configurações → Webhooks → aba **Vendas** |
| Hotmart | `"approved"` / `"APPROVED"` | `prod.prod_name`, `purchase.price.value`, `purchase.payment.type` | Tem API, mas webhook é suficiente |
| Kiwify | `"paid"` | `Product.ProductName`, `OrderTotalAmount`, `PaymentMethod` | PascalCase nos campos |
| Eduzz | `"3"` (código) | `product.name`, `content.total`, `payment.method` | Status numérico, mapear |
| Perfect Pay | `"approved"` | `product_name`, `sale_amount`, `payment_type` | snake_case |

### Identificação de produto (multi-cliente)

Em vez de hardcodar termos como "GRAVAÇÃO", usar regras do `config.json`:

```json
{
  "produtos": [
    { "match": ["imersão", "imersao"], "tipo": "principal", "id": "imersao" },
    { "match": ["gravação", "gravacao"], "tipo": "orderbump", "id": "gravacao" },
    { "match": ["e-book", "ebook"],      "tipo": "orderbump", "id": "ebook" },
    { "match": ["funis"],                "tipo": "orderbump", "id": "funis" }
  ]
}
```

Worker faz `includes()` case-insensitive com cada termo do array.

---

## 6. Estrutura de entrega por cliente

```
dash/[cliente_id]-[lancamento_id]/
├── config.json           # meta, datas, paleta, produtos, gatilhos, plataforma
├── worker.js             # código do Cloudflare Worker
├── wrangler.toml         # bindings + vars + cron
├── index.html            # dashboard
├── schema.sql            # criar no Console D1
└── seed.sql              # vendas históricas (INSERT OR IGNORE)
```

### `config.json` mínimo

```json
{
  "cliente_id": "leo-turbo",
  "lancamento_id": "funil-8-turbo-2026-04",
  "nome_lancamento": "Funil 8 — Turma Abril",
  "plataforma": "guru",
  "meta_inscritos": 300,
  "data_inicio": "2026-04-10T00:00:00Z",
  "data_fim":    "2026-04-17T23:59:00Z",
  "produtos": [ /* ver acima */ ],
  "gatilhos": [
    { "data": "2026-04-14", "minimo": 120, "acao": "Ativar lista morna + story diário" },
    { "data": "2026-04-16", "minimo": 220, "acao": "CPL bônus + WhatsApp em massa" }
  ],
  "paleta": { "primary": "oklch(...)", "accent": "oklch(...)" },
  "alertas": { "webhook_url": "https://hooks.slack.com/..." }
}
```

---

## 7. Checklist de deploy (multi-cliente)

- [ ] Preencher `config.json` com cliente/lançamento
- [ ] Criar D1 database (nome: `turbo-[cliente_id]`) e anotar ID
- [ ] Rodar `schema.sql` no Console D1
- [ ] Inserir `lancamentos` row com `config_json`
- [ ] Criar Worker → colar `worker.js` → Deploy
- [ ] Bindings: D1 como `DB` + vars (`CLIENTE_ID`, `LANCAMENTO_ID`, `ALERT_WEBHOOK_URL`, `EXPORT_TOKEN`, opcional `CLAUDE_API_KEY`)
- [ ] Configurar Cron trigger 23:59 no `wrangler.toml`
- [ ] Configurar webhook da plataforma apontando para `[worker-url]/webhook`
- [ ] Rodar `seed.sql` (dados históricos) se houver
- [ ] Atualizar `WORKER_URL` no `index.html`
- [ ] Subir `index.html` no Netlify Drop (mais confiável que Cloudflare Pages via UI)
- [ ] Testar webhook com venda real/simulada
- [ ] Validar `/insights` e alerta de Plano B com data forçada
- [ ] Rodar `/page-optimizer-turbo` no HTML final
- [ ] Auditar visual com `_shared/anti-ia-blacklist.md`

---

## 8. Erros comuns

| Erro | Causa | Solução |
|---|---|---|
| `CORS blocked` | Header `Access-Control-Allow-Headers` faltando | Adicionar ao CORS + OPTIONS 204 |
| `D1_ERROR: no such table` | Tabela não criada | Rodar `schema.sql` no Console D1 |
| `Guru API: 530` | Guru não tem API pública | Usar apenas webhook |
| `Failed to fetch` | Worker com código antigo em cache | Redeploy |
| `500 no Cloudflare Pages` | Bug Pages no Chrome | Netlify Drop ou Wrangler CLI |
| `Identifier already declared` | Console do browser reexecuta | Envolver em IIFE `(async()=>{})()` |
| Duplicatas no D1 | Webhook reenviado | `INSERT OR IGNORE` + PK por `id` da venda |
| Alerta disparando em loop | Sem debounce | Consultar `alertas_log` antes de disparar |
| Forecast absurdo nas primeiras horas | Amostra muito pequena | Só mostrar forecast depois de 20 vendas ou 6h |

---

## 9. Adaptações que você coleta antes de começar

1. **Cliente/aluno** e produto principal (nome exato)
2. **Plataforma** (Guru / Hotmart / Kiwify / Eduzz / Perfect Pay)
3. **Orderbumps/upsells** (nome exato + ticket)
4. **Meta de inscritos** e janela temporal (data_inicio / data_fim)
5. **Gatilhos do Plano B** (data + mínimo + ação)
6. **Canal de alerta** (Slack/Discord/WhatsApp webhook URL)
7. **Brandbook do cliente** (se diferente do Turbo default)
8. **Histórico de lançamento anterior** (para cross-comparativo)

---

## 10. Integração com outros agentes/skills do Squad Turbo

- `@pesquisador-turbo` — fornece `00-fundacao/voz.md` para `/insights` narrar no tom do expert
- `@diretor-criativo-turbo` — valida layout do dashboard antes do deploy (Anti-IA)
- `@designer-turbo` — executa tweaks visuais se cliente pedir customização pesada
- `design-tokens-turbo` — fonte única de verdade dos tokens
- `lovable-style-turbo` — se cliente quiser dashboard em React (caso raro — default é HTML estático)
- `page-optimizer-turbo` — performance pré-deploy

---

## Princípio

Dashboard não é enfeite. É **operação de guerra do lançamento** — o cliente/aluno olha e sabe em 3 segundos: está ganhando, está estável, ou precisa acionar Plano B **agora**. Tudo mais é ruído.
