# Tráfego e otimização — Funil 8

## Passo a passo completo de configuração ASC (Gerenciador de Anúncios)

1. Criar → Vendas → Continuar.
2. Nome: nomenclatura livre, ex: `Teste ASC01`.
3. Tipo leilão, vendas. Não mexer em catálogo.
4. **Orçamento a nível de campanha (CBO), diário. Mínimo R$100/dia** ("senão ela não vai performar"). Se tiver caixa, R$500.
5. Não mexer em teste A/B nem categoria especial.
6. **Não criar conjunto de anúncios manual** — deixar direto.
7. Local da conversão: **Site** (mesmo se vender por app).
8. Meta de performance: **maximizar número de conversões** (nunca "maximizar visualizações de página" — traz público ruim).
9. Pixel: criar/usar existente; domínio do site necessário.
10. Evento de conversão: **Comprar** (pode personalizar, mas padrão usa o evento nativo).
11. **Não** definir meta de custo por resultado (limita capacidade de aprendizado no início).
12. Não definir limite de gasto.
13. **Data de início: sempre programar pro dia seguinte, às 5h da manhã** — nunca ativar na hora.
14. Sem data de término (roda contínuo).
15. Público: **deixar em branco por padrão**. Só usar público salvo (ex: base de alunos) se tiver **mínimo 10 mil pessoas**. Público de captura ou checkout iniciado: **não usar**. Direcionamento detalhado: **não usar**. No máximo sexo + faixa etária ampla se fizer muito sentido.
16. Posicionamentos: **deixar automático/livre** (inclui Reels).
17. Identidade: página do Facebook + **recomendado sempre vincular Instagram**.

## Estrutura de criativos por conjunto

- **Entre 10-15 imagens + 2-5 vídeos**, proporção fixa: 10 imagens→2 vídeos; 15 imagens→5 vídeos. **Nunca menos de 10 peças no total.**
- Upload manual, formato imagem/vídeo único (não carrossel na campanha principal — testar carrossel em campanha separada).
- Destino: página de vendas. Link de exibição pode ser simplificado.
- Formulário instantâneo, WhatsApp, Instagram Direct, botão de ligar: **todos desligados** no modelo básico.
- CTA: **"Compre agora"** (não "Saiba mais" — é venda direta).
- Aprimoramentos automáticos da Meta (tradução, sobreposição, retoques, animação, música): **desligar tudo**.
- Duplicar anúncio (Ctrl+D), trocar só a mídia — velocidade de publicação em lote.

## Divergência curso vs. palestra o gestor de tráfego da equipe (camada avançada, complementar)

- **Públicos personalizados (Advantage+ Audience) opcionais:** subir lista de e-mails/WhatsApp de leads (mín. ~10 mil) ou alunos (mín. ~2-4 mil "achados" pela Meta) como SINAL pra IA, sem restringir o público — não é segmentação restritiva, é complemento.
- **Experiência Instantânea:** alternativa ao link de site — monta "página" dentro do próprio ambiente Meta, reduz tempo de carregamento, tendendo a CPM menor. **"Não está validada, que ela é melhor que página ainda não, mas já está começando os testes"** — tratar como hipótese em teste, não benchmark fechado.
- **Hook Rate** (métrica customizada): reproduções de vídeo de 3s ÷ impressões, coluna customizada.
- **Teste A/B nativo da Meta: "nunca funcionou"** segundo testes internos da equipe — manter desativado.
- **Imagem → vídeo (Ken Burns/movimento leve):** transformar estático em vídeo antes de subir tende a CPM menor (plataforma "gosta" de vídeo).
- **Cor do botão de CTA:** verde ou azul com bom contraste — fundo claro→azul, fundo escuro→verde. Vermelho evitado ("cor de make-up").

## Framework de diagnóstico por etapa do funil (o gestor de tráfego da equipe)

- **Métrica-mestre: ROAS** (faturamento bruto ÷ investimento bruto em tráfego). Métricas secundárias só existem pra explicar a principal.
- **3 pilares do leilão Meta:** (1) Lance, (2) Ação estimada, (3) Qualidade do anúncio — os três pesam, não só o lance.
- **CPM ilustrativo:** R$20-30 bom · R$60-70 nicho competitivo · equipe conseguiu R$30-40 em trading com criativos "estilo conteúdo/entretenimento".
- **CTR ilustrativo:** 1-1,5% padrão · equipe atingiu 1,8-2,5% em trading.
- **Conversão de checkout saudável: ~20%** (compras ÷ início de finalização). Conversão muito alta (ex: 80%) pode sinalizar **volume baixo**, não qualidade — quanto maior a escala, menor tende a ficar essa conversão.
- **Conversão de página: ~10%**, cai para 6-7% em escala.
- **Regra de diagnóstico:** se métricas individuais estão "na média" mas ROAS geral continua ruim, a média de mercado pode não ser a média necessária pro ticket/nicho específico — investigar métrica a métrica. **CTR, conversão de página e conversão de checkout são mais fáceis/rápidas de melhorar; CPM é o mais difícil.** Alternativa direta: subir o ticket médio se o público aguenta.
- **Janela de atribuição (alerta técnico):** risco de cortar criativo "que não converte" quando na verdade a venda aconteceu dentro da janela de atribuição de 7 dias após ver múltiplos criativos — cortar prematuramente destrói a atribuição real.
- **Cadência de renovação:** "10 em 10" funciona bem em ASC, mas depende do nicho e escala de investimento.
- **Regra de escala com risco controlado:** ao duplicar campanha pra aumentar investimento, **nunca pular direto pra 4x** (ex: R$100→R$400) — manter valor igual ou menor na duplicada. Aumentos graduais (~20% dentro da mesma campanha), observar em janelas de 7-10 dias.
- **Verba de teste separada da verba de escala:** negociar verba de teste isolada em vez de sacrificar a campanha já validada.
- **Order bump — taxa de conversão saudável: 30%.**
- **4 formas de escalar:** (1) escala vertical (~30% dentro da campanha), (2) duplicar campanhas, (3) melhorar o funil (página/checkout/copy), (4) buscar outras fontes de tráfego/expandir nicho.
- **Remarketing segmentado ainda vale a pena** mesmo com Advantage+ dominando — especialmente pra low ticket (ex: quem visitou a página nos últimos 7 dias).
- **Discrepância de pixel:** se a campanha usa um pixel e a página tem outro instalado, a conversão de página aparece zerada mesmo a campanha estando saudável — sempre conferir consistência.

**Nota de contexto:** a palestra de o gestor de tráfego da equipe usa como estudo de caso um produto de ticket maior (SaaS R$134/mês recorrente) e nicho de trading — seus benchmarks de CPM/CTR não são diretamente intercambiáveis com o "produto R$17" padrão do curso, mas o framework de diagnóstico é transferível.

## Diagnóstico de "não estou vendendo" (curso base)

Pergunta-chave: **o produto tem demanda?** Causas mais citadas: nome do produto ruim (já houve caso de só trocar o nome e o produto passar a vender), criativos fracos, copy fraca. Resiliência esperada: 1 dia a 3 meses — sem queimar dinheiro, mas insistindo com verba baixa controlada. Ações paralelas: link na bio + chamada em stories, automação de venda orgânica via ManyChat/DM.
