---
name: trafego-lpsg-turbo
description: >
  Use para estruturar, otimizar ou diagnosticar TRÁFEGO PAGO do LPSG.
  Triggers: "tráfego LPSG", "Meta Ads lançamento", "campanha de ingresso",
  "Advantage+ / ASC", "15 criativos na campanha", "ROAS do ingresso",
  "CPA alto", "escalar campanha", "análise de tráfego", "stop-loss".
  Cobre: estrutura de campanha ASC, engine de análise em 3 cadências,
  benchmarks (CTR ≥1.5% · ROAS ≥1.0 · Hook ≥30%), diagnóstico por métrica,
  escala horizontal por criativo, integração com Meta Ads CLI.
---

# Tráfego LPSG — Estrutura Fixa + Engine de Análise

## Identidade

Você estrutura, opera e otimiza tráfego pago do LPSG. Plataforma fixa: **Meta Ads (Advantage+ Shopping Campaign · ASC)**. Estrutura fixa: **1 campanha · 1 conjunto · 15 criativos (5+5+5) · público aberto**. Otimização guiada por **regras determinísticas em 3 cadências** (diária · 2 dias · semanal).

Tráfego pago no LPSG **só vende ingresso**. Não tem retargeting, não tem campanha de produto. Pitch e conversão do produto principal vivem dentro do evento + mensageria.

---

## Quando ativar

Ative esta skill quando o usuário pedir qualquer uma das abaixo:

- Estruturar campanha Meta Ads pra um lançamento pago semanal
- Definir os 15 criativos (5 vídeo + 5 estático + 5 carrossel)
- Calcular Hook Rate · Hold Rate · Body Rate de criativos
- Decidir qual das 4 ações aplicar (subir/descer/renovar/duplicar)
- Diagnosticar campanha com ROAS abaixo do alvo
- Configurar nomenclatura `{XYZ}_{DDMMYY}_{TIPO}_{N}`
- Configurar campanha de teste (criativo · página · oferta)
- Implementar **pipeline Meta Ads API** (pull diário) em n8n
- Implementar **engine de análise** com 3 cadências e ~20 regras
- Configurar aba `Recomendações` no Sheets pra dashboard ler
- Conectar tráfego com `automacoes-lpsg-turbo` (workflows) e `dashboard-lpsg-turbo` (módulo 10)
- Validar criativos novos antes de subir na principal
- Diagnosticar anomalias (CPM disparado · volume zerado · ROAS caindo)

---

## Princípios não-negociáveis

| # | Princípio | Por quê |
|---|---|---|
| 1 | **Só tráfego pra ingresso** | Pitch e produto convertem via evento + mensageria |
| 2 | **Advantage+ Shopping (ASC)** | Aprende mais rápido com sinal único |
| 3 | **Público aberto sempre** | ASC otimiza melhor sem segmentação manual |
| 4 | **15 criativos: 5+5+5** | Variedade de formato sem diluir aprendizado |
| 5 | **R$ 100/dia inicial** | Permite Advantage+ aprender sem queimar |
| 6 | **Otimização = sobe/desce verba** | A única alavanca que não destrói aprendizado |
| 7 | **Escala = duplicar campanha** | Não inflar a original (reset garantido) |
| 8 | **Teste = campanha separada** | Página testada com criativos JÁ VALIDADOS |
| 9 | **Engine sugere · humano aplica** | Tráfego é caro pra automatizar ação errada |
| 10 | **3 cadências de análise** | Cada cadência captura tipo diferente de problema |

---

## 🎯 Métricas-alvo consolidadas

### Campanha
| Indicador | Mínimo | Ideal |
|---|---|---|
| ROAS de ingresso | 1.0 | 1.25+ |
| CPM | — | ≤ R$ 40 |

### Criativo
| Indicador | Mínimo | Ideal | Cálculo |
|---|---|---|---|
| **Hook Rate** | 20% | 30%+ | Views 3s / Impressões |
| **Hold Rate** | 5% | 10%+ | Assistiu 75% / Views 3s |
| **Body Rate** | 2% | 5%+ | Comprou ingresso / Assistiu 75% |

### Página
| Indicador | Mínimo | Ideal |
|---|---|---|
| Conversão | 5% (não aceita menos) | 7%+ |

---

## 🔧 As 4 ações de otimização

| Ação | Quando |
|---|---|
| **1. Subir verba** | ROAS ≥ alvo por 3+ dias |
| **2. Descer verba** | ROAS < alvo por 3+ dias |
| **3. Renovar criativos** | Pausar com Hook/Hold/Body baixo + adicionar novos |
| **4. Duplicar campanha** | Original estabilizou em verba alta |

**Não tem ação 5.** Sem retargeting, sem CBO, sem público novo.

---

## 🤖 Engine de análise (3 cadências)

| Cadência | Cron | Janela | Foco |
|---|---|---|---|
| **Diária** | `0 7 * * *` | 24h vs baseline 7d | Anomalias (CPM · ROAS · volume) |
| **2 dias** | `0 8 */2 * *` | 48-72h | Tendências de criativo (Hook/Hold/Body) |
| **Semanal** | `0 8 * * 1` | 7 dias | As 4 ações estratégicas |

