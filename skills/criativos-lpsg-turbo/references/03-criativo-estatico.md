# 03 · Criativo estático — 5 por batelada · com foto do expert

> Imagem única (1080×1350 ou 1080×1080) · headline forte · foto do expert obrigatória.

> **🚫 PROIBIÇÕES anti-venda:** botão CTA gigante neon · CAPSLOCK ("GARANTE A SUA VAGA" · "CLIQUE AQUI") · selo OFICIAL/PREMIUM/MASTER · countdown timer · brilho/glow falso · 3 emojis enfileirados · setas amarelas · "POR APENAS R$ XX". Cara de conteúdo, não de venda. Detalhes em `10-cara-de-conteudo.md`.

---

## 🎯 Por que estático ainda funciona

```
✅ Custa 0 (vs vídeo · custo de produção)
✅ Hook visual instantâneo (não precisa esperar 3s)
✅ Funciona em conexão lenta (sem buffering)
✅ Performance no feed Insta + FB feed igual
✅ Editar é trivial (trocar copy · trocar foto · subir)
```

> Estático **NÃO é o formato fraco** da batelada. Em LPSGs, estático costuma ter ROAS competitivo com vídeo.

---

## 📐 Especificações

```yaml
FORMATO_PRINCIPAL:        "1080×1350 (4:5 · feed prioridade)"
FORMATOS_EXTRA:
  - "1080×1080 (1:1 · feed quadrado)"
  - "1080×1920 (9:16 · stories/reels estático)"
PESO_MAX:                 "30 MB"
TIPO_ARQUIVO:             "PNG (recomendado · transparência) ou JPG"
RESOLUCAO_MIN:            "1080×1350 (não enviar menor)"
TEXTO_NA_IMAGEM:          "≤ 20% da área (regra Meta legacy · ainda pesa em CPM)"
```

---

## 🧱 Anatomia de um estático LPSG

```
┌──────────────────────────────────────┐
│                                       │
│   [LOGO PEQUENO TOPO ESQUERDO]        │  ← branding sutil (opcional)
│                                       │
│   ┌─────────────────────────────┐     │
│   │                              │     │
│   │   FOTO DO EXPERT              │     │  ← ocupa 40-60% da área
│   │   (recorte · fundo limpo)     │     │     SEMPRE PRESENTE
│   │                              │     │
│   └─────────────────────────────┘     │
│                                       │
│   HEADLINE GIGANTE                    │  ← 6-8 palavras · alta hierarquia
│   subtítulo aqui em uma linha         │  ← 8-12 palavras · contexto
│                                       │
│   [BOTÃO/CTA visual]                  │  ← cor de destaque · texto curto
│                                       │
│   ╳ data · valor · prova social ╳     │  ← rodapé · informação contextual
└──────────────────────────────────────┘
```

### Hierarquia visual (regra de ouro)

```
1. FOTO DO EXPERT (50% atenção)
2. HEADLINE        (30% atenção)
3. CTA / VALOR     (15% atenção)
4. DETALHES        (5% atenção)
```

> Se você inverteu (texto gigante · foto pequena) o criativo morre. O **rosto vende**.

---

## 🎭 Os 5 estáticos da batelada — paleta única + copy profunda

> **Cada estático tem identidade própria.** Paleta, tipografia, tom de copy e ângulo de dor são DIFERENTES entre os 5. Detalhes completos das paletas em `09-paletas-diferenciadas.md`.

---

### EST_001 — Editorial Premium (autoridade · número como argumento)

