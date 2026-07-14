# Runbook · Campanha ROAS + Atribuição Incremental + batelada 15 criativos (Graph API)

> Validado em produção 2026-06-11 em conta real (nicho saúde/emagrecimento).
> **Use este runbook quando a CLI `meta` não der conta** — que é o caso pra ROAS floor,
> Atribuição Incremental, identidade Instagram e carrosséis. A CLI cobre só o básico.

---

## ⚠️ Por que Graph API e não a CLI

A CLI oficial `meta` é ótima pra `list`, `insights`, campanha/adset simples. Mas **falha** em:

| Recurso | CLI | Solução |
|---|---|---|
| `bid_strategy=LOWEST_COST_WITH_MIN_ROAS` + ROAS floor | ❌ não expõe | Graph API `bid_constraints.roas_average_floor` |
| Atribuição Incremental | ❌ não tem API nenhuma | Workaround UI (ver abaixo) |
| Identidade Instagram | ❌ usa `instagram_actor_id` (depreciado) | Graph API `instagram_user_id` |
| Carrossel (`child_attachments`) | ❌ não suporta | Graph API `link_data.child_attachments` |
| Vídeo > ~100MB | ⚠️ instável | Upload resumável (start/transfer/finish) |

Para esses casos, usar o script `scripts/06-upload-criativos-graphapi.py`.

---

## Bloco de configuração (preencher por projeto)

```yaml
AD_ACCOUNT:        act_XXXXXXXXXXXX
API_VERSION:       v23.0
TOKEN:             $ACCESS_TOKEN          # System User, em ~/.zshrc — SEMPRE `source ~/.zshrc` antes
PAGE_ID:           XXXXXXXXXXXXX          # Facebook Page (identidade do ad)
INSTAGRAM_USER_ID: 17841XXXXXXXXXXX       # GET /{BUSINESS_ID}/instagram_accounts (NÃO o id da UI)
PIXEL_ID:          XXXXXXXXXXXXXXX
EVENTO:            PURCHASE
URL_DESTINO:       https://...
CTA:               LEARN_MORE
HEADLINE:          "..."
DESCRIPTION:       "..."
PRIMARY_TEXT:      (arquivo /tmp/body.txt)
# Campanha
OBJETIVO:          OUTCOME_SALES
BUDGET_DIARIO:     1000000               # centavos (R$ 10.000 = 1000000)
ROAS_FLOOR:        9000                  # valor × 10000 (ROAS 0.9 = 9000)
# Ad set
OPTIMIZATION_GOAL: VALUE                 # obrigatório com min ROAS
GEO:               ["BR"]
IDADE:             25-65                  # Advantage+ exige 25-65 via API (ver gotcha)
GENERO:            [2]                    # 1=masc, 2=fem, omitir=todos
ADVANTAGE_AUDIENCE: 1
```

---

## Processo end-to-end (ordem importa)

### 0. Pré-flight
```bash
source ~/.zshrc
[ -n "$ACCESS_TOKEN" ] && echo "token ok" || echo "FALTA TOKEN"
curl -s "https://graph.facebook.com/v23.0/act_XXXX?fields=name,currency,account_status&access_token=$ACCESS_TOKEN"
```
**App PRECISA estar em modo Live** (developers.facebook.com → Publicar). App em dev dá `error_subcode 1885183`.

### 1. Descobrir o `instagram_user_id` real
```bash
curl -s "https://graph.facebook.com/v23.0/{BUSINESS_ID}/instagram_accounts?fields=id,username&access_token=$ACCESS_TOKEN"
```
Os IDs que aparecem no dropdown do Ads Manager **não** são o `instagram_user_id`. Se o perfil desejado não aparecer aqui, ele não está atribuído ao business → conectar via Business Settings antes.

### 2. Criar campanha (CBO + ROAS floor)
```bash
curl -s -X POST "https://graph.facebook.com/v23.0/act_XXXX/campaigns" \
  -d "name=NOME" -d "objective=OUTCOME_SALES" -d "special_ad_categories=[]" \
  -d "status=PAUSED" -d "daily_budget=1000000" \
  -d "bid_strategy=LOWEST_COST_WITH_MIN_ROAS" -d "roas_average_floor=9000" \
  -d "access_token=$ACCESS_TOKEN"
```

