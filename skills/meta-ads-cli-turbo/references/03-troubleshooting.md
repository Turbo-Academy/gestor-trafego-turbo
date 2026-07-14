# 03 · Troubleshooting Meta Ads CLI

## Erros de auth

| Mensagem | Causa | Fix |
|---|---|---|
| `(#190) Invalid OAuth access token` | Token expirou ou foi revogado | Regerar System User Token no Business Manager |
| `(#200) Permissions error` | Token sem `ads_management` | Reconfigurar permissões do System User |
| `(#10) Application does not have permission` | App não autorizado pra conta | Atribuir app à conta de anúncios |
| `User does not have permission for ad account` | System User sem acesso à conta | Business Manager → Atribuir Ativos |

## Erros de rate limit

```
(#17) User request limit reached
(#80004) Too many calls
```

**Solução:** exponencial backoff em scripts:

```bash
attempt=1
while [ $attempt -le 5 ]; do
  meta ads insights get ... && break
  sleep $((2 ** attempt))
  attempt=$((attempt + 1))
done
```

**Limites:**
- User Token: 200 chamadas/h
- App-level: 200 × #usuários por hora
- Business User: ~maior (depende do tier)
- **Tip:** usar Business User Token sempre que possível

## Erros de validação

| Mensagem | Causa |
|---|---|
| `Required parameter "name" missing` | Esqueceu `--name` |
| `Invalid parameter "objective"` | Valor errado · use OUTCOME_SALES, OUTCOME_LEADS, etc |
| `daily_budget must be at least 100` | Budget mínimo R$ 1,00 (100 centavos) |
| `start_time must be in the future` | Data passada |

## Quirks específicos LPSG

```yaml
1_VIDEO_PROCESSING:    "Vídeos demoram 1-5min pra processar · poll status antes de criar creative"
2_IMAGE_HASH:          "Image hash dura 1h · regenerar se demorar"
3_CREATIVE_REUSE:      "Creative pode ser usado em múltiplos ads · economiza upload"
4_PIXEL_DELAY:         "Pixel events demoram 15-30min pra aparecer em insights"
5_ASC_TIME:            "ASC precisa 24-48h pra fase de aprendizado · não julgue antes"
6_EVENT_MATCH:         "purchase event precisa de match com pixel · valida com Test Events"
7_CURRENCY:            "Valores em centavos (R$ 50 = 5000 · não 50)"
8_DATETIME:            "Sempre ISO 8601 com timezone · ex: 2026-05-12T07:00:00-03:00"
```

## Logs · debug

```bash
# Verbose mode
meta ads --verbose campaign create ...

# Salvar todo output (com mask de token)
meta ads campaign create ... 2>&1 | \
  sed 's/EAA[A-Za-z0-9_]*/[TOKEN_MASKED]/g' | \
  tee _private/logs/meta-cli/campaign_$(date +%Y%m%d_%H%M%S).log
```

## Diagnóstico rápido

```bash
# Health check completo
echo "=== Auth ==="
meta ads account info | head -5

echo "=== Token info ==="
curl -s "https://graph.facebook.com/v22.0/me?access_token=$META_ACCESS_TOKEN" | jq

echo "=== Rate limit headers ==="
curl -sI "https://graph.facebook.com/v22.0/me?access_token=$META_ACCESS_TOKEN" | \
  grep -i "x-ad-account-usage\|x-app-usage\|x-business-use-case-usage"

echo "=== Conta saúde ==="
meta ads account info --output json | jq '{
  id, name, currency,
  account_status, balance, spend_cap,
  business_country_code, timezone_name
}'
```
