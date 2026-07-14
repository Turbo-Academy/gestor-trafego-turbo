---
name: meta-ads-cli-turbo
description: >
  Use esta skill sempre que o usuário quiser automatizar operações
  Meta Ads via Meta Ads CLI oficial (lançada Meta · 29/04/2026) OU
  via Graph API direto quando a CLI não der conta. Trigger para:
  "subir batelada de criativos via CLI", "criar campanha Meta via
  terminal", "stop-loss automático Meta Ads", "relatório diário Meta
  Ads", "automatizar Meta Ads", "Ads CLI", "meta ads cli", "marketing
  API por terminal", "subir 15 criativos LPSG", "criar 5 ad sets de
  teste página", "bulk upload Meta", "criativos ASC via script",
  "escalar vencedor Meta automatizado", "atribuição incremental",
  "ROAS floor", "roas_average_floor", "instagram_user_id",
  "instagram_actor_id", "carrossel via API", "child_attachments",
  "upload resumável vídeo", "error_subcode 1885183", "error_subcode
  3858504", "App em modo Live", "App em desenvolvimento",
  "criar criativo carrossel Meta". Cobre: install do meta-ads-cli
  (Python 3.12+), autenticação via System User Token, 5 scripts shell
  prontos para LPSG (batelada de 15 criativos · 5 campanhas de teste
  de página · stop-loss horário · relatório diário · escalonamento
  de vencedores), runbook end-to-end campanha ROAS + Atribuição
  Incremental + 15 criativos via Graph API (reference 05), pipeline
  Python parametrizado pra subir estáticos/vídeos/carrosséis (script
  06), 8 gotchas validados em produção (App Live, instagram_user_id,
  degrees_of_freedom_spec depreciado, vídeo resumável > 100MB,
  attribution_spec imutável pós-criação), integração com nomenclatura
  LPSG ({SIGLA}_{DDMMYY}_{TIPO}_{NUMERO}), guard rails (default
  PAUSED, rate limit, logs auditáveis).
---

# Meta Ads CLI · Camada Turbo de automação

## Identidade

Você integra a **Meta Ads CLI oficial** (anunciada em 29/04/2026 · `pip install meta-ads-cli`) ao fluxo do LPSG. Sua função é gerar scripts shell parametrizados que substituem operação manual no Meta Business Manager por execução programática auditável.

Meta Ads CLI ≠ Marketing API SDK. CLI tem comandos previsíveis · output JSON nativo · exit codes padrão (0/3/4) · default `PAUSED` em todo create. Foi explicitamente desenhada pra **AI agents** (não só humanos).

**Esta skill NÃO substitui** `trafego-lpsg-turbo`, `criativos-lpsg-turbo`, `automacoes-lpsg-turbo` — ela é a **camada de execução** que essas skills usam quando precisam materializar campanhas/criativos no Meta.

---

## Quando ativar

- Subir batelada de 15 criativos LPSG via terminal (~30s vs ~30min manual)
- Criar 5 campanhas de teste de página (V1-V5) em paralelo
- Configurar stop-loss horário (pausar ad se ROAS<X)
- Gerar relatório diário automatizado de tráfego
- Escalar vencedores (duplicar ad set vencedor com budget 2x)
- Substituir uploads manuais Hotmart/Meta por loops shell
- Integrar com `automacoes-lpsg-turbo` (engine de análise · 3 cadências)
- Reduzir scripts Python custom da Marketing API por shell + jq

---

## Quando NÃO usar

- Inteligência competitiva (Meta Ad Library) → use Apify scraper · CLI é só pra conta própria
- Workflows simples low-code → n8n com nó Meta Ads é mais ergonômico
- Quando MCP nativo Meta sair (provável próximos meses) → migrar gradualmente
- Operações críticas de produção sem revisão humana → CLI é poderosa demais pra rodar 100% autônomo

---

## Pré-requisitos

```yaml
PYTHON:                   "3.12+ (CLI exige)"
INSTALL:                  "pip install meta-ads-cli"
AUTH:                     "System User Token Meta Business · NUNCA OAuth pessoal"
ENV_VARS:
  - META_ACCESS_TOKEN     # System User Token
  - META_AD_ACCOUNT_ID    # act_XXXXXXXXX
  - META_BUSINESS_ID      # opcional · multi-account

ARMAZENAMENTO_TOKEN:
  - "_private/.env (gitignored)"
  - "OU 1Password CLI · `op read 'op://Squad/Meta/SystemUser/token'`"
  - "JAMAIS commitar"

PERMISSOES_TOKEN:
  - ads_management
  - ads_read
  - business_management
```

### Validação inicial

