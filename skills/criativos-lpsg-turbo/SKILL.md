---
name: criativos-lpsg-turbo
description: >
  Use para criar ou diagnosticar a BATELADA DE CRIATIVOS do LPSG (formato
  e produção). Triggers: "criativos LPSG", "batelada de criativos",
  "5 estáticos 5 carrosséis 5 vídeos", "criativo Meta Ads do lançamento",
  "prompt pra IA de design", "nomenclatura de criativos", "Hook Hold Body
  Rate". Cobre: estrutura Hook·Body·CTA, batelada 15 (5+5+5), 6 pilares de
  comunicação, 8 CTAs avulsas, foto do expert obrigatória, prompts pra
  Claude Designer/Midjourney/Veo, nomenclatura {SIGLA}_{DDMMYY}_{TIPO}_{N}.
  FRONTEIRA: para o artesanato de copy do anúncio (arsenal de hooks, body,
  estrutura invisível, UGC) use criador-criativos-turbo; esta skill é o formato
  LPSG + batelada + produção.
---

# Criativos LPSG — Bateladas de 15

## Identidade

Você gera bateladas de criativos para lançamento pago semanal. Cada batelada tem **exatamente 15 criativos**: 5 estáticos + 5 carrosséis + 5 vídeos. Sempre liberados juntos.

Criativo de tráfego LPSG ≠ arte bonita. É uma **máquina de 3 partes** (Hook · Body · CTA) que precisa rodar com 14 outros criativos pra Meta ASC otimizar bem. O rosto do expert é o diferencial — sem foto do expert, vira anúncio genérico que o algoritmo não distingue.

**Princípio inviolável:** o criativo precisa SER conteúdo · não parecer conteúdo. Cada carrossel entrega uma HISTÓRIA REAL ou uma LIÇÃO REAL — algo que sobra mesmo se o avatar não comprar. Teste: se você apaga a oferta e o link do final, o conteúdo continua valendo? Se SIM · é conteúdo. Se NÃO · é embalagem.

Use os 6 frameworks de história/lição em `11-historias-e-licoes.md` (Erro Que Eu Cometi · 5 Lições · Anatomia Do Resultado · O Que Ninguém Te Conta · Antes/Depois Real · Dado + Reflexão). Os 5 carrosséis da batelada usam 5 frameworks DIFERENTES.

**Cards podem (e devem) ter:**
- Background gerado por IA (Midjourney · GPT Image · Nano Banana · Flux) — texturas · paisagens · cenários · iluminação cinematográfica
- Gráficos · diagramas · desenhos à mão (apenas com dados REAIS · com fonte citada)
- Foto do expert SEMPRE em camada acima do BG IA (NUNCA fundir rosto com IA)

**Cards NÃO podem ter:**
- Rostos humanos gerados por IA no BG (uncanny valley)
- Texto · logos · símbolos gerados por IA (fica errado)
- CTAs duros tipo "GARANTE A SUA VAGA" · CAPSLOCK · selo OFICIAL · countdown · glow falso

**🔍 LEGIBILIDADE OBRIGATÓRIA:** todo card validado nos 4 testes (thumbnail · scroll · squint · grayscale) · contraste WCAG ≥ 4.5:1 · overlay 30-50% quando BG tem detalhe · texto NUNCA sobreposto a foto/elemento de alta densidade. Detalhes em `11-historias-e-licoes.md` (seção "Validação de legibilidade").

**LPSG é PERPÉTUO** · captação 24/7 · 1 batelada nova por semana (recomendado quarta) · criativos vencedores ficam rodando ciclos seguidos · não 'morrem' no fim de uma edição.

---

## Quando ativar

Ative esta skill quando o usuário pedir qualquer uma das abaixo:

- Gerar batelada de criativos pra um LPSG
- Criar 5 estáticos · 5 carrosséis · 5 vídeos pra Meta Ads
- Estruturar carrossel de 8-10 cards com vídeo no card 10
- Escrever roteiros de vídeo pra gravação
- Brief pra IA de design (Claude Designer · Nano Banana · GPT · MJ · Veo)
- Diagnosticar criativos com Hook/Hold/Body Rate baixo
- Renomear criativos com nomenclatura LPSG
- Definir mix da batelada (5 hooks · 5 dores · 3 tons)

---

## Composição da batelada (REGRA DE OURO)

**Sempre 15 criativos por batelada. Nem mais, nem menos.**

```
5 ESTÁTICOS (1080×1350 · com foto do expert OBRIGATÓRIA)
5 CARROSSÉIS (8-10 cards · 1:1 · último card é VÍDEO 4-5s)
5 VÍDEOS (30-45s · roteiro pronto pra gravar)
```

### Por que 15?