```yaml
HOOK_TIPO:               "Quebra de padrão estrutural · não emocional"
PALETA_BASE:             "PALETA 1 — Editorial Premium"
COR_DOMINANTE:           "#0A0A0A preto profundo (60%)"
COR_SECUNDARIA:          "#F4F1EA off-white aquecido (30%)"
COR_DESTAQUE:            "#D4AF37 dourado champagne (10%) — número e CTA"
TIPOGRAFIA:              "Headline em serif editorial (Instrument Serif Italic) + body sans-serif"
FOTO:                    "Expert sério · olhar direto · ¾ rosto · iluminação Rembrandt"
FUNDO:                   "Preto profundo · grão sutil · papel imprensa"
COMPOSIÇÃO:              "Foto à direita 50% · texto à esquerda · respiro generoso"

HEADLINE (≤ 14 palavras · com pausa dramática · vírgula ou travessão):
  "Demitir 80% da equipe — e crescer 11x. Não é narrativa motivacional. É contabilidade."

SUBTÍTULO (≤ 25 palavras · contexto + dado):
  "Em 18 meses cortei a operação para 3 pessoas. Faturamento subiu 11x.
  A diferença não foi 'método'. Foi parar de contratar pra parecer ocupado."

CTA (convite editorial · pequeno · rodapé · NUNCA botão neon):
  "Próximo capítulo na próxima aula. Link na bio se quiser ler."

COPY_DO_ANUNCIO (Meta · ≤ 90 palavras):
  "Existe uma matemática operacional que ninguém ensina em curso de marketing:
  cada pessoa nova na equipe consome 1.4x mais tempo do dono em coordenação
  do que produz em entrega. Esse é o motivo pelo qual operações inchadas estagnam.
  Vou mostrar nos próximos 5 dias o desenho exato de uma operação enxuta que
  fatura 1M/mês com 3 pessoas. Sem teoria. Com print, com planilha, com a
  estrutura do meu próprio negócio. Próxima edição abre segunda."

DOR_QUE_ATACA:           "Identidade · estrutura · maturidade operacional"
```

---

### EST_002 — Bold Pop (choque numérico · sem floreio)

```yaml
HOOK_TIPO:               "Promessa numérica chocante · imperativo"
PALETA_BASE:             "PALETA 2 — Bold Pop"
COR_DOMINANTE:           "{COR_PRIMARIA_SATURADA} (60%) — ex: #FF5C00 vivo"
COR_SECUNDARIA:          "#FFFFFF branco puro (30%)"
COR_DESTAQUE:            "#0F0F10 preto · texto crítico (10%)"
TIPOGRAFIA:              "Sans-serif extra-bold (Space Grotesk Black · Druk · Migra)"
FOTO:                    "Expert apontando · sorrindo confiante · enquadramento mais aberto"
FUNDO:                   "Cor sólida laranja vibrante · zero gradiente · zero textura"
COMPOSIÇÃO:              "Headline OCUPA o frame (40%) · foto à direita 35% · CTA fundo"

HEADLINE (≤ 8 palavras · 3 frases curtas · zero ornamento):
  "R$ 1.347.892 em 5 dias.
  3 pessoas. 0 ads novos."

SUBTÍTULO (≤ 18 palavras · prova + oferta):
  "Resultado real. Print abaixo. Auditoria sob pedido.
  Próxima edição segunda · R$ 62 a vaga · vão 50."

CTA (rodapé pequeno · NUNCA botão neon · NUNCA CAPSLOCK comando):
  "Aula 1 segunda · 7h · link na bio"

COPY_DO_ANUNCIO (Meta · ≤ 60 palavras · direto · zero linguagem de venda):
  "1.347.892 reais em 5 dias com 3 pessoas operando.
  Print da Hotmart no comentário fixado.
  Vou mostrar o desenho exato dessa operação na próxima edição.
  Começa segunda · R$ 62 · 50 pessoas no total.
  Quem reconhece o que tô falando, entende o link de baixo. Os demais ficam pra próxima."

DOR_QUE_ATACA:           "Financeira · estagnação concreta · 'eu também queria isso'"
```

---

### EST_003 — Raw / Honest (confissão · primeira pessoa · UGC-feel)

