---
name: leitura-web-turbo
description: >
  Use esta skill sempre que precisar LER uma página da web de verdade —
  concorrente, landing, página de vendas, checkout, blog, diretório. Triggers:
  "lê essa página", "analisa essa landing", "engenharia reversa de página",
  "estrutura das dobras", "o que o concorrente está oferecendo", "pega os
  preços do site", "extrai os títulos", "raspa esses links", "scraping",
  "a página não abre pelo WebFetch", "página com JS", "deu bloqueio",
  "Cloudflare", "tira um print da página", "compara 5 concorrentes",
  "monitora a página de vendas". Ensina a ESCADA de escalonamento (WebFetch →
  get → fetch → stealthy_fetch) usando o MCP do Scrapling, com seletor CSS pra
  não queimar contexto. FRONTEIRA: vídeo é a skill `watch`; transcrição de
  YouTube é `transcrever-youtube-turbo`; perfil de Instagram é
  `instagram-analise-estrategica-turbo`; anúncio do Meta se busca na Ad Library.
---

# Leitura web — ler página sem queimar contexto

O Claude já lê web com o **WebFetch** nativo. Esta skill entra quando o WebFetch
não basta: página que só monta com JavaScript, site que bloqueia robô, ou quando
você precisa de **muitas páginas** e do controle fino do que volta.

A ferramenta é o **MCP do Scrapling** (instalado pelo squad). O valor desta skill
não é a ferramenta — é **a ordem certa de usar** e **o que não fazer**.

---

## A escada (suba um degrau por vez)

| Degrau | Ferramenta | Quando | Custo |
|---|---|---|---|
| 1 | **WebFetch** (nativo) | Página simples, HTML servido pronto | mais barato |
| 2 | `mcp__scrapling__get` | WebFetch falhou/veio pobre · quer seletor · quer markdown limpo | baixo |
| 3 | `mcp__scrapling__fetch` | Conteúdo só aparece com JS (SPA, preço que carrega depois) | médio (abre navegador) |
| 4 | `mcp__scrapling__stealthy_fetch` | Bloqueio, 403, Cloudflare, "verifique que você é humano" | alto |

**Nunca comece pelo degrau 4.** Além de lento, é força desnecessária: a maioria
das páginas de venda responde no degrau 1 ou 2. Se um degrau resolveu, pare.

Sinais de que você precisa subir:
- veio HTML mas **sem o texto** que você viu no navegador → degrau 3 (é JS)
- veio 403/429, página de desafio, ou conteúdo de "acesso negado" → degrau 4
- veio tudo, mas gigante e cheio de menu → não suba: **use seletor** (abaixo)

---

## As duas travas que decidem o custo

### 1 · Seletor CSS — peça o pedaço, não a página

Sem seletor, uma página de vendas longa vira dezenas de milhares de tokens de
menu, rodapé e script. Com seletor, você traz só o que interessa:

```
css_selector: "h1, h2"              → o esqueleto das dobras
css_selector: "article h2"          → só os títulos do conteúdo
css_selector: "a"                   → os links (mapear o site antes de entrar)
css_selector: ".price, [class*=preco]" → tabela de preços
```

Comece sempre por `h1, h2` pra ver o esqueleto. Só então decida se precisa do
corpo inteiro.

### 2 · `extraction_type` — o formato certo pro trabalho

| Valor | Use quando |
|---|---|
| `markdown` (padrão) | Ler e entender a copy — títulos, listas e links preservados |
| `text` | Minerar/contar/comparar — sem ruído de marcação |
| `html` | Precisa de atributo, estrutura ou tag (ex.: `href`, `data-*`, ordem do DOM) |

---

## Várias páginas

- **Vários sites diferentes** → `bulk_get` / `bulk_fetch` / `bulk_stealthy_fetch`.
  Uma chamada, várias URLs. Não faça 5 chamadas quando 1 resolve.
- **Várias páginas do MESMO site** → `open_session`, use o `session_id` nas
  chamadas, e **`close_session` no fim** (senão fica navegador aberto).
  Vale a pena a partir de ~3 páginas do mesmo domínio.
