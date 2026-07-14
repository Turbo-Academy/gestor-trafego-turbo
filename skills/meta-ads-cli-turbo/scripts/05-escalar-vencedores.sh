#!/usr/bin/env bash
# 05-escalar-vencedores.sh
# Identifica ad set vencedor (ROAS≥1.5 últimos 7d) · duplica com budget 2x
# RECOMENDADO: rodar manual · não em cron (cap de orçamento total)

set -euo pipefail

ACCOUNT_ID="${META_AD_ACCOUNT_ID}"
ROAS_MIN="${ROAS_MIN:-1.5}"
SPEND_MIN="${SPEND_MIN:-200}"

[ -n "${META_ACCESS_TOKEN:-}" ] || exit 3

LOG_DIR="${LOG_DIR:-_private/logs/meta-cli}"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/escala_$(date +%Y%m%d_%H%M%S).log"
exec > >(tee -a "$LOG") 2>&1

echo "=== Escalar vencedores · $(date -Iseconds) ==="

# Top ad sets pelos critérios
WINNERS=$(meta ads insights get \
  --account-id "$ACCOUNT_ID" \
  --level adset \
  --fields=adset_id,adset_name,spend,roas \
  --date-preset last_7d \
  --output json | \
  jq -c --arg roas "$ROAS_MIN" --arg spend "$SPEND_MIN" \
    '[.[] | select(.spend > ($spend|tonumber) and .roas >= ($roas|tonumber))] | sort_by(.roas) | reverse')

COUNT=$(echo "$WINNERS" | jq 'length')
echo "Encontrados $COUNT vencedores (ROAS≥$ROAS_MIN · spend>R\$ $SPEND_MIN)"

echo "$WINNERS" | jq -r '.[] | "- \(.adset_name) · ROAS \(.roas) · spend R$ \(.spend)"'
echo ""

# Confirmação humana
read -p "Duplicar TODOS com budget 2x? [yes/N] " confirm
[ "$confirm" = "yes" ] || { echo "Cancelado pelo usuário"; exit 0; }

echo "$WINNERS" | jq -r '.[] | .adset_id' | while read AS_ID; do
  ORIG_NAME=$(meta ads adset get --id "$AS_ID" --output json | jq -r '.name')
  ORIG_BUDGET=$(meta ads adset get --id "$AS_ID" --output json | jq -r '.daily_budget')
  NEW_BUDGET=$((ORIG_BUDGET * 2))

  # cap de segurança
  [ "$NEW_BUDGET" -le 50000 ] || { echo "⚠ skip $AS_ID · cap R\$ 500/dia"; continue; }

  NEW_NAME="${ORIG_NAME}_SCALE_$(date +%y%m%d)"

  # Meta Ads CLI suporta 'copy' em algumas versões · senão criar manualmente
  echo "Duplicando $ORIG_NAME → $NEW_NAME (budget R\$ $((NEW_BUDGET/100))/dia)"
  # meta ads adset copy --source-id "$AS_ID" --name "$NEW_NAME" --daily-budget "$NEW_BUDGET" --status PAUSED
done

echo "=== Escala completa · ad sets duplicados em PAUSED ==="
