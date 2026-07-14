---
name: page-optimizer-turbo
description: "Otimiza páginas do Squad Turbo para Core Web Vitals, PageSpeed e GTmetrix. Mede baseline real antes de otimizar, aplica performance budgets, prioriza por impacto em LCP/INP/CLS e fecha com re-medição. Pergunta plataforma de destino antes de iniciar."
allowed-tools: Read Write Edit Bash Glob Grep WebFetch
metadata:
  owner: "Squad Turbo — Turbo Academy"
  version: "1.0"
  created: "2026-04-10"
---

# Page Optimizer Turbo

Otimização de páginas que **mede antes, corrige com base em dados e re-mede no fim**. Zero estimativa, zero chute, zero promessa vazia.

## Filosofia

1. **Medir antes, medir depois.** Estimativa é opinião — Lighthouse/CrUX é fato.
2. **Budget fecha a porta.** Se a página passou do budget (KB, ms), ela não sobe.
3. **Impacto manda a ordem.** Gasta energia onde o gráfico de Web Vitals está vermelho, não numa otimização cosmética.
4. **Plataforma decide o teto.** GHL nunca será HTML puro — conhecer o limite evita promessa vazia.
5. **Anti-IA não quebra performance.** Sem stock genérico, mas hero original tem que caber no budget.

---

## Trigger

Ativar quando:
- Página finalizada pelo `@diretor-criativo-emb` e aprovada pelo dono
- Dono pede: "otimizar página", "melhorar PageSpeed", "GTmetrix", "Core Web Vitals", "responsividade"
- Auditoria de performance em página existente (diagnóstico)

---

## Gate 0 — Plataforma (BLOQUEANTE)

Antes de qualquer leitura de código, perguntar:

```
Onde essa página vai ser publicada?

  1. HTML puro (servidor próprio, Cloudflare Pages, Vercel, Netlify)
  2. GoHighLevel (GHL) / Full Funnel (white-label do GHL)
  3. WordPress (tema + builder: Elementor, Bricks, Breakdance)
  4. GreatPages
  5. Outra — qual?
```

**Sem resposta = não prosseguir.** Cada plataforma tem teto de score e dores próprias.

### Teto realista por plataforma (PageSpeed mobile 2026)

| Plataforma           | Piso | Meta  | Teto |
|----------------------|------|-------|------|
| HTML puro            | 95   | 98    | 100  |
| WordPress + cache    | 82   | 90    | 95   |
| GreatPages           | 78   | 85    | 92   |
| GHL / Full Funnel    | 72   | 80    | 87   |

**Importante:** prometer 95 mobile em GHL é mentir. Expectativa realista = contrato claro com o dono.

Detalhe por plataforma em [references/platforms.md](references/platforms.md).

---

## Fase 1 — Baseline (MEDIR, não chutar)

### 1.1 Rodar Lighthouse local

```bash
# Mobile (throttled, cenário real)
npx lighthouse <URL> \
  --only-categories=performance \
  --emulated-form-factor=mobile \
  --throttling.cpuSlowdownMultiplier=4 \
  --output=json --output-path=./baseline-mobile.json

# Desktop
npx lighthouse <URL> \
  --only-categories=performance \
  --preset=desktop \
  --output=json --output-path=./baseline-desktop.json
```

Extrair do JSON: LCP, INP (ou TBT como proxy em lab), CLS, FCP, TTFB, Speed Index, Total Byte Weight, JS unused bytes, CSS unused bytes.

### 1.2 Checar CrUX (campo real, não lab)

Se a URL já está no ar, consultar dado real dos últimos 28 dias:

```bash
curl -s "https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=$CRUX_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"<URL>","formFactor":"PHONE"}'
```

**CrUX = dado real de usuários.** Se lab e CrUX divergem muito, o problema é 3rd-party script que só aparece em produção (GTM, Pixel, Hotjar).

### 1.3 Ler o HTML

