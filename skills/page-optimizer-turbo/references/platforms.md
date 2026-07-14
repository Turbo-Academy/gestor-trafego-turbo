# Otimização por Plataforma

Cada plataforma tem um teto realista e dores específicas. Otimizar HTML puro e GHL com a mesma mão é perder tempo.

---

## HTML puro (servidor próprio / Cloudflare Pages / Vercel / Netlify)

**Teto realista mobile:** 95-100.

### Vantagens
- Controle total do `<head>`: preload, preconnect, resource hints
- Escolha de compressão (Brotli > gzip)
- HTTP/2 ou HTTP/3 com servidor moderno
- Cache headers longos pra assets imutáveis

### Checklist específico
- [ ] Brotli habilitado no servidor/CDN (Cloudflare já tem por padrão)
- [ ] `Cache-Control: public, max-age=31536000, immutable` em CSS/JS/fontes com hash
- [ ] HTTP/2 server push ou `Early Hints 103` (Cloudflare suporta)
- [ ] Critical CSS inline no `<head>`, non-critical via `media="print" onload`
- [ ] Preload do LCP resource
- [ ] `<link rel="preconnect">` para domínios externos usados above-the-fold
- [ ] Service Worker opcional para bfcache e offline

### Cloudflare Pages específico
- Rocket Loader: **desligar** (quebra mais do que ajuda em 2026)
- Auto Minify: **ligar** para HTML/CSS/JS
- Brotli: **ligar**
- Polish: **ligar** (converte imagens para WebP automaticamente se quiser)
- Mirage: desligar (é do tempo do 3G)

---

## GoHighLevel (GHL) / Full Funnel

**Teto realista mobile:** 72-87. Full Funnel = white-label do GHL, mesmas limitações.

### Limitações estruturais
- Sem acesso ao `<head>` — tudo via Custom Code no body
- GHL injeta: GTM wrapper, tracking scripts, LeadConnector CSS externo
- Template containers causam CLS pela natureza do builder
- TBT mínimo ~250-350ms devido a scripts do próprio GHL
- CSS externo de `leadconnectorhq.com` → TBT desktop alto (normal, ignorar)

### O que funciona no GHL

**Preload no body (funciona mesmo sem acesso ao `<head>`)**
```html
<!-- Custom Code no início da página -->
<link rel="preload" as="image" href="URL_HERO" fetchpriority="high">
<link rel="preconnect" href="https://res.cloudinary.com" crossorigin>
```

**Fontes async sem acesso ao head**
```html
<link
  rel="stylesheet"
  href="URL_FONTE_GOOGLE"
  media="print"
  onload="this.media='all'">
```

**GHL Full-Screen Fix (corrige CLS do template)**
```html
<style>
  body { opacity: 0; }
  body.ready { opacity: 1; transition: opacity 0.15s; }
</style>
<script>
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('ready');
    });
  });
</script>
```

**Prefixar todas as classes CSS** (evitar conflito com GHL classes)
```css
.emb-hero { ... }
.emb-cta  { ... }
/* NÃO: .hero, .cta, .button (GHL já usa) */
```

### Checklist GHL específico
- [ ] Hero image < 200KB em WebP
- [ ] Classes CSS prefixadas (`.emb-*`)
- [ ] Habilitar "Optimize Javascript" nas settings do funil
- [ ] Lazy-load de widgets não-essenciais (forms, calendar embed)
- [ ] Fonte self-hosted via Cloudinary (não Google Fonts)
- [ ] Zero vídeo embed above-the-fold — usar facade
- [ ] GHL Full-Screen Fix aplicado

### O que NÃO tentar no GHL
- Remover scripts do GHL (quebra o funil)
- Atingir score 95+ mobile (limite do builder)
- Mudar a estrutura de containers do template

---

## WordPress

**Teto realista mobile:** 82-95. Depende muito do cache plugin.

### Stack recomendada

**Plugin de cache (escolher 1):**
- **WP Rocket** (pago) — mais fácil, faz quase tudo sozinho
- **LiteSpeed Cache** (grátis) — se o servidor é LiteSpeed, imbatível
- **FlyingPress** (pago) — alternativa ao WP Rocket

**CDN:**
- Cloudflare (grátis + Rocket Loader DESLIGADO)
- BunnyCDN (pago, imagens)

**Imagens:**
- ShortPixel ou Imagify para conversão WebP/AVIF automática
- Lazy load nativo (WP 5.5+) já vem

**Database:**
- WP-Optimize mensal (ou WP Rocket tem built-in)

### Requisitos
- PHP 8.1+ obrigatório
- MySQL 8 ou MariaDB 10.6+
- Host com OPcache habilitado

### Checklist WordPress específico
- [ ] Cache plugin instalado e configurado
- [ ] Page cache: on
- [ ] Minify CSS/JS: on (testar, às vezes quebra)
- [ ] Combine CSS: cuidado (pode piorar com HTTP/2)
- [ ] Lazy load: on (nativo + plugin complementar)
- [ ] WebP conversion: on
- [ ] Database cleanup: schedule mensal
- [ ] Cloudflare: Rocket Loader OFF, Auto Minify ON, Brotli ON
- [ ] Desativar plugins não-usados (cada plugin = +50-200ms)
- [ ] Heartbeat API: limitar via Heartbeat Control
- [ ] Emoji script: desabilitar (não precisa)
- [ ] Embed script: desabilitar se não usa

### Builders — cuidado
- **Elementor** → pesado por padrão. Ativar "Improved CSS Loading", "Improved Asset Loading"
- **Divi** → também pesado. Usar versão 4.10+ com dynamic CSS
- **Bricks** → mais leve, recomendado para novos projetos
- **Breakdance** → alternativa moderna ao Elementor

---

## GreatPages

**Teto realista mobile:** 78-92.

### Limitações
- Builder com menos controle que HTML puro
- Algumas seções geram DOM pesado
- Custom CSS limitado

### Checklist GreatPages específico
- [ ] Otimizar imagens ANTES do upload (Squoosh / TinyPNG / Squoosh CLI)
- [ ] Hero image < 200KB em WebP
- [ ] Minimizar número de seções (cada seção = mais DOM nodes)
- [ ] Evitar widget de vídeo above-the-fold — usar thumbnail + link
- [ ] Custom CSS: remover classes não-usadas
- [ ] Custom JS: mínimo, sempre com `defer`
- [ ] Lazy-load seções abaixo do fold (se a versão suporta)
- [ ] Fonte: usar as do builder, não importar externa

---

## Framer / Webflow (bônus)

**Teto realista mobile:** 85-95.

### Framer
- Performance melhor que a maioria dos builders no-code
- Lazy load automático
- Conversão WebP automática
- **Checklist:** publicar em domínio custom (Vercel edge), desativar animações mobile

### Webflow
- Bom em SEO/performance básico
- Permite `defer` custom
- **Checklist:** habilitar "Minify CSS/JS/HTML", remover Lottie pesado, auditar bibliotecas externas

---

## Regra geral: prometer o realista

Antes de começar a otimizar, **alinhar com o dono** o teto realista da plataforma. Papo direto:

> "Você escolheu GHL. O score máximo que conseguimos em mobile é ~85 com tudo otimizado. Se você precisa de 95+, a gente precisa migrar a página para HTML puro ou WordPress com cache. O que prefere?"

Esse papo evita entregar 82 e ouvir "mas o Google PageSpeed fala 85 é amarelo, quero verde".
