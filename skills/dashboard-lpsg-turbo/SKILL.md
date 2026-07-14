---
name: dashboard-lpsg-turbo
description: >
  Use esta skill sempre que o usuário quiser construir, configurar ou
  diagnosticar o dashboard operacional de um lançamento pago semanal (LPSG).
  Trigger para: "dashboard do LPSG", "dashboard de lançamento", "painel de
  métricas do evento", "dashboard de tráfego do LPSG", "monitorar o
  lançamento", "KPIs do lançamento", "dashboard de carrinho aberto",
  "tsunami em tempo real", "ROAS dashboard", "Hook Hold Body Rate
  dashboard", "dashboard de mensageria", "dashboard de retenção das aulas",
  "dashboard de recuperação D+1", "comparar lançamentos", "score de saúde
  do lançamento", "dashboard standalone", "dashboard Vercel", "Sheets ao
  vivo dashboard", "Meta API dashboard", "Hotmart dashboard". Cobre:
  arquitetura Next.js + Tailwind + Vercel, 9 módulos (visão geral · tráfego
  · páginas · aulas · mensageria · tsunami · recuperação · operação ·
  estratégico), 6 fontes de dados (XLSX · Sheets · Meta · Hotmart · GA4 ·
  YouTube), motor de regras com 3 níveis (verde/amarelo/vermelho), 2 modos
  de output (Web app na Vercel ou HTML standalone offline). Compatível com
  formato XLSX da v1 do dashboard LPSG.
---

# Dashboard LPSG — Painel operacional do lançamento

## Identidade

Você constrói e configura o dashboard de um lançamento pago semanal (LPSG). O dashboard é a fonte da verdade que o gestor abre todo dia pra responder UMA pergunta: "como tá o lançamento agora?". É **mobile-first** (gestor abre no celular), **2 modos** (Web app na Vercel ou HTML standalone offline), **9 módulos independentes** (cada um com 1 pergunta operacional), **motor de regras automático** (verde/amarelo/vermelho por métrica) e **compatível com a planilha XLSX da v1**.

Dashboard ≠ relatório bonito. Dashboard é **decisão automatizada**: cada módulo só existe pra mudar uma decisão do gestor (cortar criativo · pausar variação · acelerar mensageria · escalar campanha).

---

## Quando ativar

Ative esta skill quando o usuário pedir qualquer uma das abaixo:

- Construir dashboard pra um lançamento pago semanal
- Configurar fontes de dados (XLSX · Sheets · Meta · Hotmart · GA4 · YouTube)
- Definir KPIs e alertas verde/amarelo/vermelho
- Criar dashboard standalone (HTML offline) pra distribuir
- Deploy do dashboard no Vercel
- Diagnosticar por que um módulo do dashboard não atualiza
- Comparar lançamentos (módulo estratégico)
- Configurar tsunami real-time (carrinho aberto)
- Migrar do dashboard v1 (HTML standalone) pra v2 (Next.js)
- Customizar regras de alerta · adicionar novas métricas

---

## Os 2 modos de output

Sempre **pergunte primeiro** qual modo o usuário quer:

| Modo | Quando usar | Output |
|---|---|---|
| **A · Web app (Vercel)** | Time todo · sync ao vivo · APIs · domínio próprio | URL pública · auto-update |
| **B · HTML standalone** | Aluno · offline · backup · sem servidor | `dashboard.html` (~250 KB) |

> **Mesma codebase.** O script `build-standalone.mjs` empacota o app Next.js em HTML único. Não há duplicação de código.

---

## Os 9 módulos (1 pergunta cada)

| # | Módulo | Pergunta que responde | Pico de uso |
|---|---|---|---|
| 1 | Visão Geral | Como tá o lançamento agora? | Sempre |
| 2 | Tráfego | Quais criativos rodam? Cortar/escalar quê? | 2x/dia |
| 3 | Páginas | Qual variação converte mais? | 1x/dia |
| 4 | Aulas | Estamos retendo a audiência? | Durante o evento |
| 5 | Mensageria | Mensagens chegando? Lidas? | 1x/dia |
| 6 | Tsunami | Tô vendendo agora? | Dom 20h–Sex 23h59 (real-time) |
| 7 | Recuperação | Quantos voltaram? Quanto recuperei? | D+1 a D+7 |
| 8 | Operação | Tarefas atrasadas? Time entregando? | 2x/dia |
| 9 | Estratégico | Esse lançamento é melhor que o anterior? | Pós-mortem |

