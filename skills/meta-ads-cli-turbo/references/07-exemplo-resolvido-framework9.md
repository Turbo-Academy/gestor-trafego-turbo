# Exemplo resolvido · Protocolo de subida (framework_9)

> Dry-run do `*subir-campanhas` do `@trafego-turbo` num caso genérico (evento de emagrecimento, ingresso low-ticket → produto principal). Mostra o caminho completo: gate → CAC ideal → as 2 campanhas com params Graph API.
>
> ⚠️ **Todos os números aqui são `[EXEMPLO]`** — ilustrativos, não dados reais de cliente. Em produção, o gate exige os valores verdadeiros antes de subir.

---

## 1. Gate de inputs

| Input (framework_9) | Status no exemplo | Valor |
|---|---|---|
| Ticket do lançamento (front) | informado | R$75,20 |
| Taxa de conversão do produto principal | **[EXEMPLO]** | 8% |
| Preço do produto principal | **[EXEMPLO]** | R$1.497,00 |
| ROAS desejado | **[EXEMPLO]** | 2,0 |

> Em produção: faltando qualquer um, PERGUNTAR antes de seguir.

## 2. CAC ideal

```
CAC ideal = (Ticket + Tx_conv × Preço_produto) ÷ ROAS desejado
          = (75,20 + 0,08 × 1.497,00) ÷ 2,0
          = 194,96 ÷ 2,0
          = R$97,48      →  bid_amount = 9748 (centavos)
```

## 3. Campanha 1 — Cost Cap (ref 06)

- **Campanha:** `objective=OUTCOME_SALES` · `bid_strategy=COST_CAP` · `status=PAUSED`
- **Ad set (1, Advantage+ aberto):** `optimization_goal=OFFSITE_CONVERSIONS` · `bid_amount=9748` · `promoted_object={pixel, PURCHASE}` · `targeting={BR, 25-65, genders:[2], advantage_audience:1}`
- **Criativos:** até 15 no mesmo ad set (5 imagem + 5 carrossel + 5 vídeo), todos PAUSED

## 4. Campanha 2 — ROAS incremental (ref 05)

- **Campanha (CBO):** `bid_strategy=LOWEST_COST_WITH_MIN_ROAS` · `roas_average_floor=7000` (ROAS 0,7) · `status=PAUSED`
- **Ad sets (1 por criativo):** `optimization_goal=VALUE` · `bid_constraints={roas_average_floor:7000}` · mesmo targeting · 1 criativo cada
- **Atribuição Incremental:** workaround UI (duplicar ad set → trocar pra Incremental → publicar → deletar original)

## 5. PAUSED + ativação

Tudo nasce PAUSED. Ativação (campanha → ad set → ads) só com confirmação humana explícita. Compliance pelo `@revisor-copy-turbo` ANTES de ativar (gate obrigatório no nicho saúde/emagrecimento).

## 6. Gotchas que mais arriscam um caso de emagrecimento + Cost Cap

1. **Compliance** — emagrecimento/saúde é a categoria mais fiscalizada; claim de perda/cura/antes-depois = reprovação/ban. Revisor é gate, não opção.
2. **Cap agressivo = sem entrega** — um CAC ideal baixo pode ficar abaixo do CPM do nicho. Sintoma: gasto ~0. Saída: subir `bid_amount` 10-20% em degraus, ou começar sem cap por 3 dias e depois ligar.
3. **Piso 0,7 pode sufocar a Campanha 2** — em campo, o ROAS-goal costuma entregar pior que o Cost Cap em nicho saturado. Vigiar entrega em 24h; se não gastar, baixar piso ou concentrar na Campanha 1.
4. **`bid_amount` em centavos** — 9748, não 97. Erro = cap de R$0,97 = zero entrega.
5. **optimization_goal incompatível** — Cost Cap usa OFFSITE_CONVERSIONS; ROAS usa VALUE. Não misturar. Conferir via GET (success:true não garante persistência).
6. **`source ~/.zshrc` + app Live** — senão erro de permissão / `error_subcode 1885183`.
7. **Verba pelo VK, não pelo pixel** — pixel infla com backend; VK (`vk_source=paid_metaads`) é a verdade.

**Kill rule:** ≥R$150 gasto e 0 venda → pausa; CPA > CAC ideal por 3 dias → diagnóstico antes de mexer em verba.