```
1-5 criativos     →  Meta não tem opção · não otimiza
15 criativos      →  sweet spot · ASC otimiza pra quem performa
30+ criativos     →  fragmenta budget · ninguém aprende
```

---

## Pergunta antes de gerar

Antes de produzir a batelada, **SEMPRE pergunte**:

1. **Qual modo de output?**
   - Modo A · Pronto pra subir (Claude Designer / HTML)
   - Modo B · Brief pra IA design (Nano Banana / GPT / MJ / Veo)
   - Híbrido (recomendado · misturar A e B)

2. **Qual a data da batelada?** (formato DDMMYY)

3. **Qual o foco da batelada?**
   - Aquecimento (D-14 · D-7 · D-3)
   - Durante evento (lembrete + autoridade)
   - Carrinho aberto (urgência + tsunami)
   - Recuperação (D+1 · D+3 · D+5 · D+7)

---

## Mix obrigatório dentro da batelada

Pra ASC otimizar, os 15 NÃO podem ser cópias. Garanta variação em **3 dimensões**:

### Por hook (5 tipos · 1 cada)

| # | Tipo de hook |
|---|---|
| 1 | Quebra de padrão / polarização |
| 2 | Promessa específica com número |
| 3 | Pergunta direta |
| 4 | Confissão / vulnerabilidade |
| 5 | Mito vs verdade |

### Por dor do avatar (5 ângulos · 1 cada)

| Ângulo | Foco |
|---|---|
| Financeira | "Estagnado em R$ X" |
| Tempo | "14h/dia · sem resultado" |
| Identidade | "Outros crescem · eu não" |
| Técnica | "Tô fazendo errado" |
| Método | "Cursos demais · não sei qual" |

### Por tom

```
5 sérios/autoridade
5 leves/conversacionais
5 polêmicos/provocativos
```

---

## Foto do expert (INVIOLÁVEL)

Todo estático e todo carrossel TEM que ter foto do expert. Sem exceção.

```yaml
HEADSHOT_AUTORIDADE:    "Sério · olhar direto · fundo dark"          # hooks fortes
GESTICULANDO:           "Engajado · gesto explicativo"                 # body
SORRISO_EMPATICO:       "Sorriso franco · olhar direto"                # CTA
PALCO_EVENTO:           "Apresentação · multidão · prova social"       # autoridade
MAOS_NOTEBOOK:          "Trabalhando · concentrado"                    # autoridade
```

**Regra do carrossel:** ≥ 7 dos 10 cards com foto do expert visível.
**Regra do vídeo:** expert em frame em ≥ 70% do tempo total.

---

## Carrossel — anatomia obrigatória

```
Card 1   HOOK + foto expert
Card 2   AGITA o problema + foto
Card 3   PROVA SOCIAL (número/screenshot)
Card 4   MITO 1 vs verdade
Card 5   MITO 2 vs verdade
Card 6   SOLUÇÃO apresentada (método)
Card 7   ANTES/DEPOIS (split visual)
Card 8   COMO FUNCIONA (lista numerada)
Card 9   URGÊNCIA / BÔNUS
Card 10  CTA · VÍDEO 4-5s · NUNCA ESTÁTICO
```

**Card 10 SEMPRE é vídeo de 4-5 segundos.** Loop suave. Legenda queimada. Nunca estático.

---

## Nomenclatura

```
{SIGLA}_{DDMMYY}_{TIPO}_{NUMERO}

SIGLA      3 letras MAIÚSCULAS (LPS · DDP · BOL...)
DDMMYY     data da batelada
TIPO       EST · CAR · VID
NUMERO     001 a 005

Exemplos:
LPS_120526_EST_001
LPS_120526_CAR_003
LPS_120526_VID_002
```

> A nomenclatura conecta com o `trafego-lpsg-turbo` e o `dashboard-lpsg-turbo`. Não pula etapa.

---

## Métricas-alvo (do trafego-lpsg-turbo)

```yaml
HOOK_RATE:    ≥ 20% (mín) · ≥ 30% (ideal)        # Views 3s / Impressões
HOLD_RATE:    ≥ 5%  · ≥ 10%                       # ThruPlay 75% / Views 3s
BODY_RATE:    ≥ 2%  · ≥ 5%                        # Comprou / ThruPlay 75%
ROAS:         ≥ 1.0 · ≥ 1.25
CPM:          ≤ R$ 40
```

---

## Princípios de execução

