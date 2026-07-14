# Runbook · Campanha Cost Cap (Graph API)

> Par do reference 05 (ROAS+incremental). Use pra subir a **Campanha 1 do protocolo de subida** do `@trafego-turbo` (framework_9): Cost Cap com 1 conjunto Advantage+ aberto e até 15 criativos.

---

## Cost Cap ≠ Bid Cap (não confundir)

| Estratégia | `bid_strategy` | O que o número significa |
|---|---|---|
| **Cost Cap** (este runbook) | `COST_CAP` | teto do **custo médio por resultado** (≈ seu CPA-alvo / CAC ideal) |
| Bid Cap | `LOWEST_COST_WITH_BID_CAP` | teto do **lance no leilão** (mais técnico, controla o bid, não o CPA médio) |
| Min ROAS | `LOWEST_COST_WITH_MIN_ROAS` | piso de ROAS (é o reference 05) |
| Maior volume | `LOWEST_COST_WITHOUT_CAP` | sem teto |

No protocolo Turbo, "Campanha de Cost Cap" = **`COST_CAP`**, e o teto é o **CAC ideal**.

---

## O CAC ideal vira o teto

```
CAC ideal = (Ticket + Tx de conversão × Preço do produto) ÷ ROAS desejado
```
O resultado, **em centavos**, é o `bid_amount` do ad set. Ex.: CAC ideal R$ 145,00 → `bid_amount=14500`.
Sem os 4 inputs (ticket · tx conversão · preço · ROAS desejado), **não sobe** — perguntar antes (gate do framework_9).

---

## Bloco de configuração (preencher por projeto)

```yaml
AD_ACCOUNT:        act_XXXXXXXXXXXX
API_VERSION:       v23.0
TOKEN:             $ACCESS_TOKEN          # System User em ~/.zshrc — SEMPRE `source ~/.zshrc` antes
PAGE_ID:           XXXXXXXXXXXXX
INSTAGRAM_USER_ID: 17841XXXXXXXXXXX       # GET /{BUSINESS_ID}/instagram_accounts (não o id da UI)
PIXEL_ID:          XXXXXXXXXXXXXXX
EVENTO:            PURCHASE
URL_DESTINO:       https://...
CTA:               LEARN_MORE
# Campanha
OBJETIVO:          OUTCOME_SALES
BID_STRATEGY:      COST_CAP
BUDGET_DIARIO:     1000000               # centavos (R$ 10.000 = 1000000)
# Ad set
BID_AMOUNT:        14500                 # CAC ideal em centavos (R$ 145 = 14500) ← teto Cost Cap
OPTIMIZATION_GOAL: OFFSITE_CONVERSIONS   # conversão (NÃO VALUE — VALUE é pra min-ROAS)
GEO:               ["BR"]
IDADE:             25-65                  # Advantage+ exige 25-65 via API (gotcha 5 do ref 05)
GENERO:            [2]                    # 1=masc, 2=fem, omitir=todos
ADVANTAGE_AUDIENCE: 1                     # conjunto Advantage+ aberto
```

---

## Processo end-to-end (ordem importa)

### 0. Pré-flight
```bash
source ~/.zshrc
[ -n "$ACCESS_TOKEN" ] && echo "token ok" || echo "FALTA TOKEN"
curl -s "https://graph.facebook.com/v23.0/act_XXXX?fields=name,currency,account_status&access_token=$ACCESS_TOKEN"
```
App PRECISA estar em modo **Live** (senão `error_subcode 1885183`).

### 1. Criar campanha (Cost Cap)
```bash
curl -s -X POST "https://graph.facebook.com/v23.0/act_XXXX/campaigns" \
  -d "name=NOME_COSTCAP" -d "objective=OUTCOME_SALES" -d "special_ad_categories=[]" \
  -d "status=PAUSED" -d "daily_budget=1000000" \
  -d "bid_strategy=COST_CAP" \
  -d "access_token=$ACCESS_TOKEN"
```
> Orçamento na campanha (CBO) é opcional pro Cost Cap — pode ir na campanha OU no ad set. Como a Campanha 1 tem **um único conjunto**, tanto faz; manter no nível de campanha simplifica.

