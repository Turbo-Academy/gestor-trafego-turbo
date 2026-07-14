# Passo a passo de campanhas — Gerenciador de Anúncios

## Botão Impulsionar (C1)

### Regra crítica anti-desperdício
**Nunca turbinar pelo app nativo do Instagram no celular** — a Apple cobra ~30% a mais nessa via. Sempre usar navegador do celular (Safari inclusive em iPhone) ou computador.

### Passo a passo — navegador/computador (Instagram direto)
1. Perfil → Reels → selecionar o Reels → "Turbinar Reels".
2. Selecionar conta de anúncios (só pede na 1ª vez).
3. Objetivo: **sempre "mais visitas ao perfil"** (nunca outro — é lá que a pessoa consegue seguir).
4. Público: Brasil aberto/automático é o padrão; pode segmentar (localização/interesses/idade).
5. Valor: mínimo liberado pela plataforma (na gravação: R$10/dia, às vezes R$5).
6. Duração: 30 dias, ou "até pausar" (Leo prefere "até pausar" pra controlar manualmente).
7. Confirmar.

### Via Meta Business Suite (recomendado pra gestão de equipe)
Mesmo fluxo, mas permite selecionar **públicos personalizados avançados** (ex: público "C1 Ads" criado previamente) e ver métricas do post antes de impulsionar.

### Limitação técnica
Instagram não mostra o nº de seguidores gerados por um Reels impulsionado direto no post. Caminho: Gerenciador de Anúncios → campanha → conjunto → anúncio → editar → "mais opções" → "gerenciar comentários do Instagram" → "ver Instagram na web" → "ver em sites" → aparece o número.

## Campanha de Engajamento (C2 — vídeo/imagem)

1. Objetivo: **Engajamento** → modo **manual** (não a config recomendada — precisa selecionar públicos e excluir).
2. Nome da campanha: objetivo + camada (ex: "Engajamento_C2_AtivadorTurbo") — nomenclatura consistente é crítica pros passos seguintes.
3. Conjunto de anúncios: público-alvo + identificador do vídeo (ex: "C1_video1").
4. Tipo de engajamento: **"engajamento com a publicação"** (não "visualização de vídeo" — ajuda o algoritmo a captar compartilhamento/salvamento também).
5. Orçamento: ver regra 70/20/10 no SKILL.md (ressalva: é direcionamento, não regra fixa — funil de cima precisa de mais verba que o de baixo).
6. Públicos: quem visitou perfil (30d), enviou mensagem (30d), salvou (30d), seguidores, leads totais, público de visualização de C1 a 95%. **Desmarcar sempre "público personalizado advanced"** (senão a Meta expande a entrega pra fora do público desejado).
7. Localização/idade/gênero conforme avatar.
8. Posicionamento: **somente Instagram**.
9. Anúncio: usar publicação existente, colar a URL do vídeo já postado.
10. Duplicar conjunto (Ctrl+D) pra cada vídeo adicional — 1 conjunto por vídeo de C2.

## Ativador Turbo em C2

1. Criar público personalizado → "público de vídeo" → **quem assistiu 25%** do vídeo → 30 dias (ajustável) → nomear claramente (ex: "viu C2 vídeo 1, 25%, 30 dias").
2. Selecionar o vídeo pela campanha já criada (usa o nome da campanha pra localizar — reforça a importância da nomenclatura).
3. Repetir pra cada vídeo de C2.
4. Dentro do conjunto de anúncios → editar → segmentação → **adicionar exclusão** → excluir o público "viu 25%" daquele vídeo específico.
5. Resultado: quem já viu 25%+ daquele vídeo não vê mais ELE, mas continua vendo os outros da sequência — exposição "obrigatória" ao conjunto todo.

## Métricas e otimização de C2

- Coluna personalizada **CPV de 25%** = valor gasto ÷ reproduções de 25%. Sem benchmark fixo — objetivo é reduzir ao longo do tempo, relativo a cada conta/nicho.
- **Frequência-alvo: 1,5-2,0.** Fora do range = reequilibrar orçamento.
- **Retenção-alvo:** pelo menos 1/3 de quem assistiu 25% deve chegar a 95%. Ex: 100 visualizações de 25% → ideal ≥33 chegando a 95%. Só 16/100 = retenção ruim → o criativo (não a copy) precisa melhorar, principalmente os primeiros segundos.

## Campanha de C3 — diferença estrutural vs C2

**Objetivo de campanha varia com formato do criativo:** vídeo/imagem usa **Engajamento**; carrossel usa **Reconhecimento** (Engajamento não aceita carrossel nesse fluxo). Reconhecimento exige URL de destino obrigatória (usar URL do perfil do Instagram + botão "Saiba mais" se não houver página própria).

**Públicos de C3** (diferente de C2): quem viu vídeos de C2, lista de leads totais, quem enviou mensagem (30d), quem salvou (30d) — **não usa mais "quem visitou o perfil"** (esse é público de topo, C1).

**Orçamento:** mesma lógica 70/20/10, mesma ressalva de que é direcionamento.

**Ativador Turbo em C3:** mesmo mecanismo do C2 — criar público "quem viu 25%" (ou "3 segundos" pro vídeo curto do último card do carrossel) e excluir do próprio conjunto.

## Otimização de C3

- Duas maiores alavancas: **reciclar criativo** e **ajustar orçamento**.
- Reciclagem: **1-2 criativos novos por semana**, dependendo do tamanho da base.
- Métrica principal: **frequência** (mesmo range 1,5-2,0, revisado a cada 7 dias) — *"no final das contas, uma campanha de C3 é uma grande campanha de remarketing"*.
- Métricas secundárias: CPV de 25% e CPV de 95% (mesma fórmula customizada de C2).