```yaml
HOOK_TIPO:               "Pergunta pessoal · admissão · vulnerabilidade"
PALETA_BASE:             "PALETA 3 — Raw / Honest"
COR_DOMINANTE:           "#FBFAF7 bege quase branco · papel reciclado (60%)"
COR_SECUNDARIA:          "#3A3A3A grafite suave (30%)"
COR_DESTAQUE:            "{COR_PRIMARIA} a 70% saturação · pequena (10%)"
TIPOGRAFIA:              "Mono (JetBrains Mono · IBM Plex Mono) ou Inter Light"
FOTO:                    "Expert pensativo · olhar lateral · iluminação natural · sem maquiagem"
FUNDO:                   "Cenário cotidiano (mesa · cozinha · escritório real) · grão visível"
COMPOSIÇÃO:              "Foto ocupa 60-70% · texto sobreposto canto inferior · UGC pose"

HEADLINE (≤ 18 palavras · pergunta pessoal · pausa antes do gancho):
  "Trabalhei 14h por dia durante 3 anos.
  Por que ninguém me falou que eu tava fazendo errado?"

SUBTÍTULO (≤ 22 palavras · admissão + convite suave):
  "Eu achava que mais horas = mais resultado. Era só ego, na verdade.
  Se você se reconhece nisso, talvez essa próxima conversa importe."

CTA (convite humano · sem pressão · empático · texto pequeno):
  "Se isso fala com você, te espero. Se não, tudo bem também."

COPY_DO_ANUNCIO (Meta · ≤ 100 palavras · primeira pessoa · sem 'gurês'):
  "Eu odiava quem dizia 'trabalha menos e ganha mais'. Soava como discurso
  de quem nunca teve dívida na conta no dia 5 do mês.
  Mas em 2024 alguém me mostrou um desenho de operação que eu não tinha
  visto em nenhum curso. Cortei equipe, automatizei 60% das tarefas,
  e o faturamento subiu. Não cresci porque trabalhei mais. Cresci porque parei
  de tentar resolver problema de estrutura com força bruta.
  Vou mostrar esse desenho na próxima edição. Se isso fala com você, te
  espero lá. Se não, tudo bem também."

DOR_QUE_ATACA:           "Identidade · burnout · ceticismo · cansaço de promessa pronta"
```

---

### EST_004 — Dark Cinema (transformação · narrativa em 3 atos)

```yaml
HOOK_TIPO:               "Pergunta retórica densa · before/after dramático"
PALETA_BASE:             "PALETA 4 — Dark Cinema"
COR_DOMINANTE:           "#0F1115 preto azulado profundo (60%)"
COR_SECUNDARIA:          "#1F2937 cinza-azul · sombra (30%)"
COR_DESTAQUE:            "{COR_PRIMARIA} brilhante com glow/bloom (10%)"
TIPOGRAFIA:              "Display moderno (Migra · Söhne · Druk Wide) + body Inter Medium"
FOTO:                    "Expert em iluminação rim light · perfil ¾ · expressão grave"
FUNDO:                   "Profundidade de campo rasa · vinheta · luz lateral cinematográfica"
COMPOSIÇÃO:              "Split visual · ANTES (cinza) à esquerda · DEPOIS (cor) à direita"

HEADLINE (≤ 20 palavras · pergunta retórica que abre cena):
  "O que você faz com 14 horas livres por dia,
  todos os dias, pelo resto da vida?"

SUBTÍTULO (≤ 28 palavras · resposta narrativa em 2 frases):
  "Eu construí uma engrenagem que não exige minha presença pra rodar.
  6h/dia · 1M/mês · 3 pessoas operando.
  Vou te mostrar o desenho exato dela na próxima edição."

CTA (frase grave no rodapé · não comando · não botão neon):
  "Próxima aula. Quem reconhece, encontra o caminho."

COPY_DO_ANUNCIO (Meta · ≤ 110 palavras · arco em 3 atos):
  "ATO 1 — 2021: eu trabalhava 14h por dia. Equipe de 12 pessoas.
  Eu era o gargalo. Tudo passava por mim.

  ATO 2 — 2023: descobri uma forma de desenhar operação que NÃO precisa
  do dono dentro pra rodar. Cortei pra 3 pessoas. Automatizei 60%.

  ATO 3 — hoje: 1M/mês · 6h/dia · viajei 4x esse ano sem perder dia
  de operação. A engrenagem roda sozinha.

  Vou mostrar nos próximos 5 dias o desenho dessa engrenagem. Aula 1
  segunda · 7h. Vai ter print, vai ter planilha, vai ter o organograma
  exato. Sem teoria. Reserve sua entrada no link."

DOR_QUE_ATACA:           "Tempo · liberdade · transformação completa"
```

