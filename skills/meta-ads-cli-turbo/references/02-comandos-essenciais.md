# 02 · Comandos essenciais Meta Ads CLI

> Referência rápida dos comandos · com exemplos LPSG-ready.

---

## Comando base

```bash
meta ads <resource> <action> [flags]
```

**Resources:** `account` · `campaign` · `adset` · `ad` · `creative` · `insights` · `catalog` · `pixel` · `audience` · `image` · `video`

**Actions:** `create` · `list` · `get` · `update` · `delete` · `pause` · `unpause`

**Output flags:** `--output table|json|plain` (default: table)
**Safety flags:** `--no-input` (suppress prompts) · `--force` (skip confirmations) · `--dry-run` (validate sem executar)

---

## Account

```bash
# Info conta atual
meta ads account info

# Listar contas que tenho acesso
meta ads account list --output json | jq '.[] | {id, name, currency, balance}'
```

---

## Campaign · ASC pra LPSG

```bash
# Criar campanha ASC (Advantage+ Shopping)
meta ads campaign create \
  --name "MPR_120526_ASC_INGRESSO" \
  --objective OUTCOME_SALES \
  --special-ad-categories NONE \
  --status PAUSED \
  --buying-type AUCTION \
  --bid-strategy LOWEST_COST_WITHOUT_CAP \
  --output json

# Salvar ID
CAMPAIGN_ID=$(meta ads campaign create ... --output json | jq -r '.id')
echo $CAMPAIGN_ID

# Listar campanhas ativas
meta ads campaign list --status ACTIVE --output table

# Pausar campanha
meta ads campaign pause --id $CAMPAIGN_ID

# Update budget
meta ads campaign update --id $CAMPAIGN_ID --daily-budget 20000   # R$ 200/dia
```

---

## Ad Set · 5 testes de página

```bash
# Criar ad set V1 com targeting amplo (ASC pega público)
meta ads adset create \
  --name "MPR_120526_TES-PAG_001" \
  --campaign-id $CAMPAIGN_ID \
  --daily-budget 5000 \
  --billing-event IMPRESSIONS \
  --optimization-goal OFFSITE_CONVERSIONS \
  --status PAUSED \
  --start-time "2026-05-12T07:00:00-03:00" \
  --targeting '{
    "geo_locations": {"countries": ["BR"]},
    "age_min": 25,
    "age_max": 55,
    "genders": [2]
  }' \
  --promoted-object-pixel-id $META_PIXEL_ID \
  --promoted-object-custom-event-type PURCHASE \
  --output json | jq '.id'
```

---

## Creative · upload de imagem

```bash
# 1. Upload imagem (retorna hash)
IMAGE_HASH=$(meta ads image upload \
  --filename ./batelada-120526/estaticos/EST_001/final.png \
  --output json | jq -r '.hash')

# 2. Criar creative com imagem + copy
meta ads creative create \
  --name "MPR_120526_EST_001_creative" \
  --image-hash $IMAGE_HASH \
  --link "https://lp.marinacosta.com.br/v1?utm_source=meta&utm_campaign=mpr_120526" \
  --message "$(cat batelada-120526/estaticos/EST_001/copy.md | grep '^Headline:' | cut -d: -f2-)" \
  --headline "Aula 1 segunda · 7h" \
  --description "Garantia incondicional · 7 dias · 100% do valor de volta" \
  --call-to-action SIGN_UP \
  --page-id $FACEBOOK_PAGE_ID \
  --output json | jq '.id'
```

---

## Creative · upload de vídeo

```bash
# 1. Upload vídeo (assíncrono · retorna ID + status processing)
VIDEO_ID=$(meta ads video upload \
  --filename ./batelada-120526/videos/VID_001/final.mp4 \
  --title "MPR_120526_VID_001" \
  --output json | jq -r '.id')

# 2. Aguardar processamento (Meta processa async)
while [ "$(meta ads video get --id $VIDEO_ID --output json | jq -r '.status.video_status')" != "ready" ]; do
  echo "Aguardando processamento do vídeo..."
  sleep 10
done

# 3. Criar creative com vídeo
meta ads creative create \
  --name "MPR_120526_VID_001_creative" \
  --video-id $VIDEO_ID \
  --thumbnail-url "https://bucket/thumbs/VID_001.jpg" \
  --link "https://lp.marinacosta.com.br/v1" \
  --message "..." \
  --call-to-action SIGN_UP \
  --output json | jq '.id'
```

---

## Ad · linkar creative ao ad set

```bash
# Para cada combinação criativo×adset
meta ads ad create \
  --name "MPR_120526_AD_EST001_v1" \
  --adset-id $ADSET_ID \
  --creative-id $CREATIVE_ID \
  --status PAUSED \
  --output json | jq '.id'

# 75 ads = 15 criativos × 5 ad sets (V1-V5) — fazer com loop
```

---

## Insights · relatório diário

