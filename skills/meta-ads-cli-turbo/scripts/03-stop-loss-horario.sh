#!/usr/bin/env bash
# 03-stop-loss-horario.sh
# Pausa ads com ROAS abaixo do threshold (gastando > R$ 50)
# Rodar via cron: 0 * * * * /path/to/03-stop-loss-horario.sh
#
# Limites de segurança:
# - Só pausa · NUNCA deleta
# - Mínimo R$ 50 gasto antes de avaliar (evita falso positivo cedo)
# - ROAS threshold default 0.6 (configurável)

set -euo pipefail

ROAS_MIN="${ROAS_MIN:-0.6}"
SPEND_MIN="${SPEND_MIN:-50}"
ACCOUNT_ID="${META_AD_ACCOUNT_ID}"

[ -n "${META_ACCESS_TOKEN:-}" ] || exit 3

LOG_DIR="${LOG_DIR:-_private/logs/meta-cli}"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/stoploss_$(date +%Y%m%d_%H).log"
exec > >(tee -a "$LOG") 2>&1

echo "=== Stop-loss · $(date -Iseconds) · ROAS<$ROAS_MIN · spend>R\$ $SPEND_MIN ==="

PAUSED_COUNT=0

meta ads insights get \
  --account-id "$ACCOUNT_ID" \
  --level ad \
  --fields=ad_id,ad_name,spend,roas \
  --date-preset today \
  --output json | \
  jq -r --arg roas "$ROAS_MIN" --arg spend "$SPEND_MIN" \
    '.[] | select(.spend > ($spend|tonumber) and .roas < ($roas|tonumber)) | "\(.ad_id)\t\(.ad_name)\t\(.spend)\t\(.roas)"' | \
  while IFS=$'\t' read -r AD_ID AD_NAME SPEND ROAS; do
    echo "Pausando $AD_NAME (id=$AD_ID · spend=R\$ $SPEND · ROAS=$ROAS)"
    meta ads ad pause --id "$AD_ID" --no-input
    PAUSED_COUNT=$((PAUSED_COUNT + 1))
  done

echo "=== Stop-loss completo · $PAUSED_COUNT ads pausados ==="

# Notificação Slack opcional
if [ -n "${SLACK_WEBHOOK:-}" ] && [ "$PAUSED_COUNT" -gt 0 ]; then
  curl -s -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"🚨 Stop-loss LPSG: $PAUSED_COUNT ads pausados às $(date +%H:%M)\"}" \
    "$SLACK_WEBHOOK" > /dev/null
fi
