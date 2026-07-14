---
name: meta-ads-cli-setup-turbo
description: >
  Use para conectar, instalar, configurar ou debugar o SETUP INICIAL da
  Meta Ads CLI oficial. Triggers: "conectar meta ads", "configurar ads
  cli", "setup meta ads", "instalar meta ads cli", "token meta ads",
  "autenticação meta ads", "primeira chamada da CLI". Cobre: instalação,
  autenticação segura com token de System User, verificação do ambiente,
  primeira chamada validada, troubleshooting de permissões.
  Pré-requisito da meta-ads-cli-turbo (operação avançada).
---

# Meta Ads CLI · Setup guiado (zero → primeira chamada)

Skill **checkpointed e bilíngue de segurança**: cada fase só avança quando o usuário valida com um comando real. Tudo em português BR, tom direto.

---

## 🛡️ REGRAS INVIOLÁVEIS (ler antes de qualquer fase)

1. **NUNCA peça nem aceite o token no chat.** Se o usuário colar um token (qualquer string começando com `EAA…` ou similar) na conversa:
   - Pare imediatamente.
   - Alerte: "⚠️ Você colou um token no chat. Considere ele comprometido. Vá em https://business.facebook.com/settings/system-users → System User → Revogar token → Gerar novo. Vamos refazer a Fase 3 com o token novo direto no shell, sem passar pelo chat."
   - Não prossiga até confirmar a revogação.

2. **Tudo passa por env vars no shell.** Token, AD_ACCOUNT_ID, BUSINESS_ID — sempre via `~/.zshrc` ou `~/.bashrc`. Nunca em arquivo do projeto, nunca em CLAUDE.md, nunca em código versionado.

3. **Comandos de write são opt-in explícito.** `meta ads campaign create`, `update`, `delete`, `pause`, `resume` — sempre pedir confirmação antes de executar. Recursos novos nascem em `status=PAUSED`.

4. **Sempre `meta --output json ads ...`** quando o Claude Code for parsear a saída. Atenção: `--output` é flag **global do `meta`**, vai ANTES do subcomando (não depois). Validado em teste real 2026-05-26.

5. **Phased, não automatizado.** No fim de cada fase, perguntar: "Posso seguir pra Fase X+1?" Não emende fases.

---

## Disparo da skill

Ao ser ativada, sempre começar com:

```
Skill `meta-ads-cli-setup-turbo` ativa. Vou te guiar do zero até a primeira
chamada funcional da Ads CLI da Meta dentro do Claude Code.

São 6 fases (0 → 5). Em qual você está?

  [0] Pré-requisitos — nada instalado ainda
  [1] Instalar a CLI — Python ok, falta `meta-ads`
  [2] App + System User no Meta — CLI instalada, falta token
  [3] Guardar o token — token criado, falta exportar no shell
  [4] Validar conexão — variáveis exportadas, falta testar
  [5] Integrar com Claude Code — CLI funcionando, falta plugar no projeto

Se não souber, manda "Fase 0" que a gente começa do começo.
Se já tentou e travou em algum erro, manda o erro que eu te encaixo
na fase certa + abro `references/troubleshooting.md`.
```

Aguardar a resposta. Não pular fases.

---

## Fase 0 — Pré-requisitos

**Objetivo:** garantir que a máquina tem o mínimo pra instalar a CLI.

### Passos

1. **Verificar Python 3.12+:**
   ```bash
   python3 --version
   ```
   - Se for < 3.12, instruir: `brew install python@3.12` (macOS) ou `uv python install 3.12`.

2. **Verificar `uv` (preferido) ou `pip`:**
   ```bash
   uv --version || pip3 --version
   ```
   - Se `uv` não existir: `curl -LsSf https://astral.sh/uv/install.sh | sh` (recomendado — mais rápido e isolado).
   - Se nem `uv` nem `pip` rolarem, é problema de instalação do Python. Resolver isso antes.