---

### EST_005 — Outlier · DESTAQUE DA BATELADA (provocação · pattern interrupt)

> **Este é o criativo que se destaca dos outros 4.** Cor inesperada pro nicho. Quebra regras visuais propositalmente. Pra forçar pattern interrupt no feed.

```yaml
HOOK_TIPO:               "Polarização · ataque ao senso comum · toma um lado"
PALETA_BASE:             "PALETA 5 — Outlier"
COR_DOMINANTE:           "Cor INESPERADA pro nicho (60%):"
                         "  Negócios → rosa pink #FF2E93"
                         "  Saúde → laranja acid #FF6B00"
                         "  Educação → roxo elétrico #7C3AED"
                         "  Beleza → verde neon #00D67D"
                         "  Tech → amarelo Pantone #FFD500"
COR_SECUNDARIA:          "#0A0A0A preto · âncora visual (30%)"
COR_DESTAQUE:            "#FFFFFF branco puro (10%) — pra CTA respirar"
TIPOGRAFIA:              "Display experimental (Söhne Breit · Larsseit · Migra Italic)"
FOTO:                    "Expert OLHAR DESAFIADOR · pode ser foto menor (40% área)"
FUNDO:                   "Cor sólida chapada · zero textura · risco de saturação Meta"
COMPOSIÇÃO:              "Centralizada (quebra regra dos terços dos outros 4)"
                         "Foto MENOR · texto OCUPA o frame · pode usar emoji gigante"

HEADLINE (≤ 16 palavras · frase que ataca o senso comum):
  "Guru de marketing que vende lançamento e nunca fez um
  é o novo MLM."

SUBTÍTULO (≤ 24 palavras · posicionamento + filtro):
  "Eu rodei 47 lançamentos pagos em 12 meses. Sei o que falo. Eles não.
  Se você tá cansado de promessa pronta, vale 5 minutos do seu tempo."

CTA (filtro pessoal · texto rodapé · não comando):
  "Pra quem leva isso a sério. Os demais ficam pra próxima."

COPY_DO_ANUNCIO (Meta · ≤ 120 palavras · provocação + prova + filtro):
  "Vou ser direto: 80% dos cursos de lançamento que você vê no Instagram
  são vendidos por gente que NUNCA fez um lançamento próprio que tenha
  passado de R$ 100k. Eles ensinam o que aprenderam revendendo curso
  dos outros.

  Eu rodei 47 lançamentos pagos próprios nos últimos 12 meses. Soma
  R$ 14.2M em receita. Auditoria aberta sob pedido (já fiz pra 8
  pessoas que pediram).

  Próxima edição abre segunda. R$ 62 · 50 vagas · 5 aulas + 1 pitch.
  Não vou dar live de réplica · não vou estender prazo · não vou ter
  bônus de última hora. Você entra agora ou fica pra próxima.

  Quem leva isso a sério, leva sério."

DOR_QUE_ATACA:           "Ceticismo + raiva acumulada por promessas vazias"

QUEBRAS_PERMITIDAS_NESTE_CRIATIVO:
  - Cor que NÃO aparece em nenhum dos outros 14 da batelada
  - Texto pode ocupar até 30% (em vez do limite Meta 20% — risco controlado)
  - Foto do expert pode ser MENOR que nos outros 4 (40% em vez de 50-60%)
  - Pode usar emoji ou símbolo gigante como elemento gráfico
  - Composição centralizada (se outros 4 usam regra dos terços)

OBJETIVO:
  - Ser o criativo SCREENSHOTADO e mandado em DM
  - Polarizar · gerar comentário "amei" ou "que ódio"
  - ASC capta engagement extremo e escala
```

