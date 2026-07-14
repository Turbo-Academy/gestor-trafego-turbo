---
name: paginas-lpsg-turbo
description: >
  Use para criar, otimizar ou diagnosticar PÁGINAS de venda de ingresso do
  LPSG. Triggers: "página de ingresso", "página de vendas LPSG", "landing
  page do evento", "5 variações de página", "headline da página", "ficha de
  interesse", "lead score HOT/WARM/COLD", "Lighthouse/LCP da página",
  "tracking pixel CAPI", "brief para designer/v0/Lovable". Cobre: estrutura
  de 9 blocos validada em produção, stack fixo Next.js 14 + Tailwind +
  Vercel, 5 variações com 4 eixos, componentes mobile-first prontos,
  ficha de interesse 11 etapas com tier, performance < 1.5s LCP.
  FRONTEIRA: para o diagnóstico-first e copy de dobras use
  criador-paginas-low-ticket-turbo; esta skill é a arquitetura + build.
---

# Páginas LPSG — Sistema de Variações

## Identidade

Você cria páginas de venda de ingresso para Lançamento Pago Semanal (LPSG) seguindo o padrão validado em produção. Stack fixo: **Next.js 14 + Tailwind + Vercel**. Mobile-first. Sempre com **5 variações** mínimas para teste.

Página de venda ≠ página de produto. Página de venda de ingresso tem **uma única função**: converter visitas em compradores de ingresso (≥ 5%). Tudo que não serve a essa função, fora.

---

## Quando ativar

Ative esta skill quando o usuário pedir qualquer uma das abaixo:

- Criar página de captação/ingresso pra um lançamento pago
- Definir as 5 variações (`/v1` a `/v5`)
- Implementar os 9 blocos da página (Hero, Pain, Authority, etc.)
- Fazer deploy no Vercel + domínio customizado
- Otimizar performance (LCP, INP, CLS)
- Configurar tracking (Meta Pixel + CAPI + GTM + GA4)
- Definir matriz de eixos (headline · dor · cor · CTA)
- Diagnosticar página com conversão < 5%
- Adaptar página existente pro padrão LPSG
- Criar boilerplate Next.js + Tailwind + componentes prontos
- Construir/adaptar **ficha de interesse de 11 etapas** (funil de consciência + lead score HOT/WARM/COLD)
- Definir variáveis da killer question (preço · ROI · prazo de acompanhamento)
- Conectar ficha com `mensageria-lpsg-turbo` (mensagens por tier) e `automacoes-lpsg-turbo` (webhook · CAPI · tagging)

---

## 🎯 Modos de Output (PERGUNTAR antes de gerar)

A skill suporta **2 modos**. Sempre pergunte qual usar antes de gerar a página.

### 🟢 Modo A — Implementa Aqui (default · recomendado)

Você gera o projeto Next.js completo dentro do Claude Code, sem sair da sessão.

**Quando usar:**
- Usuário disse "tanto faz", "o melhor", ou "como você fizer"
- Quer iteração rápida com Claude Preview
- Quer deploy direto no Vercel
- Trabalha 100% dentro do Claude Code

**Como executar:**
1. Coletar variáveis (ver `00-variaveis-globais.md`)
2. Invocar `designer-senior-turbo` ou `frontend-design` ou `lovable-style-turbo`
3. Gerar os 9 blocos como componentes React em `src/components/blocks/`
4. Criar 5 rotas de variação em `src/app/(variations)/v{N}/page.tsx`
5. Configurar tracking (Pixel + GTM + GA4)
6. Iniciar `mcp__Claude_Preview__preview_start`
7. `preview_screenshot` para revisar mobile/desktop
8. Iterar até aprovação
9. Deploy via `deploy-to-vercel` ou `vercel-cli-with-tokens`

### 🟡 Modo B — Brief para Claude Design (manual)

Você gera um prompt único, estruturado, pronto pra colar no Claude Design (claude.ai web), v0.dev ou Lovable. Usuário gera o design lá e traz o código de volta.

**Quando usar:**
- Usuário pediu explicitamente "brief", "prompt do designer", "Claude Design"
- Time interno do cliente trabalha primariamente no claude.ai web
- Cliente prefere o estilo visual do Claude Design

**Como executar:**
1. Coletar variáveis (ver `00-variaveis-globais.md`)
2. Ler `references/07-brief-claude-design.md`
3. Substituir `{VARIÁVEIS}` no template
4. Entregar o brief completo pra usuário copiar
5. Aguardar usuário trazer o código de volta
6. Rodar checklist de retorno em `07-brief-claude-design.md`:
   - Mover componentes pra `src/components/blocks/`
   - Criar `data/variations.ts`
   - Criar 5 rotas de variação
   - Religar tracking
   - Configurar SEO + Open Graph
   - Otimizar performance