- Catalogar todos os `<link>`, `<script>`, `<style>`, `<img>`, `<iframe>`
- Identificar **LCP candidate** (maior elemento visível no viewport)
- Contar: quantos scripts blocking, quantos async, quantos defer
- Listar domínios externos (candidatos a `preconnect`)
- Identificar frameworks/builders (jQuery? React? GHL template?)

### 1.4 Core Web Vitals — Metas (2026)

| Métrica | Bom | Precisa melhorar | Ruim |
|---------|-----|------------------|------|
| **LCP** | < 2.5s | 2.5-4.0s | > 4.0s |
| **INP** | < 200ms | 200-500ms | > 500ms |
| **CLS** | < 0.1 | 0.1-0.25 | > 0.25 |
| FCP | < 1.8s | 1.8-3.0s | > 3.0s |
| TBT | < 200ms | 200-600ms | > 600ms |
| TTFB | < 800ms | 800-1800ms | > 1800ms |

Debugging profundo em [references/lcp-inp-cls.md](references/lcp-inp-cls.md).

---

## Fase 2 — Budgets (fail-fast)

Performance budget é contrato. Se estoura, **não sobe a página** até corrigir.

| Recurso           | Budget mobile | Budget desktop |
|-------------------|---------------|----------------|
| Total page weight | 1.0 MB        | 1.5 MB         |
| JS (gzipped)      | 100 KB        | 170 KB         |
| CSS (gzipped)     | 50 KB         | 80 KB          |
| LCP image         | 150 KB        | 250 KB         |
| Fontes total      | 100 KB        | 150 KB         |
| Third-party JS    | 80 KB         | 120 KB         |
| DOM nodes         | 1500          | 2000           |

Como setar e automatizar via Lighthouse CI: [references/budgets.md](references/budgets.md).

---

## Fase 3 — Correções por Impacto

**Sempre priorizar a métrica pior no baseline.** Não gasta tempo em CLS quando o LCP é 5s.

### LCP (Largest Contentful Paint)

Meta: < 2.5s mobile. Ver [references/lcp-inp-cls.md](references/lcp-inp-cls.md).

- **LCP image:** `fetchpriority="high"`, SEM `loading="lazy"`, AVIF com fallback WebP
- `<link rel="preload" as="image" imagesrcset="..." imagesizes="...">` no `<head>`
- Servir em dimensão exata do viewport (`srcset` + `sizes` obrigatórios)
- Se LCP é texto: `preload` da fonte do heading
- TTFB > 800ms = problema de host/cache/CDN, não front. Falar com infra.

### CLS (Cumulative Layout Shift)

Meta: < 0.1. Causas principais:

- Imagens sem `width`/`height` explícitos → sempre definir
- Fontes com troca visível → usar `size-adjust`, `ascent-override`, `descent-override` no `@font-face` fallback (detalhe em [references/fonts.md](references/fonts.md))
- Ads e embeds → container com `aspect-ratio` reservado
- Hero com JS manipulation → duplo `requestAnimationFrame` + `content-visibility: auto`

### INP (Interaction to Next Paint)

Meta: < 200ms. **Esta é a métrica que mais pega em 2026** — a maioria dos templates antigos foca em TBT e ignora INP. Ver [references/lcp-inp-cls.md](references/lcp-inp-cls.md).

- Nada de task acima de 50ms no main thread durante interação
- `scheduler.yield()` (Chrome 129+) ou `await new Promise(r => setTimeout(r, 0))` entre blocos pesados
- Event handlers: quebrar em microtasks, nunca work pesado síncrono
- `debounce` em input, `throttle` em scroll
- Trabalho pesado para Web Worker sempre que possível
- Evitar `requestAnimationFrame` dentro de handlers de input

### Scripts de terceiros (o vilão real em 2026)

Ver [references/third-party.md](references/third-party.md).

