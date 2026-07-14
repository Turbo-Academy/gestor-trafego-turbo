# Cheatsheet · Comandos `meta ads` mais usados

Catálogo dos comandos `meta ads` que aparecem 80% do tempo em rotina de gestão. Dividido em **READ (seguro)** e **WRITE (precisa confirmação)**.

> **Regra de ouro (validada em teste real 2026-05-26):** `--output json` é **flag global do `meta`**, vai ANTES de `ads`:
>
> ```bash
> # ✅ CERTO
> meta --output json ads campaign list
>
> # ❌ ERRADO (retorna "Error: No such option '--output'.")
> meta ads campaign list --output json
> ```
>
> Pra leitura humana no terminal, omitir a flag — sai em formato texto.

---

## READ — comandos seguros (allow no Claude Code)

### Campanhas

```bash
# Listar todas as campanhas da conta (default 10 itens)
meta --output json ads campaign list

# Listar com limite maior
meta --output json ads campaign list --limit 50

# Detalhe de uma campanha específica
meta --output json ads campaign get --id 23856123456789

# Formato humano (terminal direto)
meta ads campaign list --limit 25
```

### Ad Sets

```bash
# Ad sets de uma campanha
meta --output json ads adset list --campaign-id 23856123456789

# Todos os ad sets ativos da conta
meta --output json ads adset list

# Detalhe (inclui targeting, budget, schedule)
meta --output json ads adset get --id 23856987654321
```

### Ads

```bash
# Ads de um ad set
meta --output json ads ad list --adset-id 23856987654321
```

### Creatives

```bash
# Todos os creatives da conta
meta --output json ads creative list

# Detalhe de um creative
meta --output json ads creative get --id 23856111222333
```

### Insights (o mais usado)

```bash
# Métricas últimos 7 dias agregadas pela conta
meta --output json ads insights get \
  --date-preset last_7d \
  --fields spend,impressions,clicks,ctr,cpc,reach

# Insights por campanha (filtro)
meta --output json ads insights get \
  --date-preset last_30d \
  --campaign-id 23856123456789 \
  --fields spend,impressions,clicks,ctr,cpc

# Insights por ad set (filtro)
meta --output json ads insights get \
  --date-preset last_7d \
  --adset-id 23856987654321 \
  --fields spend,ctr,frequency,reach

# Insights por ad (granularidade máxima)
meta --output json ads insights get \
  --date-preset last_7d \
  --ad-id 23856444555666 \
  --fields spend,impressions,inline_link_clicks,ctr,cpc

# Período customizado
meta --output json ads insights get \
  --since 2026-05-01 \
  --until 2026-05-15 \
  --fields spend,impressions

# Breakdown demográfico
meta --output json ads insights get \
  --date-preset last_7d \
  --breakdown age \
  --breakdown gender \
  --fields spend,impressions

# Breakdown por placement
meta --output json ads insights get \
  --date-preset last_7d \
  --breakdown publisher_platform \
  --breakdown platform_position \
  --fields spend,impressions,ctr

# Time series (diário)
meta --output json ads insights get \
  --date-preset last_30d \
  --time-increment daily \
  --fields spend,impressions
```

### Conta

```bash
# Info da conta (nome, status, moeda, fuso, gasto)
meta --output json ads adaccount get

# Output esperado em conta nova:
# [{
#   "id": "act_XXXXXX",
#   "name": "Nome da conta",
#   "account_status": 1,
#   "currency": "BRL",
#   "timezone_name": "America/Sao_Paulo",
#   "amount_spent": "0"
# }]
```

`account_status`: **1**=ACTIVE · 2=DISABLED · 3=UNSETTLED · 7=PENDING_CLOSURE · 9=IN_GRACE_PERIOD · 100=PENDING_REVIEW.

---

## WRITE — comandos que PEDEM CONFIRMAÇÃO (nunca no allowlist)

> Padrão obrigatório:
> 1. Recursos novos sempre nascem `--status PAUSED`
> 2. Claude Code sempre confirma antes de executar
> 3. Após executar, validar com `get` antes de seguir