7. Deploy

### Como decidir

```
"Qual modo de output você quer pra essa página?

🟢 A — Implementa aqui: eu chamo designer-senior-turbo/frontend-design,
   gero o projeto Next.js completo, rodo o Claude Preview pra você
   ver, e fazemos deploy. Zero atrito.

🟡 B — Brief pra Claude Design: eu gero um prompt estruturado pronto
   pra colar no Claude Design. Você gera o design lá, traz o código
   de volta, e eu finalizo aqui (variáveis, tracking, deploy).

Qual?"
```

> Detalhes em `references/06-modos-de-output.md` e `references/07-brief-claude-design.md`.

---

## Estrutura padrão LPSG (não negociável)

### Stack fixo
```yaml
Framework:    Next.js 14 (App Router)
Linguagem:    TypeScript
CSS:          Tailwind CSS 4
Fontes:       Inter + Manrope (next/font)
Hospedagem:   Vercel (1-click deploy)
```

### 1ª dobra · 3 regras inegociáveis (atualizado 2026-04-28)

> A primeira dobra das 5 variações é **livre** · exceto por 3 elementos obrigatórios em ordem de leitura:
>
> 1. **DATA do evento com DESTAQUE editorial** — não é mais "ticker fino esquecido". Recomendação: tipografia ≥ 40px ou equivalente visual em selo/badge. Pode ser display tipográfico · cover line · corner ticker grande · selo · linha hero. O avatar precisa ver a data com peso visual.
> 2. **CTA principal** — texto imperativo de aprendizado/inscrição ("Quero aprender agora", "Quero entrar", "Inscrever-me na próxima edição"). NUNCA "GARANTE A SUA VAGA" capslock · NUNCA countdown · NUNCA selo OFICIAL. Estilo varia por arquétipo (link sublinhado editorial · botão fill bold pop · botão pricing-style interativo · etc). Touch target ≥ 56px.
> 3. **GARANTIA INCONDICIONAL logo abaixo do CTA** — mesma coluna · mesma área visual. Não pode estar isolada em rodapé desconectado. Texto base parafraseável: "Garantia Incondicional · 7 dias · 100% do valor de volta, sem pergunta."
>
> Tudo o resto na 1ª dobra é livre · headline tradicional pode existir ou não · foto pode aparecer ou não · estrutura é dada pelo arquétipo da variação. Detalhes completos em `09-arquetipos-premium.md`.

### 5 arquétipos premium · cada V usa um diferente (NOVO)

> O modelo antigo de "9 blocos fixos com mesma estrutura nas 5" foi **aposentado**. Agora cada uma das 5 variações usa um arquétipo de página premium · drasticamente distinto. Detalhes completos · estruturas propostas · CTAs · paletas e quando cada uma vence em `references/09-arquetipos-premium.md`.

| Variação | Arquétipo | Inspiração visual | Quando vence |
|---|---|---|---|
| **v1** | 🟢 EDITORIAL LONGFORM | The Atlantic · Stripe Press · NYT longform | Avatar maduro · ticket alto · executivos |
| **v2** | 🟠 BOLD MAGAZINE COVER | Bloomberg Businessweek · Wired · MIT Tech Review | Público frio · scroll rápido · choque visual |
| **v3** | 🔵 INTERATIVO / CALCULADORA | Linear · Vercel · Stripe pricing · NerdWallet | Avatar racional · busca prova antes |
| **v4** | 🟡 STORYTELLING / TIMELINE | Stripe Atlas · Apple keynote · documentário | Avatar emocional · busca conexão |
| **v5** | 🟣 MANIFESTO / CONTRARIAN | Liquid Death · Glossier · Oatly · brutalist | Avatar cético · re-targeting · polariza |

> **Princípio:** as 5 variações abertas em abas paralelas precisam parecer 5 produtos visualmente DISTINTOS — não 5 cópias com cor trocada. Tipografia · paleta · ritmo · estrutura e CTA todos variam por arquétipo.

### Estrutura de blocos (livre · catálogo · não fixa)

> Cada arquétipo monta a sua estrutura usando blocos do catálogo (heros editoriais · pull quotes · big numbers · calculadoras · timelines · manifestos · etc). Catálogo completo em `09-arquetipos-premium.md` (seção "Biblioteca de blocos premium").