3. **Confirmar acesso admin ao Meta Business Manager:**
   - Abrir https://business.facebook.com → Configurações → Pessoas
   - Confirmar que o e-mail do usuário aparece com **"Acesso total"** ou role de admin
   - Confirmar que a conta de anúncios que ele quer gerenciar está em **Contas de Anúncios** (não só "compartilhada" — precisa estar dentro do Business Manager dele ou da agência)

### Validação da Fase 0

Usuário deve colar a saída de:
```bash
python3 --version && (uv --version || pip3 --version)
```

E confirmar verbalmente: *"Sou admin do Business Manager X e a conta Y está dentro dele."*

### Checkpoint

> "Fase 0 ok. Posso seguir pra Fase 1 (instalar a CLI)?"

---

## Fase 1 — Instalar a Ads CLI

**Objetivo:** ter `meta ads --help` funcionando no terminal.

### Passos

1. **Instalar via `uv` (preferido — isola a CLI num venv dedicado):**
   ```bash
   uv tool install meta-ads
   ```

   **Fallback** (se `uv` não estiver disponível):
   ```bash
   pip3 install --user meta-ads
   ```

2. **Validar:**
   ```bash
   meta ads --help
   ```

   Deve aparecer a lista de comandos (`campaign`, `adset`, `ad`, `creative`, `insights`, etc.).

### Troubleshooting comum

| Sintoma | Causa provável | Fix |
|---|---|---|
| `command not found: meta` | `~/.local/bin` ou `~/.cargo/bin` não está no PATH | Adicionar `export PATH="$HOME/.local/bin:$PATH"` no `~/.zshrc` |
| `error: externally-managed-environment` | macOS bloqueou pip global | Usar `uv tool install` em vez de pip |
| Conflito com `meta-ai` ou outro pacote `meta` | Pacote homônimo já instalado | `pip3 uninstall meta && uv tool install meta-ads` |

Mais detalhes em `references/troubleshooting.md`.

### Validação da Fase 1

```bash
meta ads --version
meta ads --help | head -20
```

### Checkpoint

> "Fase 1 ok — CLI instalada e respondendo. Posso seguir pra Fase 2 (App + System User no Meta)?"

---

## Fase 2 — Criar App + System User no Meta

**Objetivo:** gerar um **token de System User** com os escopos corretos. Esta é a fase onde mais gente trava — leve o usuário passo a passo, validando cada subpasso.

### ⚠️ Armadilhas críticas

- **NÃO gerar token de usuário comum.** Token de usuário expira em 60 dias. **System User** não expira.
- **NÃO esquecer de atribuir a conta de anúncios ao System User** com permissão de **gerenciar campanhas**.
- **NÃO esquecer de atribuir o App ao System User** — sem isso o token sai sem escopo.
- **NÃO confundir Business Suite com Ads Manager.** Tudo aqui é em https://business.facebook.com (Business Suite), não em https://adsmanager.facebook.com.

### Passo 2.1 — Criar o App

1. Ir em https://developers.facebook.com → **Meus Apps** → **Criar app**
2. Caso de uso: **Other** → Tipo: **Business**
3. Nome do app: livre (ex: `LeoAds_Claude_2026`)
4. Após criar, **anote o `App ID`** (visível no topo do dashboard do app)

**Validação:** o app aparece em https://developers.facebook.com/apps

### Passo 2.2 — Confirmar caso de uso "API de Marketing"

> **Atualização 2026:** A Meta substituiu "Produtos" por "Casos de uso" na UI do developers.facebook.com. Quando você cria um App tipo **Business** (Passo 2.1), o caso de uso **"Criar e gerenciar anúncios com a API de Marketing"** vem **pré-adicionado por padrão**. Você não precisa adicionar nada.

1. Sidebar esquerda → **Casos de uso** (não mais "Produtos")
2. Confirmar que aparece o card **"Criar e gerenciar anúncios com a API de Marketing"** com botão **Personalizar**
3. **Não é necessário clicar em Personalizar** — os escopos do System User Token são definidos no Passo 2.6, não aqui.

**Validação:** card da API de Marketing visível em Casos de uso.

**Bonus:** a URL do app inclui `?business_id=XXXXX` — esse é seu `BUSINESS_ID`. Anota.

