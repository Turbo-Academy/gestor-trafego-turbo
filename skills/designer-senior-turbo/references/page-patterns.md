# Page Patterns — Estruturas por Tipo de Página

Padrões arquiteturais para os tipos de página mais comuns. Cada padrão define a sequência de seções, propósito de cada uma, e decisões de layout.

---

## Landing Page (Produto/Serviço)

Objetivo: Converter visitante em lead ou comprador.

### Sequência de Seções

```
┌─────────────────────────────────┐
│ 1. NAVBAR                       │ Logo + links + CTA
├─────────────────────────────────┤
│ 2. HERO                         │ Headline + sub + CTA + visual
│    (60-80vh)                    │ A seção mais importante.
├─────────────────────────────────┤
│ 3. SOCIAL PROOF BAR             │ Logos de clientes/mídia. Trust rápido.
│    (compacta)                   │
├─────────────────────────────────┤
│ 4. PROBLEMA / DOR               │ Nomeia a dor. "Você sabe como é..."
│    (opcional mas poderosa)      │
├─────────────────────────────────┤
│ 5. FEATURES / BENEFÍCIOS        │ 3-6 features com ícone + título + desc.
│                                 │ Grid 2-3 colunas ou cards.
├─────────────────────────────────┤
│ 6. HOW IT WORKS                 │ 3 steps numerados. Simplicidade.
│                                 │
├─────────────────────────────────┤
│ 7. TESTIMONIALS                 │ 2-4 depoimentos com foto + nome + cargo.
│                                 │ Cards ou carousel.
├─────────────────────────────────┤
│ 8. PRICING / OFERTA             │ Cards de preço ou CTA final.
│                                 │
├─────────────────────────────────┤
│ 9. FAQ                          │ Accordion. 5-8 perguntas.
│                                 │
├─────────────────────────────────┤
│ 10. FOOTER CTA                  │ Último push. Headline + botão.
│                                 │
├─────────────────────────────────┤
│ 11. FOOTER                      │ Links, social, legal.
└─────────────────────────────────┘
```

### Hero — Variações

**Hero Centralizado** (mais comum)
- Headline centralizado, subheadline, CTA abaixo, visual/mockup abaixo ou atrás
- Melhor para: SaaS, apps, produtos digitais
- Largura do texto: max 700-800px

**Hero Split** (50/50)
- Texto à esquerda, visual à direita (ou vice-versa)
- Melhor para: e-commerce, serviços, B2B
- Grid: `grid-template-columns: 1fr 1fr` → stacks no mobile

**Hero com Video**
- Background video ou video embed como visual principal
- Melhor para: experiences, SaaS com demo
- Atenção: Autoplay muted, fallback image, lazy load

**Hero Minimal**
- Apenas headline gigante (display font, 60-100px desktop) + CTA
- Sem imagem. O texto É o visual.
- Melhor para: agências, portfolios, marcas premium

### Layout Tips

- **Alternância de fundos**: Seções alternam entre bg e bg-alt para ritmo visual
- **Breathing room**: Seções com padding vertical generoso (80-120px desktop, 48-64px mobile)
- **CTA repetido**: Não tenha medo de repetir o CTA principal 2-3 vezes ao longo da página
- **Sticky navbar**: Navbar fixa com blur/transparency no scroll. Shrink sutil.

---

## Página de Vendas (Long-form)

Objetivo: Persuadir e converter. Copy é rainha, design serve a copy.

### Sequência de Seções

```
┌─────────────────────────────────┐
│ 1. PRE-HEADER                   │ Badge de credibilidade ou urgência
├─────────────────────────────────┤
│ 2. HERO                         │ Headline persuasiva + sub + CTA
│    (copy-driven, menos visual)  │
├─────────────────────────────────┤
│ 3. HISTÓRIA / CONEXÃO           │ Story que identifica. "Eu sei como é..."
├─────────────────────────────────┤
│ 4. PROBLEMA AMPLIFICADO         │ Agita a dor. Consequências de não agir.
├─────────────────────────────────┤
│ 5. MECANISMO / SOLUÇÃO          │ Apresenta o método. Por que é diferente.
├─────────────────────────────────┤
│ 6. BULLETS DE CURIOSIDADE       │ Fascinations. 8-15 bullets.
├─────────────────────────────────┤
│ 7. PROVA SOCIAL                 │ Depoimentos detalhados com resultado.
├─────────────────────────────────┤
│ 8. O QUE ESTÁ INCLUÍDO          │ Stack da oferta. Cada item com valor.
├─────────────────────────────────┤
│ 9. BÔNUS                        │ 2-4 bônus com valor individual.
├─────────────────────────────────┤
│ 10. PREÇO / OFERTA              │ Ancoragem + preço real + CTA.
├─────────────────────────────────┤
│ 11. GARANTIA                    │ Badge + texto da garantia.
├─────────────────────────────────┤
│ 12. FAQ                         │ Objeções reais respondidas.
├─────────────────────────────────┤
│ 13. URGÊNCIA / CLOSE            │ Último argumento + CTA final.
├─────────────────────────────────┤
│ 14. PS                          │ Informação extra ou reforço.
└─────────────────────────────────┘
```

### Design Decisions para Vendas