### 2. Criar o ad set (1 conjunto Advantage+ aberto + cost cap)
```bash
curl -s -X POST "https://graph.facebook.com/v23.0/act_XXXX/adsets" \
  -d "campaign_id=CAMP_ID" -d "name=NOME_ADV01" \
  -d "optimization_goal=OFFSITE_CONVERSIONS" -d "billing_event=IMPRESSIONS" -d "status=PAUSED" \
  -d "bid_amount=14500" \
  -d "start_time=2026-XX-XXT05:00:00-03:00" \
  -d 'promoted_object={"pixel_id":"PIXEL","custom_event_type":"PURCHASE"}' \
  -d 'targeting={"geo_locations":{"countries":["BR"]},"age_min":25,"age_max":65,"genders":[2],"targeting_automation":{"advantage_audience":1}}' \
  -d "access_token=$ACCESS_TOKEN"
```
> `bid_amount` (em centavos) = CAC ideal. É o teto de Cost Cap. Confirmar via GET depois (gotcha 8 do ref 05: `success:true` não garante persistência).

### 3. Subir até 15 criativos NESTE ad set
```bash
python3 scripts/06-upload-criativos-graphapi.py   # ver config no topo
```
Mix do protocolo: **5 imagem + 5 carrossel + 5 vídeo** (teto 15), todos PAUSED, todos apontando pro mesmo ad set. Ordem interna: estáticos → vídeos (polling) → carrosséis.

### 4. Ativar (gasta — confirmação humana explícita)
Ativar os 3 níveis (campanha → ad set → ads) `status=ACTIVE`. `start_time` no passado = entrega imediata.

### 5. Monitorar
Schedule horário read-only: insights `date_preset=today` + `effective_status` + `amount_spent`. Sinalizar rejeições (saúde/emagrecimento) e anomalias.

---

## Gotchas do Cost Cap (além dos 8 gerais do ref 05)

1. **Cap muito agressivo = sem entrega.** O Cost Cap precisa de volume de conversão pra aprender. Se o CAC ideal for baixo demais pro leilão, o ad set não gasta. Sintoma: gasto ~0 com tudo ativo. Saída: subir o `bid_amount` em degraus (10-20%) até destravar, ou começar sem cap (lowest cost) pra juntar dados e depois aplicar o cap.
2. **Não use `VALUE`.** Cost Cap otimiza por conversão (`OFFSITE_CONVERSIONS` + `promoted_object`), não por valor. `VALUE` é do min-ROAS (ref 05). Misturar dá erro/entrega ruim.
3. **`bid_amount` é por RESULTADO, em centavos.** R$145 = `14500`. Erro clássico é mandar reais (145) → cap de R$1,45 → zero entrega.
4. **Aprendizado reinicia se mexer no cap.** Cada alteração de `bid_amount` reseta a fase de aprendizado do ad set. Mexer o mínimo; dar 3 dias antes de julgar.
5. **1 conjunto, muitos criativos.** Diferente da Campanha 2 (ROAS: 1 criativo por conjunto), aqui é **1 conjunto Advantage+ com os 15 criativos juntos** — deixa o Meta distribuir.

---

## Conversões úteis

| UI | API |
|---|---|
| Estratégia "Limite de custo" | `bid_strategy=COST_CAP` |
| Custo-alvo R$ 145 | `bid_amount=14500` (centavos) |
| "Maximizar nº de conversões" | `optimization_goal=OFFSITE_CONVERSIONS` |
| R$ 10.000/dia | `daily_budget=1000000` |
| "Comprar" (evento) | `custom_event_type=PURCHASE` |

---

## Checklist de repetição

- [ ] 4 inputs coletados → CAC ideal calculado (fórmula acima)
- [ ] `source ~/.zshrc` + token ok + conta legível + app Live
- [ ] Campanha PAUSED `COST_CAP` criada (confirmada via GET)
- [ ] Ad set PAUSED com `bid_amount` (CAC ideal em centavos) + `OFFSITE_CONVERSIONS` + promoted_object + Advantage+ (confirmado via GET)
- [ ] Até 15 criativos (5 img/5 carrossel/5 vídeo) subidos PAUSED neste ad set + IDs salvos
- [ ] Compliance pelo @revisor-copy-turbo (nicho sensível) antes de ativar
- [ ] Billing com forma de pagamento válida
- [ ] Ativação com confirmação humana explícita
- [ ] Monitor horário agendado · vigiar se o cap está destravando entrega (gotcha 1)
```
