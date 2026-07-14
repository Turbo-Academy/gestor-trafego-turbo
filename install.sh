#!/usr/bin/env bash
# Instala o Gestor de Tráfego Turbo (agente + 13 skills) no Claude Code.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DIR="$HOME/.claude/skills"
AGENTS_DIR="$HOME/.claude/agents"

mkdir -p "$SKILLS_DIR" "$AGENTS_DIR"

echo "Instalando skills em $SKILLS_DIR ..."
for skill in "$REPO_DIR"/skills/*/; do
  name="$(basename "$skill")"
  rm -rf "${SKILLS_DIR:?}/$name"
  cp -R "$skill" "$SKILLS_DIR/$name"
  echo "  ✓ $name"
done

echo "Instalando agente em $AGENTS_DIR ..."
cp "$REPO_DIR/agents/trafego-turbo.md" "$AGENTS_DIR/"
echo "  ✓ trafego-turbo"

echo ""
echo "Pronto. Reinicie o Claude Code e chame o agente:"
echo "  \"Use o agente trafego-turbo para estruturar minhas campanhas\""