### 3. Criar ad set (VALUE + Advantage+ + pixel)
```bash
curl -s -X POST "https://graph.facebook.com/v23.0/act_XXXX/adsets" \
  -d "campaign_id=CAMP_ID" -d "name=NOME_ADS01" \
  -d "optimization_goal=VALUE" -d "billing_event=IMPRESSIONS" -d "status=PAUSED" \
  -d "start_time=2026-XX-XXT05:00:00-03:00" \
  -d 'promoted_object={"pixel_id":"PIXEL","custom_event_type":"PURCHASE"}' \
  -d 'bid_constraints={"roas_average_floor":9000}' \
  -d 'targeting={"geo_locations":{"countries":["BR"]},"age_min":25,"age_max":65,"genders":[2],"targeting_automation":{"advantage_audience":1}}' \
  -d 'attribution_spec=[{"event_type":"CLICK_THROUGH","window_days":7},{"event_type":"VIEW_THROUGH","window_days":1}]' \
  -d "access_token=$ACCESS_TOKEN"
```

### 4. Atribuição Incremental (workaround — não tem API)
1. Criar o ad set via API (passo 3) com atribuição padrão.
2. No Ads Manager, **duplicar** o ad set (cria rascunho/draft).
3. No rascunho: "Modelo de atribuição" → **Incremental**. Publicar.
4. Deletar o ad set original via API. Renomear o duplicado tirando "— Cópia".
> Adset criado via API entra em estado "salvo" e a atribuição vira imutável na hora.
> Só draft (UI/duplicação) permite trocar. Combina com VALUE + ROAS floor.

### 5. Subir os 15 criativos
```bash
python3 scripts/06-upload-criativos-graphapi.py   # ver config no topo do script
```
Ordem interna: estáticos (rápido) → vídeos (polling) → carrosséis. Vídeos grandes via resumável.

### 6. Ativar (gasta dinheiro — confirmação humana explícita)
Ativar os 3 níveis: campanha → ad set → ads (`status=ACTIVE`). `start_time` no passado = entrega imediata.

### 7. Monitorar
Schedule horário read-only (skill `schedule`): insights `date_preset=today` + `effective_status` dos ads + `amount_spent`. Sinalizar rejeições (claims saúde/emagrecimento) e anomalias de gasto.

---

## Gotchas validados (cada um custou tempo)

1. **`source ~/.zshrc` SEMPRE** — o shell não-interativo não carrega o token sozinho. Sintoma: "Object does not exist or missing permissions".
2. **App em modo dev** → `error_subcode 1885183`. Publicar o app.
3. **`instagram_actor_id` depreciado** → usar `instagram_user_id` (formato `17841...`). CLI quebra nisso.
4. **`degrees_of_freedom_spec` standard_enhancements opt-out depreciado** → `error_subcode 3858504`. Omitir o campo no creative.
5. **Advantage+ Audience trava idade** → `age_min` só ≤25, `age_max` só ≥65 via API. Faixa fina (ex: 35-60) só como "sugestão" na UI.
6. **Vídeo grande (>~100MB)** → upload multipart simples retorna não-JSON. Usar resumável (`upload_phase=start/transfer/finish`) + polling `status.video_status==ready`.
7. **Atribuição Incremental** → sem API. Workaround duplicação no UI (passo 4).
8. **Unknown fields no POST** retornam `{"success":true}` mas não persistem — não confie em `success`, sempre releia com GET.

---

## Conversões úteis

| UI | API |
|---|---|
| R$ 10.000/dia | `daily_budget=1000000` (centavos) |
| Meta de ROAS 0,9 | `roas_average_floor=9000` (×10000) |
| "Maximizar valor das conversões" | `optimization_goal=VALUE` |
| "Comprar" (evento) | `custom_event_type=PURCHASE` |
| Feminino | `genders=[2]` |

---

## Checklist de repetição

- [ ] `source ~/.zshrc` + token ok + conta legível
- [ ] App em modo Live
- [ ] `instagram_user_id` correto (via business/instagram_accounts)
- [ ] Campanha PAUSED criada (ROAS floor confirmado via GET)
- [ ] Ad set PAUSED criado (bid_constraints + promoted_object + targeting confirmados)
- [ ] Atribuição Incremental aplicada via duplicação UI (se requerida)
- [ ] Mídia organizada + nomenclatura `card_NN` nos carrosséis
- [ ] Copy global pronta (primary text em arquivo, headline, description, URL, CTA)
- [ ] 15 criativos subidos (todos PAUSED) + IDs salvos em results_*.json
- [ ] Revisão visual no Ads Manager
- [ ] Billing tem forma de pagamento válida
- [ ] Ativação com confirmação humana explícita
- [ ] Monitor horário agendado