```bash
# Performance por campanha (last 7 days)
meta ads insights get \
  --campaign-id $CAMPAIGN_ID \
  --fields=spend,impressions,clicks,reach,ctr,cpc,cpm,actions,roas \
  --date-preset last_7d \
  --output json | jq '.[]'

# Performance por ad (granular · pra stop-loss)
meta ads insights get \
  --account-id $META_AD_ACCOUNT_ID \
  --level ad \
  --fields=ad_id,ad_name,spend,impressions,actions,roas \
  --date-preset today \
  --filtering '[{"field":"spend","operator":"GREATER_THAN","value":50}]' \
  --output json
```

### Métricas LPSG-relevantes

```yaml
HOOK_RATE:     "(actions:link_click / impressions) * 100  · alvo ≥ 20%"
HOLD_RATE:     "(video_p75_watched / video_views) * 100   · alvo ≥ 10%"
BODY_RATE:     "(actions:purchase / unique_link_clicks) * 100  · alvo ≥ 5%"
ROAS:          "actions:purchase_conversion_value / spend  · alvo ≥ 1.0 captação"
CPM:           "spend / (impressions/1000)  · alvo ≤ R$ 40"
CPL:           "spend / actions:lead  · alvo R$ 8-12"
```

---

## Catalog · produtos (se Hotmart oferecer)

```bash
# Criar catalog
CATALOG_ID=$(meta ads catalog create \
  --name "Mae Produtiva - Catalogo" \
  --vertical commerce \
  --output json | jq -r '.id')

# Adicionar produto
meta ads catalog product add \
  --catalog-id $CATALOG_ID \
  --retailer-id "MPR_INGRESSO" \
  --name "Mãe Produtiva · Ingresso" \
  --price "47.00 BRL" \
  --availability in_stock \
  --image-url "https://bucket/produtos/mpr-ingresso.jpg" \
  --link "https://pay.hotmart.com/MPR-INGRESSO"
```

---

## Pixel · criar conversion

```bash
# Criar pixel (uma vez por conta)
PIXEL_ID=$(meta ads pixel create \
  --name "MPR Pixel" \
  --output json | jq -r '.id')

# Custom event de conversão
meta ads pixel custom-conversion create \
  --pixel-id $PIXEL_ID \
  --name "MPR Compra Ingresso" \
  --custom-event-type PURCHASE \
  --rule '{
    "url": {"i_contains": "/obrigado-ingresso"}
  }'
```

---

## Filtering · jq tricks pra LPSG

```bash
# Top 5 ads vencedores por ROAS
meta ads insights get --account-id $META_AD_ACCOUNT_ID --level ad \
  --fields=ad_id,ad_name,spend,roas --date-preset last_7d --output json | \
  jq 'sort_by(.roas) | reverse | .[0:5]'

# Ads pra pausar (ROAS < 0.6 com spend > R$ 50)
meta ads insights get --account-id $META_AD_ACCOUNT_ID --level ad \
  --fields=ad_id,spend,roas --date-preset today --output json | \
  jq '.[] | select(.roas < 0.6 and .spend > 50) | .ad_id'

# Comparar V1 vs V2 vs V3 (5 testes de página)
meta ads insights get --account-id $META_AD_ACCOUNT_ID --level adset \
  --fields=adset_name,spend,actions,roas --date-preset last_7d --output json | \
  jq '.[] | select(.adset_name | test("TES-PAG"))'

# Hook rate por criativo (extrair de actions)
meta ads insights get --campaign-id $CAMPAIGN_ID --level ad \
  --fields=ad_name,impressions,actions --date-preset last_7d --output json | \
  jq '.[] | {
    name: .ad_name,
    impressions,
    link_clicks: (.actions[]? | select(.action_type=="link_click") | .value | tonumber),
    hook_rate: ((.actions[]? | select(.action_type=="link_click") | .value | tonumber) / .impressions * 100)
  }'
```

---

## Batch · agrupar 50 chamadas em 1

```bash
# Cria batch file
cat > batch.json <<EOF
[
  {"method": "GET", "relative_url": "act_$META_AD_ACCOUNT_ID/campaigns?fields=name,status"},
  {"method": "GET", "relative_url": "act_$META_AD_ACCOUNT_ID/adsets?fields=name,status,daily_budget"},
  {"method": "GET", "relative_url": "act_$META_AD_ACCOUNT_ID/ads?fields=name,status,creative"}
]
EOF

# Executa batch (1 chamada · 3 retornos)
meta ads batch run --file batch.json --output json
```

> Batch reduz rate limit hit · agrupa até 50 chamadas em 1 request.

---

## Exit codes (pra shell scripting)

```yaml
0:   "Success"
1:   "Generic error"
2:   "Invalid arguments"
3:   "Authentication failed"
4:   "API error (rate limit, validation, server)"
5:   "Network error"
6:   "Resource not found"
```

### Pattern shell pra retry com backoff

```bash
attempt=1
max_attempts=5
while [ $attempt -le $max_attempts ]; do
  if meta ads campaign create ...; then
    break
  fi
  exit_code=$?
  if [ $exit_code -eq 4 ]; then
    sleep_time=$((2 ** attempt))
    echo "API error · retry em ${sleep_time}s"
    sleep $sleep_time
  else
    echo "Erro fatal · exit $exit_code"
    exit $exit_code
  fi
  attempt=$((attempt + 1))
done
```
