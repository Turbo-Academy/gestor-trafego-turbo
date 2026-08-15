# IA para escalar + benchmarks completos — Funil 8

> **v2026** (regravação 04/08/2026) onde marcado; **[v2025]** = curso gravado antigo, mantido porque ainda
> não foi substituído ponto a ponto.

## v2026 — O squad de agentes é o eixo

> *"Quem ainda não está usando o Claude Code ou outra ferramenta de IA que tenha agentes ou multiagentes,
> aprende logo — porque mais um tempinho, quem não souber vai estar fora do mercado."*

| Peça | O que faz |
|---|---|
| **Gestor de Tráfego Turbo** | Agente criado pelo Leo, **distribuído de graça** (link abaixo da aula ou "mega turbo" no direct). Cria a campanha, cria pixel, otimiza, evita queima de verba. *"Melhor do que 90% dos gestores de tráfego do Brasil."* · *"Meus alunos estão mandando gestores de tráfego embora."* |
| **Squad do Funil 8** | Cria o produto, a página, os criativos e o checkout. Página já sai mobile-first. |
| **Copy Turbo v9** | Migrando de GPT customizado pra Claude. |
| Mecanismo problema/solução | *"Deixo o Claude fazer, ele já está treinado pra isso."* |
| Order bumps | Jogar a pesquisa com os alunos na IA e pedir sugestões — "o jeito mais rápido de criar order bumps". |
| Produção de curso sem aparecer | Gerar as aulas por IA a partir de uma apostila (~R$2-3 mil em tokens) **ou** gravar normal e trocar o rosto por avatar. |

**Rotina manual que sobrou:** mandar o agente reconferir e desmarcar os aprimoramentos automáticos da Meta
**a cada ~3 dias** — a Meta remarca sozinha.

**Não está funcionando mais:** formulário de aplicação pra venda de mentoria.

## [v2025] Copy Turbo (IA de copy)

GPT customizado da Turbo Academy (link na descrição da aula; funcionaria em Claude/Grok/DeepSeek com o mesmo prompt, mas refinada/testada no ChatGPT). Treinada em "35 mil páginas" + transcrições de mais de 1.200 horas de vídeo do Leo com alunos + trabalho do copywriter da equipe (Emmanuel).

**Funções:** criação completa de produto de entrada · copy de página de vendas · estratégia de order bumps "que somam 8" · testes de criativos/copy de checkout · também serve pro Lançamento Pago (ingresso, arquitetura de oferta, bullets, narrativa, headlines, hooks, CTAs — bônus cruzado entre os dois cursos por terem estrutura de copy semelhante).

**Fluxo de uso:**
1. Descrever o momento/nicho com sinceridade ("estou começando, preciso de ativos para empresários que precisam de crédito...").
2. IA responde com diagnóstico de posicionamento (ex: "você está vendendo esperança embalada em burocracia... você vai vender o código secreto que destrava até R$300 mil em crédito").
3. Gera nome de produto com "autoridade + rebeldia" (ex: "Liberação Bancária Imediata", "Clube dos Aprovados").
4. Gera lote de criativos completos (hook + corpo + CTA) sob demanda ("preciso de mais 10 criativos como estes").
5. Gera oferta completa (nome, estrutura, promessa de abertura) estilo VSL.

**Trava ética explícita:** *"Aqui a IA não tem filtro, então ela vai te dar copy matadora... funciona até copy black. Se for verdade, você usa. Se não for verdade, avise ela [que precisa corrigir]."* — checar cada claim contra legalidade/veracidade antes de publicar.

## Stack de IA para landing pages e imagens (aula do webdesigner da equipe)

| Ferramenta | Função | Observação |
|---|---|---|
| **DeepSite** | Gera layout/HTML completo de landing page a partir de copy colada | Copiar copy inteira (inclusive FAQ) → colar → gerar. Aceita imagem como input (print de página/checkout → transcreve em copy) |
| **ChatGPT** | Auxilia em prompts de imagem e organização de copy | Complemento do fluxo |
| **ImageFX (Google)** | Geração de imagem gratuita, ilustração genérica | Não aceita rosto específico; só prompt textual; só inglês |
| **FreePik** | Geração de imagem com rosto real do expert (personagem), upscale, remoção de fundo, vídeo curto | Não é deepfake — sobe fotos de referência como "personagem", IA gera cenários/poses novas sem copiar rosto de outra foto. ~R$180/mês ou plano anual |
| **Manus** | Agente "computador virtual" — navega web, analisa documentos, clona páginas, research autônomo | Consome créditos rápido — "use com moderação" |
| **DeepSeek** | Fallback pra tarefas que o ChatGPT falha (ex: extrair texto de PDF travado como imagem) | — |