- **Facade pattern** para YouTube/Vimeo: `lite-youtube-embed` (só carrega iframe no click)
- **Partytown** para GTM, Meta Pixel, TikTok Pixel, Hotjar (roda em Web Worker, tira do main thread)
- **Consent-gated:** tracking só depois de LGPD consent
- Nunca `document.write()`
- `defer` em tudo não-crítico, `async` apenas em analytics isolado

### Fontes

Ver [references/fonts.md](references/fonts.md).

- Self-host woff2 (latin subset) no mesmo domínio do CDN de imagens
- `preconnect` + `preload` no topo apenas das fontes above-the-fold
- `@font-face` com `font-display: swap` + fallback com `size-adjust`
- Variable fonts quando tem 3+ pesos

### Imagens

- Formato: AVIF primário, WebP fallback via `<picture>`
- `width`/`height` explícitos em TODAS
- Below-fold: `loading="lazy"` + `decoding="async"`
- `srcset` + `sizes` para densidade real
- Nunca servir imagem maior que o espaço visual

### CSS limpo

1. Extrair classes definidas em `<style>` e no CSS externo
2. Extrair classes usadas no HTML (e no JS que manipula DOM)
3. Deletar classes mortas (conferir JS antes)
4. Critical CSS inline, non-critical via `media="print" onload="this.media='all'"`
5. Meta: reduzir CSS em 50-80%

### JS eficiente

- `defer` em tudo não-crítico
- `async` apenas em analytics isolado
- Minificar JS inline
- Event listeners mínimos
- Nunca `document.write()`

### HTML semântico

- `<header>`, `<main>`, `<section>`, `<footer>` corretos
- `<h1>` único, hierarquia h1 → h2 → h3
- `alt` descritivo em todas as imagens (não keyword stuffing)
- Meta tags: viewport, description, charset, og:tags
- `lang` attribute no `<html>`

---

## Fase 4 — Plataforma Específica

Aplicar ajustes específicos do teto da plataforma. Detalhe completo em [references/platforms.md](references/platforms.md).

Resumo:
- **GHL/Full Funnel:** sem acesso ao `<head>`, preload via `<link>` no body, prefixar classes, habilitar "Optimize Javascript", GHL Full-Screen Fix para CLS de template
- **WordPress:** WP Rocket ou LiteSpeed Cache obrigatório, ShortPixel/Imagify para WebP, Cloudflare/BunnyCDN, PHP 8.1+
- **GreatPages:** otimizar imagens ANTES do upload, minimizar seções, custom CSS purgado
- **HTML puro:** controle total — critical CSS inline, HTTP/2 push, Brotli, cache headers longos

---

## Fase 5 — Responsividade

### Breakpoints padrão 2026

| Device            | Breakpoint | Teste obrigatório    |
|-------------------|------------|---------------------|
| Mobile small      | 320px      | iPhone SE           |
| Mobile            | 375px      | iPhone 14/15        |
| Mobile large      | 428px      | iPhone 14 Pro Max   |
| Tablet            | 768px      | iPad                |
| Tablet landscape  | 1024px     | iPad landscape      |
| Desktop           | 1280px     | Laptop              |
| Desktop large     | 1440px     | Monitor             |
| Ultra-wide        | 1920px     | Monitor grande      |

### Checklist responsivo

- [ ] Hero legível em 320px sem scroll horizontal
- [ ] Fluid typography via `clamp()`: `clamp(1rem, 2.5vw, 1.25rem)`
- [ ] `max-width: 100%` em todas as imagens
- [ ] CTAs com touch target mínimo 44x44px
- [ ] Formulários full-width no mobile
- [ ] Grid: 1 coluna mobile, 2-3 desktop
- [ ] `max-width: 65ch` em blocos de texto
- [ ] Zero scroll horizontal em qualquer breakpoint

