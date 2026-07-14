# IA para escalar + benchmarks completos — Funil 8

## Copy Turbo (IA de copy)

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

## Tabela consolidada de benchmarks (sem arredondar)

| Métrica | Valor | Fonte |
|---|---|---|
| Preço inicial de teste | R$17 | Curso |
| Preços de teste seguintes (escada) | R$35, R$53, R$62 | Curso |
| Ponto de queda de conversão | acima de R$62 | Curso |
| Upsell — teto | até R$98 | Curso |
| Order bumps | sempre 3, escadinha decrescente | Curso |
| ROAS ideal | 1.2 | Curso |
| ROAS mínimo | 1.1 | Curso |
| ROAS de escala agressiva | acima de 2 | Curso |
| CTR — corte | abaixo de 1% → pausa | Curso |
| Conversão de checkout — meta inicial | acima de 10% | Curso |
| Conversão de checkout — fase de escala | 6-7% | Curso |
| Verba mínima de campanha | R$100/dia | Curso |
| Verba alternativa (caixa maior) | R$500/dia | Curso |
| Volume de criativos por conjunto | 10-15 imagens + 2-5 vídeos (nunca <10) | Curso |
| Meta de renovação semanal de criativos | 50/semana | Curso |
| Tempo de gravação do curso completo | ~3h | Curso |
| Duração de cada aula do produto | 10-20min (mín. 7-8min) | Curso |
| Público salvo mínimo (leads) | 10 mil | Curso / Palestra do gestor de tráfego |
| Público salvo mínimo (alunos) | 2-4 mil "achados" pela Meta | Palestra do gestor de tráfego (refinamento, não contradição) |
| Order bump — conversão saudável | 30% | Palestra do gestor de tráfego |
| Conversão de checkout saudável (gestor de tráfego) | ~20% | Palestra do gestor de tráfego |
| Conversão de página (gestor de tráfego) | ~10%, cai 6-7% em escala | Palestra do gestor de tráfego |
| CPM ilustrativo | R$20-30 ideal / R$60-70 competitivo / R$30-40 (equipe, trading) | Palestra do gestor de tráfego |
| CTR ilustrativo | 1-1,5% padrão / 1,8-2,5% (equipe, trading) | Palestra do gestor de tráfego |
| Escala vertical (aumento por vez) | ~30% dentro da campanha | Palestra do gestor de tráfego |
| Ticket estudo de caso avançado | R$134/mês recorrente (SaaS) | Palestra do gestor de tráfego |
| Cadência de renovação de criativos | "10 em 10" | Palestra do gestor de tráfego |
| Prazo pro bônus Turbo Express | 7 dias corridos desde a matrícula | Aula 0 |

## Os 5 ciclos da Estratégia Turbo

1. **Ciclo 1 — Funil 8** (este funil).
2. **Ciclo 2 — Turbo Express**: bônus grátis pra quem completa o Funil 8 em 7 dias. Promete "pelo menos R$20 mil limpinho no bolso todos os meses", mas o Leo esclarece: *"só vai colocar dinheiro no bolso com pessoas que já estão prontas para comprar — não vai escalar para ficar rico"*. Ver skill `turbo-express`.
3. **Ciclo 3 — C1/C2/C3 (Distribuição Turbo)**: descrito como "fundamental na escala, sem ela você não consegue escalar". Ver skill `distribuicao-turbo`.
4. **Ciclo 4 — Lançamento pago**: método semanal, sem aquecimento longo, 7 aulas ao vivo 1x/mês, conversão citada acima de 10%. Crédito explícito a Érico Rocha pela metodologia de lançamento.
5. **Ciclo 5 — Gestão/operação**: financeiro, impostos, equipe, contratação — pra quem já escalou.

**Oferta de topo citada:** "Estratégia Turbo" (mentoria paga, ticket não revelado — "não é barato, é um curso mais caro para um público mais qualificado"). Formato: cursos + 2 calls em grupo por mês via Zoom (1-3h, não gravadas), garantia de devolução declarada.

**Case anônimo de diferenciação de ticket:** dois especialistas da operação do Leo rodam o mesmo framework (Funil 8 + Distribuição Turbo + Lançamento Pago) com tickets de produto principal completamente diferentes (~R$1.500 vs ~R$14.300) — "a lógica é a mesma, a execução é diferente" por nicho/avatar.
