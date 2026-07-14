# LCP, INP e CLS — Debugging Profundo

As três métricas do Core Web Vitals. Cada uma tem ferramentas e técnicas distintas. Esta é a seção prática.

---

## LCP — Largest Contentful Paint

Tempo até o maior elemento visível do viewport aparecer. Meta: **< 2.5s mobile**.

### Como identificar o LCP element

No DevTools:
1. Abrir **Performance** tab
2. Gravar page load
3. Ver a linha **Web Vitals** no timeline
4. Clicar em "LCP" — o DevTools destaca o elemento

Ou via JS no console:
```js
new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lcp = entries[entries.length - 1];
  console.log("LCP element:", lcp.element);
  console.log("LCP size:", lcp.size);
  console.log("LCP render time:", lcp.renderTime);
}).observe({ type: "largest-contentful-paint", buffered: true });
```

### Os 4 subcomponentes do LCP

O LCP é a soma de 4 fases. Saber qual está alta define a correção:

| Fase | O que mede | Fix típico |
|------|-----------|-----------|
| **TTFB** | Tempo do servidor | CDN, cache, host melhor |
| **Resource load delay** | Tempo entre navigation start e início do download do LCP | `preload`, `fetchpriority="high"` |
| **Resource load duration** | Tempo de download | Reduzir tamanho, comprimir, formato moderno |
| **Element render delay** | Tempo entre download completo e paint | Reduzir main thread work, remover render-blocking |

### Checklist LCP (imagem)

```html
<!-- Preload no head (primeira coisa) -->
<link
  rel="preload"
  as="image"
  href="/hero-800.avif"
  imagesrcset="/hero-480.avif 480w, /hero-800.avif 800w, /hero-1200.avif 1200w"
  imagesizes="(max-width: 768px) 100vw, 800px"
  fetchpriority="high"
  type="image/avif">

<!-- Tag no HTML -->
<picture>
  <source
    type="image/avif"
    srcset="/hero-480.avif 480w, /hero-800.avif 800w, /hero-1200.avif 1200w"
    sizes="(max-width: 768px) 100vw, 800px">
  <source
    type="image/webp"
    srcset="/hero-480.webp 480w, /hero-800.webp 800w, /hero-1200.webp 1200w"
    sizes="(max-width: 768px) 100vw, 800px">
  <img
    src="/hero-800.jpg"
    alt="{descritivo real}"
    width="800"
    height="600"
    fetchpriority="high"
    decoding="async">
</picture>
```

### Checklist LCP (texto)

Se o LCP é um `<h1>`:
- `preload` da fonte do heading
- Fonte com `font-display: swap`
- Fallback com `size-adjust` pra render instantâneo
- Sem JS que bloqueia a renderização do header

### Armadilhas comuns

- **LCP image com `loading="lazy"`** → nunca. Lazy só abaixo do fold
- **LCP image servida via `background-image` CSS** → o navegador só descobre depois de parsear CSS, atrasa
- **Preload sem `fetchpriority`** → no Chrome moderno, preload tem prioridade baixa por padrão

---

## CLS — Cumulative Layout Shift

Soma de shifts visuais durante a vida da página. Meta: **< 0.1**.

### Como identificar o elemento que shifta

```js
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      console.log("Shift:", entry.value, entry.sources);
    }
  }
}).observe({ type: "layout-shift", buffered: true });
```

`entry.sources` aponta o node que causou o shift.

### As 5 causas que cobrem 95% dos casos

1. **Imagem sem `width`/`height`** → aspect-ratio auto resolve
   ```html
   <img src="..." width="800" height="600" alt="...">
   ```
   Com width e height, o browser reserva o espaço antes do download.

2. **Fonte com troca visível** → usar `size-adjust` no fallback. Ver `fonts.md`.

3. **Ad/embed sem container** → reservar espaço:
   ```css
   .ad-slot { aspect-ratio: 16 / 9; min-height: 280px; }
   .youtube-embed { aspect-ratio: 16 / 9; width: 100%; }
   ```

4. **Conteúdo que aparece depois (banner, cookie notice)** → usar `position: fixed` ou `transform` (não reflow)

5. **JS que manipula DOM above-the-fold** → usar duplo `requestAnimationFrame` para deixar o browser pintar primeiro:
   ```js
   requestAnimationFrame(() => {
     requestAnimationFrame(() => {
       // manipulação aqui
     });
   });
   ```

### `content-visibility: auto`

Para sections abaixo do fold:
```css
.section {
  content-visibility: auto;
  contain-intrinsic-size: 1px 500px;
}
```

`contain-intrinsic-size` reserva espaço estimado, evitando shift quando entra no viewport.

---

## INP — Interaction to Next Paint

Tempo entre uma interação do usuário (click, tap, key) e o próximo paint. Meta: **< 200ms**.

INP substituiu FID em março de 2024. É a métrica mais cruel porque mede **a pior interação**, não a primeira.

### Como identificar interações ruins

```js
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 200) {
      console.log("Slow interaction:", entry.name, entry.duration, "ms");
      console.log("Target:", entry.target);
    }
  }
}).observe({ type: "event", durationThreshold: 200, buffered: true });
```

### Os 3 componentes do INP

| Fase | O que acontece |
|------|----------------|
| **Input delay** | Tempo entre o input e o handler começar (main thread ocupado) |
| **Processing time** | Tempo do seu handler executar |
| **Presentation delay** | Tempo entre handler terminar e próximo paint |

### Fix para input delay alto

Causa: main thread ocupado com **long tasks** (>50ms). Soluções:

- **Quebrar trabalho pesado com `scheduler.yield()`** (Chrome 129+):
  ```js
  async function processItems(items) {
    for (const item of items) {
      process(item);
      if ('scheduler' in window && 'yield' in scheduler) {
        await scheduler.yield();
      } else {
        await new Promise(r => setTimeout(r, 0));
      }
    }
  }
  ```

- **Mover tudo que pode para `requestIdleCallback`**
- **Web Worker** para parsing, hashing, filtering de listas grandes
- **Remover polyfills desnecessários** (browsers modernos não precisam)

### Fix para processing time alto

- Não faça layout thrashing: leia todas as medidas primeiro, depois escreva
- Evite `getBoundingClientRect` em loop
- Debounce input handlers com 16ms mínimo
- Throttle scroll handlers com `requestAnimationFrame`

### Fix para presentation delay alto

- Minimize trabalho de CSS (seletor complexo, filtro pesado)
- `will-change` só onde realmente anima
- Limitar `box-shadow` e `filter: blur` no mobile
- Promover elementos animados para camada GPU com `transform: translateZ(0)` (use com parcimônia)

### O assassino silencioso: 3rd-party scripts

GTM, Meta Pixel, TikTok Pixel, Hotjar — cada um injeta event listeners que aumentam INP. Solução: **Partytown** (ver `third-party.md`).

---

## Debugging em produção (RUM)

Instalar `web-vitals` library:
```html
<script type="module">
  import { onLCP, onINP, onCLS } from 'https://unpkg.com/web-vitals@4?module';
  onLCP(console.log);
  onINP(console.log);
  onCLS(console.log);
</script>
```

Enviar para analytics próprio ou GA4 para ver CrUX real da sua base. Lab nunca conta a história toda.
