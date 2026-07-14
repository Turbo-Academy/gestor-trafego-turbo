# UX Guidelines — 99 Regras Priorizadas

Baseado em Apple HIG, Material Design, WCAG e práticas de estúdios AAA.
Organizado por prioridade: resolva CRITICAL e HIGH antes de polir MEDIUM e LOW.

---

## 1. Acessibilidade (CRITICAL)

| Regra | O que fazer |
|-------|------------|
| `color-contrast` | Mínimo 4.5:1 para texto normal, 3:1 para texto grande (>18px bold ou >24px). Teste em light E dark mode. |
| `focus-states` | Focus rings visíveis (2-4px) em TODOS elementos interativos. Nunca remova outline sem substituir. |
| `alt-text` | Alt descritivo para imagens com significado. `alt=""` para decorativas. |
| `aria-labels` | aria-label em botões icon-only. accessibilityLabel em mobile. |
| `keyboard-nav` | Tab order = visual order. Suporte completo a teclado. |
| `form-labels` | `<label>` com `for` em todo input. Nunca placeholder como label. |
| `skip-links` | "Skip to main content" para usuários de teclado. |
| `heading-hierarchy` | h1 → h2 → h3 sequencial. Nunca pule níveis. |
| `color-not-only` | Cor nunca é o único indicador. Adicione ícone ou texto. |
| `reduced-motion` | Respeite `prefers-reduced-motion`. Reduza ou desabilite animações. |
| `voiceover-sr` | Labels significativos, ordem lógica de leitura. |
| `escape-routes` | Cancel/back em modais e fluxos multi-step. |

---

## 2. Touch & Interação (CRITICAL)

| Regra | O que fazer |
|-------|------------|
| `touch-target-size` | Mínimo 44×44px (iOS) / 48×48dp (Android). Expanda hitSlop se ícone é menor. |
| `touch-spacing` | Mínimo 8px gap entre alvos touch. |
| `hover-vs-tap` | Click/tap para interações primárias. Não dependa de hover. |
| `loading-buttons` | Desabilite botão durante async. Mostre spinner ou progresso. |
| `error-feedback` | Mensagem de erro clara perto do problema. |
| `cursor-pointer` | `cursor: pointer` em todo clicável (web). |
| `tap-feedback` | Feedback visual no press (ripple/opacity/elevation) dentro de 100ms. |
| `press-feedback` | Haptic para confirmações importantes (mobile). |
| `safe-area-awareness` | Targets longe de notch, Dynamic Island, gesture bar e bordas. |

---

## 3. Performance (HIGH)

| Regra | O que fazer |
|-------|------------|
| `image-optimization` | WebP/AVIF, srcset/sizes responsivo, lazy load não-críticos. |
| `image-dimension` | Declare width/height ou aspect-ratio para prevenir layout shift. |
| `font-loading` | `font-display: swap` ou `optional`. Preload apenas fontes críticas. |
| `critical-css` | CSS above-the-fold inline ou carregado cedo. |
| `lazy-loading` | `loading="lazy"` para imagens below-the-fold e mídia pesada. |
| `content-jumping` | Reserve espaço para conteúdo async. CLS < 0.1. |
| `skeleton-screens` | Skeleton/shimmer ao invés de spinner para operações >300ms. |
| `debounce-throttle` | Debounce/throttle para scroll, resize, input em alta frequência. |

---

## 4. Seleção de Estilo (HIGH)

| Regra | O que fazer |
|-------|------------|
| `style-match` | Estilo deve combinar com produto e público. Consulte `identity-system.md`. |
| `consistency` | Mesmo estilo em TODAS as páginas. |
| `no-emoji-icons` | Use SVG icons (Lucide, Heroicons). Nunca emojis como ícones estruturais. |
| `effects-match-style` | Shadows, blur, radius alinhados ao estilo escolhido. |
| `state-clarity` | Hover/pressed/disabled visualmente distintos. |
| `elevation-consistent` | Escala de elevação/shadow consistente. Sem shadows aleatórias. |
| `dark-mode-pairing` | Light/dark desenhados juntos para manter consistência. |
| `icon-style-consistent` | Um set de ícones com mesmo estilo (stroke width, corner radius). |
| `primary-action` | Cada tela tem UM CTA primário. Ações secundárias visualmente subordinadas. |

---

## 5. Layout & Responsivo (HIGH)

| Regra | O que fazer |
|-------|------------|
| `viewport-meta` | `width=device-width, initial-scale=1`. Nunca desabilite zoom. |
| `mobile-first` | Design mobile-first, escale para tablet e desktop. |
| `breakpoint-consistency` | Breakpoints sistemáticos: 375 / 768 / 1024 / 1440. |
| `readable-font-size` | Mínimo 16px body no mobile (evita auto-zoom iOS). |
| `line-length-control` | Mobile 35-60 chars, desktop 60-75 chars por linha. |
| `horizontal-scroll` | Zero scroll horizontal no mobile. Conteúdo cabe na viewport. |
| `spacing-scale` | Sistema de spacing 4/8px incremental. |
| `container-width` | Max-width consistente no desktop (max-w-6xl ou 7xl). |
| `z-index-management` | Escala definida de z-index (0/10/20/40/100/1000). |
| `content-priority` | Conteúdo core primeiro no mobile. Secundário fold ou hide. |
| `visual-hierarchy` | Hierarquia via tamanho, spacing, contraste — não cor sozinha. |

