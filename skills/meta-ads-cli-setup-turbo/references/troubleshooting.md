# Troubleshooting · Meta Ads CLI Setup

Catálogo de erros comuns no caminho **zero → primeira chamada funcional**. Organizado por fase. Cada erro tem: **sintoma exato** → **causa raiz** → **fix passo a passo** → **como validar que resolveu**.

---

## Fase 0 — Pré-requisitos

### `python3: command not found`

**Causa:** macOS antigo sem Python ou shell com PATH zoado.

**Fix:**
```bash
brew install python@3.12
echo 'export PATH="/opt/homebrew/opt/python@3.12/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Valida:** `python3 --version` retorna `Python 3.12.x`.

---

### Python < 3.12

**Causa:** versão antiga (3.9, 3.10, 3.11 não atendem requisito da Ads CLI).

**Fix (recomendado, usando uv):**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
uv python install 3.12
```

**Valida:** `uv run python --version` retorna `3.12.x`.

---

## Fase 1 — Install da CLI

### `command not found: meta` depois de instalar

**Causa:** binário foi instalado em `~/.local/bin` (pip --user) ou `~/.cargo/bin` (uv) e o PATH não inclui isso.

**Fix:**
```bash
# Descobrir onde foi instalado
which meta || find ~ -name "meta" -type f 2>/dev/null | head -5

# Adicionar ao PATH (zsh)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Valida:** `which meta` retorna um caminho válido.

---

### `error: externally-managed-environment` no pip

**Causa:** macOS com Python via Homebrew bloqueia pip global (PEP 668).

**Fix:**
```bash
# Trocar pra uv (recomendado)
curl -LsSf https://astral.sh/uv/install.sh | sh
uv tool install meta-ads
```

**Valida:** `meta ads --help` funciona.

---

### Conflito de pacote: outro `meta` instalado

**Sintoma:** `meta --help` mostra ajuda de outro tool (ex: meta-ai, meta-llama).

**Fix:**
```bash
# Identificar o conflito
which -a meta

# Desinstalar conflitante (exemplo)
pip3 uninstall meta meta-ai meta-llama

# Reinstalar via uv (isola)
uv tool install meta-ads
```

**Valida:** `meta ads --help` mostra subcomandos `campaign`, `adset`, `ad`, `insights`.

---

## Fase 2 — App + System User

### "Não vejo opção 'Usuários do sistema' no Business Manager"

**Causa:** usuário está logado em conta pessoal do Facebook, não no Business Manager. OU não é admin do BM.

**Fix:**
1. Confirmar URL: deve ser `business.facebook.com/settings/system-users`
2. Se redirecionar pra `business.facebook.com/overview`, é porque não tem BM associado
3. Criar BM novo em `business.facebook.com/overview` se for o caso
4. Se BM existe mas opção não aparece: pedir ao admin do BM pra elevar permissão

---

### "Gerei o token mas a CLI retorna `Invalid OAuth access token`"

**Causa #1:** Token foi gerado mas escopos faltando.

**Fix:** voltar em business.facebook.com → System User → Gerar novo token → confirmar EXATAMENTE estes escopos:
- `ads_management`
- `ads_read`
- `business_management`
- `pages_read_engagement`
- `read_insights`

**Causa #2:** Token foi de usuário comum, não System User.

**Fix:** Token de System User começa igual a token comum (`EAA...`), mas o caminho de criação é diferente:
- ❌ ERRADO: `developers.facebook.com → App → Tools → Graph API Explorer → Generate Token`
- ✅ CERTO: `business.facebook.com → Configurações → Usuários do sistema → [seu user] → Gerar novo token`

**Valida:** Token de System User tem validade **"Nunca"** quando você gera. Se a opção não apareceu, foi pelo caminho errado.

---

### "Atribuí a conta mas continua dando erro 200 (Permissions)"

**Causa:** Permissão atribuída mas com nível baixo demais.

**Fix:**
1. Ir em System User → Ativos atribuídos → conta de anúncios
2. Confirmar que **TODAS** as caixas estão marcadas em "Gerenciar campanhas" (não só "Visualizar performance")
3. Salvar
4. Pode levar 1-2 min pra propagar

---

## Fase 3 — Guardar o token

### `echo $ACCESS_TOKEN` retorna vazio

**Causa #1:** Não rodou `source ~/.zshrc` depois de editar.

**Fix:**
```bash
source ~/.zshrc
echo "${ACCESS_TOKEN:0:10}..."
```

**Causa #2:** Editou o arquivo errado (`.bashrc` no macOS quando shell é zsh, ou vice-versa).

**Fix:**
```bash
echo $SHELL  # /bin/zsh → ~/.zshrc | /bin/bash → ~/.bashrc
```

**Causa #3:** Você usou prefixo `META_ADS_` (sugestão antiga da skill). A CLI espera `ACCESS_TOKEN`, `AD_ACCOUNT_ID`, `BUSINESS_ID` **sem prefixo**.

**Causa #4:** Linha tem aspas erradas ou espaços.

```bash
# ✅ CERTO
export ACCESS_TOKEN="EAA..."

# ❌ ERRADO (espaço antes/depois do =)
export ACCESS_TOKEN = "EAA..."