- **O visual importa** (layout, criativo, prova social na tela) →
  `screenshot`. Para *vídeo*, não é aqui: é a skill `watch`.

---

## Receitas do squad

**Engenharia reversa de página de vendas** (insumo do `@copywriter-turbo` e do
`criador-paginas-low-ticket-turbo`):
1. `get` com `css_selector: "h1, h2"` → esqueleto das dobras
2. Se o esqueleto interessar, `get` de novo em markdown sem seletor → copy inteira
3. Entregue a análise por dobra: promessa · mecanismo · prova · oferta · CTA

**Comparar concorrentes** (insumo do `@pesquisador-mercado-turbo`, vai pra
`02-mercado/`): `bulk_get` com as URLs + `css_selector` do que importa
(headline, preço, garantia). Monte tabela comparativa. **Cite a URL e a data**
de cada dado — relatório de mercado sem fonte não é auditável.

**Conferir a própria página no ar** (depois de deploy): `fetch` e verifique se o
texto aprovado está lá, se o CTA aponta pro checkout certo, se o pixel carregou.

**Mapear um site antes de entrar**: `get` com `css_selector: "a"` na home,
escolha as URLs que valem, e só então busque essas.

---

## Fronteiras — quando NÃO é esta skill

| Situação | Vá para |
|---|---|
| Vídeo (VSL, Reels, anúncio em vídeo) | skill `watch` |
| Só o texto falado de um YouTube | `transcrever-youtube-turbo` |
| Buscar canais/playlists no YouTube | `youtube-full` |
| Perfil/métricas de Instagram | `instagram-analise-estrategica-turbo` |
| Anúncios ativos de um concorrente | **Meta Ad Library** (fonte oficial) — ver `criador-criativos-turbo` |
| Métricas das SUAS campanhas | `meta-ads-cli-turbo` (API oficial) |

**Regra geral: se existe API ou fonte oficial, use a fonte oficial.** Ela é mais
estável, mais completa e não depende de o site não mudar de layout.

---

## Limites (não negociáveis)

- **Respeite `robots.txt` e os termos do site.** Se o site pede pra não raspar
  aquela área, não raspe.
- **Nada de dado pessoal de terceiros** (LGPD): nome, e-mail, telefone, CPF de
  pessoa física não entram em relatório, arquivo ou repo. Depoimento de aluno de
  concorrente: analise a **estrutura** ("3 depoimentos em vídeo, todos com número
  de faturamento"), não copie os nomes.
- **Não passe por login, paywall ou CAPTCHA.** Se a página exige conta, pare e
  avise o usuário.
- **Não faça varredura em massa.** Dezenas de páginas do mesmo site em sequência
  derrubam servidor pequeno e queimam seu IP. Peça só o que vai usar.
- **Nada disso vai pro repo público do squad** — resultado de pesquisa vive em
  `02-mercado/` ou `_private/`, conforme a política do repo.

---

## Quando falha

| Sintoma | O que fazer |
|---|---|
| Ferramentas `mcp__scrapling__*` não existem | Não está instalado. Rode `bash 99-skills-compartilhaveis/instalar-scrapling.sh` e **reinicie a sessão** (MCP carrega no início). Enquanto isso, degrade pro WebFetch. |
| Veio 200 mas conteúdo vazio | É JS: suba pro `fetch`. Se já está no `fetch`, tente `network_idle` ou `wait_selector` com um seletor que só existe depois do carregamento. |
| 403 · desafio · Cloudflare | `stealthy_fetch`. Se ainda falhar, `solve_cloudflare`. Falhou de novo: **pare** e diga ao usuário — não fique tentando. |
| `Executable doesn't exist .../chromium-<build>` | Falta o navegador do patchright: `~/.claude/tools/scrapling/venv/bin/patchright install chromium` |
| Voltou muito conteúdo e estourou o contexto | Você esqueceu o seletor. Refaça com `css_selector`. |

Manual da ferramenta: `~/.claude/tools/scrapling/COMO-USAR.md`.
Conexão e escopos de MCP: `99-skills-compartilhaveis/GUIA-MCPS.md`.
