# Identity System — Catálogo de Decisões Visuais

## Estilos Visuais × Produtos

Use esta tabela para selecionar o estilo visual com base no tipo de produto e tom desejado. O estilo não é preferência — é decisão estratégica baseada no público e contexto.

### Estilos Primários

| Estilo | Descrição | Melhor Para | Evitar Para |
|--------|-----------|-------------|-------------|
| **Minimalism** | Espaço generoso, poucos elementos, tipografia forte, paleta restrita | SaaS, portfólio premium, fintech, tech | Produtos infantis, entretenimento, e-commerce de massa |
| **Dark Luxury** | Fundos escuros, acentos dourados/metálicos, tipografia elegante | Moda, joalheria, carros, whisky, crypto premium | Saúde, educação infantil, ONGs |
| **Glassmorphism** | Transparências frosted-glass, blur, bordas sutis, profundidade em camadas | Dashboards, apps mobile, fintech, music apps | Mercado conservador, público 50+, institucional |
| **Brutalism** | Tipografia bold, contrastes extremos, layouts assimétricos, sem polimento | Agências criativas, startups disruptivas, arte, moda vanguarda | Hospitais, bancos tradicionais, governo |
| **Editorial** | Layout de revista, tipografia serif, grid assimétrico, espaço respirável | Blogs premium, mídia, portfólios, publicações | Dashboards, e-commerce, ferramentas técnicas |
| **Neumorphism** | Soft shadows, extrusão sutil, monocromático com profundidade | Configurações, controles, calculadoras, players | Pages com muita informação, e-commerce, blogs |
| **Claymorphism** | 3D suave, sombras coloridas, bordas arredondadas generosas | Fintech friendly, saúde digital, educação, SaaS B2C | Luxo, mercado corporativo, financeiro conservador |
| **Bento Grid** | Grid modular tipo Apple, cards de tamanhos variados, clean | Apresentação de features, SaaS, portfólio de produtos, dashboards | Páginas de vendas longas, conteúdo narrativo |
| **Flat Design** | Sem sombras, cores sólidas, ícones simplificados | Apps utilitários, gov-tech, ferramentas internas | Premium, luxo, experiências imersivas |
| **Skeuomorphism** | Texturas reais, profundidade realista, detalhes visuais ricos | Apps de música, ferramentas criativas, nostalgia | Clean tech, SaaS moderno, minimalismo |
| **Organic/Nature** | Formas fluidas, paletas terrosas, texturas naturais | Wellness, cosmética natural, alimentação, yoga | Tech hardcore, fintech, gaming |
| **Neon/Cyberpunk** | Fundos escuros, cores neon vibrantes, glow effects, futurista | Gaming, nightlife, crypto, tech experimental | Saúde, educação, mercado infantil, terceira idade |
| **Retro/Vintage** | Paletas nostálgicas, texturas grain, tipografia retrô | Café, cervejaria artesanal, moda vintage, barbershop | SaaS, fintech, hospital, tech |
| **Corporate Modern** | Limpo mas com personalidade, gradientes sutis, profissional | B2B SaaS, consultoria, serviços profissionais | Entretenimento, moda jovem, arte |
| **Playful/Fun** | Cores vibrantes, formas orgânicas, ilustrações, motion abundante | Educação, apps infantis, gaming casual, food delivery | Finanças, jurídico, saúde |

### Como Escolher

Cruzamento **Produto × Tom**:

| Tom ↓ / Produto → | SaaS/Tech | E-commerce | Saúde/Wellness | Educação | Finanças | Criativo/Arte |
|--------------------|-----------|------------|----------------|----------|----------|---------------|
| **Premium** | Minimalism, Corporate Modern | Dark Luxury, Editorial | Organic, Minimalism | Editorial, Minimalism | Dark Luxury, Minimalism | Editorial, Brutalism |
| **Acessível** | Claymorphism, Flat | Playful, Bento Grid | Organic, Claymorphism | Playful, Claymorphism | Corporate Modern | Playful, Retro |
| **Ousado** | Brutalism, Neon | Neon, Brutalism | — | Brutalism | Neon | Brutalism, Neon |
| **Calmo** | Minimalism, Neumorphism | Organic, Minimalism | Organic, Minimalism | Minimalism | Corporate Modern | Editorial |
| **Tech/Futurista** | Glassmorphism, Neon | Glassmorphism | Glassmorphism | Glassmorphism | Glassmorphism | Neon, Cyberpunk |

---

## Paletas de Cores por Segmento

Cada paleta define 5 cores semânticas. Use CSS variables.

### SaaS / Tech

