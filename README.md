# Paradise Villas — site institucional

Substitui o WordPress em paradisevillas.pt. React 19 + Vite + TypeScript + Tailwind 4, Motion (animações) e Lenis (scroll suave). Todas as páginas são pré-renderizadas para HTML estático (SEO), em PT e EN.

## Comandos

```bash
npm run dev         # desenvolvimento (sem pré-render; /api não corre aqui)
npm run build       # tsc + build cliente + build SSR + scripts/prerender.mjs → dist/
npm run preview     # serve dist/ (sem /api: os formulários mostram erro de envio)
npm run media       # regenera public/images, logos e favicons
npm run media:hero  # regenera o vídeo da hero (public/video/) a partir dos vídeos do cliente
```

`content-source/` (conteúdo e imagens do site antigo e do Instagram) e `media-jobs/raw/` (vídeos originais do cliente em `cliente/`, clips Higgsfield) não estão no git — são a origem dos scripts de media. Nunca pôr vídeos originais em `public/` (vão para o build).

## Design

Redesign v2 (branch `redesign/v2`) inspirado em homeholidays.pt: fundo creme, cartões brancos, títulos em serifa com uma palavra em itálico terracota (`*palavra*` nos textos).

- **Home** — vídeo das villas do cliente com card central (título, pesquisa de datas/hóspedes, números). A pesquisa abre o Avantio já filtrado (`bookingSearchUrl` em `src/routes.ts`).
- **Experiências** — atividades da Civitatis com filtros; `CIVITATIS_AID` em `src/routes.ts` acrescenta o ID de afiliado.
- **Gestão AL** — pedido de proposta, serviços, legalização, simulador de rendimento (valores em `src/simulator.ts`), FAQ. Sem percentagens de comissão.
- **Parceiros** — programa de indicação; percentagem em `PARTNER_RATE` (`src/routes.ts`).
- Todos os formulários enviam para `api/contacto.ts` com um `kind` (contacto, gestao, simulador, parceiro).

## Variáveis de ambiente (Vercel)

| Variável | Exemplo |
|---|---|
| `RESEND_API_KEY` | chave da conta Resend |
| `CONTACT_TO` | `info@paradisevillas.pt` |
| `CONTACT_FROM` | `Paradise Villas <site@paradisevillas.pt>` (domínio verificado no Resend) |

## Pendente com o cliente

- Validar textos novos (marcados «NOVO» em `src/content/pt.ts`) e toda a tradução EN.
- Percentagem e base de cálculo da parceria (`PARTNER_RATE`).
- ID de afiliado Civitatis (`CIVITATIS_AID`).
- Valores do simulador (`src/simulator.ts`) — são estimativas nossas, não dados do cliente.
- Vídeo final da hero (o cliente ficou de enviar; o atual é uma montagem dos vídeos das villas).
- Confirmar números da Gestão AL (500+ proprietários, 200+ imóveis).
- Foto do fundador: a atual parece imagem de banco — pedir foto real do Bruno.
- Textos legais referem o SEF (extinto); rever com quem os redigiu.
- Motor de reservas: trocar `EXTERNAL.booking` / `ownerLogin` em `src/routes.ts` quando entrar a RentalReady.
- Domínio: o DNS está com a programadora do site antigo — apontar o apex para a Vercel.
