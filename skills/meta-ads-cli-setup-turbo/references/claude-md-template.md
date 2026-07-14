# Template · Bloco CLAUDE.md pra projetos com Meta Ads CLI

Copiar o bloco abaixo e colar no `CLAUDE.md` do projeto onde você vai trabalhar com Meta Ads. Editar os campos `{ }` antes de salvar.

---

## Como usar este template

1. Abrir o `CLAUDE.md` do projeto (raiz do repositório)
2. Procurar uma seção chamada `## Meta Ads CLI` — se não existir, criar
3. Colar o bloco abaixo
4. Substituir os placeholders `{ AD_ACCOUNT_ID }`, `{ BUSINESS_ID }`, `{ NOMENCLATURA_PADRAO }` pelos valores do projeto
5. Commitar o `CLAUDE.md` no repositório (sem o token — o token fica APENAS em `~/.zshrc`)

---

## BLOCO PRA COLAR

```markdown
## Meta Ads CLI

Este projeto usa a Ads CLI oficial da Meta (`meta-ads`) pra análise e
operação de campanhas Meta Ads.

### Conta gerenciada
- **Ad Account ID:** { act_1234567890 }
- **Business ID:** { 1234567890 }
- **Nicho:** { nicho do cliente — ex: educação financeira / dropshipping / coach }

### Credenciais
- Token armazenado **apenas** em `~/.zshrc` como `ACCESS_TOKEN`
  (a CLI espera esse nome exato, sem prefixo).
- Também em env: `AD_ACCOUNT_ID` (formato `act_…`) e `BUSINESS_ID`.
- NUNCA versionar token em arquivo do projeto.
- Em caso de leak (token colado em chat, commit, log): revogar
  imediatamente em https://business.facebook.com/settings/system-users
  e gerar novo.

### Sintaxe correta (CRÍTICO)

`--output json` é **flag global do `meta`**, vai ANTES do subcomando:

```bash
# ✅ CERTO
meta --output json ads campaign list
meta --output json ads insights get --date-preset last_7d

# ❌ ERRADO (retorna "Error: No such option '--output'.")
meta ads campaign list --output json
```

### Regras pra Claude Code operar Meta Ads

**Read-only (executa sem confirmação):**
- `meta --output json ads campaign list`
- `meta --output json ads adset list`
- `meta --output json ads ad list`
- `meta --output json ads creative list`
- `meta --output json ads insights get`
- `meta --output json ads adaccount get`

**Write (SEMPRE pede confirmação antes — mostrar comando exato + impacto):**
- `meta ads campaign create | update | delete`
- `meta ads adset create | update | delete`
- `meta ads ad create | update | delete`
- `meta ads creative create | delete`

**Default obrigatórios:**
- Todo recurso novo nasce em `--status PAUSED`. Ativação é etapa separada
  com confirmação humana explícita.
- Toda saída pra parsing usa `meta --output json ads ...`. Saída pra
  display humano usa `meta ads ...` (sem `--output`, formato texto).
- Toda chamada de `insights get` usa `--fields` restrito (só os campos
  necessários) pra economizar rate limit.
- Comandos de delete pedem CONFIRMAÇÃO DUPLA (mostrar o ID + nome do
  recurso e perguntar de novo).

### Nomenclatura de criativos / campanhas

Padrão do projeto: `{ NOMENCLATURA_PADRAO }`

Exemplo LPSG: `{SIGLA}_{DDMMYY}_{TIPO}_{NUMERO}`
- `SIGLA` — abreviação do projeto (3-5 chars maiúsculo)
- `DDMMYY` — data de subida
- `TIPO` — EST (estático) / CAR (carrossel) / VID (vídeo) / TST (teste página)
- `NUMERO` — sequencial 01, 02, 03...

Exemplo: `LPSG_260526_EST_001`

### Workflows comuns deste projeto

1. **Relatório diário** — `meta --output json ads insights get
   --date-preset yesterday --fields spend,impressions,ctr,cpc` → markdown
2. **Audit de frequência** — listar ad sets com `frequency > 3`
3. **Stop-loss manual** — listar ad sets com `ctr < { THRESHOLD }`
   E `spend > { MIN_SPEND }` → propor pausar (com confirmação)
4. **Tendência semanal** — comparar `last_7d` vs período custom anterior

### Quando escalar pra automação

Pra batelada de criativos, stop-loss automatizado, escalonamento de
vencedores, relatório agendado — usar a skill **`meta-ads-cli-turbo`**.

### Documentação de referência

- Cheatsheet de comandos: `~/.claude/skills/meta-ads-cli-setup-turbo/references/comandos-cheatsheet.md`
- Troubleshooting: `~/.claude/skills/meta-ads-cli-setup-turbo/references/troubleshooting.md`
- Setup do zero: skill `meta-ads-cli-setup-turbo`
- Automação avançada: skill `meta-ads-cli-turbo`
```

---

## Permissão recomendada no `.claude/settings.local.json`

No mesmo projeto, criar/editar `.claude/settings.local.json`:

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

**Não** adicionar `Bash(meta:*)`, `Bash(meta ads:*)` ou `Bash(meta ads campaign:*)` —
isso liberaria `delete` sem prompt.

**Por que duplicar com/sem `--output json`?** O Claude Code casa comando
exato. Manter ambas versões (a com flag global pra parsing, a sem pra
exploração) evita prompts desnecessários sem afrouxar segurança.

---

## Checklist após colar o template

- [ ] Substituí `{ AD_ACCOUNT_ID }` pelo valor real (formato `act_…`)
- [ ] Substituí `{ BUSINESS_ID }` pelo valor real
- [ ] Substituí `{ NOMENCLATURA_PADRAO }` pelo padrão do projeto
- [ ] Substituí `{ THRESHOLD }` e `{ MIN_SPEND }` pelos critérios do projeto
- [ ] Conferi que o token **não está** em nenhum lugar do `CLAUDE.md`
- [ ] Criei/atualizei `.claude/settings.local.json` com a allowlist
- [ ] Testei um comando read-only no Claude Code sem prompt de permissão
- [ ] Testei um comando write — ele PEDIU confirmação (esperado)