**Electric Indigo** (modern, confiante)
```
--primary: #6366F1; --secondary: #818CF8; --accent: #F59E0B;
--bg: #0F172A; --bg-alt: #1E293B; --text: #F8FAFC; --text-muted: #94A3B8;
```

**Ocean Depth** (profissional, calmo)
```
--primary: #0EA5E9; --secondary: #38BDF8; --accent: #22D3EE;
--bg: #FFFFFF; --bg-alt: #F0F9FF; --text: #0C4A6E; --text-muted: #64748B;
```

**Midnight Emerald** (premium tech)
```
--primary: #10B981; --secondary: #34D399; --accent: #6EE7B7;
--bg: #030712; --bg-alt: #111827; --text: #F9FAFB; --text-muted: #9CA3AF;
```

### E-commerce / Varejo

**Coral Commerce** (energético, conversão)
```
--primary: #F43F5E; --secondary: #FB7185; --accent: #FCD34D;
--bg: #FFFFFF; --bg-alt: #FFF1F2; --text: #1F2937; --text-muted: #6B7280;
```

**Warm Earth** (confiável, acessível)
```
--primary: #D97706; --secondary: #F59E0B; --accent: #10B981;
--bg: #FFFBEB; --bg-alt: #FEF3C7; --text: #292524; --text-muted: #78716C;
```

### Saúde / Wellness

**Sage Healing** (calmo, natural)
```
--primary: #059669; --secondary: #34D399; --accent: #D4A574;
--bg: #ECFDF5; --bg-alt: #D1FAE5; --text: #064E3B; --text-muted: #6B7280;
```

**Lavender Care** (suave, feminino)
```
--primary: #8B5CF6; --secondary: #A78BFA; --accent: #F9A8D4;
--bg: #FAF5FF; --bg-alt: #F3E8FF; --text: #4C1D95; --text-muted: #7C3AED;
```

### Finanças / Fintech

**Vault** (sério, confiável)
```
--primary: #1D4ED8; --secondary: #3B82F6; --accent: #F59E0B;
--bg: #FFFFFF; --bg-alt: #EFF6FF; --text: #1E3A5F; --text-muted: #64748B;
```

**Crypto Dark** (bold, futurista)
```
--primary: #8B5CF6; --secondary: #A78BFA; --accent: #22D3EE;
--bg: #0A0A0F; --bg-alt: #13131A; --text: #FAFAFA; --text-muted: #71717A;
```

### Educação

**Campus** (energético, acessível)
```
--primary: #2563EB; --secondary: #60A5FA; --accent: #F97316;
--bg: #FFFFFF; --bg-alt: #F8FAFC; --text: #1E293B; --text-muted: #64748B;
```

### Alimentação / Food

**Spice** (apetitoso, quente)
```
--primary: #DC2626; --secondary: #F97316; --accent: #16A34A;
--bg: #FFFBEB; --bg-alt: #FEF2F2; --text: #1C1917; --text-muted: #78716C;
```

### Criativo / Agência

**Studio Noir** (impactante, artístico)
```
--primary: #FAFAFA; --secondary: #A1A1AA; --accent: #EF4444;
--bg: #09090B; --bg-alt: #18181B; --text: #FAFAFA; --text-muted: #71717A;
```

### Moda / Luxo

**Noir Gold** (premium, exclusivo)
```
--primary: #C9A96E; --secondary: #B8860B; --accent: #FAFAFA;
--bg: #0A0A0A; --bg-alt: #1A1A1A; --text: #FAFAFA; --text-muted: #A3A3A3;
```

---

## Tipografia — Combinações por Personalidade

### NUNCA usar (marcas de "feito por IA"):
Inter, Roboto, Open Sans, Lato, Arial, Helvetica, system-ui genérico

### Combinações Recomendadas

**Premium / Luxo**
| Display | Body | Vibe |
|---------|------|------|
| Playfair Display (700-900) | Source Sans 3 (300-400) | Editorial elegante |
| Cormorant Garamond (600-700) | Nunito Sans (300-400) | Luxo acessível |
| Fraunces (700-900) | DM Sans (400) | Sofisticado moderno |

**Tech / Startup**
| Display | Body | Vibe |
|---------|------|------|
| Space Grotesk (700) | IBM Plex Sans (400) | Tech confiante |
| Clash Display (600-700) | Satoshi (400) | Startup bold |
| Cabinet Grotesk (800) | General Sans (400) | Moderno limpo |
| Syne (700-800) | Work Sans (400) | Tech criativo |

**Editorial / Blog**
| Display | Body | Vibe |
|---------|------|------|
| Newsreader (600-700) | Crimson Pro (400) | Jornalístico |
| Lora (600-700) | Source Serif 4 (400) | Clássico digital |
| Bricolage Grotesque (700-800) | Literata (400) | Editorial moderno |

