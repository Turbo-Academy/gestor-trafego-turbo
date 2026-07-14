# Performance Budgets — Squad Turbo

Budget não é sugestão, é contrato. Se estoura, a página não sobe.

## Por que budgets

Sem budget, otimização vira negociação. "Só mais 20KB aqui, só mais um script ali" — e a página volta a pesar 3MB em 2 meses. Budget é a ferramenta que mata esse drift.

## Budgets padrão Squad Turbo (2026)

| Recurso           | Mobile | Desktop | Por quê |
|-------------------|--------|---------|---------|
| Total page weight | 1.0 MB | 1.5 MB  | 75% dos usuários mobile no Brasil têm conexão 4G flutuante |
| HTML (gzipped)    | 25 KB  | 40 KB   | Páginas de venda não precisam de mais |
| CSS (gzipped)     | 50 KB  | 80 KB   | Critical inline + 1 arquivo async dá conta |
| JS (gzipped)      | 100 KB | 170 KB  | Acima disso, INP morre |
| LCP image         | 150 KB | 250 KB  | Em AVIF, é suficiente pra hero full-width |
| Fontes total      | 100 KB | 150 KB  | 2 famílias x 2 pesos em woff2 subset latin |
| Third-party JS    | 80 KB  | 120 KB  | GTM + 1 pixel, no máximo |
| DOM nodes         | 1500   | 2000    | Acima disso, reflow fica caro |
| Long tasks        | 0      | 0       | Nada acima de 50ms no main thread |

## Como medir

### Lighthouse CI com budget.json

Criar `budget.json` na raiz do projeto:

```json
[
  {
    "path": "/*",
    "resourceSizes": [
      { "resourceType": "total", "budget": 1000 },
      { "resourceType": "script", "budget": 100 },
      { "resourceType": "stylesheet", "budget": 50 },
      { "resourceType": "image", "budget": 500 },
      { "resourceType": "font", "budget": 100 },
      { "resourceType": "third-party", "budget": 80 }
    ],
    "resourceCounts": [
      { "resourceType": "third-party", "budget": 10 }
    ],
    "timings": [
      { "metric": "largest-contentful-paint", "budget": 2500 },
      { "metric": "interactive", "budget": 3500 },
      { "metric": "cumulative-layout-shift", "budget": 100 }
    ]
  }
]
```

Rodar:

```bash
npx lighthouse <URL> \
  --budget-path=./budget.json \
  --output=json --output-path=./budget-check.json
```

### Bundle size check (se tem build)

```bash
# Vite/Rollup
npx rollup-plugin-visualizer

# Webpack
npx webpack-bundle-analyzer

# Geral
du -h dist/**/*.{js,css} | sort -h
```

## O que fazer quando estoura

1. **Identificar o culpado.** Sempre tem um arquivo responsável por 60%+ do excesso.
2. **Cortar antes de otimizar.** Deletar é mais rápido que minificar.
3. **Substituir biblioteca pesada.** Exemplos: `moment.js` (290KB) → `date-fns` (13KB tree-shaken) → `Intl.DateTimeFormat` nativo (0KB). jQuery (85KB) → vanilla. Lodash full → import individual.
4. **Lazy-load agressivo.** Tudo abaixo do fold vira dynamic import.
5. **Negociar com o dono.** Se o dono quer um Typeform embed de 400KB no hero, ele precisa saber que isso custa 15 pontos de score.

## Regra de ouro

**Se passou do budget duas vezes no mesmo projeto, o budget está errado OU o escopo está errado.** Revisar com o dono antes de continuar cortando.
