---
name: design-tokens-turbo
description: Camada Turbo de design tokens — paletas prontas (neutro-pro, editorial-warm, neon-dark), preset Tailwind plug-and-play e tokens base (cor OKLCH, espaçamento 4/8pt, escala tipográfica 1.25, radius, shadow, motion). Use SEMPRE que iniciar uma página, componente ou peça visual nova no Squad Turbo para garantir coerência automática. Complementa a skill `design-system` (claudekit) com paletas e presets calibrados para os experts do Squad Turbo.
license: MIT
metadata:
  author: Squad Turbo
  version: "1.0.0"
---

# Design Tokens Turbo

Tokens base + paletas Turbo. Toda peça visual nova começa importando daqui.

## Quando usar

- Iniciar nova landing page, carrossel, slide, brandbook
- Setup de novo projeto Vite/React/Next via `lovable-style-emb`
- Padronizar tokens em página HTML pura (`designer-senior-turbo`)
- Customizar paleta para um expert novo (duplicar uma das 3 base)

## Arquitetura

Três camadas:

```
1. tokens.css         → primitivos (space/type/radius/shadow/motion/z)
2. paletas/*.css      → 3 paletas semânticas (cor + dark mode)
3. tailwind.preset.js → expõe tudo como classes Tailwind
```

## Paletas disponíveis

| Paleta | Vibe | Quando usar |
|---|---|---|
| `neutro-pro` | SaaS clean tipo Linear/Vercel | Produto, dashboard, B2B sério |
| `editorial-warm` | Paper/serif quente | Conteúdo longo, posicionamento autoral, mentor |
| `neon-dark` | Demo B (orange + purple, dark) | Lançamento, alta energia, evento, oferta agressiva |

## Como usar (HTML puro)

```html
<link rel="stylesheet" href="design-tokens-emb/tokens.css">
<link rel="stylesheet" href="design-tokens-emb/paletas/neon-dark.css">
<style>
  body {
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-sans);
    padding: var(--space-6);
  }
  h1 { font-size: var(--text-5xl); letter-spacing: var(--tracking-tight); }
  .card { border-radius: var(--radius-lg); box-shadow: var(--shadow-md); }
</style>
```

## Como usar (Tailwind)

```js
// tailwind.config.js
import embPreset from './design-tokens-emb/tailwind.preset.js'
export default { presets: [embPreset], content: ['./src/**/*.{ts,tsx}'] }
```

Depois: `<div class="bg-bg text-fg p-6 rounded-lg shadow-md">` usa os tokens.

## Customizar para expert novo

1. Duplicar a paleta mais próxima: `cp paletas/neutro-pro.css paletas/expert-x.css`
2. Trocar `--brand-*` (3 stops em OKLCH)
3. Validar contraste WCAG AA (use `oklch.com`)
4. Testar dark mode (toggle `[data-theme="dark"]`)

## Princípios (não negociáveis)

1. **OKLCH > HSL** — uniformidade perceptual de luminosidade
2. **Escala 4/8pt** — todo espaço é múltiplo de 4
3. **Type scale 1.25** — major third, harmônica
4. **Radius coerente** — 4 níveis (sm/md/lg/xl), nada arbitrário
5. **Motion com easing personalizado** — nunca `ease` puro

## Cross-references

- Tokens primitivos detalhados → `design-system` (claudekit)
- Aplicação em React/Vite → `lovable-style-emb`
- Aplicação em HTML puro → `designer-senior-turbo`
- Anti-IA visual → `_shared/anti-ia-blacklist.md`
