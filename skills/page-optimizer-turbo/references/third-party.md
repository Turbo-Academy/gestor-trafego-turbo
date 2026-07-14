# Third-Party Scripts — Estratégia Squad Turbo

Scripts de terceiros são o principal assassino de INP em 2026. GTM, Meta Pixel, TikTok Pixel, Hotjar, YouTube embeds, chat widgets — tudo isso ocupa main thread e mata responsividade.

## Princípio

**Consent-gated, facade-first, Partytown quando sobrar.** Tudo que não é essencial para a página funcionar sobe depois.

---

## Passo 1 — Auditoria

Listar todos os scripts externos antes de otimizar:

```bash
# No HTML, extrair tudo
grep -oE '<script[^>]+src="[^"]+"' pagina.html | grep -oE 'src="[^"]+"'
```

Categorizar:

| Categoria       | Exemplos                    | Estratégia |
|-----------------|-----------------------------|-----------|
| Analytics       | GA4, Mixpanel, Amplitude    | Partytown + consent |
| Ads tracking    | Meta Pixel, TikTok Pixel, Google Ads tag | Partytown + consent |
| Chat/support    | Intercom, Tawk, Crisp       | Lazy load on interaction |
| Vídeo embed     | YouTube, Vimeo              | Facade pattern |
| Maps            | Google Maps                 | Facade (imagem) + lazy iframe |
| A/B test        | Optimizely, VWO             | Inline crítico, resto async |
| Heatmap         | Hotjar, Microsoft Clarity   | Partytown |

---

## Passo 2 — Facade Pattern (vídeo, mapa, chat)

Facade = um placeholder leve que só carrega o script real quando o usuário interage.

### YouTube com `lite-youtube-embed`

Ao invés de:
```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
<!-- carrega ~800KB de JS mesmo sem o usuário clicar -->
```

Usar:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.3/src/lite-yt-embed.css">
<script src="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.3/src/lite-yt-embed.js" defer></script>

<lite-youtube videoid="VIDEO_ID" playlabel="Assistir"></lite-youtube>
```

Zero KB de JS do YouTube até o click. ~3KB do wrapper.

### Vimeo com `lite-vimeo-embed`

Mesma ideia. `@slightlyoff/lite-vimeo`.

### Google Maps — facade com imagem estática

Ao invés de embed dinâmico, usar Static Maps API como imagem e só carregar o iframe no click:

```html
<div class="map-facade" data-embed="https://www.google.com/maps/embed?..." role="button" tabindex="0">
  <img src="https://maps.googleapis.com/maps/api/staticmap?center=...&zoom=15&size=600x400&key=..."
       alt="Mapa" width="600" height="400" loading="lazy">
  <button class="play-map">Ver mapa interativo</button>
</div>
<script>
  document.querySelectorAll('.map-facade').forEach(el => {
    el.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = el.dataset.embed;
      iframe.width = '100%';
      iframe.height = '400';
      iframe.loading = 'lazy';
      el.replaceWith(iframe);
    }, { once: true });
  });
</script>
```

### Chat widget — load on intent

```js
// Só carrega Intercom depois de 10s ou quando o usuário scrollar 50%
let loaded = false;
function loadChat() {
  if (loaded) return;
  loaded = true;
  const s = document.createElement('script');
  s.src = 'https://widget.intercom.io/widget/XXXXX';
  s.async = true;
  document.body.appendChild(s);
}

setTimeout(loadChat, 10000);
window.addEventListener('scroll', () => {
  if (window.scrollY > document.body.scrollHeight * 0.5) loadChat();
}, { once: true });
```

---

## Passo 3 — Partytown (GTM, Pixels, Heatmaps)

Partytown move scripts de 3rd party para um Web Worker. O main thread fica livre, INP despenca.

### Setup básico

```html
<!-- Config antes do Partytown -->
<script>
  partytown = {
    forward: ['dataLayer.push', 'gtag', 'fbq', 'ttq.track']
  };
</script>

<!-- Partytown loader -->
<script src="https://cdn.jsdelivr.net/npm/@builder.io/partytown@0.10/lib/partytown.js"></script>

<!-- Scripts de tracking agora com type="text/partytown" -->
<script type="text/partytown" src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXX"></script>
```

Nota: Partytown requer que você copie o runtime para `/partytown/` ou use o CDN. Alguns builders (Astro, Next) têm integração oficial.

### O que Partytown NÃO é bom para

- Scripts que precisam ler DOM sincronamente
- Scripts que reagem a input events imediatamente
- A/B tests que precisam rodar antes do primeiro paint

Para esses, mantém no main thread mas com `defer` agressivo.

---

## Passo 4 — Consent-gated (LGPD)

Tracking só depois de consent explícito. Simples e correto:

```js
// No banner de consent
document.getElementById('consent-accept').addEventListener('click', () => {
  localStorage.setItem('consent', 'granted');
  loadTracking();
});

if (localStorage.getItem('consent') === 'granted') {
  loadTracking();
}

function loadTracking() {
  // GTM, Pixel, etc.
}
```

Benefícios:
- LGPD compliant
- Zero impacto de performance para quem não aceitou
- Dados mais limpos (sem bot/scrape)

---

## Passo 5 — `defer` e `async` (o básico correto)

Para os scripts que sobraram no main thread:

- `async` → baixa em paralelo, executa assim que baixa (pode bloquear parser)
  - Use apenas para analytics standalone
- `defer` → baixa em paralelo, executa depois do HTML parse
  - Use para quase tudo
- Sem atributo → bloqueia parser (evitar sempre)

```html
<!-- Bom -->
<script src="/js/main.js" defer></script>
<script src="https://analytics.example.com/tag.js" async></script>

<!-- Ruim -->
<script src="/js/jquery.js"></script>
<script src="/js/plugin.js"></script>
```

---

## Regra final

**Se um 3rd-party script custa mais de 10 pontos de score, ele precisa justificar existência.** Você consegue rodar o funil sem ele? Dá pra trocar por uma solução mais leve? O dono sabe o custo?

Documentar trade-offs no relatório final.