> **Cada módulo é uma rota independente.** Se um falha, os outros continuam funcionando.

---

## Stack canônica (FIXA)

```yaml
Framework:    Next.js 14 (App Router)
Linguagem:    TypeScript (strict)
CSS:          Tailwind CSS 4
Componentes:  shadcn/ui
Gráficos:     Recharts
Tabelas:      TanStack Table v8
Data fetch:   SWR (revalidação automática)
XLSX:         SheetJS
Hospedagem:   Vercel
Standalone:   esbuild (bundle único · ~250 KB)
```

**Mesma stack das outras estruturas LPSG (paginas-lpsg-turbo).** Consistência arquitetural.

---

## Métricas-alvo consolidadas

```yaml
# Tráfego
ROAS_INGRESSO: ≥ 1.0 (mín) · ≥ 1.25 (ideal)
HOOK_RATE:     ≥ 20% · ≥ 30%
HOLD_RATE:     ≥ 5%  · ≥ 10%
BODY_RATE:     ≥ 2%  · ≥ 5%
CPM:           ≤ R$ 40

# Páginas
CONVERSAO:     ≥ 5% · ≥ 7%
LCP:           < 1.5s
LIGHTHOUSE:    ≥ 95
PESO:          < 1 MB

# Aulas
COMPARECIMENTO_A1: ≥ 30% dos inscritos
RETENCAO_A2:       ≥ 70% do pico A1
RETENCAO_A3-A5:    ≥ 85% da anterior
PITCH_BOOST_A6:    ≥ 130% do pico A5

# Conversão
CONVERSAO_PITCH:      ≥ 7% · ≥ 10%
PERCENT_VENDAS_DIA1:  ≥ 70%
RECUPERACAO_D1_D7:    5–15%

# Mensageria
PERCENT_UTILITY:  ≥ 80%
TAXA_ENTREGA:     ≥ 95%
TAXA_LEITURA:     ≥ 70%
```

---

## Princípios de execução

1. **Sempre pergunte qual modo** (A · Web app vs B · HTML standalone) antes de gerar código.
2. **Mobile-first.** Gestor abre no celular pra ver ROAS · pico · vendas. Desktop é bonus.
3. **Cada módulo carrega lazy.** Só `/visao-geral` carrega no boot. Resto sob demanda.
4. **Tsunami é o único real-time.** Polling 5s. Outros módulos: 30s SWR.
5. **Tokens server-only.** Meta · Hotmart · GA4 nunca expostos no browser. Use API Routes.
6. **Standalone não tem secrets.** Só XLSX manual ou Sheets público.
7. **Compatibilidade com v1.** Aceita o mesmo formato XLSX da v1. Sem retrabalho.
8. **Score de saúde.** A `/visao-geral` mostra um score 0–100 consolidado dos 9 módulos.
9. **Insights automáticos.** Engine compara métricas entre si (ex: "ROAS bom + Hook fraco = público qualificado · escalar agressivo").

---

## Referências internas

Toda vez que o usuário pedir detalhe específico, consulte os arquivos em `references/`:

- `00-variaveis-globais.md` — Variáveis · alvos · fontes de dados
- `01-arquitetura.md` — Stack · estrutura de pastas · 2 modos
- `02-modulos-do-dashboard.md` — 9 módulos detalhados
- `03-fonte-de-dados.md` — 6 modos de input · adapters · schema
- `04-alertas-e-diagnostico.md` — Motor de regras · score · insights
- `05-deploy-e-modos-de-output.md` — Vercel · standalone · checklist

---

## Skills relacionadas

- `paginas-lpsg-turbo` — mesma stack (Next.js + Tailwind + Vercel) · página de ingresso
- `trafego-lpsg-turbo` — alimenta `/trafego` (Hook/Hold/Body Rate · 4 ações)
- `mensageria-lpsg-turbo` — alimenta `/mensageria` (Utility vs Marketing · entrega)
- `oferta-lpsg-turbo` — alimenta `/tsunami` (4 janelas · 6h50/7h00/10h/23h59)
- `estrutura-aulas-lpsg-turbo` — alimenta `/aulas` (pico ao vivo · retenção)

---

**Fonte:** método LPSG do Leo Tabari (Turbo Academy). Validado em 12 meses de operação multi-nicho.
