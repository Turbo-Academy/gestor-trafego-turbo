# 01 · Instalação e autenticação Meta Ads CLI

## Pré-requisitos

```yaml
PYTHON:                  "3.12+ obrigatório (Marketing API SDK underlying)"
PIP:                     "23+ (recomendado · pip mais recente)"
SO:                      "macOS · Linux · Windows (WSL recomendado)"
NODE:                    "Não exigido pela CLI · só se for combinar com n8n"
```

### Verificar Python

```bash
python --version
# → Python 3.12.x ✓
# Se < 3.12, instalar via pyenv ou uv:
brew install pyenv
pyenv install 3.12.0
pyenv global 3.12.0
```

---

## Install

```bash
# macOS / Linux
pip install meta-ads-cli

# Confirmar
meta ads --version
# → Meta Ads CLI v1.x.x

# Atualizar (sempre que sair release)
pip install --upgrade meta-ads-cli
```

### Install em ambiente isolado (recomendado pra produção)

```bash
# Via uv (mais rápido)
uv tool install meta-ads-cli

# Via pipx (isolamento por app)
pipx install meta-ads-cli
```

---

## Autenticação · System User Token (RECOMENDADO)

CLI exige **System User Token** com permissões `ads_management`, `ads_read`, `business_management`. NÃO use OAuth pessoal · expira em 60 dias.

### Como gerar System User Token

```
1. Meta Business Manager → Configurações → Usuários → Usuários do sistema
2. Adicionar (ou usar existente)
3. Nome: "Squad Turbo CLI" · Função: Admin
4. Atribuir Ativos:
   - Conta de anúncios (acesso total)
   - Catálogo de produtos (se usar)
   - Pixels
5. Gerar token:
   - Selecionar System User → Gerar novo token
   - Apps: Selecionar app do projeto (criar se não tem)
   - Permissões: ads_management, ads_read, business_management,
     pages_read_engagement, leads_retrieval (se ficha de interesse)
   - Token expira: NEVER (System User Token não expira)
6. Copiar imediatamente · não dá pra ver depois
```

### Armazenar token (NUNCA commitar)

#### Opção A · Arquivo `.env` em `_private/`

```bash
# _private/.env (gitignored automaticamente)
META_ACCESS_TOKEN="EAAB...REAL_TOKEN..."
META_AD_ACCOUNT_ID="act_2222222222"
META_BUSINESS_ID="111111111111111"   # opcional
META_PIXEL_ID="3333333333333333"
```

Carregar em sessão:
```bash
set -a
source _private/.env
set +a
```

#### Opção B · 1Password CLI (recomendado pra time)

```bash
# Setup
brew install --cask 1password-cli
op signin

# Storage
op item create --category=password \
  --title="Meta System User Token" \
  --vault=Squad-Turbo \
  password="EAAB..."

# Usage no script
export META_ACCESS_TOKEN=$(op read "op://Squad-Turbo/Meta System User Token/password")
```

#### Opção C · macOS Keychain

```bash
# Storage
security add-generic-password -a "$USER" -s "meta-cli" -w "EAAB..."

# Usage
export META_ACCESS_TOKEN=$(security find-generic-password -a "$USER" -s "meta-cli" -w)
```

---

## Configuração inicial CLI

```bash
# Setup interativo (cria ~/.config/meta-ads-cli/config.yaml)
meta ads config init

# OU manualmente
mkdir -p ~/.config/meta-ads-cli
cat > ~/.config/meta-ads-cli/config.yaml <<EOF
default_account_id: \${META_AD_ACCOUNT_ID}
default_output: table
api_version: v22.0
EOF
```

### Validação

```bash
# 1. Auth ok?
meta ads account info
# → conta · ID · saldo · moeda

# 2. Pode ler campanhas?
meta ads campaign list --limit 3 --output json | jq '.[].name'

# 3. Pode escrever? (tente criar uma campaign de teste em PAUSED)
meta ads campaign create \
  --name "TESTE_CLI_$(date +%Y%m%d)" \
  --objective OUTCOME_AWARENESS \
  --status PAUSED \
  --output json | jq '.id'

# 4. Limpar teste
meta ads campaign delete --id <id-do-teste-acima> --force
```

---

## Multi-conta (multi-cliente Squad Turbo)

```bash
# Por projeto · ENV var diferente
# _private/.env.lpsg-leo
META_ACCESS_TOKEN="EAAB...token-do-Leo..."
META_AD_ACCOUNT_ID="act_111..."

# _private/.env.lpsg-marina (cliente fictício)
META_ACCESS_TOKEN="EAAB...token-da-Marina..."
META_AD_ACCOUNT_ID="act_222..."

# Switch antes de operar
source _private/.env.lpsg-marina
meta ads account info
# → confirma conta da Marina · pronto pra operar
```

> Squad Turbo opera múltiplos clientes · sempre confirme `meta ads account info` antes de qualquer comando que modifica.

---

## Troubleshooting auth

| Erro | Causa | Fix |
|---|---|---|
| `exit code 3 · Authentication failed` | Token expirou OU permissão insuficiente | Regerar System User Token com escopo correto |
| `Invalid OAuth access token` | Token de OAuth pessoal (expirou) | Migrar pra System User Token |
| `User does not have permission for ad account` | System User não tem acesso à conta | Business Manager → Atribuir Ativos → Conta de anúncios |
| `Application request limit reached` | Rate limit (200 chamadas/h por user) | Aguardar 1h · ou usar token de Business Manager (limite maior) |
| `Token does not have business_management` | Falta permissão no token | Regerar com escopo completo |

---

## Segurança · checklist

- [ ] Token em ENV var · NUNCA hardcoded em script
- [ ] `.env` no `.gitignore` (já está em LPSG 4.0)
- [ ] Token rotacionado a cada 90 dias (mesmo sendo NEVER expire · best practice)
- [ ] Logs nunca contêm o token (sed mascara antes de salvar)
- [ ] System User com **escopo mínimo** (não dar `pages_manage_metadata` se não precisa)
- [ ] Token diferente por ambiente (dev/staging/prod)
- [ ] Script de revogação documentado: `Business Manager → Configurações → Usuários do sistema → Tokens → Revogar`