```bash
# 1. Confirmar install
meta ads --version
# → Meta Ads CLI v1.x.x

# 2. Confirmar auth
meta ads account info
# → retorna nome da conta + ID

# 3. Listar campanhas existentes (smoke test)
meta ads campaign list --limit 5 --output table
```

---

## Stack scripts prontos (5 templates)

Cada script em `scripts/` é parametrizado por variáveis · roda standalone · loga em `_private/logs/meta-cli/`.

| Script | Substitui | Tempo manual | Tempo CLI |
|---|---|---|---|
| `01-batelada-15-criativos.sh` | Upload 15 criativos no Business Manager | ~30min | ~30s |
| `02-criar-5-testes-paginas.sh` | Criar 5 ad sets para V1-V5 das páginas | ~15min | ~10s |
| `03-stop-loss-horario.sh` | Verificar ROAS e pausar perdedores (cron 1h) | manual diário | autônomo |
| `04-relatorio-diario.sh` | Pegar métricas + enviar pra Slack/Email | manual 30min | autônomo |
| `05-escalar-vencedores.sh` | Duplicar ad set vencedor com budget 2x | manual 10min | ~5s |

> Cada script usa `--status PAUSED` por default. ATIVAR é decisão humana.

---

## Nomenclatura LPSG nativa

Os scripts usam o padrão LPSG sem você precisar pensar:

```
{SIGLA}_{DDMMYY}_{TIPO}_{NUMERO}

SIGLA      3 letras MAIÚSCULAS do evento (LPS · MPR · BOL...)
DDMMYY     data da batelada
TIPO       EST · CAR · VID · TES-PAG (teste de página)
NUMERO     001 a 999 (zero-padded · 3 dígitos)

Exemplos automáticos:
  MPR_120526_EST_001 ← estático 1 do ciclo 12/05/26
  MPR_120526_TES-PAG_003 ← teste da página V3
  MPR_120526_CAR_005 ← carrossel 5
```

Conecta direto com `criativos-lpsg-turbo`, `trafego-lpsg-turbo` e `dashboard-lpsg-turbo`.

---

## Exemplo de uso · batelada de 15 criativos

### 1. Preparar arquivos da batelada (output do `criativos-lpsg-turbo`)

```
batelada-120526/
├── README-batelada.md
├── estaticos/
│   ├── EST_001/{copy.md, final.png}
│   ├── EST_002/...
├── carrosseis/
│   ├── CAR_001/{copy.md, cards-1-10/, video-card-10.mp4}
├── videos/
│   └── VID_001/{roteiro.md, final.mp4}
└── manifest.yaml  ← gerado pelo criativos-lpsg-turbo
```

### 2. Rodar script

```bash
cd batelada-120526
~/.claude/skills/meta-ads-cli-turbo/scripts/01-batelada-15-criativos.sh \
  --sigla MPR \
  --data 120526 \
  --campaign-id $MPR_CAMPAIGN_ID \
  --batelada-dir .
```

### 3. Output esperado

```
[12:34:56] Iniciando batelada MPR_120526
[12:34:57] ✓ Criativo MPR_120526_EST_001 criado (id: 23854xxx)
[12:34:58] ✓ Criativo MPR_120526_EST_002 criado (id: 23854xxy)
... (15 criativos)
[12:35:25] ✓ 15 criativos criados em PAUSED
[12:35:25] Manifest salvo: _private/logs/meta-cli/MPR_120526_manifest.json
[12:35:25] Próximo passo HUMANO: revisar e ATIVAR no Business Manager
```

---

## Guard rails OBRIGATÓRIOS

```yaml
1_DEFAULT_PAUSED:        "TODO create usa --status PAUSED · ativação é HUMANA"
2_LOG_AUDITAVEL:         "TODA execução em _private/logs/meta-cli/{cmd}_{date}.log"
3_DRY_RUN_PRIMEIRO:      "Antes de batelada real · sempre rodar com --dry-run"
4_RATE_LIMIT_BACKOFF:    "Scripts respeitam exit code 4 (API error) com sleep exponencial"
5_VALIDACAO_NOMENCLATURA: "Nomes seguem regex {3-LETRAS}_{6-DIGITOS}_{TIPO}_{3-DIGITOS}"
6_NUNCA_DELETAR:         "Scripts NÃO usam meta ads campaign delete · só pause/archive"
7_BUDGET_CAP:            "Daily budget máximo no script: R$ 200/dia/ad set (cap de segurança)"
8_TOKEN_NUNCA_LOGADO:    "ENV vars sensíveis NUNCA aparecem em logs (mask via sed)"
```

---

## Integração com outras skills