**Playful / Fun**
| Display | Body | Vibe |
|---------|------|------|
| Fredoka (600-700) | Quicksand (400-500) | Amigável |
| Baloo 2 (700-800) | Nunito (400) | Divertido |
| Rubik (700) | Karla (400) | Tech amigável |

**Monospace / Code**
| Display | Body | Vibe |
|---------|------|------|
| JetBrains Mono (700) | Fira Code (400) | Developer |
| Space Mono (700) | IBM Plex Mono (400) | Retro-tech |

**Brutalist / Bold**
| Display | Body | Vibe |
|---------|------|------|
| Anton (400) | Space Grotesk (400) | Impactante |
| Bebas Neue (400) | Barlow (400) | Poster |
| Oswald (700) | Outfit (400) | Industrial |

### Regras de Pareamento

1. **Contraste alto = interessante**: Display + monospace, serif + geometric sans, variable font com pesos extremos
2. **Use extremos**: Weight 100-200 vs 700-900 (não 400 vs 600). Tamanhos 3x+ de diferença entre heading e body.
3. **Uma fonte marcante**: Escolha UMA fonte display que define a personalidade. A body font serve a display.
4. **Escala tipográfica**: Use progressão consistente. Recomendado: 12 / 14 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80
5. **Line height**: Body 1.5-1.75, Headings 1.1-1.3, Captions 1.4
6. **Letter spacing**: Headings grandes podem ter -0.02em a -0.04em. Body mantém padrão. ALL CAPS precisa de +0.05em a +0.1em.

### Google Fonts Import

Sempre carregue via `<link>` com display=swap:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=IBM+Plex+Sans:wght@300;400;500;700&display=swap" rel="stylesheet">
```

---

## Border Radius × Estilo

| Estilo Visual | Radius Recomendado | Exemplo |
|---------------|-------------------|---------|
| Brutalism | 0px | Arestas vivas, sem suavização |
| Editorial | 0-2px | Quase reto, sofisticado |
| Minimalism | 4-8px | Sutil, limpo |
| Corporate | 8-12px | Profissional moderno |
| Glassmorphism | 12-16px | Suave, fluido |
| Claymorphism | 16-24px | Arredondado, amigável |
| Playful | 16-24px + pill buttons | Divertido, orgânico |
| Neumorphism | 12-20px | Soft, extrusão suave |

---

## Shadows × Estilo

**Flat / Minimalism:**
```css
--shadow-sm: none;
--shadow-md: none;
--shadow-lg: 0 0 0 1px rgba(0,0,0,0.05);
```

**Clean / Corporate:**
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
```

**Glassmorphism:**
```css
--shadow-sm: 0 4px 6px rgba(0,0,0,0.07);
--shadow-md: 0 8px 32px rgba(0,0,0,0.12);
--shadow-lg: 0 16px 48px rgba(0,0,0,0.18);
/* Plus backdrop-filter: blur(12px) on glass elements */
```

**Neumorphism:**
```css
--shadow-raised: 6px 6px 12px rgba(0,0,0,0.15), -6px -6px 12px rgba(255,255,255,0.8);
--shadow-inset: inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.8);
```

**Brutalism:**
```css
--shadow-hard: 4px 4px 0 var(--color-text);
--shadow-hard-lg: 8px 8px 0 var(--color-text);
```

**Claymorphism:**
```css
--shadow-clay: 8px 8px 16px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(0,0,0,0.05), inset 2px 2px 4px rgba(255,255,255,0.5);
```

---

## Dark Mode — Regras de Adaptação

Quando dark mode é definido na identidade:

1. **Não inverta cores** — crie variantes tonais desaturadas e mais claras
2. **Fundo**: Use cinzas muito escuros com leve tom da primary (ex: se primary é azul, bg pode ter um toque de azul escuro)
3. **Texto**: Off-white (#E2E8F0 a #F8FAFC), nunca #FFFFFF puro (causa fadiga)
4. **Superfícies elevadas**: Cards/modais MAIS claros que o fundo (oposto do light mode)
5. **Acentos**: Ligeiramente mais claros/desaturados vs light mode para manter contraste
6. **Bordas**: Mais visíveis (rgba branco ao invés de rgba preto)
7. **Teste contraste separadamente** — não assuma que o que funciona em light funciona em dark

```css
[data-theme="dark"], .dark {
  --color-bg: #0F172A;
  --color-bg-alt: #1E293B;
  --color-text: #F1F5F9;
  --color-text-muted: #94A3B8;
  --color-border: rgba(255,255,255,0.1);
  /* Primary/secondary podem precisar ajuste de luminosidade */
}
```