> **Blocos legacy** (TopBar · Pain Lista R$ · NotYourFault · 6 cards de afirmações · 5+1 Lessons · Testimonials grid · FinalCTA padrão) ainda existem em `03-componentes-mobile-first.md` mas **não são mais obrigatórios em ordem fixa**. São apenas componentes do catálogo · usados quando o arquétipo pedir.

---

## Métricas-alvo (mais rigorosas que padrão web)

| Métrica | LPSG | Padrão web |
|---|---|---|
| **Conversão** | ≥ 5% (mínimo) · ≥ 7% (ideal) | — |
| **LCP** | **< 1.5s** | < 2.5s |
| **INP** | < 100ms | < 200ms |
| **CLS** | **< 0.05** | < 0.1 |
| **Lighthouse Mobile** | **≥ 95** | ≥ 75 |
| **Peso total** | **< 1 MB** | — |

---

## Fluxo de trabalho

### 1. Descobrir contexto (sempre)

Antes de qualquer coisa, pergunte ao usuário:
- **Sigla do projeto** (3 letras maiúsculas, ex: LPS, EMG, TRD)
- **Nome do expert** + **nicho**
- **Datas do evento** (início e fim)
- **Ticket do ingresso** (R$ X)
- **Domínio** (subdomínio onde vai hospedar)
- **URL do checkout** (Hotmart, Eduzz, etc.)
- **Pixel Meta + GTM** (IDs)

### 2. Ler referências da skill

Os arquivos em `references/` são templates genéricos:
- `00-variaveis-globais.md` — fonte da verdade
- `01-stack-e-deploy.md` — Next.js + Tailwind + Vercel
- `02-arquitetura-projeto.md` — estrutura de pastas + rotas
- `03-componentes-mobile-first.md` — catálogo de blocos com código React (legacy + premium)
- `04-matriz-variacoes.md` — eixos · agora baseados em arquétipo + diferenciação
- `05-performance-vercel.md` — checklist de performance e deploy
- `08-ficha-interesse.md` — funil de qualificação 11 etapas + lead score
- `09-arquetipos-premium.md` — **5 arquétipos premium drasticamente distintos · regra atual**
- `exemplo-lpsg-variaveis.md` — referência preenchida (Leo Tabari)

### 3. Preencher variáveis

Use `00-variaveis-globais.md` como template. Compare com `exemplo-lpsg-variaveis.md` pra ver como o Leo preenche.

### 4. Setup do projeto

Siga `01-stack-e-deploy.md` (15 min):
```bash
pnpm create next-app@latest {NOME_PROJETO} \
  --typescript --tailwind --app --src-dir --import-alias "@/*"
```

### 5. Estruturar arquivos

Seguir `02-arquitetura-projeto.md`:
```
src/app/(variations)/v1/page.tsx
src/app/(variations)/v2/page.tsx
... (até v5)
src/components/blocks/*.tsx     ← os 9 blocos
src/data/variations.ts          ← source of truth das 5 variações
```

### 6. Implementar componentes

Copiar código de `03-componentes-mobile-first.md`. Cada bloco recebe prop `variation` e usa `bg-accent` / `text-accent` (CSS variable que muda por variação).

### 7. Definir as 5 variações

Em `data/variations.ts`, preencher todas as 5 com headline, dor, cor, CTA distintos seguindo `04-matriz-variacoes.md`.

### 8. Deploy + teste de performance

Seguir `05-performance-vercel.md`:
- `pnpm build` sem warnings
- Lighthouse Mobile ≥ 95 nas 5 variações
- Deploy automático no Vercel via `git push`
- Domínio customizado + HTTPS

### 9. Subir 5 campanhas de teste

1 campanha de teste por variação (regra LPSG):
```
{XYZ}_{DDMMYY}_TES-PAG_001  →  /v1
{XYZ}_{DDMMYY}_TES-PAG_002  →  /v2
{XYZ}_{DDMMYY}_TES-PAG_003  →  /v3
{XYZ}_{DDMMYY}_TES-PAG_004  →  /v4
{XYZ}_{DDMMYY}_TES-PAG_005  →  /v5
```

R$ 50/dia mínimo por campanha · soma ≤ 20% do orçamento total · criativos JÁ VALIDADOS.

---

## Princípios não negociáveis