---

## 6. Tipografia & Cor (MEDIUM)

| Regra | O que fazer |
|-------|------------|
| `line-height` | 1.5-1.75 para body text. 1.1-1.3 para headings. |
| `font-pairing` | Personalidades compatíveis entre heading e body font. |
| `font-scale` | Escala consistente (12/14/16/20/24/32/40/48). |
| `contrast-readability` | Texto escuro em fundo claro. Mínimo #334155 em branco. |
| `color-semantic` | Tokens semânticos (primary, secondary, error). Nunca hex hardcoded em componentes. |
| `color-dark-mode` | Dark mode usa variantes tonais desaturadas, não cores invertidas. |
| `truncation-strategy` | Prefira wrap. Se truncar, use ellipsis + tooltip/expand. |
| `whitespace-balance` | Whitespace intencional para agrupar e separar. Evite clutter. |
| `number-tabular` | Figuras tabulares para dados, preços, timers. |

---

## 7. Animação (MEDIUM)

| Regra | O que fazer |
|-------|------------|
| `duration-timing` | 150-300ms micro, ≤400ms transições complexas. Evite >500ms. |
| `transform-performance` | Anime apenas transform e opacity. Nunca width/height/top/left. |
| `loading-states` | Skeleton/progress quando loading >300ms. |
| `easing` | ease-out para entrada, ease-in para saída. Nunca linear para UI. |
| `motion-meaning` | Toda animação expressa causa-efeito, não decoração. |
| `stagger-sequence` | Stagger 30-50ms por item em listas/grids. |
| `exit-faster-than-enter` | Exit = 60-70% da duração de entrada. |
| `interruptible` | Animações canceláveis por interação do usuário. |
| `no-blocking-animation` | UI interativa durante animações. Nunca bloqueie input. |
| `scale-feedback` | Scale sutil (0.95-1.05) no press de cards/buttons. |

---

## 8. Forms & Feedback (MEDIUM)

| Regra | O que fazer |
|-------|------------|
| `input-labels` | Label visível por input. Nunca placeholder-only. |
| `error-placement` | Erro abaixo do campo relacionado. |
| `submit-feedback` | Loading → success/error state no submit. |
| `required-indicators` | Marque campos obrigatórios (asterisco). |
| `empty-states` | Mensagem útil + ação quando sem conteúdo. |
| `toast-dismiss` | Auto-dismiss toasts em 3-5s. |
| `confirmation-dialogs` | Confirme antes de ações destrutivas. |
| `inline-validation` | Valide no blur (não keystroke). Erro só após terminar input. |
| `progressive-disclosure` | Revele opções complexas progressivamente. |
| `error-recovery` | Mensagem de erro inclui caminho de recuperação (retry, edit, help). |
| `focus-management` | Após erro de submit, auto-focus no primeiro campo inválido. |

---

## 9. Navegação (HIGH)

| Regra | O que fazer |
|-------|------------|
| `back-behavior` | Back previsível e consistente. Preserve scroll/state. |
| `nav-label-icon` | Itens de navegação com ícone E texto. Icon-only prejudica descoberta. |
| `nav-state-active` | Localização atual destacada visualmente (cor, peso, indicador). |
| `modal-escape` | Modais oferecem dismiss claro. Mobile: swipe-down dismiss. |
| `breadcrumb-web` | Breadcrumbs para hierarquias 3+ níveis (web). |
| `navigation-consistency` | Navegação no mesmo lugar em TODAS as páginas. |
| `bottom-nav-limit` | Bottom nav max 5 items (mobile). |

---

## 10. Charts & Dados (LOW)

| Regra | O que fazer |
|-------|------------|
| `chart-type` | Trend → line. Comparação → bar. Proporção → pie/donut. |
| `legend-visible` | Legenda sempre visível, perto do chart. |
| `tooltip-on-interact` | Tooltip com valores exatos no hover/tap. |
| `responsive-chart` | Charts se adaptam em telas pequenas. |
| `no-pie-overuse` | Pie/donut max 5 categorias. Mais que isso → bar chart. |
| `contrast-data` | Linhas/barras vs fundo ≥3:1. Labels ≥4.5:1. |

---

## Pre-Delivery Checklist Resumido

### Visual
- [ ] Sem emojis como ícones
- [ ] Ícones do mesmo family/style
- [ ] Tokens semânticos de tema (sem hex hardcoded)
- [ ] Press states sem layout shift

### Interação
- [ ] Todos os clicáveis têm feedback de press
- [ ] Touch targets ≥44px
- [ ] Timing 150-300ms com easing natural
- [ ] Disabled states claros e não-interativos
- [ ] Focus order = visual order

### Light/Dark Mode
- [ ] Contraste texto primário ≥4.5:1 nos dois modos
- [ ] Bordas e dividers visíveis nos dois modos
- [ ] Testado nos dois temas antes de entregar

### Layout
- [ ] Safe areas respeitadas
- [ ] Verificado em 375px e landscape
- [ ] Ritmo de spacing 4/8px mantido
- [ ] Texto longo legível em telas grandes