### Passo 2.3 — Criar o System User

1. Ir em https://business.facebook.com → **Configurações** (engrenagem no canto)
2. Sidebar esquerda: **Usuários** → **Usuários do sistema** *(NÃO "Pessoas". É "Usuários do sistema".)*
3. **Adicionar** → Nome: ex `claude_code_ads` → Função: **Employee (Funcionário)**
4. Confirmar criação

**Validação:** o System User aparece na lista.

> ⚠️ **Por que Employee e não Admin?** Muitos BMs têm limite de **1 System User Admin** — se o slot já estiver ocupado (BOT WhatsApp, Conversions API, etc.), você vai bater no erro "Esta empresa atingiu o número máximo de usuários administradores do sistema".
>
> **Employee é suficiente pra Ads CLI:** o role do System User só controla o que ele faz NO BM (gerenciar pessoas, configurar negócio). O acesso à conta de anúncios vem da **permissão atribuída** no Passo 2.4 ("Gerenciar campanhas"), e o acesso à API vem dos **escopos do token** no Passo 2.6. Princípio do menor privilégio. Validado em teste real 2026-05-26.

### Passo 2.4 — Atribuir a conta de anúncios ao System User

1. Clicar no System User recém-criado
2. **Adicionar ativos** → **Contas de anúncios** → selecionar a conta → permissão **Gerenciar campanhas** (todas as caixas marcadas)
3. Salvar

**Validação:** dentro do System User, aba "Ativos atribuídos" mostra a conta de anúncios com "Gerenciar campanhas".

### Passo 2.5 — Atribuir o App ao System User

1. Ainda no System User → **Adicionar ativos** → **Apps** → selecionar o app criado em 2.1
2. Permissão: **Desenvolver app** (marcar)
3. Salvar

**Validação:** aba "Ativos atribuídos" mostra também o app.

### Passo 2.6 — Gerar o token

1. Dentro do System User → botão **Gerar novo token**
2. Selecionar o app criado em 2.1
3. **Validade do token: Nunca**
4. **Escopos** — marcar EXATAMENTE estes 4 (use a busca pra achar rápido):
   - `ads_management`
   - `ads_read`
   - `business_management`
   - `pages_read_engagement`

   > ⚠️ **`read_insights` NÃO aparece nessa UI** (e nem é necessário). `read_insights` é pra insights orgânicos de páginas/Instagram — pra **ads insights**, o escopo `ads_read` já cobre tudo (`meta ads insights get`, breakdowns, métricas de campanha/ad set/ad). Validado em teste real 2026-05-26.

5. Gerar
6. **Copiar o token** — ele só aparece UMA VEZ. Se fechar o modal sem copiar, gerar de novo.

### ⚠️ ATENÇÃO MÁXIMA

**O token vai pra Fase 3 direto no shell. NÃO COLE NO CHAT.** Se o usuário tentar colar, ativar o protocolo da regra inviolável #1.

### Coletar também (sem ser segredo):

- **`AD_ACCOUNT_ID`** — em https://business.facebook.com → Configurações → Contas → Contas de anúncios. Formato `act_1234567890`.
- **`BUSINESS_ID`** — em https://business.facebook.com → Configurações → URL do navegador tem `business_id=XXXXX`.

### Checkpoint

> "Fase 2 ok? Você tem em mãos: (a) token na área de transferência ou anotado num gerenciador de senhas, (b) AD_ACCOUNT_ID no formato act_…, (c) BUSINESS_ID? Se sim, vamos pra Fase 3 — guardar o token no shell."

---

## Fase 3 — Guardar o token com segurança

**Objetivo:** exportar as 3 variáveis no shell sem expor o token na conversa.

### ⚠️ Protocolo de segurança

1. **Detectar o shell:**
   ```bash
   echo $SHELL
   ```
   - `/bin/zsh` → arquivo é `~/.zshrc`
   - `/bin/bash` → arquivo é `~/.bashrc` (macOS antigo: `~/.bash_profile`)