- **Largura**: Conteúdo mais estreito (max 720-800px) para leitura focada
- **Tipografia**: Maior que landing normal. Body 18-20px. Headlines 32-48px.
- **Cor de fundo**: Neutra (branco ou off-white). A cor vive nos CTAs e highlights.
- **CTAs**: Cor vibrante que contrasta fortemente com o fundo. Tamanho generoso. Repetidos.
- **Highlights**: Texto destacado com background-color sutil (amarelo, marca) para criar ritmo visual na leitura
- **Testimonials**: Formato de quote longo, não card compacto. Com contexto e resultado.
- **Stack da oferta**: Tabela visual ou lista empilhada com valores individuais risked → valor total → preço real
- **Sem distrações**: Navbar mínima ou oculta. Sem links externos. Foco total na conversão.

---

## Dashboard / App

Objetivo: Produtividade. Informação clara e acionável.

### Layout Base

```
┌──────┬───────────────────────────┐
│      │ TOP BAR                   │ Search + notificações + avatar
│ SIDE │───────────────────────────│
│ BAR  │ PAGE HEADER               │ Título + actions
│      │───────────────────────────│
│ NAV  │ CONTENT GRID              │ Cards, tabelas, charts
│      │                           │
│      │                           │
└──────┴───────────────────────────┘
```

### Princípios de Dashboard

- **Densidade controlada**: Informação densa mas respirável. Grid com gaps consistentes.
- **Sidebar**: 240-280px largura. Collapsível. Icons + labels.
- **Cards**: Rounded corners consistentes. Sombra sutil ou borda leve. Hover state.
- **Data hierarchy**: Números grandes para KPIs. Tabelas para detalhes. Charts para tendências.
- **Empty states**: Sempre. Mensagem + ação quando sem dados.
- **Loading**: Skeleton screens que espelham o layout final.
- **Dark mode**: Dashboards frequentemente ficam melhor em dark. Considere como default.

---

## Portfólio / Showcase

Objetivo: Impressionar. O trabalho é o protagonista.

### Variações

**Grid Gallery**
- Grid masonry ou uniform de projetos
- Hover reveal com título + tag
- Filter por categoria
- Modal ou página de detalhe

**Case Study Flow**
- Full-width visuals intercalados com texto
- Scroll-triggered animations
- Números grandes de resultado
- Before/after quando aplicável

### Design Decisions

- **Mínimo texto, máximo visual**: Deixe o trabalho falar
- **Full-bleed images**: Projetos precisam de espaço. Não comprima em cards pequenos.
- **Transições**: Shared element transitions entre grid e detalhe
- **Tipografia**: Display font forte para títulos de projeto. Monospace para tags/categorias.
- **Cursor**: Custom cursor em portfólios criativos adiciona personalidade

---

## SaaS / Produto

Objetivo: Explicar, demonstrar, converter.

### Sequência

```
1. HERO com produto em uso (screenshot/mockup)
2. FEATURE GRID (3-6 features com ícone + título + desc)
3. FEATURE SHOWCASE (2-3 features profundas com visual grande)
4. INTEGRATIONS / STACK
5. TESTIMONIALS / CASE STUDIES
6. PRICING (comparação de planos)
7. FAQ
8. FINAL CTA
```

### Design Decisions

- **Product shots**: Screenshots reais ou mockups high-fi. Nunca ilustrações genéricas.
- **Feature showcase**: Alternar layout (texto esquerda + visual direita, depois inverte)
- **Pricing**: Cards lado a lado. Plano recomendado destacado (borda, badge, escala maior).
- **Comparação**: Toggle anual/mensal. Savings badge.
- **Integration logos**: Grid de logos grayscale que ganham cor no hover.

---

## E-commerce / Produto Físico

Objetivo: Desejo + confiança = compra.

### Sequência

```
1. HERO com produto em destaque
2. PRODUTO EM CONTEXTO (lifestyle shots)
3. FEATURES / SPECS
4. VARIAÇÕES (cor, tamanho)
5. REVIEWS
6. CROSS-SELL
7. TRUST BAR (frete, garantia, pagamento)
```

### Design Decisions

- **Fotos**: Ocupam espaço generoso. Zoom, gallery, 360° quando possível.
- **CTA fixo**: Botão de compra sticky no mobile (bottom bar).
- **Trust signals**: Ícones de frete, garantia, pagamento seguro perto do CTA.
- **Reviews**: Stars + texto + foto do comprador. Filtros.
- **Urgência**: Stock indicator, countdown quando genuíno.

---

## Princípios Universais

1. **Navbar**: Sempre presente. Logo à esquerda, CTA à direita. Mobile: hamburger com menu fullscreen ou slide-in.
2. **Footer**: Links organizados em colunas. Social icons. Legal (termos, privacidade). Newsletter opcional.
3. **Responsive**: Mobile-first. Stacks no mobile, grids no desktop. Nada quebra entre 375px e 1440px.
4. **Loading**: Toda transição de estado tem feedback visual.
5. **Scroll**: Smooth scroll para anchor links. Scroll-triggered reveals para engajamento.
6. **Accessibility**: Skip links, focus management, alt text, contraste. Não é feature — é requisito.
