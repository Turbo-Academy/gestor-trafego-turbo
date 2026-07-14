# Gestor de Tráfego Turbo

Agente de tráfego pago para Claude Code, com as 16 skills que ele usa no dia a dia. Meta Ads e Google Ads para lançamento pago semanal, funil de entrada low-ticket e distribuição de conteúdo.

Este pacote roda sozinho. Você não precisa do Squad Turbo completo para usar.

## O que vem dentro

**1 agente** (`agents/trafego-turbo.md`):

- Estrutura de campanhas Advantage+ para venda de ingresso (ROAS 1 na captação)
- Protocolo de subida de campanha: gate de 4 inputs + CAC ideal → Cost Cap + ROAS incremental
- Diagnóstico de tráfego (hook rate, CTR, CPA, ROAS) com cadência diária, semanal e mensal
- Orçamento calculado de trás pra frente (meta de inscritos × CPA-alvo)
- Campanha ASC do funil de entrada e campanhas de impulsionamento/remarketing de consciência

**16 skills** (`skills/`):

| Skill | Pra quê |
|---|---|
| `trafego-lpsg-turbo` | Estrutura de campanha do lançamento pago |
| `meta-ads-cli-setup-turbo` | Conectar a Meta Ads CLI do zero (token, permissões, 1ª chamada) |
| `meta-ads-cli-turbo` | Operação avançada via CLI/Graph API (batelada, stop-loss, escala) |
| `lancamento-pago-semanal-turbo` | Visão geral do método 5+1 |
| `funil-8-turbo` | Produto de entrada low-ticket com campanha ASC |
| `distribuicao-turbo` | Funil de consciência C0-C3 e Ativador Turbo |
| `criativos-lpsg-turbo` | Batelada de 15 criativos (formato + produção) |
| `criador-criativos-turbo` | Copy de anúncio (hooks, body, estrutura invisível) |
| `paginas-lpsg-turbo` | Páginas de destino dos ads |
| `page-optimizer-turbo` | Otimização de performance da página (LCP < 1.5s) |
| `dashboard-lpsg-turbo` | Dashboard de acompanhamento do lançamento |
| `dash-lancamento-turbo` | Painel de vendas ao vivo |
| `protocolo-conversa-turbo` | Protocolo de conversa do agente (carregada sempre primeiro) |
| `design-tokens-turbo` | Tokens visuais usados pelos dashboards (tipografia, paleta) |
| `lovable-style-turbo` | Estilo de build das páginas e dashboards em React |
| `designer-senior-turbo` | Implementação HTML das páginas de destino |

## Requisitos

- [Claude Code](https://claude.com/claude-code) instalado

## Instalação

```bash
git clone https://github.com/Turbo-Academy/gestor-trafego-turbo.git
cd gestor-trafego-turbo
./install.sh
```

Depois reinicie o Claude Code.

Se preferir instalar na mão:

```bash
mkdir -p ~/.claude/skills ~/.claude/agents
cp -R skills/* ~/.claude/skills/
cp agents/trafego-turbo.md ~/.claude/agents/
```

## Como usar

Dentro do Claude Code, chame o agente:

```
Use o agente trafego-turbo para estruturar as campanhas do meu lançamento
```

Comandos rápidos do agente:

| Comando | O que faz |
|---|---|
| `*subir-campanhas` | Sobe Cost Cap + ROAS incremental (com gate de inputs) |
| `*estrutura-campanha` | Estrutura completa de campanhas |
| `*publicos` | Públicos e segmentações |
| `*orcamento` | Plano de orçamento e distribuição |
| `*otimizar` | Diagnóstico e otimização de métricas |
| `*funil-8-turbo` | Campanha ASC do funil de entrada |
| `*distribuicao-turbo` | Impulsionamento e Ativador Turbo |
| `*google-ads` | Campanhas Google Ads |

## Opcional

Duas skills de terceiros deixam o agente mais completo (deploy e teste da página de destino):

```bash
npx skills add vercel-labs/agent-skills --skill deploy-to-vercel --yes
npx skills add anthropics/skills --skill webapp-testing --yes
```

O agente menciona outros agentes do Squad Turbo (revisor de copy, diretor criativo, estrategista). São referências de fluxo de trabalho: sem eles instalados, o agente segue funcionando normalmente e executa o trabalho de tráfego completo sozinho.

## Segurança

- Toda campanha nova nasce **PAUSED**. Ativar é etapa separada e confirmada por você.
- A CLI pede confirmação em toda operação de escrita e dupla confirmação em delete.
- Nunca commite token da Meta em lugar nenhum. O setup da CLI (`meta-ads-cli-setup-turbo`) mostra como guardar o token fora do repo.

## Licença

Dual: código sob MIT, conteúdo/método sob CC BY-NC-SA 4.0. Detalhes em [LICENSE](LICENSE).

Feito por [Leo Tabari · Turbo Academy](https://turboacademy.com.br).
