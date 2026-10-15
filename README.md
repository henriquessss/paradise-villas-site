# Paradise Villas — site institucional

Substitui o WordPress em paradisevillas.pt. React 19 + Vite + TypeScript + Tailwind 4, Motion (animações) e Lenis (scroll suave). Todas as páginas são pré-renderizadas para HTML estático (SEO), em PT e EN.

## Comandos

```bash
npm run dev       # desenvolvimento (sem pré-render; /api não corre aqui)
npm run build     # tsc + build cliente + build SSR + scripts/prerender.mjs → dist/
npm run preview   # serve dist/
npm run media     # regenera public/images, logos, favicons e a imagem da cena «A luz» da hero (public/hero/poster.webp)
```

`content-source/` (conteúdo e imagens extraídos do site antigo e do Instagram) e `media-jobs/raw/` (os 5 clips originais da Higgsfield; só se usa o primeiro frame de `falesias.mp4`) não estão no git. São a origem do `npm run media`.

## Hero da Home

`src/components/Hero.tsx`: «janela privada» de um ecrã. Ao carregar, a imagem abre de uma fresta vertical até ocupar o ecrã (CSS, corre a partir do HTML pré-renderizado) e só depois sobe o título. Seguem-se 4 cenas (O mar, As falésias, A casa, A luz) em fade lento com aproximação; a linha da cena ativa enche e, ao terminar, passa à seguinte. Passar o rato pela hero pausa; as cenas são clicáveis. Só a primeira imagem vai no HTML (LCP); as outras carregam depois do `load`. Com `prefers-reduced-motion`: sem abertura, sem aproximação e sem avanço automático. Os escalonamentos das animações de entrada usam `[--delay:…]` (ver `src/index.css`).

## Estrutura

- `src/content/pt.ts` / `en.ts` — todos os textos. `src/content/legal/*.md` — política de privacidade e termos.
- `src/routes.ts` — rotas PT/EN, links externos (motor de reservas, login do proprietário, Instagram).
- `src/pages/` — uma página por ficheiro; `src/components/motion/` — reveal, parallax, vídeo, contador, marquee.
- `api/contacto.ts` — formulário de contacto → email via Resend (Vercel Function).
- `vercel.json` — redirecionamentos dos URLs antigos do WordPress (`/portfolio/*`, `/contacts`, …).

## Variáveis de ambiente (Vercel)

| Variável | Exemplo |
|---|---|
| `RESEND_API_KEY` | chave da conta Resend |
| `CONTACT_TO` | `info@paradisevillas.pt` |
| `CONTACT_FROM` | `Paradise Villas <site@paradisevillas.pt>` (domínio verificado no Resend) |

## Pendente com o cliente

- Validar textos novos: capítulos da hero, frases das 6 «razões para o Algarve» e toda a tradução EN.
- Confirmar números da Gestão AL (500+ proprietários, 200+ imóveis).
- Foto do fundador: a atual parece imagem de banco — pedir foto real do Bruno.
- Textos legais referem o SEF (extinto); rever com quem os redigiu.
- Motor de reservas: trocar `EXTERNAL.booking` / `ownerLogin` em `src/routes.ts` quando entrar a RentalReady.
- Domínio: o DNS está com a programadora do site antigo — apontar o apex para a Vercel.
