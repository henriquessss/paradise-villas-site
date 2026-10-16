export type Lang = 'pt' | 'en'
export type PageKey = 'home' | 'experiencias' | 'gestao' | 'parceiros' | 'sobre' | 'contactos' | 'privacidade' | 'termos'

export const SITE_URL = 'https://paradisevillas.pt'
export const LANGS: Lang[] = ['pt', 'en']

export const paths: Record<PageKey, Record<Lang, string>> = {
  home: { pt: '/', en: '/en/' },
  experiencias: { pt: '/experiencias/', en: '/en/experiences/' },
  gestao: { pt: '/gestao-al/', en: '/en/property-management/' },
  parceiros: { pt: '/parceiros/', en: '/en/partners/' },
  sobre: { pt: '/sobre-nos/', en: '/en/about-us/' },
  contactos: { pt: '/contactos/', en: '/en/contact/' },
  privacidade: { pt: '/politica-de-privacidade/', en: '/en/privacy-policy/' },
  termos: { pt: '/termos-e-condicoes/', en: '/en/terms-and-conditions/' },
}

export interface PageRoute {
  key: PageKey | 'notFound'
  lang: Lang
  path: string
  /** hreflang → path, including x-default (Portuguese). */
  alternates: Record<string, string>
}

export const pages: PageRoute[] = (Object.keys(paths) as PageKey[]).flatMap((key) =>
  LANGS.map((lang) => ({
    key,
    lang,
    path: paths[key][lang],
    alternates: { 'pt-PT': paths[key].pt, en: paths[key].en, 'x-default': paths[key].pt },
  })),
)

export const notFound: PageRoute = { key: 'notFound', lang: 'pt', path: '/404/', alternates: {} }

export const langFromPath = (pathname: string): Lang => (pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pt')

const withSlash = (pathname: string) => (pathname.endsWith('/') ? pathname : `${pathname}/`)

export function routeFor(pathname: string): PageRoute {
  const normalized = withSlash(pathname)
  return pages.find((p) => p.path === normalized) ?? { ...notFound, lang: langFromPath(pathname) }
}

export const EXTERNAL = {
  booking: 'https://alojamentos.paradisevillas.pt/',
  ownerLogin:
    'https://app.avantio.pro/index.php?url=&module=Usuarios&action=Login&return_module=Home&return_action=index&avs=ZTUveE1tcVJ1YXU2RHM2NDl3UjVJeGx0K0xjK0oyK3BiK0tMa3RxaXIvZ1dscHJndXVMdDl6YUJHN09lRjVORGkrTUlpTUpOdnEvSE5KM21HanZ5bDd2cWpBQm4xRkJXd1N3aENaWFRyS2M9',
  instagram: 'https://www.instagram.com/paradisevillas_/',
  instagramHandle: '@paradisevillas_',
  huglocals: 'https://huglocals.com/Pereira',
  phone: '+351960039608',
  phoneDisplay: '+351 960 039 608',
  whatsapp: 'https://wa.me/351960039608',
  email: 'info@paradisevillas.pt',
  address: 'Rua da Esteva, Lote 14, 1ºA, 8200-252 Albufeira',
}

/**
 * Avantio search results for a stay. Avantio has no documented deep-link API; these are the
 * URLs its own search form produces (checked 2026-10-16). Swap when RentalReady goes live.
 */
export function bookingSearchUrl(lang: Lang, { from, to, guests }: { from: Date; to: Date; guests: number }): string {
  const nights = Math.round((to.getTime() - from.getTime()) / 86_400_000)
  const d = (date: Date) => `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`
  const base = EXTERNAL.booking.replace(/\/$/, '')
  return lang === 'en'
    ? `${base}/en/rentals/holidays-rentals-rentals-p0/${nights}-nights/${guests}-people/available-from-${d(from)}/to-${d(to)}/`
    : `${base}/aluguer/aluguer-alugueres-p0/${nights}-noites/${guests}-pessoas/del-${d(from)}/al-${d(to)}/vista-lista/`
}

/**
 * Civitatis affiliate id (`ag_aid`). Empty = plain links (no commission).
 * TODO(cliente): pedir o ID de afiliado da Paradise Villas na Civitatis.
 */
export const CIVITATIS_AID = ''

/** Civitatis page in the visitor's language; `slug` is the activity path under /albufeira/. */
export function civitatisUrl(lang: Lang, slug = ''): string {
  const url = `https://www.civitatis.com/${lang}/albufeira/${slug ? `${slug}/` : ''}`
  return CIVITATIS_AID ? `${url}?ag_aid=${CIVITATIS_AID}` : url
}

/**
 * Partner programme: share of Paradise Villas' management revenue paid for each owner a
 * partner refers. TODO(cliente): confirmar a percentagem e a base de cálculo.
 */
export const PARTNER_RATE = 10
