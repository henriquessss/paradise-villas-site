import { content } from './content'
import { EXTERNAL, paths, SITE_URL, type PageRoute } from './routes'

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function metaFor(route: PageRoute) {
  return content[route.lang].meta[route.key]
}

const ORG_ID = `${SITE_URL}/#organization`
const BUSINESS_ID = `${SITE_URL}/#business`
const WEBSITE_ID = `${SITE_URL}/#website`

/** Logo for Google (Organization.logo): at least 112×112, crawlable, readable on white. */
const LOGO = { '@type': 'ImageObject', url: `${SITE_URL}/logo-cor.png`, width: 187, height: 240 }

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Rua da Esteva, Lote 14, 1ºA',
  postalCode: '8200-252',
  addressLocality: 'Albufeira',
  addressRegion: 'Faro',
  addressCountry: 'PT',
}

/** Areas served: the Algarve plus the towns listed on the property-management page (single source). */
const areaServed = () => [
  { '@type': 'AdministrativeArea', name: 'Algarve' },
  ...content.pt.gestao.local.zones.map((name) => ({ '@type': 'City', name })),
]

/**
 * Structured data. Home: the company (Organization + LocalBusiness) and the website, which is what
 * Google uses for the site name and logo in results. Property management page: the service.
 * Inner pages: a breadcrumb.
 */
function structuredData(route: PageRoute): object | null {
  const t = content[route.lang]
  const url = `${SITE_URL}${route.path}`
  const graph: object[] = []

  if (route.key === 'home') {
    graph.push(
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: 'Paradise Villas',
        legalName: 'Powerfuleader, Lda.',
        url: `${SITE_URL}/`,
        logo: LOGO,
        image: `${SITE_URL}/og-image.jpg`,
        email: EXTERNAL.email,
        telephone: EXTERNAL.phone,
        address: ADDRESS,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: EXTERNAL.phone,
          email: EXTERNAL.email,
          areaServed: 'PT',
          availableLanguage: ['Portuguese', 'English'],
        },
        sameAs: [EXTERNAL.instagram, EXTERNAL.facebook],
      },
      {
        // Holiday homes and property management, run from the Albufeira office.
        '@type': 'LodgingBusiness',
        '@id': BUSINESS_ID,
        name: 'Paradise Villas',
        description: content.pt.meta.home.description,
        url: `${SITE_URL}/`,
        logo: LOGO,
        image: `${SITE_URL}/og-image.jpg`,
        telephone: EXTERNAL.phone,
        email: EXTERNAL.email,
        address: ADDRESS,
        areaServed: areaServed(),
        parentOrganization: { '@id': ORG_ID },
        sameAs: [EXTERNAL.instagram, EXTERNAL.facebook],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'Paradise Villas',
        alternateName: ['Paradise Villas Algarve', 'paradisevillas.pt'],
        url: `${SITE_URL}/`,
        inLanguage: ['pt-PT', 'en'],
        publisher: { '@id': ORG_ID },
      },
    )
  }

  if (route.key === 'gestao') {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: route.lang === 'pt' ? 'Gestão de Alojamento Local' : 'Holiday rental management',
      serviceType: route.lang === 'pt' ? 'Gestão de Alojamento Local' : 'Holiday rental management',
      description: t.meta.gestao.description,
      url,
      provider: { '@id': BUSINESS_ID },
      areaServed: areaServed(),
    })
  }

  if (route.key !== 'home' && route.key !== 'notFound') {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.common.home, item: `${SITE_URL}${paths.home[route.lang]}` },
        { '@type': 'ListItem', position: 2, name: t.meta[route.key].title.split(' | ')[0], item: url },
      ],
    })
  }

  return graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null
}

/** <head> tags for a prerendered page. */
export function headFor(route: PageRoute): string {
  const t = content[route.lang]
  const { title, description } = metaFor(route)
  const url = `${SITE_URL}${route.path}`
  const tags = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${t.meta.siteName}" />`,
    `<meta property="og:title" content="${escape(title)}" />`,
    `<meta property="og:description" content="${escape(description)}" />`,
    `<meta property="og:image" content="${SITE_URL}/og-image.jpg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Paradise Villas, Algarve" />`,
    `<meta property="og:locale" content="${route.lang === 'pt' ? 'pt_PT' : 'en_GB'}" />`,
    `<meta property="og:locale:alternate" content="${route.lang === 'pt' ? 'en_GB' : 'pt_PT'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
  if (route.key === 'notFound') {
    tags.push(`<meta name="robots" content="noindex" />`)
  } else {
    tags.push(`<meta property="og:url" content="${url}" />`, `<link rel="canonical" href="${url}" />`)
    for (const [hreflang, href] of Object.entries(route.alternates)) {
      tags.push(`<link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}${href}" />`)
    }
  }
  const data = structuredData(route)
  if (data) tags.push(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`)
  return tags.join('\n    ')
}