2. **Abrir o arquivo no editor do usuário** (não via `cat` — pra evitar exposição em transcript):
   ```bash
   open -e ~/.zshrc   # macOS, abre no TextEdit
   # ou: code ~/.zshrc, nano ~/.zshrc, vim ~/.zshrc
   ```

3. **Adicionar no final do arquivo:**
   ```bash
   # === Meta Ads CLI ===
   export ACCESS_TOKEN="cole_o_token_aqui"
   export AD_ACCOUNT_ID="act_1234567890"
   export BUSINESS_ID="1234567890"
   ```

   > **Por que sem prefixo `META_ADS_`?** A CLI espera exatamente esses nomes (`ACCESS_TOKEN`, `AD_ACCOUNT_ID`, `BUSINESS_ID`) — confirmado vasculhando o pacote `meta-ads 1.0.1` em teste real 2026-05-26. Se você usa outras CLIs que também leem `ACCESS_TOKEN` (Google Cloud, AWS, GitHub), considere usar arquivo `.env` por projeto + `dotenv` em vez de export global.

4. **Recarregar:**
   ```bash
   source ~/.zshrc
   ```

5. **Validar SEM imprimir o token completo:**
   ```bash
   echo "Token prefix: ${ACCESS_TOKEN:0:10}..."
   echo "Token length: ${#ACCESS_TOKEN}"
   echo "Token sufixo: ...${ACCESS_TOKEN: -4}"
   echo "Account: $AD_ACCOUNT_ID"
   echo "Business: $BUSINESS_ID"
   ```

   Saída esperada (formato):
   ```
   Token prefix: EAAxxxxxxx...
   Token length: 200    (típico: 195-220 chars)
   Token sufixo: ...xxxx
   Account: act_XXXXXXXXXX
   Business: XXXXXXXXXXXX
   ```

### Se o usuário colar o token no chat por engano

Disparar imediatamente:

> ⚠️ **Você colou o token na conversa.** O transcript da nossa sessão pode ser armazenado. Considere o token comprometido.
>
> **Plano:**
> 1. Ir em https://business.facebook.com → Usuários do sistema → seu System User → **Revogar token**
> 2. Gerar novo token (Fase 2.6 de novo)
> 3. Voltar pra Fase 3 e colar SÓ no arquivo `~/.zshrc`, nunca aqui.

Não prossiga até o usuário confirmar revogação.

### Checkpoint

> "Fase 3 ok. As 4 linhas de validação imprimiram o prefixo + account + business sem mostrar o token completo? Posso seguir pra Fase 4 (validar conexão)?"

---

## Fase 4 — Validar a conexão

**Objetivo:** primeira chamada read-only funcional. Se isso roda, o setup tá ok.

### Passos

⚠️ **Sintaxe correta:** `--output json` é flag **global do `meta`** (vai ANTES de `ads`). Confundir isso retorna `Error: No such option '--output'.`

1. **Listar campanhas (read-only):**
   ```bash
   meta --output json ads campaign list
   ```

   Esperado: JSON com array de campanhas. Em conta nova, vai retornar `No results.` (texto) — autenticou ok.

2. **Pegar insights dos últimos 7 dias:**
   ```bash
   meta --output json ads insights get \
     --date-preset last_7d \
     --fields impressions,spend,ctr,cpc
   ```

   Esperado: `{"data":[...]}` com métricas agregadas. Conta nova retorna `{"data":[]}` — autenticou ok.

3. **Confirmar identidade da conta (teste com dados reais):**
   ```bash
   meta --output json ads adaccount get
   ```

   Esperado:
   ```json
   [{
     "id": "act_XXXXX",
     "name": "Nome da conta",
     "account_status": 1,
     "currency": "BRL",
     "timezone_name": "America/Sao_Paulo",
     "amount_spent": "0"
   }]
   ```

   `account_status: 1` = ACTIVE. Outros valores: 2=DISABLED, 3=UNSETTLED, 7=PENDING_CLOSURE, 9=IN_GRACE_PERIOD, 100=PENDING_REVIEW.

### Mapa de troubleshooting