---

## ✍️ Copy de cada estático (template)

```markdown
# EST_{NUMERO}

## Headline (na imagem)
"{HEADLINE_8_PALAVRAS_MAX}"

## Subtítulo (na imagem)
"{SUBTITULO_12_PALAVRAS_MAX}"

## CTA (na imagem)
[{TEXTO_BOTAO_3_PALAVRAS}]

## Copy do anúncio (no Meta)
{HOOK_FRASE_CHOQUE}

{BODY_2_LINHAS_DESENVOLVIMENTO}

{PROVA_SOCIAL_OU_QUEBRA_OBJECAO}

👇 Garante a sua vaga no link da bio · {DATA_EVENTO} · {TICKET_INGRESSO}

## Hashtags (Meta autopreenche · não usar)
—

## Foto do expert
Tipo: {HEADSHOT | RINDO | PALCO | MAOS}
Recorte: {SIM | NAO}
Fundo: {DARK | CLARO | GRADIENTE | FOTO_CINEMATIC}

## Variáveis preenchidas
SIGLA: {SIGLA}
DATA_BATELADA: {DDMMYY}
NOME_ARQUIVO: {SIGLA}_{DDMMYY}_EST_{NUMERO}.png
```

---

## 🎨 Diretrizes de design

### Tipografia

```yaml
HEADLINE:
  fonte:        "{FONTE_HEADLINE}"             # ex: Space Grotesk Bold
  tamanho:      "120-160pt"                    # gigante · legível em thumbnail
  peso:         "Bold ou Black"
  alinhamento:  "esquerda (preferencial) ou centro"

SUBTITULO:
  fonte:        "{FONTE_CORPO}"                # ex: Inter Regular
  tamanho:      "32-44pt"
  cor:          "{COR_FUNDO} contrastante"

CTA_BOTAO:
  fonte:        "{FONTE_CORPO} Bold"
  tamanho:      "36-48pt"
  bg_color:     "{PALETA_DESTAQUE}"
  cor_texto:    "preto ou branco (dependendo do fundo)"
```

### Composição

```yaml
GRID:                     "rule of thirds (regra dos terços)"
EXPERT_POSICAO:           "à direita ou centro · NUNCA atrás do texto"
TEXTO_AREA:               "à esquerda · 40-50% da imagem"
RESPIRO:                  "20% margens · não sufocar"
LOGO_TAMANHO:             "10% da área (canto · sutil)"
```

### Cores — 5 paletas distintas (ver 09-paletas-diferenciadas.md)

> Cada estático usa UMA das 5 paletas-base. NÃO usar a mesma paleta em mais de um estático da batelada.

```yaml
EST_001 → PALETA 1 (Editorial Premium)   # serif · preto/bege/dourado
EST_002 → PALETA 2 (Bold Pop)            # extra-bold · cor saturada chapada
EST_003 → PALETA 3 (Raw / Honest)        # mono · bege/grafite · UGC
EST_004 → PALETA 4 (Dark Cinema)         # display · preto azul · glow
EST_005 → PALETA 5 (Outlier)             # cor inesperada · pattern interrupt
```

---

## ✅ Checklist antes de subir

```
[ ] Foto do expert presente e em frame (rosto visível)
[ ] Headline ≤ 8 palavras
[ ] Subtítulo ≤ 12 palavras
[ ] CTA com comando de ação (não "saiba mais")
[ ] Texto na imagem ≤ 20% da área
[ ] Resolução 1080×1350 ou 1080×1080
[ ] Versão extra 1080×1920 (stories/reels)
[ ] Nomenclatura: SIGLA_DDMMYY_EST_NUMERO
[ ] Cor da paleta correta
[ ] Logo presente (canto superior · 10% área)
[ ] Tipografia respeita guidelines
[ ] Copy do anúncio (no Meta) escrita
[ ] Link de destino testado
```
