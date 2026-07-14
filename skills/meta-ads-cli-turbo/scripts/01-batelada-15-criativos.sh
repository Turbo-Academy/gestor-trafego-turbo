#!/usr/bin/env bash
# 01-batelada-15-criativos.sh
# Sobe os 15 criativos da batelada LPSG (5 EST + 5 CAR + 5 VID)
# Default PAUSED · ativação humana
#
# Uso:
#   ./01-batelada-15-criativos.sh \
#     --sigla MPR \
#     --data 120526 \
#     --campaign-id $CAMPAIGN_ID \
#     --batelada-dir ./batelada-120526 \
#     [--dry-run]

set -euo pipefail

# === args ===
DRY_RUN=false
while [ $# -gt 0 ]; do
  case $1 in
    --sigla)         SIGLA="$2"; shift 2 ;;
    --data)          DATA="$2"; shift 2 ;;
    --campaign-id)   CAMPAIGN_ID="$2"; shift 2 ;;
    --batelada-dir)  BATELADA_DIR="$2"; shift 2 ;;
    --dry-run)       DRY_RUN=true; shift ;;
    *) echo "arg desconhecido: $1"; exit 2 ;;
  esac
done

# === validações ===
[[ "$SIGLA" =~ ^[A-Z]{3}$ ]] || { echo "ERRO: SIGLA precisa ser 3 letras maiúsculas"; exit 2; }
[[ "$DATA" =~ ^[0-9]{6}$ ]]  || { echo "ERRO: DATA precisa ser DDMMYY (6 dígitos)"; exit 2; }
[ -d "$BATELADA_DIR" ]       || { echo "ERRO: $BATELADA_DIR não existe"; exit 2; }
[ -n "${META_ACCESS_TOKEN:-}" ] || { echo "ERRO: META_ACCESS_TOKEN não definido"; exit 3; }

# === setup logs ===
LOG_DIR="${LOG_DIR:-_private/logs/meta-cli}"
mkdir -p "$LOG_DIR"
LOG="$LOG_DIR/batelada_${SIGLA}_${DATA}_$(date +%Y%m%d_%H%M%S).log"
exec > >(tee -a "$LOG") 2>&1

echo "=== Batelada $SIGLA $DATA · iniciada $(date -Iseconds) ==="
$DRY_RUN && echo "MODO DRY-RUN · não cria nada"

MANIFEST="$LOG_DIR/${SIGLA}_${DATA}_manifest.json"
echo '{ "batelada": "'$SIGLA'_'$DATA'", "criados": [] }' > "$MANIFEST"

# === loop dos 5 estáticos ===
for i in 001 002 003 004 005; do
  CR_NAME="${SIGLA}_${DATA}_EST_${i}"
  EST_DIR="$BATELADA_DIR/estaticos/EST_${i}"
  IMG="$EST_DIR/final.png"
  COPY="$EST_DIR/copy.md"

  if [ ! -f "$IMG" ]; then echo "⚠ skip $CR_NAME (sem $IMG)"; continue; fi

  if $DRY_RUN; then
    echo "DRY: criaria $CR_NAME a partir de $IMG"
    continue
  fi

  HASH=$(meta ads image upload --filename "$IMG" --output json | jq -r '.hash')
  ID=$(meta ads creative create \
        --name "$CR_NAME" \
        --image-hash "$HASH" \
        --link "https://lp.example.com/v1?utm_campaign=${SIGLA}_${DATA}" \
        --message "$(grep -A2 '## Copy' "$COPY" | tail -1)" \
        --headline "$(grep -A1 '## Headline' "$COPY" | tail -1)" \
        --call-to-action SIGN_UP \
        --status PAUSED \
        --output json | jq -r '.id')

  echo "✓ $CR_NAME · id=$ID"
  jq --arg name "$CR_NAME" --arg id "$ID" --arg type "EST" \
    '.criados += [{ name: $name, id: $id, type: $type }]' "$MANIFEST" > "$MANIFEST.tmp" && mv "$MANIFEST.tmp" "$MANIFEST"
done

# === loop dos 5 carrosséis ===
# (simplificado · cada CAR_XXX tem 10 cards · vídeo no card 10)
for i in 001 002 003 004 005; do
  CR_NAME="${SIGLA}_${DATA}_CAR_${i}"
  echo "TODO carrossel: $CR_NAME (multi-card · não implementado neste template)"
done

# === loop dos 5 vídeos ===
for i in 001 002 003 004 005; do
  CR_NAME="${SIGLA}_${DATA}_VID_${i}"
  VID_DIR="$BATELADA_DIR/videos/VID_${i}"
  VIDEO="$VID_DIR/final.mp4"

  if [ ! -f "$VIDEO" ]; then echo "⚠ skip $CR_NAME (sem $VIDEO)"; continue; fi

  if $DRY_RUN; then
    echo "DRY: criaria $CR_NAME a partir de $VIDEO"
    continue
  fi

  VIDEO_ID=$(meta ads video upload --filename "$VIDEO" --title "$CR_NAME" --output json | jq -r '.id')

  # poll status
  for try in {1..30}; do
    STATUS=$(meta ads video get --id "$VIDEO_ID" --output json | jq -r '.status.video_status')
    [ "$STATUS" = "ready" ] && break
    sleep 10
  done

  ID=$(meta ads creative create \
        --name "${CR_NAME}_creative" \
        --video-id "$VIDEO_ID" \
        --link "https://lp.example.com/v1" \
        --call-to-action SIGN_UP \
        --status PAUSED \
        --output json | jq -r '.id')

  echo "✓ $CR_NAME · id=$ID"
done

echo "=== Batelada $SIGLA $DATA · completa ==="
echo "Manifest: $MANIFEST"
echo "Próximo passo HUMANO: revisar e ATIVAR no Business Manager"
