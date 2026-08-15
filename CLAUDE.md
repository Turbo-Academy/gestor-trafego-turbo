# Gestor de Tráfego Turbo — instruções pro Claude

## Se te pediram pra INSTALAR o gestor de tráfego nesta máquina

**Baixar o repositório (se ainda não estiver baixado):** git NÃO é pré-requisito. Se `command -v git` falhar, **não dispare a instalação do Xcode Command Line Tools** (popup de ~2 GB que trava o fluxo) — baixe o ZIP com o curl nativo do macOS:

```bash
curl -L https://github.com/Turbo-Academy/gestor-trafego-turbo/archive/refs/heads/main.zip -o gestor.zip
unzip -q gestor.zip && rm gestor.zip
# cria a pasta gestor-trafego-turbo-main — trabalhe dentro dela
```

Com git presente, `git clone https://github.com/Turbo-Academy/gestor-trafego-turbo.git` é equivalente.

**Instalar:** rode `bash install.sh` (idempotente — copia o agente `trafego-turbo` e as 18 skills pra `~/.claude/`). Não precisa de senha nem de Homebrew.

**Opcional — leitura de páginas web** (a skill `leitura-web-turbo` funciona sem isto, degradando pro WebFetch): `bash tools/instalar-scrapling.sh` instala o Scrapling (~400 MB de venv + ~1,1 GB de navegadores) e registra o MCP `scrapling` no escopo user. **Pergunte antes** — é pesado e nem todo mundo precisa.

**No fim, avise o usuário:** skills, agente e MCPs só carregam em **sessão nova** do Claude Code — a sessão da instalação não enxerga o que ela mesma instalou. Conferir: `/skills` lista as skills e o agente responde a "Use o agente trafego-turbo…".

O manual humano dessa instalação é o [INSTALACAO-DO-ZERO.md](INSTALACAO-DO-ZERO.md).

## Sobre este repositório

- Agente de **tráfego pago** (Meta Ads + Google Ads) da Turbo Academy: 1 agente + 18 skills, roda **sem** o Squad Turbo completo. Comece pelo [README](README.md).
- Regras de segurança do agente: campanha nova nasce **PAUSED**; a CLI confirma toda escrita; token da Meta **nunca** entra no repo.
- O repo é público. As skills são cópias das canônicas do Squad Turbo (repo squad-turbo-lpsg-7.0) — melhorias entram por lá e são sincronizadas pra cá; não edite as cópias daqui à mão.