```css
/* Fluid typography */
h1 { font-size: clamp(1.75rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.25rem, 3.5vw, 2.25rem); }
p  { font-size: clamp(0.875rem, 2vw, 1.125rem); }

/* Container responsivo */
.container { width: min(90%, 1200px); margin-inline: auto; }

/* Grid responsivo sem media query */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

---

## Fase 6 — Re-medir + Entrega

### 6.1 Re-rodar Lighthouse (mesmos comandos da Fase 1.1)

### 6.2 Delta obrigatório

| Métrica | Antes | Depois | Meta         | Passou? |
|---------|-------|--------|--------------|---------|
| LCP     | ...   | ...    | < 2.5s       | ✓/✗     |
| INP     | ...   | ...    | < 200ms      | ✓/✗     |
| CLS     | ...   | ...    | < 0.1        | ✓/✗     |
| Score   | ...   | ...    | (teto plat.) | ✓/✗     |

Se alguma métrica não passou, **voltar para Fase 3** com foco nela. Não entregar meia-otimização.

### 6.3 Relatório final (template)

```markdown
## Page Optimizer Turbo — Relatório

**Página:** {nome}
**Plataforma:** {plataforma}
**URL:** {url}
**Data:** {data}

### Baseline vs Pós-otimização

| Métrica | Antes | Depois | Delta | Meta |
|---------|-------|--------|-------|------|
| ...     | ...   | ...    | ...   | ...  |

### O que foi feito (em ordem de impacto)
1. {maior ganho primeiro}
2. ...

### Budgets — status final
- Total weight: X/Y KB ✓
- JS gzipped: X/Y KB ✓
- ...

### O que NÃO pode ser otimizado (limite da plataforma)
- {se for GHL/WP/etc, documentar}

### Próximos passos (opcional)
- {otimizações de servidor, CDN, etc.}
```

Salvar em `projects/{slug}/05-paginas/relatorio-performance.md`.

---

## Checklist de entrega (bloqueante)

### Medição
- [ ] Baseline Lighthouse capturado (mobile + desktop)
- [ ] CrUX consultado (se URL pública e com tráfego)
- [ ] Re-medição pós-otimização capturada
- [ ] Delta > 0 em todas as métricas que estavam no vermelho

### Budgets
- [ ] Total page weight dentro do budget
- [ ] JS/CSS gzipped dentro do budget
- [ ] LCP image dentro do budget
- [ ] Fontes totais dentro do budget
- [ ] Third-party JS dentro do budget

### Core Web Vitals
- [ ] LCP < 2.5s (ou no teto realista da plataforma)
- [ ] CLS < 0.1
- [ ] INP < 200ms (ou TBT < 200ms se só lab)

### Responsividade
- [ ] Sem scroll horizontal em 320, 375, 428, 768, 1024, 1280
- [ ] Touch targets >= 44x44px
- [ ] Fluid type via `clamp()`

### Higiene
- [ ] Imagens com `width`/`height` explícitos
- [ ] LCP image com `fetchpriority="high"`, sem `loading="lazy"`
- [ ] Scripts não-críticos com `defer` ou `async`
- [ ] Fontes com `font-display: swap` + fallback com `size-adjust`
- [ ] Zero `document.write()`
- [ ] HTML semântico + meta tags completas

### Plataforma
- [ ] Otimizações específicas aplicadas
- [ ] Limitações documentadas no relatório
- [ ] Score dentro do teto realista

### Anti-IA (Turbo NON-NEGOTIABLE)
- [ ] Hero é imagem original (não stock genérico)
- [ ] Hero original cabe no budget (comprimido + formato moderno)
- [ ] Fontes do brandbook, sem fallback genérico visível

---

## Integração com o Squad Turbo

- Invocada pelo `@diretor-criativo-emb` após aprovação visual da página pelo dono
- Pergunta plataforma ao dono (regra operacional 6 do CLAUDE.md)
- Nunca otimiza antes do GO do dono na versão visual
- Relatório final vai para `projects/{slug}/05-paginas/relatorio-performance.md`
- Se score não atinge o teto realista, `@diretor-criativo-emb` decide: nova iteração visual ou ajuste de expectativa com o dono

---

*Page Optimizer Turbo v1.0 — Squad Turbo / Turbo Academy*
