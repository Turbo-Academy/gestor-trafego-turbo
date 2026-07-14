# design-tokens-emb

Camada Turbo de design tokens. Tokens base + 3 paletas + preset Tailwind.

## Estrutura

```
design-tokens-emb/
├── SKILL.md              # frontmatter + instruções de uso
├── tokens.css            # primitivos (space/type/radius/shadow/motion/z)
├── tailwind.preset.js    # preset plug-and-play
├── paletas/
│   ├── neutro-pro.css       # SaaS clean (Linear/Vercel)
│   ├── editorial-warm.css   # paper/serif quente
│   └── neon-dark.css        # Demo B (orange + purple, dark)
└── README.md             # este arquivo
```

## Quick start (HTML puro)

```html
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="paletas/neon-dark.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Quick start (Vite + Tailwind)

```bash
# tailwind.config.js
import embPreset from '/path/para/design-tokens-emb/tailwind.preset.js'
export default {
  presets: [embPreset],
  content: ['./src/**/*.{ts,tsx,html}'],
}

# src/main.css
@import '/path/para/design-tokens-emb/tokens.css';
@import '/path/para/design-tokens-emb/paletas/neon-dark.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Trocar paleta em runtime

```html
<html data-theme="dark"> <!-- ou "light" -->
```

```js
document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
```

## Customizar para novo expert

1. Escolha a paleta mais próxima da vibe da marca
2. `cp paletas/neutro-pro.css paletas/expert-x.css`
3. Edite `--brand-50` até `--brand-900` (use [oklch.com](https://oklch.com))
4. Valide contraste em [contrast.tools](https://contrast.tools)
5. Importe `paletas/expert-x.css` no projeto

## Referências usadas

- [Radix Colors](https://www.radix-ui.com/colors) — escala perceptual
- [oklch.com](https://oklch.com) — picker OKLCH
- [Refactoring UI](https://refactoringui.com) — fundamentos
- [Tailwind v4 theme](https://tailwindcss.com/docs/theme) — convenção de tokens
