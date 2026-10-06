export type Lang = 'pt' | 'en'
export type PageKey = 'home' | 'gestao' | 'experiencias' | 'sobre' | 'contactos' | 'privacidade' | 'termos'

export const SITE_URL = 'https://paradisevillas.pt'
export const LANGS: Lang[] = ['pt', 'en']

export const paths: Record<PageKey, Record<Lang, string>> = {
  home: { pt: '/', en: '/en/' },
  gestao: { pt: '/gestao-al/', en: '/en/property-management/' },
  experiencias: { pt: '/experiencias/', en: '/en/experiences/' },
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
  email: 'info@paradisevillas.pt',
  address: 'Rua da Esteva, Lote 14, 1ºA, 8200-252 Albufeira',
}
