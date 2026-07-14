#!/usr/bin/env bash
# 04-relatorio-diario.sh
# Relatório diário · puxa métricas · formata · envia pro Slack/Email
# Rodar via cron: 0 9 * * * /path/to/04-relatorio-diario.sh

set -euo pipefail

ACCOUNT_ID="${META_AD_ACCOUNT_ID}"
[ -n "${META_ACCESS_TOKEN:-}" ] || exit 3

DATE_LABEL=$(date +%Y-%m-%d)

LOG_DIR="${LOG_DIR:-_private/logs/meta-cli}"
mkdir -p "$LOG_DIR"
REPORT="$LOG_DIR/relatorio_${DATE_LABEL}.md"

echo "# Relatório LPSG · $DATE_LABEL" > "$REPORT"
echo "" >> "$REPORT"

# Resumo conta
echo "## Conta" >> "$REPORT"
meta ads account info --output json | jq -r '
  "- Conta: \(.name) (\(.id))",
  "- Saldo: \(.balance) \(.currency)",
  "- Status: \(.account_status)"
' >> "$REPORT"
echo "" >> "$REPORT"

# Top campanhas
echo "## Performance · ontem" >> "$REPORT"
meta ads insights get \
  --account-id "$ACCOUNT_ID" \
  --level campaign \
  --fields=campaign_name,spend,impressions,clicks,actions,roas \
  --date-preset yesterday \
  --output json | \
  jq -r '.[] | "- \(.campaign_name) · spend R$ \(.spend) · impressions \(.impressions) · ROAS \(.roas)"' \
  >> "$REPORT"
echo "" >> "$REPORT"

# Top 5 ads vencedores
echo "## Top 5 ads · last 7 days" >> "$REPORT"
meta ads insights get \
  --account-id "$ACCOUNT_ID" \
  --level ad \
  --fields=ad_name,spend,roas \
  --date-preset last_7d \
  --output json | \
  jq -r 'sort_by(.roas) | reverse | .[0:5] | .[] | "- \(.ad_name) · ROAS \(.roas)"' \
  >> "$REPORT"

cat "$REPORT"

# Send to Slack
if [ -n "${SLACK_WEBHOOK:-}" ]; then
  curl -s -X POST -H 'Content-type: application/json' \
    --data "$(jq -Rs '{text: .}' < "$REPORT")" \
    "$SLACK_WEBHOOK" > /dev/null
fi
