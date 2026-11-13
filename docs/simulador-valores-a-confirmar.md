# Simulador de rendimentos: valores a confirmar

O simulador mostra a **receita bruta anual** num intervalo («entre X e Y €»). É o que os hóspedes pagam pelas estadias, antes das comissões das plataformas, das limpezas, da gestão e dos impostos.

Todos os valores estão num único sítio: `VALORES` em `src/simulator.ts`.

**O único valor dado pelos administradores** (reunião de 13/11/2026): uma moradia de 4 quartos com piscina em Albufeira faz **70 000 a 80 000 €** brutos por ano. Todos os outros valores são estimativas nossas, feitas a partir desse. Precisam de ser confirmados ou corrigidos.

## 1. Receita bruta anual em Albufeira (valor do meio do intervalo)

O site mostra este valor com uma margem de 7 % para cada lado. Por exemplo, 75 000 € aparece como 70 000 a 80 000 €.

| Tipologia | T0 | T1 | T2 | T3 | T4 | T5 | T6+ |
|---|---|---|---|---|---|---|---|
| Apartamento sem piscina | 11 000 | 15 000 | 20 000 | 26 000 | 32 000 | 38 000 | 45 000 |
| Apartamento com piscina (condomínio) | 12 500 | 17 000 | 23 000 | 30 000 | 37 000 | 44 000 | 52 000 |
| Moradia sem piscina | 14 000 | 18 000 | 26 000 | 36 000 | 48 000 | 58 000 | 70 000 |
| Moradia com piscina | 18 000 | 24 000 | 38 000 | 55 000 | **75 000** ✔ | 92 000 | 115 000 |

✔ = confirmado pelos administradores. Pedir-lhes pelo menos: apartamento T1 e T2 (com e sem piscina), moradia T3 e T5 com piscina.

## 2. Zonas e fator face a Albufeira

| Zona | Fator | Exemplo: moradia T4 com piscina |
|---|---|---|
| Albufeira | 1,00 | 70 000 a 80 000 € |
| Armação de Pêra / Pêra | 0,87 | 61 000 a 70 000 € |
| Carvoeiro / Lagoa | 1,00 | 70 000 a 80 000 € |
| Portimão / Alvor | 0,90 | 63 000 a 72 000 € |
| Lagos | 1,02 | 71 000 a 82 000 € |
| Vilamoura / Quarteira | 1,07 | 75 000 a 86 000 € |
| Loulé / Almancil | 1,02 | 71 000 a 82 000 € |
| Faro | 0,80 | 56 000 a 64 000 € |
| Tavira | 0,80 | 56 000 a 64 000 € |
| Silves | 0,62 | 43 000 a 50 000 € |

Perguntar aos administradores:
- Em que zonas atuam de facto? Retiramos as que não fazem e acrescentamos as que faltam.
- Os fatores parecem-lhes certos? O de Silves (0,62) e o de Almancil (1,02) são os mais incertos.

## 3. Outros parâmetros

- **Vista mar:** +10 %.
- **Margem do intervalo:** ±7 %. Com 75 000 € dá 70 000 a 80 000 €, como na referência. Se preferirem um intervalo mais largo, basta subir este valor.

## 4. Fora do simulador

Na reunião foi dito que a gestão completa é «desde 25 %». Ainda não foi decidido se essa percentagem aparece no site. Neste momento o site não mostra nenhuma percentagem de comissão.