| Erro retornado | Causa | Fix |
|---|---|---|
| `Error: No such option '--output'.` | Pôs `--output json` DEPOIS do subcomando | Mover `--output json` pra ANTES: `meta --output json ads campaign list` |
| `Error: No ad account configured.` | `AD_ACCOUNT_ID` não exportado ou shell não recarregado | `source ~/.zshrc` + conferir `echo $AD_ACCOUNT_ID` |
| `OAuthException: Invalid OAuth access token` | Token errado / não exportado / shell não recarregado | `echo ${ACCESS_TOKEN:0:10}` retorna vazio? → `source ~/.zshrc` |
| `(#100) Tried accessing nonexisting field` | `AD_ACCOUNT_ID` sem prefixo `act_` | Editar `~/.zshrc`, adicionar `act_` no início |
| `(#200) Permissions error` | Escopo faltando ou System User sem permissão na conta | Refazer Fase 2.4 (atribuir conta) e Fase 2.6 (escopos) |
| `(#17) User request limit reached` | Rate limit Meta | Esperar 1h ou usar `--limit 25` |
| `(#190) Error validating access token: Session has expired` | Tokens de usuário comum (60d) — não é System User | Refazer Fase 2.3-2.6 como System User |

Detalhes completos em `references/troubleshooting.md`.

### Checkpoint

> "Fase 4 ok? Os dois comandos retornaram JSON sem erro? Posso seguir pra Fase 5 (integrar com Claude Code)?"

---

## Fase 5 — Integrar com o Claude Code

**Objetivo:** plugar a CLI no projeto de forma que o Claude Code consiga usar com segurança, sem blanket-allow no bash.

### Passo 5.1 — Adicionar bloco no CLAUDE.md do projeto

Pegar o template em `references/claude-md-template.md` e colar/mergear no CLAUDE.md do projeto onde o usuário vai trabalhar com Meta Ads.

Resumo do que entra:

- **Lista de comandos `meta ads` que o Claude pode usar sem pedir confirmação** (read-only: `list`, `get`, `insights`)
- **Lista de comandos que SEMPRE pedem confirmação** (write: `create`, `update`, `delete`, `pause`, `resume`)
- **Default PAUSED** para qualquer recurso novo
- **`--output json` obrigatório** quando o Claude precisar parsear
- **Nomenclatura** de campanhas/ad sets/ads (se o projeto já tiver padrão)

### Passo 5.2 — Configurar permissão no Claude Code

No `.claude/settings.local.json` do projeto, sugerir:

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

> **Por que não `Bash(meta ads:*)` ou `Bash(meta:*)`?** Porque isso incluiria `meta ads campaign delete` sem pedir confirmação. Whitelist apenas read-only — list, get, insights.
>
> **Por que duplicar com/sem `--output json`?** O Claude Code casa o comando exato. Listar incluindo a flag global (que é a forma usada pra parsing) E sem flag (formato humano pra exploração) cobre os dois usos sem precisar prompt.

### Passo 5.3 — Primeiro workflow de exemplo

Sugerir um teste prático no projeto:

> "Me gera um relatório markdown dos últimos 7 dias com impressions, spend, ctr, cpc das 5 campanhas com maior gasto."

Esperado: Claude roda `meta ads campaign list --output json` + `meta ads insights get --date-preset last_7d ...`, parseia, gera markdown. Sem erro.

### Checkpoint final

> "Setup completo. Você consegue rodar um relatório read-only via Claude Code agora.
>
> **Próximo passo natural:** quando quiser automação avançada (batelada de 15 criativos, stop-loss horário, escalonamento de vencedores, scripts pro LPSG), use a skill `meta-ads-cli-turbo` — ela assume daqui."

---

## Recursos bundleados (referências internas)

Ler sob demanda quando a fase pedir:

- `references/troubleshooting.md` — catálogo de erros comuns da Marketing API + fix passo a passo
- `references/comandos-cheatsheet.md` — comandos `meta ads` mais usados para análise (read) e operação (write)
- `references/claude-md-template.md` — bloco pronto pra colar no CLAUDE.md do projeto
