# Fontes — Estratégia Squad Turbo

Fonte é a causa #1 de CLS em página de venda. E custa pontos de LCP quando é texto. Este documento elimina as duas dores.

## Princípio

**Self-host + size-adjust + preload seletivo.** Nada de Google Fonts via `<link>` direto em produção séria.

---

## Passo 1 — Self-hosting

### Por que

- Elimina RTT extra para `fonts.googleapis.com` e `fonts.gstatic.com`
- Permite cache headers longos (1 ano)
- Permite subset manual (latin = ~20KB por peso vs 45KB original)
- Permite servir do mesmo CDN das imagens (conexão já aquecida)

### Como

1. Baixar a fonte do Google Fonts ou do foundry original
2. Converter para woff2 e fazer subset latin:
   ```bash
   pip install fonttools brotli
   pyftsubset input.ttf \
     --output-file=output.woff2 \
     --flavor=woff2 \
     --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
   ```
3. Hospedar no mesmo domínio (ou subdomínio de CDN) das imagens
4. Definir cache: `Cache-Control: public, max-age=31536000, immutable`

---

## Passo 2 — `@font-face` com fallback inteligente (zero CLS)

O truque que o MSE não documenta: usar `size-adjust` no fallback para que o texto renderizado com a fonte de sistema ocupe **exatamente** o mesmo espaço da custom font. Quando a custom carrega, não tem shift.

```css
/* Custom font */
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter-400.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Fallback com metric override */
@font-face {
  font-family: "Inter Fallback";
  src: local("Arial");
  ascent-override: 90%;
  descent-override: 22.43%;
  line-gap-override: 0%;
  size-adjust: 107.4%;
}

body {
  font-family: "Inter", "Inter Fallback", system-ui, sans-serif;
}
```

Como gerar os valores de override: https://screenspan.net/fallback ou a ferramenta `fontaine` (Vite plugin).

---

## Passo 3 — Preload seletivo

**Só faz preload da fonte que aparece above-the-fold.** Preload de tudo = pior que nenhum preload (compete com LCP image).

```html
<link
  rel="preload"
  as="font"
  type="font/woff2"
  href="/fonts/inter-700.woff2"
  crossorigin>
```

Regras:
- `crossorigin` é obrigatório mesmo em same-origin (spec do CSS Fonts)
- Uma preload por peso/família, no máximo 2-3 total
- Se a fonte é do heading H1 (LCP text), essa é a prioridade

---

## Passo 4 — Variable fonts (quando tem 3+ pesos)

Se você usa 3+ pesos da mesma família, variable font paga o custo:

```css
@font-face {
  font-family: "Inter var";
  src: url("/fonts/inter-var.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

Um arquivo de ~80KB cobre 9 pesos. Se você só precisa de 2 pesos, **não vale** — estáticos subsetados são menores.

---

## Passo 5 — Se precisa mesmo usar Google Fonts (último recurso)

Nunca `@import url(...)` dentro de `<style>`. Usar o truque async:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  media="print"
  onload="this.media='all'">
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">
</noscript>
```

Isso remove o render-blocking do CSS de fontes. Mas ainda assim é pior que self-host.

---

## O que NÃO fazer

- `@import` em `<style>` (bloqueia render)
- Preload cross-origin sem `crossorigin` (baixa duas vezes)
- Preload de fonte que não aparece no viewport inicial
- `font-display: block` (invisible text = pior UX e pior LCP de texto)
- Incluir 6 pesos quando usa só 2
- Hospedar no `static/assets/fonts/` sem cache header
