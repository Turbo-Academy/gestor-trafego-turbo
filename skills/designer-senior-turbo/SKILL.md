---
name: designer-senior-turbo
description: "Senior designer intelligence for creating front-end pages, visual identities, and design systems. Use this skill whenever the user wants to: create a landing page, sales page, website, dashboard, portfolio, or any web page; define a visual identity or brand style; choose colors, fonts, or design direction; build a page from copy; review or improve the visual quality of a page; create a design system or style guide; make any UI/UX decision for web. Also trigger when: the user mentions 'página', 'landing', 'site', 'visual', 'identidade visual', 'paleta de cores', 'tipografia', 'design system', 'estilo da marca', 'premium', 'layout', 'front-end', 'HTML', 'React', 'JSX', 'componente visual', 'dark mode', 'glassmorphism', 'minimalist', 'brutalismo', 'página bonita', 'design profissional', 'UI', 'UX', 'responsivo', or asks to transform copy into a page. Even if the user doesn't explicitly say 'design', if their request will change how something looks, feels, or is interacted with on the web — use this skill."
---

# Designer Senior — Inteligência de Design para Front-End

Você entrega páginas web que parecem feitas por um estúdio de design, não por IA. A diferença está nas decisões visuais: tipografia marcante, paleta com personalidade, backgrounds com atmosfera, animações com propósito, e pelo menos um elemento visual que surpreende.

---

## BLACKLIST — Código que NUNCA deve aparecer no output

Se qualquer item abaixo aparecer no seu código, o resultado está errado. Reescreva.

### Fontes banidas
```
PROIBIDO em qualquer lugar do CSS/HTML:
- font-family: -apple-system  (system font stack)
- font-family: system-ui
- Inter
- Roboto
- Open Sans
- Lato
- Arial
- Helvetica
- 'Segoe UI'
- sans-serif (sozinho, como fallback principal)
```

Toda página DEVE carregar Google Fonts com `<link>` no `<head>`. Sem exceção.

### Padrões visuais banidos
```
PROIBIDO:
- linear-gradient(135deg, #667eea, #764ba2)  ← gradiente roxo genérico de IA
- Qualquer gradiente roxo/azul em fundo branco como hero
- background: #ffffff ou background: white como fundo principal sem textura
- Paleta inteira em tons de cinza sem cor de acento
- Cards brancos com shadow genérica em fundo cinza claro
- Botões vermelhos genéricos (#ff6b6b, #e74c3c, #ff0000)
- Border-radius uniforme em tudo (8px em tudo = genérico)
- Ícones emoji como elementos estruturais (🚀 ✨ 💡)
```

### Estruturas banidas
```
PROIBIDO:
- CSS sem variáveis no :root (hardcoded hex em componentes)
- HTML sem Google Fonts <link> no <head>
- Body sem font-family apontando para variável custom
- Seções sem padding vertical generoso (min 80px desktop, 48px mobile)
- Hero sem background com atmosfera (gradiente, textura, ou padrão)
- Página inteira centralizada sem nenhum momento de assimetria
```

---

## MANDATORY STARTER — Todo HTML começa assim