**Fluxo — página a partir de copy:**
1. Copiar toda a copy (headline, bullets, FAQ) sem formatar.
2. Colar no DeepSite → gerar.
3. Resultado: HTML completo + preview responsivo mobile-first.
4. Levar pro Elementor (WordPress) e recriar a diagramação manualmente (o HTML gerado não é diretamente editável no Elementor ainda — Hotmart Pages e GreatPages aceitam upload direto de HTML).
5. Alternativo: subir imagem (print de checkout) → ChatGPT transcreve → cola no DeepSite → gera página sem digitar nada.

**Fluxo — imagem com rosto do expert:**
1. Subir 3-5 fotos de referência (close, sorriso, perfil) no agente customizado de prompt.
2. Pesquisar no Pinterest uma pose/cenário de referência.
3. Subir essa imagem no agente → extrai prompt em português e inglês, deliberadamente sem descrever o rosto (só ambiente/pose/roupa).
4. Colar no FreePik, selecionar o personagem já treinado → gerar.
5. Resultado: imagem fotorrealista do expert na pose/cenário desejado.

**Recomendação de fluxo:** gerar sempre na maior qualidade possível (4K) e depois levar pra Photoshop/Canva pra ajustes finos — as IAs de geração erram dimensão em formatos variados.

## Tabela consolidada de benchmarks

### v2026 — vale hoje (regravação 04/08/2026)

| Métrica | Valor |
|---|---|
| Definição de low ticket | até **R$200** (foco de escala: R$17-98) |
| **Preço de teste padrão** | **R$35** |
| Preço de mais profundidade no funil | R$62 (público específico entra direto aqui) |
| R$17 | **queimado** — só se o CPM do nicho for ~R$9 |
| CPM médio de referência hoje | **~R$30** |
| Upsell — teto | até R$98 |
| Order bumps | **3 a 4**, **o mais caro primeiro** |
| **Order bump — participação no faturamento** | **mínimo 20%** |
| ROAS — caminho A | **zero a zero** com escala máxima (preferido) |
| ROAS — caminho B | **2 a 3** (infoproduto). Acima de 3 = "muito difícil" |
| ROAS produto físico | 3 a 4 (tem custo de produto + frete) |
| Prejuízo | nunca aceito |
| **Estratégia de lance** | **meta de custo por resultado (cost cap) = preço do produto** |
| **Verba mínima** | **R$50/dia** (ticket R$35) · **R$100/dia** (ticket R$62) |
| Piso real de verba | somar o carrinho total (produto + bumps = ticket médio) |
| Verba pra acelerar inteligência | ~R$300/dia, depois baixa |
| **Volume que gera inteligência** | **50 vendas em 7 dias** (≈8/dia) |
| Janela de decisão | 7 dias |
| Escala | ROAS >1 estável por 7 dias → **dobra a verba**; ROAS 4 por 7 dias → **quadruplica** |
| Volume de criativos | **10 estáticos (carrossel + estático) + 5 vídeos** |
| Gancho do vídeo | primeiros **15 segundos** |
| Duração de cada aula do produto | até **10 min** (máx. 15) |
| Formato alternativo | aulão workshop de **1-2h** (nunca mais que 2h) |
| Prazo da vitória rápida | **1-2 semanas** |
| Página — onde está a conversão | **2 primeiras dobras** |
| Impulsionar — orçamento | R$50/dia (mín. R$25) |
| Impulsionar — sobretaxa do app iOS | **~25-27%** (contorno: impulsionar pelo navegador) |
| Trava de reembolso Hotmart | **>10%** de reembolsos → comprador entra em hold |
| Conversão de ingresso — case de preço | 12-13% no preço cheio → **7%** com preço baixo (não compensou) |
| Rotina de reconferir aprimoramentos da Meta | a cada **~3 dias** |

