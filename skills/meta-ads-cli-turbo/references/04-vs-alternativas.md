# 04 · Meta Ads CLI vs alternativas (quando usar o quê)

## Comparativo

| Ferramenta | Quando usar | Quando NÃO usar |
|---|---|---|
| **Meta Ads CLI (oficial)** | Operação programática da própria conta · scripts shell · stop-loss automatizado · batelada de criativos | Análise de concorrência (Meta Ad Library) |
| **Marketing API SDK (Python)** | Lógica complexa · integração com pipeline Python existente · ML em cima de dados de ads | Ações simples · time não-Python |
| **n8n com nó Meta Ads** | Workflows low-code · time não-técnico · integração com Hotmart/Sheets | Loops complexos · batelada de 50+ items |
| **ManyChat** | Mensageria DM Instagram/Facebook · não é gestão de ads | Operação de campanha |
| **Apify Meta Ad Library Scraper** | Inteligência competitiva · monitorar criativos da concorrência | Operação da conta própria |
| **Pipeboard CLI** | Multi-plataforma (Meta + Google + TikTok) · interface unificada | Se já tem Meta Ads CLI oficial · evitar fragmentação |
| **MCP Meta (futuro)** | Quando Meta lançar MCP nativo · agents conversacionais via Claude | Hoje (não existe ainda · só comunidade) |

## Fluxo recomendado pra LPSG

```
┌───────────────────────────────────────────────────────────────────┐
│  CRIATIVOS  →  meta-ads-cli (upload batelada)                     │
│                                                                    │
│  TRÁFEGO    →  meta-ads-cli (criar campaign + 5 adsets V1-V5)     │
│                                                                    │
│  ANÁLISE    →  meta-ads-cli (insights JSON) → jq → Sheets/Notion  │
│                                                                    │
│  STOP-LOSS  →  cron horário → meta-ads-cli (pause se ROAS baixo)  │
│                                                                    │
│  ESCALA     →  meta-ads-cli (duplicar vencedor budget 2x)         │
│                                                                    │
│  WORKFLOWS  →  n8n (apenas pra lógica multi-fonte: Hotmart +      │
│                 Sheets + ManyChat + Slack · não pra ads)          │
│                                                                    │
│  DM SOCIAL  →  ManyChat (pré-evento + ficha de interesse)         │
│                                                                    │
│  COMPETITIVO →  Apify (Meta Ad Library scraper · pesquisa)        │
└───────────────────────────────────────────────────────────────────┘
```

## Vs Marketing API SDK Python (substituição)

**Antes (script Python custom · ~80 linhas):**
```python
from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.campaign import Campaign
from facebook_business.adobjects.adaccount import AdAccount

FacebookAdsApi.init(access_token=os.environ['META_ACCESS_TOKEN'])
account = AdAccount(f"act_{os.environ['META_AD_ACCOUNT_ID']}")

params = {
    'name': 'MPR_120526_ASC',
    'objective': 'OUTCOME_SALES',
    'status': 'PAUSED',
    'special_ad_categories': []
}
campaign = account.create_campaign(params=params)
print(campaign['id'])
```

**Depois (CLI · 4 linhas):**
```bash
meta ads campaign create \
  --name "MPR_120526_ASC" \
  --objective OUTCOME_SALES \
  --status PAUSED \
  --output json | jq -r '.id'
```

**Ganhos:**
- Sem dependência Python no host (só CLI · auto-atualizada)
- Output JSON direto · sem parsing manual
- Exit codes padrão · melhor pra shell scripting
- Testes mais fáceis (echo + assert vs mock SDK)

**Quando manter Python SDK:**
- Lógica de negócio complexa em Python (ex: ML pra prever ROAS)
- Integração com pandas/Sheets via SDK Google
- Time já tem expertise Python · custo de migração alto

## Vs n8n (coexistência)

```
n8n FAZ MELHOR:
- Webhooks (Hotmart compra → +ManyChat tag → +Slack)
- Workflows com 5+ fontes (Sheets, Notion, Airtable, Slack)
- Time não-técnico cria/edita

CLI FAZ MELHOR:
- Loops shell de 75 ads (15 criativos × 5 adsets)
- Cron jobs simples (stop-loss horário)
- Logs auditáveis em texto
- Pipelines unix (jq, awk, grep)

PADRÃO LPSG:
- Operação ads      → CLI
- Workflow Hotmart  → n8n
- Mensageria DM     → ManyChat (chamado por n8n)
- Dashboard         → CLI insights → Sheets
```

## MCP futuro

Em 2026 a Meta deve lançar MCP server oficial (sinalizado em developer events). Isso permitirá que `@trafego-turbo` (agent Claude) execute operações Meta Ads diretamente via natural language sem precisar gerar shell scripts. Quando sair:

```
ANTES (hoje):
@trafego-turbo "sobe batelada de 15 criativos"
→ gera bash script
→ humano roda script
→ humano valida output

DEPOIS (com MCP):
@trafego-turbo "sobe batelada de 15 criativos"
→ chama tools MCP Meta diretamente
→ feedback em tempo real
→ humano só aprova
```

**Não esperar MCP pra começar a usar CLI** — CLI já é ganho enorme hoje. MCP será migração natural quando sair.