# ❌ ERRADO (sem aspas, token tem caractere especial)
export ACCESS_TOKEN=EAA...
```

---

### "Colei o token no chat por engano"

**Plano de contenção:**

1. **Revogar imediatamente:**
   - https://business.facebook.com → Configurações → Usuários do sistema
   - Clicar no seu System User
   - Aba **Tokens** → encontrar o token comprometido → **Revogar**

2. **Gerar novo token** (Fase 2.6 do SKILL.md)

3. **Refazer Fase 3** colocando o novo token só em `~/.zshrc`

4. **Não delete a conversa** — isso não apaga o transcript no histórico do Claude Code. Revogação é a única defesa.

---

## Fase 4 — Validação

### `Error: No such option '--output'.`

**Causa:** `--output json` é flag **global do `meta`**, vai ANTES do subcomando — não depois. Confirmado em teste real com `meta-ads 1.0.1`.

**Fix:**
```bash
# ❌ ERRADO
meta ads campaign list --output json

# ✅ CERTO
meta --output json ads campaign list
```

### `Error: No ad account configured.`

**Causa:** `AD_ACCOUNT_ID` não está exportado ou shell não foi recarregado.

**Fix:**
```bash
source ~/.zshrc
echo "$AD_ACCOUNT_ID"   # deve retornar act_XXXXX

# ou passar inline na chamada:
meta --ad-account-id act_XXXXX --output json ads campaign list
```

### `OAuthException: Invalid OAuth access token - Cannot parse access token`

Token corrompido (espaço, quebra de linha, aspas extras no `~/.zshrc`).

**Fix:**
```bash
# Confirmar formato (deve ser uma única linha, sem quebras)
grep ACCESS_TOKEN ~/.zshrc
```

Reabrir `~/.zshrc`, garantir linha única, salvar, `source`, retestar.

---

### `(#100) Tried accessing nonexisting field`

`AD_ACCOUNT_ID` está sem o prefixo `act_`.

**Fix:**
```bash
# ❌ ERRADO
export AD_ACCOUNT_ID="1234567890"

# ✅ CERTO
export AD_ACCOUNT_ID="act_1234567890"
```

---

### `(#17) User request limit reached`

Rate limit da Marketing API. Cada token tem orçamento horário de chamadas.

**Fix imediato:** esperar 1h.

**Fix de longo prazo:**
```bash
# Usar --limit pra reduzir tamanho das respostas
meta ads campaign list --limit 25 --output json

# Usar --fields pra pegar só o que precisa
meta ads insights get --fields impressions,spend --output json
```

---

### `(#190) Error validating access token: Session has expired`

**Causa:** Token de usuário comum (expira em 60 dias). Não é System User.

**Fix:** Refazer toda Fase 2 como System User. **Não dá pra "renovar" — precisa migrar pra System User.**

---

### `Could not resolve host: graph.facebook.com`

Problema de rede local. Não é da CLI.

**Fix:**
```bash
# Testar conectividade
curl -I https://graph.facebook.com/v19.0/

# Se falhar: VPN, firewall corporativo, DNS, ou Meta com instabilidade
# Checar status: https://metastatus.com
```

---

## Fase 5 — Claude Code

### "Claude Code pede confirmação pra cada `meta ads campaign list`"

**Causa:** Permissão não foi adicionada em `.claude/settings.local.json`.

**Fix:** colar no `.claude/settings.local.json` do projeto:
```json
{
  "permissions": {
    "allow": [
      "Bash(meta --output json ads campaign list:*)",
      "Bash(meta --output json ads adset list:*)",
      "Bash(meta --output json ads ad list:*)",
      "Bash(meta --output json ads creative list:*)",
      "Bash(meta --output json ads insights get:*)",
      "Bash(meta --output json ads adaccount get:*)",
      "Bash(meta ads campaign list:*)",
      "Bash(meta ads insights get:*)",
      "Bash(source ~/.zshrc:*)"
    ]
  }
}
```

Reabrir o Claude Code.

---

### "Claude Code executou um `delete` sem pedir confirmação"

**Causa #1:** Permissão muito ampla. Tem `Bash(meta ads:*)` em vez de allowlist específica.

**Fix:** apertar o escopo no `.claude/settings.local.json` — só read-only no allow. Writes precisam disparar prompt.

**Causa #2:** CLAUDE.md sem regra explícita.

**Fix:** colar o bloco de `references/claude-md-template.md` no CLAUDE.md do projeto.

---

## Checklist final

Antes de fechar a sessão de setup, confirmar:

- [ ] `meta ads --help` funciona
- [ ] `echo "${ACCESS_TOKEN:0:10}..."` mostra prefixo (não vazio)
- [ ] `meta --output json ads campaign list` retorna sem erro (texto `No results.` em conta nova é ok)
- [ ] `meta --output json ads insights get --date-preset last_7d` retorna `{"data":[...]}` ou `{"data":[]}`
- [ ] `meta --output json ads adaccount get` retorna o JSON real da conta
- [ ] `.claude/settings.local.json` tem allowlist de read-only
- [ ] CLAUDE.md tem regras de write/PAUSED/json
- [ ] Token está APENAS em `~/.zshrc`, em nenhum outro lugar (nem .env do projeto, nem CLAUDE.md, nem chat)