### Pausar / Despausar campanhas

```bash
# Pausar (uso comum em stop-loss)
meta ads campaign update --id 23856123456789 --status PAUSED

# Reativar (sempre opt-in explícito do usuário)
meta ads campaign update --id 23856123456789 --status ACTIVE
```

### Ajustar budget

```bash
# Mudar budget diário de um ad set
meta ads adset update \
  --id 23856987654321 \
  --daily-budget 5000   # em centavos → R$ 50,00
```

### Criar campanha

```bash
meta ads campaign create \
  --name "LPSG_260526_TST_HEADLINE_V1" \
  --objective OUTCOME_SALES \
  --status PAUSED \
  --special-ad-categories NONE
```

### Deletar (extremo cuidado)

```bash
# DELETE é permanente — sempre confirmar 2x antes
meta ads campaign delete --id 23856123456789
meta ads adset delete --id 23856987654321
meta ads ad delete --id 23856444555666
```

---

## Flags úteis (do `meta ads insights get`)

| Flag | Pra que serve |
|---|---|
| `--date-preset` | `today`, `yesterday`, `last_3d`, `last_7d`, `last_14d`, `last_30d`, `last_90d`, `this_month`, `last_month` |
| `--since YYYY-MM-DD --until YYYY-MM-DD` | Janela customizada (sobrescreve `--date-preset`) |
| `--time-increment` | `daily`, `weekly`, `monthly`, `all_days` (default) |
| `--breakdown` | `age`, `gender`, `country`, `publisher_platform`, `device_platform`, `platform_position`, `impression_device` — repetível |
| `--fields` | Lista de métricas separada por vírgula (default: `spend,impressions,clicks,ctr,cpc,reach`) |
| `--campaign-id` / `--adset-id` / `--ad-id` | Filtrar a um recurso específico |
| `--sort` | Ex: `spend_descending`, `impressions_ascending` |
| `--limit` / `-l` | Máximo de linhas (default 50) |

## Flags globais do `meta`

| Flag | Pra que serve |
|---|---|
| `--output json` | Saída em JSON (pra parsing) |
| `--ad-account-id act_XXX` | Override do `AD_ACCOUNT_ID` do env |
| `--business-id XXX` | Override do `BUSINESS_ID` do env |
| `-h` / `--help` | Ajuda |

---

## Padrões úteis pra Claude Code

### Workflow read-only: "relatório dos últimos 7 dias"

```bash
# 1. Status geral da conta
meta --output json ads adaccount get

# 2. Top campanhas por gasto últimos 7d
meta --output json ads insights get \
  --date-preset last_7d \
  --campaign-id "" \
  --fields spend,impressions,clicks,ctr,cpc \
  --sort spend_descending \
  --limit 20 > /tmp/insights_campanhas.json

# 3. Series diária pra ver tendência
meta --output json ads insights get \
  --date-preset last_7d \
  --time-increment daily \
  --fields spend,ctr
```

### Workflow read-only: "ad sets com CTR caindo"

```bash
# Pegar ad sets últimos 3d e filtrar com jq
meta --output json ads insights get \
  --date-preset last_3d \
  --adset-id "" \
  --fields adset_name,ctr,spend,frequency \
  | jq '.data[] | select(.ctr | tonumber < 0.5)'
```

### Workflow read-only: "frequência por ad set"

```bash
meta --output json ads insights get \
  --date-preset last_7d \
  --adset-id "" \
  --fields adset_name,frequency,reach,impressions \
  --sort frequency_descending
```

---

## Quando ir além: skill `meta-ads-cli-turbo`

Esta cheatsheet cobre o uso manual / pontual. Pra automação industrial use a skill **`meta-ads-cli-turbo`** que tem:

- Batelada de 15 criativos (5 estáticos + 5 carrosséis + 5 vídeos) com nomenclatura LPSG
- 5 campanhas de teste de página automatizadas
- Stop-loss horário (pausa ad sets com CTR abaixo do threshold)
- Relatório diário Slack/Telegram
- Escalonamento de vencedores (duplica ad sets com ROAS > X)