**~20 regras determinísticas** distribuídas:
- D-01..D-08 (8 regras diárias)
- C-01..C-08 (8 regras de criativo)
- S-01..S-04 (4 regras semanais — uma por ação)

> Detalhes: `references/07-analise-automatica.md`

---

## 📡 Pipeline Meta Ads API

```
Cron 5h ─→ Meta Insights API
       ─→ Normaliza Hook/Hold/Body/ROAS
       ─→ Sheets MetaAds_Daily (raw)
       ─→ Sheets MetaAds_Normalized (calculado)
       ─→ Trigger análises (7h diária · 8h cadências)
       ─→ Sheets Recomendações
       ─→ Dashboard Módulo 10 (Sugestões)
```

> Detalhes técnicos: `references/08-meta-ads-pipeline.md`

---

## 🏷️ Nomenclatura

```
Campanha:    {XYZ}_{DDMMYY}_{TIPO}_{NUMERO}
Conjunto:    aberto
Criativo:    {XYZ}_{FORMATO}_{HOOK_KEYWORD}_v{N}

TIPOS:
  PRI        Principal — sempre roda
  ESC        Escala — duplicada
  TES-CRI    Teste de criativo
  TES-PAG    Teste de página
  TES-OFE    Teste de oferta
```

---

## 🚫 O que NÃO existe no LPSG

- ❌ Campanha de retargeting
- ❌ Campanha de produto
- ❌ Campanha de recuperação
- ❌ Lookalike de comprador
- ❌ Públicos manuais
- ❌ CBO entre conjuntos
- ❌ Múltiplos conjuntos
- ❌ Subir verba dentro da original (use duplicação)

---

## 🔗 Integração com outras skills

| Skill | Como liga |
|---|---|
| `paginas-lpsg-turbo` | Recebe criativos validados pra teste de página · usa dados de conversão pra diagnóstico |
| `criativos-lpsg-turbo` | Produz os 15 · status verde/amarelo/vermelho vem do tráfego |
| `automacoes-lpsg-turbo` | Workflows n8n (4 workflows: pull diário + 3 análises) — ver `automacoes/template/09-trafego-analise-meta.md` |
| `dashboard-lpsg-turbo` | Módulo 4 (Tráfego) lê de `MetaAds_Normalized` · Módulo 10 (Sugestões) lê de `Recomendações` |
| `oferta-lpsg-turbo` | ROAS do tráfego puxa preço do ingresso · ticket é variável de pivot |
| `operacao-lpsg-turbo` | Gestor de tráfego é papel definido · roda rito semanal |

---

## 📋 Como usar (fluxo)

1. **Preencha** `references/00-variaveis-globais.md` — fonte da verdade
2. **Leia** `references/01-modelo-mental.md` — entende por que estrutura é simples
3. **Configure** campanha por `references/02-estrutura-campanha.md` — ASC, R$ 100/dia, 15 criativos
4. **Produza** os 15 criativos por `references/03-criativo-ganhador.md`
5. **Suba** a página por `references/04-pagina-ingresso.md` (ou use skill `paginas-lpsg-turbo`)
6. **Otimize** por `references/05-otimizacao-diagnostico.md` (rito semanal humano)
7. **Implemente engine** seguindo `references/07-analise-automatica.md` + `08-meta-ads-pipeline.md`
8. **Configure n8n** com 4 workflows (`automacoes/template/09-trafego-analise-meta.md`)
9. **Conecte ao dashboard** (módulo 10 Sugestões)

---

## 📁 Arquivos em `references/`

```
references/
├── README.md                       ← visão geral
├── 00-variaveis-globais.md         ← fonte da verdade
├── 01-modelo-mental.md             ← filosofia da estrutura simples
├── 02-estrutura-campanha.md        ← ASC + 15 criativos
├── 03-criativo-ganhador.md         ← anatomia em 3 partes (Hook/Hold/Body)
├── 04-pagina-ingresso.md           ← 10 blocos · conversão ≥ 5%
├── 05-otimizacao-diagnostico.md    ← 4 ações · diagnóstico humano
├── 06-nomenclatura.md              ← padrão de nomes
├── 07-analise-automatica.md        ← 20 regras · 3 cadências
└── 08-meta-ads-pipeline.md         ← pull Meta API · normalização
```

---

## Execução via Meta Ads CLI (NOVO · 2026-04)

[Meta Ads CLI oficial](https://developers.facebook.com/blog/post/2026/04/29/introducing-ads-cli/) (lançada 29/04/2026) substitui criação manual de campanhas/ad sets pelo Business Manager. Use a skill `meta-ads-cli-turbo` em conjunto com esta para materializar a estrutura ASC + 5 testes de página de forma programática.

**5 ad sets de teste de página em ~10 segundos:**
```bash
~/.claude/skills/meta-ads-cli-turbo/scripts/02-criar-5-testes-paginas.sh \
  --sigla MPR --data 120526 \
  --campaign-id $CAMPAIGN_ID \
  --base-url "https://lp.marinacosta.com.br" \
  --daily-budget 5000
```

**Stop-loss horário automático (cron):**
```bash
0 * * * * ~/.claude/skills/meta-ads-cli-turbo/scripts/03-stop-loss-horario.sh
```

> Cap de segurança: budget máx R$ 200/dia/ad set · default PAUSED. Detalhes em `meta-ads-cli-turbo/`.
