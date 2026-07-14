# Feedback cirúrgico · formato canônico

> Como o estrategista dá feedback pra IA, e como a IA executa.

---

## Por que feedback cirúrgico

Feedback genérico ("tá ruim, refaz") faz a IA refazer **no escuro**. O que volta é a mesma coisa, só que diferente. **Trabalho perdido.**

Feedback cirúrgico nomeia **exatamente** o que mudar, item por item. A IA executa **com precisão**, sem mexer no que já estava bom.

---

## Formato canônico

### Lista numerada · um item por linha · uma cirurgia por item

```
1. Remove a parte 4 inteira.
2. Adiciona um bloco C com 8 CTAs, sendo 4 gerais e 4 de últimas vagas.
3. Tira a indicação de duração e coloca "no máximo 90 segundos" em todos.
4. Nos criativos de urgência, nunca falar "começa amanhã", sempre "começa segunda".
```

### Anatomia de cada item

```
[verbo de ação] + [o que mexer] + [como ficar]
```

- ✅ "Remove a parte 4 inteira." (verbo: remove · alvo: parte 4 · como: completa)
- ✅ "Tira o tricolon do final do bloco 2 e quebra em frases separadas." (verbo: tira/quebra · alvo: tricolon do bloco 2 · como: frases separadas)
- ❌ "A parte 4 não tá legal." (sem verbo · sem direção · sem critério)

---

## Como a IA executa

| Regra | O que significa |
|---|---|
| **Item por item, na ordem** | Não pular. Não combinar. 1 → 2 → 3 → 4. |
| **Não inventar ajustes adicionais** | Se o estrategista listou 4 cirurgias, a IA faz 4 cirurgias. Não mexe em outras partes "que pareciam melhorar também". |
| **Não mexer no que estava bom** | Tudo que não foi citado fica intacto. Bloco 1, 2, 3 ficam exatamente como estavam. |
| **Reportar item por item** | Ao entregar, marca o que foi feito: "1 ✅ removido · 2 ✅ bloco C adicionado · 3 ✅ duração ajustada · 4 ✅ urgência corrigida". |

---

## Exemplos por tipo de entrega

### Página de vendas

```
1. Bloco 5 (qualificação dupla): adiciona o "NÃO é pra você" embaixo do "É pra você" · 3 bullets cada.
2. Bloco 10 (depoimentos): troca os 2 depoimentos soltos por 1 estudo de caso narrativo · formato Helena (nome, idade, profissão, contexto, partida, processo, resultado).
3. Headline da abertura: corta "Descubra como" do início · começa direto pela cena específica.
4. CTA do bloco 12: troca "Garanta sua vaga" por "Reservar minha vaga" (1ª pessoa).
```

### Criativos de tráfego

```
1. Vídeo 3 (pilar promessa): adiciona o prazo (sumiu). Tem "5 quilos" e "jejum metabólico" mas falta "em 5 dias".
2. Vídeo 7 (pilar urgência): troca "começa amanhã" por "já começa nesta segunda".
3. Todos os vídeos: tira a frase de duração do script ("nesse vídeo de 60 segundos...").
4. CTAs avulsas: aumenta de 6 pra 8 · 4 gerais + 4 de últimas vagas.
```

### Mensageria

```
1. Mensagem das 19h de quinta: tira menção a preço · mantém só chamada da ficha de interesse.
2. Mensagem das 7h de segunda: encurta de 4 parágrafos pra 2 · cap de leitura é 30 segundos.
3. Variável {{3}} do template lpsg_aviso_aula: troca "começa amanhã" por "já começa nesta segunda".
```

---

## Quando o estrategista NÃO dá feedback cirúrgico

Se o estrategista entregar feedback genérico ("não tô gostando", "tá ruim", "refaz"), a IA **pede formato cirúrgico** antes de refazer:

```
Pra eu acertar no que precisa mudar, me passa em formato cirúrgico:
- O que especificamente está ruim (qual bloco, qual frase, qual variável)?
- Como você quer que fique?
- Tem algo no que está aí que deve ficar exatamente como tá?
```

> Recusar feedback genérico é **respeitar o trabalho do estrategista**. Refazer no escuro 3 vezes consome mais tempo que pedir 1 pergunta de clareza.