Antes de escrever qualquer conteúdo, o arquivo HTML DEVE começar com esta estrutura. Escolha as fontes e cores da `references/identity-system.md`, mas a estrutura é obrigatória:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Título]</title>

  <!-- OBRIGATÓRIO: Google Fonts com fontes marcantes -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=[DISPLAY_FONT]:wght@300;700;900&family=[BODY_FONT]:wght@300;400;500;700&display=swap" rel="stylesheet">

  <style>
    /* ══════════ DESIGN SYSTEM ══════════ */
    :root {
      /* Colors — ESCOLHA DA references/identity-system.md */
      --color-primary: ;
      --color-primary-hover: ;
      --color-secondary: ;
      --color-accent: ;
      --color-bg: ;
      --color-bg-alt: ;
      --color-text: ;
      --color-text-muted: ;
      --color-border: ;

      /* Typography — FONTES DO GOOGLE FONTS ACIMA */
      --font-display: '[Display Font]', serif;
      --font-body: '[Body Font]', sans-serif;

      /* Scale */
      --text-sm: 0.875rem;
      --text-base: 1rem;
      --text-lg: 1.125rem;
      --text-xl: 1.25rem;
      --text-2xl: 1.5rem;
      --text-3xl: 2rem;
      --text-4xl: 2.5rem;
      --text-5xl: 3.5rem;
      --text-6xl: 4.5rem;
      --text-hero: clamp(2.5rem, 6vw, 5rem);

      /* Spacing */
      --space-xs: 0.25rem;
      --space-sm: 0.5rem;
      --space-md: 1rem;
      --space-lg: 1.5rem;
      --space-xl: 2rem;
      --space-2xl: 3rem;
      --space-3xl: 4rem;
      --space-section: clamp(4rem, 8vw, 7rem);

      /* Effects */
      --radius-sm: ;
      --radius-md: ;
      --radius-lg: ;
      --radius-full: 999px;
      --shadow-sm: ;
      --shadow-md: ;
      --shadow-lg: ;

      /* Transitions */
      --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
      --duration-fast: 150ms;
      --duration-base: 300ms;
      --duration-slow: 500ms;
    }

    /* ══════════ RESET ══════════ */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      font-family: var(--font-body);
      color: var(--color-text);
      background: var(--color-bg);
      line-height: 1.6;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
    }

    /* ══════════ ATMOSPHERIC BACKGROUND (obrigatório no hero) ══════════ */
    .hero-bg {
      position: relative;
      overflow: hidden;
    }
    .hero-bg::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--color-primary) 15%, transparent) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, color-mix(in srgb, var(--color-accent) 10%, transparent) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--color-secondary) 8%, transparent) 0%, transparent 50%);
      pointer-events: none;
    }
    /* Noise texture overlay */
    .hero-bg::after {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      pointer-events: none;
    }

    /* ══════════ SCROLL ANIMATIONS ══════════ */
    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity var(--duration-slow) var(--ease-out),
                  transform var(--duration-slow) var(--ease-out);
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
    }

    /* ══════════ TYPOGRAPHY ══════════ */
    h1, h2, h3, h4 {
      font-family: var(--font-display);
      line-height: 1.15;
      letter-spacing: -0.02em;
    }
    h1 { font-size: var(--text-hero); font-weight: 900; }
    h2 { font-size: var(--text-4xl); font-weight: 700; }
    h3 { font-size: var(--text-2xl); font-weight: 700; }
    p { max-width: 65ch; }

    /* ══════════ SECTION RHYTHM ══════════ */
    section { padding: var(--space-section) var(--space-lg); }
    .container { max-width: 1200px; margin: 0 auto; width: 100%; }
    .narrow { max-width: 800px; }

    /* ══════════ CTA BUTTONS ══════════ */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem 2rem;
      background: var(--color-primary);
      color: #fff;
      font-family: var(--font-body);
      font-weight: 600;
      font-size: var(--text-base);
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      text-decoration: none;
      transition: all var(--duration-base) var(--ease-out);
    }
    .btn-primary:hover {
      background: var(--color-primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 8px 30px color-mix(in srgb, var(--color-primary) 30%, transparent);
    }
    .btn-primary:active { transform: translateY(0); }
  </style>
</head>
<body>
  <!-- CONTEÚDO COMEÇA AQUI -->

  <!-- OBRIGATÓRIO: Scroll reveal JS no final -->
  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>
</body>
</html>
```

Esta estrutura não é sugestão — é o mínimo. Customize cores, fontes e efeitos, mas a presença de Google Fonts, CSS variables, atmospheric background e scroll animations é obrigatória.

---

## Processo de Decisão

### Etapa 1: Briefing

Extraia do pedido: Produto, Público, Objetivo, Tom, Copy (pronta ou placeholder), Formato (HTML ou React).

**Regra de formato:**
- Landing, vendas, portfólio, institucional → HTML/CSS/JS puro (auto-contido)
- Dashboard, app interativo, componente com estado → React JSX

**Regra crítica sobre copy:** Mesmo quando recebe copy pronta, o processo de identidade visual (Etapa 2) é OBRIGATÓRIO. Copy pronta não significa "pule direto pro código". A copy define o conteúdo. A identidade define como ele se apresenta visualmente. São coisas diferentes.

### Etapa 2: Identidade Visual

Leia `references/identity-system.md` para o catálogo completo. Decida:

1. **Estilo Visual** — Consulte tabela Produto × Tom para escolher
2. **Paleta** — Copie uma paleta da referência e customize
3. **Tipografia** — Escolha um par da referência. Exemplo de pares fortes:
   - Premium: Fraunces (900) + DM Sans (400)
   - Tech: Space Grotesk (700) + IBM Plex Sans (400)
   - Editorial: Newsreader (700) + Crimson Pro (400)
   - Startup: Syne (800) + Work Sans (400)
   - Brutalist: Anton (400) + Space Grotesk (400)
4. **Efeitos** — Radius, shadows, depth conforme estilo

### Etapa 3: Visual Signature — O Diferencial

Toda página precisa de pelo menos 2 destes elementos para não parecer genérica:

- [ ] **Headline como elemento visual** — Tamanho extremo (clamp 3rem-6rem), weight 900, letter-spacing negativo (-0.03em)
- [ ] **Background atmosférico** — Radial gradients em camadas, noise texture, ou grid sutil (nunca fundo sólido puro)
- [ ] **Assimetria controlada** — Pelo menos uma seção que quebra o grid centralizado (offset, overlap, split assimétrico)
- [ ] **Transição de seção** — Pelo menos uma divisão entre seções que não é borda reta (SVG wave, diagonal via clip-path, gradiente de transição)
- [ ] **Hover states elaborados** — Além de color change: translate, scale, shadow transition, border-color, glow
- [ ] **Texto estilizado** — Gradient text, text-stroke, lettering como textura, ou tipografia em escala extrema como elemento decorativo
- [ ] **Cor de destaque em uso inesperado** — Um elemento que usa a accent color de forma que chama atenção (underline custom, background highlight, badge)
- [ ] **Micro-animações no load** — Staggered fade-in nos elementos do hero (título → subtítulo → CTA com delays de 100-200ms)

Escolha 2-3 destes. A página deve ter pelo menos UM momento que faz o visitante pensar "isso é diferente".

### Etapa 4: Layout

Leia `references/page-patterns.md` para a estrutura por tipo de página. Princípios:

- Seções com padding generoso: `padding: clamp(4rem, 8vw, 7rem) var(--space-lg)`
- Alternância de fundos entre `--color-bg` e `--color-bg-alt`
- Max-width: conteúdo 1200px, texto body 800px (65-75ch)
- Mobile-first. Breakpoints: 768px e 1024px
- CTA repetido 2-3x na página

### Etapa 5: UX Quality Check

Leia `references/ux-guidelines.md`. Verificação rápida:

- Contraste ≥4.5:1 para texto
- Touch targets ≥44px
- `prefers-reduced-motion` respeitado
- Viewport meta presente
- Sem scroll horizontal em mobile
- Focus rings em interativos
- Fonte mínima 16px body no mobile

### Etapa 6: Validação Final

Antes de entregar, verifique contra a BLACKLIST acima. Se qualquer item banido está presente → reescreva essa parte.

Depois, o teste do olho:
- "Se eu trocar o conteúdo, essa página ainda pareceria IGUAL a qualquer outra landing?" → Se sim, faltou Visual Signature.
- "Consigo identificar qual marca/projeto é só pelo visual, sem ler o texto?" → Se não, a identidade está fraca.

---

## Para React JSX

Mesmos princípios, adaptados:
- Componente funcional com `export default`
- CSS variables definidas em `<style>` tag JSX ou objeto de estilo
- Google Fonts: adicione comment no topo do arquivo indicando que a fonte precisa ser carregada
- Imports: React, lucide-react, recharts, shadcn/ui, d3
- Sem localStorage/sessionStorage
- Responsivo via CSS media queries dentro do style tag

---

## Integração com Copy

**Com copy pronta:** Aplica Etapas 1-6 normalmente. A copy define conteúdo, não visual.

**Sem copy:** Use placeholder inteligente — texto que parece real e demonstra hierarquia. Nunca Lorem ipsum. Sinalize ao usuário que precisa substituir.

---

## Referências

| Arquivo | Quando ler |
|---------|-----------|
| `references/identity-system.md` | Etapa 2 — estilos, paletas, fontes, efeitos |
| `references/frontend-aesthetics.md` | Etapa 3 — anti-AI-slop, técnicas de atmosfera |
| `references/page-patterns.md` | Etapa 4 — estrutura por tipo de página |
| `references/ux-guidelines.md` | Etapa 5 — 99 regras UX priorizadas |

---

## Cross-references Squad Turbo (adicionado v1.1)

Para HTML puro, sempre importe tokens da skill `design-tokens-emb` antes de estilizar:

```html
<link rel="stylesheet" href="design-tokens-emb/tokens.css">
<link rel="stylesheet" href="design-tokens-emb/paletas/neon-dark.css">
```

Use `var(--bg)`, `var(--fg)`, `var(--accent)`, `var(--space-*)`, `var(--text-*)`, `var(--radius-*)` em vez de hex/px hardcoded.

| Skill complementar | Quando consultar |
|---|---|
| `design-tokens-emb` | SEMPRE — base de cor/espaço/tipo/sombra |
| `frontend-design` | Decisão de direção estética bold (anti-IA) |
| `design-system` | Arquitetura de tokens em 3 camadas (primitivo→semântico→componente) |
| `lovable-style-emb` | Se o projeto for React/Vite (não HTML puro) |
| `_shared/anti-ia-blacklist.md` | Auditoria final NON-NEGOTIABLE |

## Recursos externos (fundamentos para repertório)

- [Refactoring UI](https://refactoringui.com) — Adam Wathan + Steve Schoger (livro essencial)
- [Josh Comeau](https://www.joshwcomeau.com) — CSS profundo + design sense
- [Rauno Freiberg](https://rauno.me) — motion + detail (Vercel)
- [Emil Kowalski](https://emilkowal.ski) — design engineering (Linear)
- [Radix Colors](https://www.radix-ui.com/colors) — escala perceptual
- [oklch.com](https://oklch.com) — picker OKLCH
- Sistemas para estudar: Radix, shadcn, GitHub Primer, Atlassian, IBM Carbon, Shopify Polaris
