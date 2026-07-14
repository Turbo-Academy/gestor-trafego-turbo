---
name: lovable-style-turbo
description: Replica o loop de produção do Lovable dentro do Claude Code — stack fixo (Vite + React + TypeScript + Tailwind + shadcn/ui), tokens Turbo pré-configurados, biblioteca de componentes prontos (Hero, FeatureGrid, Pricing, CTA, Footer, Nav) e prompt system calibrado para gerar páginas com qualidade visual consistente sem improviso de stack. Use quando o usuário pedir "landing nível Lovable", "página em React", "scaffolding de novo projeto web" ou qualquer interface que se beneficie do combo Vite+shadcn+Tailwind. Importa automaticamente `design-tokens-turbo` e consulta `frontend-design`, `ui-styling` e `designer-senior-turbo` para fundamentos.
license: MIT
metadata:
  author: Squad Turbo
  version: "1.0.0"
---

# Lovable Style Turbo

Stack opinado + scaffolding automático + prompt system. O equivalente Lovable dentro do Claude Code.

## Filosofia (por que stack fixo)

Lovable entrega qualidade consistente porque **não pergunta**, não improvisa stack. Esta skill faz o mesmo:

- **Vite + React + TypeScript** — build rápido, DX superior, tipos
- **Tailwind v3+** com preset `design-tokens-turbo` — coerência automática
- **shadcn/ui** — componentes acessíveis, copy-paste, sem dependência runtime
- **Lucide icons** — biblioteca padrão
- **Motion One** (opcional) ou **framer-motion** — animações
- **next-themes** ou toggle nativo — dark mode

Se o usuário pedir outro stack (Next, Astro, Remix), responda: "Posso scaffoldar — mas o template otimizado é Vite+React. Próximas iterações vão ficar mais lentas em outro stack."

## Quando ativar

- "Quero uma landing nível Lovable / nível Vercel / nível Linear"
- "Cria um projeto React pra essa página"
- "Scaffolding pra app web novo"
- "Quero converter esse HTML para React+Tailwind+shadcn"
- "Componente em React" (qualquer)

## Quando NÃO ativar

- HTML estático single-file → use `designer-senior-turbo`
- Carrossel Instagram → use `gerador-instagram-turbo`
- Slide deck → use `slides-uipm-turbo`
- Email marketing → use `copywriter-emb` + HTML inline

## Loop de execução (replicando Lovable)

### 1. Briefing rápido (30s)

Antes de scaffoldar, capture em 1 frase:
- **O quê:** landing? dashboard? app? (1 página ou multi?)
- **Vibe:** neutro-pro? editorial-warm? neon-dark? (mostrar paletas)
- **Componentes-chave:** hero + features + pricing + footer? (lista curta)

Se faltar contexto, pergunte UMA coisa só. Não esgote o usuário.

### 2. Scaffold (1 comando mental)

Execute na ordem:

```
mkdir -p projeto/{src/{components,pages,lib,hooks},public}
cd projeto
# copiar template/ desta skill
# instalar deps
npm install
npm install -D tailwindcss postcss autoprefixer @types/react @types/react-dom typescript
npx tailwindcss init -p
# shadcn init com tokens
npx shadcn@latest init
```

Arquivos críticos a criar (ver `template/` desta skill):
- `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`
- `tailwind.config.ts` (importa preset Turbo)
- `src/index.css` (importa tokens + paleta)
- `src/main.tsx`, `src/App.tsx`
- `src/components/ui/` (shadcn — adicionar conforme uso)
- `index.html`

### 3. Composição (componentes da biblioteca)

Use **recipes prontas** em `recipes/`:
- `Hero.tsx` — gradiente animado, chip eyebrow, stats
- `FeatureGrid.tsx` — cards com radial-glow hover
- `Pricing.tsx` — 3 tiers, highlight middle, FAQ accordion
- `CTA.tsx` — bloco final com gradiente brand
- `Footer.tsx` — multi-coluna + social
- `Nav.tsx` — sticky glass com backdrop-filter

Componha primeiro com recipes. Só crie do zero se nenhuma serve.

### 4. Refinamento

Antes de entregar, audite:
- [ ] Tokens (sem hex hardcoded — só `var(--...)` ou classes Tailwind)
- [ ] Dark mode funciona? (toggle `data-theme`)
- [ ] Estados completos? (hover/focus/active/disabled em interativos)
- [ ] Tipografia hierárquica? (no máximo 4 níveis visíveis)
- [ ] Espaçamento múltiplo de 4? (sem `13px`, `27px` etc.)
- [ ] Anti-IA passou? (consultar `_shared/anti-ia-blacklist.md`)
- [ ] Acessibilidade? (alt em imgs, label em inputs, role em custom elements)
- [ ] `npm run build` passa sem warnings de TS?

### 5. Deploy hint

Se o usuário pedir deploy:
- Vercel: `npx vercel`
- Netlify: arrastar `dist/` em app.netlify.com/drop
- Cloudflare Pages: conectar GitHub
- Self-hosted: `npm run build` → servir `dist/` com qualquer estático

## Stack lock (não negociar)

| Camada | Escolha | Por quê |
|---|---|---|
| Build | Vite | HMR instantâneo, ESM nativo |
| UI | React 18+ | Ecossistema, shadcn |
| Tipos | TypeScript strict | Pega bug em build |
| CSS | Tailwind + tokens Turbo | Coerência automática |
| Componentes | shadcn/ui | Acessível, copy-paste, sem runtime |
| Ícones | Lucide | 1.5k+ ícones, coerentes |
| Forms | react-hook-form + zod | Padrão de mercado |
| Roteamento | react-router (se SPA) ou nada (se 1 página) | Não pular pra Next sem motivo |
| Animação | CSS + Motion One (4kb) | Framer só se app complexo |
| Estado | useState / Zustand (se >3 stores) | Sem Redux |

## Recipes (ler antes de criar componente)

Ver `recipes/` desta skill:
- `01-hero-gradient-glow.md`
- `02-feature-grid-radial-hover.md`
- `03-pricing-3-tiers.md`
- `04-cta-final-block.md`
- `05-footer-multi-column.md`
- `06-nav-sticky-glass.md`
- `07-faq-accordion.md`
- `08-testimonials-marquee.md`

## Cross-references

- Tokens (obrigatório) → `design-tokens-turbo`
- Componentes shadcn → `ui-styling`
- Estética anti-IA → `frontend-design` + `_shared/anti-ia-blacklist.md`
- Decisões de design (tipografia/cor/grid) → `design-system`
- HTML puro alternativo → `designer-senior-turbo`

## Princípios não-negociáveis

1. **Stack fixo.** Não improvisa. Se precisar de algo fora, justifica em 1 linha.
2. **Tokens sempre.** Zero hex hardcoded em componente.
3. **shadcn antes de criar.** Só crie do zero se o componente não existe lá.
4. **Recipe antes de improviso.** Consulte `recipes/` antes.
5. **Build limpa.** `npm run build` sem warnings antes de entregar.
6. **Anti-IA passou.** Auditar `_shared/anti-ia-blacklist.md` no fim.