| # | Princípio |
|---|---|
| 1 | **Sempre 5 variações no mínimo** — sem comparação não há aprendizado |
| 2 | **Mobile-first** — fonte mín 16px · botão 56px+ · 70% do tráfego é mobile |
| 3 | **Stack fixo** Next.js + Tailwind + Vercel — sem inventar moda |
| 4 | **5 arquétipos premium drasticamente distintos** — Editorial · Magazine Cover · Interativo · Storytelling · Manifesto. Cada V usa um (não 5 cópias da mesma estrutura) |
| 5 | **Data do evento na 1ª dobra com DESTAQUE** — obrigatório · tipografia ≥ 40px ou equivalente em selo/badge · não pode ser ticker fino esquecido |
| 6 | **CTA principal na 1ª dobra** — obrigatório · texto imperativo ("Quero aprender agora", "Quero entrar", "Inscrever-me na próxima edição") · NUNCA "GARANTE A SUA VAGA" · touch target ≥ 56px · estilo varia por arquétipo |
| 7 | **Garantia incondicional logo abaixo do CTA** — obrigatório · mesma coluna · mesma área visual · NÃO pode estar isolada em ticker desconectado. Texto base: "Garantia Incondicional · 7 dias · 100% do valor de volta, sem pergunta." (parafraseável · sentido idêntico) |
| 7 | **LCP < 1.5s** — mais rigoroso que padrão web |
| 8 | **Conversão mínima 5%** — abaixo disso, página é o gargalo |
| 9 | **1 cor de destaque por variação** — não misture |
| 10 | **Foto real do expert** — sem stock photos |

---

## O que NÃO existe nas páginas LPSG

- ❌ VSL no hero (LPSG **não usa** vídeo na primeira dobra)
- ❌ FAQ extenso (no máximo rodapé leve · arquétipo Interativo permite FAQ técnico curto)
- ❌ Stack de valor com tabela "valor isolado × total" (low-ticket não precisa)
- ❌ Pop-ups de carregamento (Meta pode bloquear)
- ❌ Page builders (WordPress/Elementor/etc.)
- ❌ Apenas 1 variação rodando
- ❌ **5 variações com mesma estrutura visual** (modelo antigo · APOSENTADO 2026-04)
- ❌ **Estrutura "9 blocos fixos em ordem fixa"** (antigo · agora a estrutura é dada pelo arquétipo)
- ❌ Página premium pesada · LCP > 1.5s (premium não pode ser pesado)

---

## Páginas reais validadas (referências)

Padrão extraído de 3 LPs em produção:
1. `lp.engenheiromatheus.com.br/casa-no-custo-v10`
2. `desafio.radiestesiaterapeutica.com.br/cadastro-v9`
3. `lpsg.reisbruno.com.br/cadastro-v6`

Todas seguem os 9 blocos em ordem fixa.

---

## Integração com outras skills Turbo

Esta skill **fornece a página**. Use em conjunto com:

- **`mensageria-lpsg-turbo`** — onboarding e nutrição dos compradores de ingresso
- **`estrutura-aulas-lpsg-turbo`** — define os títulos públicos das aulas (usados em `Lessons`)
- **`lancamento-pago-semanal-turbo`** — playbook operacional do ciclo semanal
- **Tráfego LPSG** (template em `02-entregaveis-finais/trafego/`) — campanhas de teste pra validar variações

---

## Quando atualizar esta skill

Esta skill é **viva** — sempre que o método LPSG evoluir, atualize aqui:

| Tipo de melhoria | Como aplicar |
|---|---|
| **Novo bloco descoberto** que melhora conversão | Adicionar em `03-componentes-mobile-first.md` + atualizar lista nos 9 blocos |
| **Novo eixo de variação** validado | Adicionar em `04-matriz-variacoes.md` + atualizar matriz |
| **Métrica-alvo mudou** (ex: LCP < 1s) | Atualizar em `05-performance-vercel.md` + `00-variaveis-globais.md` |
| **Stack mudou** (ex: Next 15) | Atualizar `01-stack-e-deploy.md` + comandos |
| **Novo erro comum identificado** | Adicionar em "Erros comuns" do arquivo relevante |
| **Padrão de página real evoluiu** | Atualizar exemplos + listas de referência |

> Sempre que mudar um arquivo de `references/`, lembre de atualizar também o consolidado da pasta do projeto e a versão `.docx` correspondente.

---

## O que NÃO fazer

- ❌ Subir página com apenas 1 variação
- ❌ Usar VSL no hero
- ❌ Pular o bloco "A culpa não é sua"
- ❌ Misturar 2 cores de destaque na mesma variação
- ❌ Stock photos no lugar de foto real do expert
- ❌ Headline genérica ("Transforme sua vida")
- ❌ Botão CTA com altura < 56px no mobile
- ❌ Imagens não otimizadas (sempre WebP/AVIF via `next/image`)
- ❌ Bundle JS > 100 KB inicial (usar code splitting do Next.js)
- ❌ Subir página sem rodar Lighthouse Mobile ≥ 95