```
criativos-lpsg-turbo          → gera 15 arquivos + manifest → meta-ads-cli-turbo sobe
trafego-lpsg-turbo            → define estrutura ASC + targeting → CLI cria
automacoes-lpsg-turbo         → engine de análise lê via CLI insights + dispara stop-loss
dashboard-lpsg-turbo          → ingere via CLI insights + jq → Google Sheets / Notion
lpsg-master-turbo (Fase 6)    → orquestra: criativos-lpsg-turbo + trafego-lpsg-turbo + meta-ads-cli-turbo
```

---

## ⚠️ Limites da CLI — quando cair pra Graph API (validado em produção 2026-06-11)

A CLI `meta` cobre o básico (list, insights, campanha/adset/ad simples). Mas **falha** e exige Graph API direto pra:

- **ROAS floor** (`bid_strategy=LOWEST_COST_WITH_MIN_ROAS` + `roas_average_floor`) — CLI não expõe
- **Atribuição Incremental** — não tem API nenhuma; workaround duplicando ad set no UI
- **Identidade Instagram** — CLI usa `instagram_actor_id` (depreciado); API quer `instagram_user_id` (`17841...`)
- **Carrosséis** (`child_attachments`) — CLI não suporta
- **Vídeo > ~100MB** — exige upload resumável (start/transfer/finish)

- **Cost Cap** (`bid_strategy=COST_CAP` + `bid_amount` por resultado) — runbook dedicado
- **ROAS floor** (min-ROAS) — runbook dedicado

Nesses casos → **`scripts/06-upload-criativos-graphapi.py`** + os runbooks: **`references/05-...roas-incremental...`** (ROAS + Incremental) e **`references/06-...cost-cap...`** (Cost Cap). Ambos: configs, processo passo a passo, gotchas, checklist.

> Os dois runbooks são as duas campanhas do **protocolo de subida do `@trafego-turbo`** (framework_9): Campanha 1 = Cost Cap (ref 06) · Campanha 2 = ROAS incremental (ref 05).

Pré-requisitos que sempre esquecem: **app Meta em modo Live** (developers.facebook.com → Publicar) e **`source ~/.zshrc`** antes de qualquer curl.

---

## Referências internas

- `references/01-instalacao-e-auth.md` — install, System User Token, ENV vars
- `references/02-comandos-essenciais.md` — campaign · adset · ad · creative · insights · catalog
- `references/03-troubleshooting.md` — rate limit, auth errors, exit codes, quirks
- `references/04-vs-alternativas.md` — Apify, n8n, Marketing API SDK, MCP futuro
- `references/05-runbook-campanha-roas-incremental-graphapi.md` — **runbook Graph API** (ROAS + Incremental + batelada 15) ⭐ · Campanha 2 do framework_9
- `references/06-runbook-campanha-cost-cap-graphapi.md` — **runbook Graph API** (Cost Cap · CAC ideal como teto · 1 adset adv+ com 15 criativos) ⭐ · Campanha 1 do framework_9
- `references/07-exemplo-resolvido-framework9.md` — **exemplo resolvido** do protocolo de subida (gate → CAC → 2 campanhas), caso genérico
- `scripts/01-batelada-15-criativos.sh`
- `scripts/02-criar-5-testes-paginas.sh`
- `scripts/03-stop-loss-horario.sh`
- `scripts/04-relatorio-diario.sh`
- `scripts/05-escalar-vencedores.sh`
- `scripts/06-upload-criativos-graphapi.py` — **upload via Graph API** (estáticos/vídeos/carrosséis, resumável, instagram_user_id) ⭐

---

## Princípios não-negociáveis

1. **Default PAUSED · ativação humana.** CLI nunca ativa nada autonomamente.
2. **Token em ENV var · jamais commitado.** `_private/.env` ou 1Password CLI.
3. **Logs auditáveis sempre.** Toda execução em `_private/logs/meta-cli/`.
4. **Dry-run antes de produção.** Toda batelada nova testada com `--dry-run` primeiro.
5. **Nomenclatura LPSG enforced.** Regex validation antes de criar.
6. **Budget cap de segurança.** Daily budget máximo por ad set: R$ 200.
7. **Output JSON parseável.** Pra integrar com jq · Sheets · Notion · Slack webhooks.
8. **Substitui scripts Python custom.** Reduz superfície de manutenção da Marketing API SDK.

---

**Fonte oficial:** [Meta Ads CLI announcement](https://developers.facebook.com/blog/post/2026/04/29/introducing-ads-cli/) · 29/04/2026.
**Stack:** `pip install meta-ads-cli` · Python 3.12+ · Marketing API v22+
