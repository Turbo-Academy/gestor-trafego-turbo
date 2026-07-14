#!/usr/bin/env bash
# 02-criar-5-testes-paginas.sh
# Cria 5 ad sets pra testar V1-V5 das páginas LPSG · cada um aponta pra rota diferente

set -euo pipefail

while [ $# -gt 0 ]; do
  case $1 in
    --sigla)        SIGLA="$2"; shift 2 ;;
    --data)         DATA="$2"; shift 2 ;;
    --campaign-id)  CAMPAIGN_ID="$2"; shift 2 ;;
    --base-url)     BASE_URL="$2"; shift 2 ;;
    --daily-budget) BUDGET="$2"; shift 2 ;;
    --dry-run)      DRY_RUN=true; shift ;;
    *) shift ;;
  esac
done
DRY_RUN=${DRY_RUN:-false}
BUDGET="${BUDGET:-5000}"  # R$ 50/dia default

[ -n "${META_ACCESS_TOKEN:-}" ] || { echo "ERRO: META_ACCESS_TOKEN não definido"; exit 3; }
[ -n "${META_PIXEL_ID:-}" ]     || { echo "ERRO: META_PIXEL_ID não definido"; exit 3; }
[ "$BUDGET" -le 20000 ]         || { echo "ERRO: budget acima do cap R$ 200/dia"; exit 2; }

LOG_DIR="${LOG_DIR:-_private/logs/meta-cli}"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/testes-paginas_${SIGLA}_${DATA}_$(date +%Y%m%d_%H%M%S).log"
exec > >(tee -a "$LOG") 2>&1

echo "=== 5 ad sets de teste de página · $SIGLA $DATA ==="

for v in 1 2 3 4 5; do
  AS_NAME="${SIGLA}_${DATA}_TES-PAG_00${v}"
  URL="${BASE_URL}/v${v}?utm_campaign=${SIGLA}_${DATA}_TES-PAG_00${v}"

  if $DRY_RUN; then
    echo "DRY: criaria $AS_NAME apontando pra $URL com R$ $((BUDGET/100))/dia"
    continue
  fi

  ID=$(meta ads adset create \
        --name "$AS_NAME" \
        --campaign-id "$CAMPAIGN_ID" \
        --daily-budget "$BUDGET" \
        --billing-event IMPRESSIONS \
        --optimization-goal OFFSITE_CONVERSIONS \
        --status PAUSED \
        --targeting '{"geo_locations":{"countries":["BR"]},"age_min":25,"age_max":55}' \
        --promoted-object-pixel-id "$META_PIXEL_ID" \
        --promoted-object-custom-event-type PURCHASE \
        --output json | jq -r '.id')

  echo "✓ $AS_NAME · id=$ID · url=$URL"
done

echo "=== 5 ad sets criados em PAUSED · ativação HUMANA ==="