### [v2025] — curso antigo, defasado ou não reconfirmado

| Métrica | Valor | Situação |
|---|---|---|
| Preço inicial de teste | R$17 | **substituído** por R$35 |
| Preços da escada | R$35, R$53, R$62 | parcialmente mantido |
| Ponto de queda de conversão | acima de R$62 | mantido |
| Order bumps | sempre 3, escadinha decrescente | **substituído** (3-4, mais caro primeiro) |
| ROAS ideal / mínimo | 1.2 / 1.1 | **substituído** (zero a zero ou 2-3) |
| ROAS de escala agressiva | acima de 2 | **substituído** (>1 estável por 7 dias já dobra) |
| Verba mínima | R$100/dia · alternativa R$500/dia | **substituído** por R$50/dia atrelado ao ticket |
| Estrutura de campanha | ASC (Advantage+ Shopping), maximizar conversões | **substituído** por Vendas + cost cap |
| Volume de criativos | 10-15 imagens + 2-5 vídeos (nunca <10) | **substituído** por 10 estáticos + 5 vídeos |
| Público salvo mínimo | 10 mil (leads) / 2-4 mil (alunos, achados pela Meta) | irrelevante — não se configura mais público |
| CTR — corte | abaixo de 1% → pausa | não reconfirmado, ainda razoável |
| Conversão de checkout | >10% inicial, 6-7% em escala; ~20% (gestor) | não reconfirmado |
| Conversão de página | ~10%, cai a 6-7% em escala | não reconfirmado |
| CPM ilustrativo | R$20-30 ideal / R$60-70 competitivo | defasado (regravação cita ~R$30 como média atual) |
| CTR ilustrativo | 1-1,5% padrão / 1,8-2,5% otimizado | não reconfirmado |
| Order bump — conversão saudável | 30% | **métrica trocada** por participação no faturamento ≥20% |
| Escala vertical | ~30% dentro da campanha | não reconfirmado |
| Cadência de renovação de criativos | "10 em 10" | não reconfirmado |
| Meta de renovação semanal | 50 criativos/semana | não reconfirmado |
| Tempo de gravação do curso completo | ~3h | mantido |
| Ticket do estudo de caso avançado | R$134/mês recorrente (SaaS, trading) | contexto da palestra, fora do padrão do Funil 8 |
| Prazo pro bônus Turbo Express | 7 dias corridos desde a matrícula | não reconfirmado |

## Os 5 ciclos da Estratégia Turbo

1. **Ciclo 1 — Funil 8** (este funil).
2. **Ciclo 2 — Turbo Express**: bônus grátis pra quem completa o Funil 8 em 7 dias. Promete "pelo menos R$20 mil limpinho no bolso todos os meses", mas o Leo esclarece: *"só vai colocar dinheiro no bolso com pessoas que já estão prontas para comprar — não vai escalar para ficar rico"*. Ver skill `turbo-express`.
3. **Ciclo 3 — C1/C2/C3 (Distribuição Turbo)**: descrito como "fundamental na escala, sem ela você não consegue escalar". Ver skill `distribuicao-turbo`.
4. **Ciclo 4 — Lançamento pago**: método semanal, sem aquecimento longo, 7 aulas ao vivo 1x/mês, conversão citada acima de 10%. Crédito explícito a Érico Rocha pela metodologia de lançamento.
5. **Ciclo 5 — Gestão/operação**: financeiro, impostos, equipe, contratação — pra quem já escalou.

**Oferta de topo citada:** "Estratégia Turbo" (mentoria paga, ticket não revelado — "não é barato, é um curso mais caro para um público mais qualificado"). Formato: cursos + 2 calls em grupo por mês via Zoom (1-3h, não gravadas), garantia de devolução declarada.

**Case anônimo de diferenciação de ticket:** dois especialistas da operação do Leo rodam o mesmo framework (Funil 8 + Distribuição Turbo + Lançamento Pago) com tickets de produto principal completamente diferentes (~R$1.500 vs ~R$14.300) — "a lógica é a mesma, a execução é diferente" por nicho/avatar.