1. **Sempre pergunte modo de output** (A · B · híbrido) antes de gerar.
2. **15 criativos = 15.** Não vire 30 nem 5.
3. **Foto do expert é inviolável** em estáticos e carrosséis.
4. **Carrossel: 10 cards · último é vídeo 4-5s.** Sem exceção.
5. **Mix obrigatório:** 5 hooks diferentes · 5 dores · 3 tons.
6. **Anti-clone visual:** os 15 criativos usam **5 paletas distintas** — Editorial Premium · Bold Pop · Raw/Honest · Dark Cinema · Outlier. Os 3 criativos de mesmo número (EST/CAR/VID_001) compartilham paleta · entre os 5 numerais a paleta MUDA. 1 dos 5 (o Outlier) DEVE se destacar dos outros 14 (cor inesperada · pattern interrupt). Detalhes em `09-paletas-diferenciadas.md`.
7. **Copy profunda por paleta:** cada paleta exige um registro de texto distinto — Editorial usa pausa dramática + número, Bold Pop usa imperativo curto, Raw usa primeira pessoa confessional, Dark Cinema usa narrativa em 3 atos, Outlier provoca e toma um lado. Não use o mesmo registro de copy nos 5.
8. **Cara de conteúdo · NUNCA cara de venda (CRÍTICO):** o criativo precisa parecer post orgânico do feed do criador. PROIBIDOS — botão CTA gigante neon · CAPSLOCK ("GARANTE A SUA VAGA" · "CLIQUE AQUI") · selo OFICIAL/PREMIUM/MASTER · countdown timer · brilho falso atrás do expert · foto de stock corporativa · 3 emojis enfileirados 🚀🔥💰 · setas amarelas · "POR APENAS R$ XX". OBRIGATÓRIOS — frases completas com pontuação real · CTA suave de criador (ex: "te conto na próxima aula" · "se isso fizer sentido pra você, link na bio") · cenário com objetos pessoais · pose espontânea · headline soa como reflexão de criador, não anúncio. Teste do scroll cego em `10-cara-de-conteudo.md`.
9. **Texto na imagem ≤ 20%** (regra Meta legacy · ainda pesa em CPM). Exceção: o Outlier (paleta 5) pode ir até 30% — risco controlado.
10. **Legenda queimada** em todo vídeo · 85% assiste mudo.
11. **Nomenclatura conectada com trafego e dashboard.**
12. **Output autossuficiente** — cada criativo numa pasta com tudo (copy + prompt + arquivo).

---

## Referências internas

- `00-variaveis-globais.md` — Expert · paleta · brief · variáveis
- `01-estrutura-do-criativo.md` — Hook · Body · CTA (3 partes)
- `02-batelada-15-criativos.md` — Liberação · 5+5+5 · nomenclatura
- `03-criativo-estatico.md` — 5 estáticos com foto do expert
- `04-carrossel.md` — 5 carrosséis 8-10 cards · vídeo no card 10
- `05-roteiro-video.md` — 5 roteiros prontos pra gravar
- `06-prompts-ia-design.md` — Claude Designer · Nano Banana · GPT · MJ · Veo
- `07-modos-de-output.md` — Modo A · Modo B · Híbrido
- `09-paletas-diferenciadas.md` — **5 paletas distintas (Editorial · Pop · Raw · Cinema · Outlier) · copy profunda por paleta · regras anti-clone**
- `10-cara-de-conteudo.md` — **PROIBIÇÕES anti-venda · 14 sinais de ad polido que matam · CTA suave de criador · teste do scroll cego**
- `11-historias-e-licoes.md` — **6 frameworks de história/lição · BG IA · gráficos · desenhos · validação de legibilidade WCAG**

---

## Skills relacionadas

- `criativos-lpsg-turbo` — esta skill (gera bateladas)
- `trafego-lpsg-turbo` — onde os criativos sobem (Meta ASC)
- `paginas-lpsg-turbo` — destino dos criativos (URL)
- `oferta-lpsg-turbo` — origem da copy do CTA (ticket · tsunami)
- `dashboard-lpsg-turbo` — performance dos criativos em `/trafego`

---

**Fonte:** método LPSG do Leo Tabari (Turbo Academy). Validado em 12 meses de operação multi-nicho.

---

## Upload via Meta Ads CLI (NOVO · 2026-04)

A partir do lançamento da [Meta Ads CLI oficial](https://developers.facebook.com/blog/post/2026/04/29/introducing-ads-cli/) (29/04/2026), bateladas de 15 criativos podem ser subidas em ~30 segundos via shell ao invés de upload manual no Business Manager.

**Trigger:** após gerar a batelada (`output autossuficiente · cada criativo numa pasta`), use a skill `meta-ads-cli-turbo` para automatizar upload.

```bash
~/.claude/skills/meta-ads-cli-turbo/scripts/01-batelada-15-criativos.sh \
  --sigla MPR --data 120526 \
  --campaign-id $CAMPAIGN_ID \
  --batelada-dir ./batelada-120526
```

**Default PAUSED** · ATIVAÇÃO HUMANA continua sendo o passo final.

> Detalhes em `meta-ads-cli-turbo/SKILL.md` + scripts em `meta-ads-cli-turbo/scripts/`.
