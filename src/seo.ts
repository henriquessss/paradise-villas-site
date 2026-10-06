import { content } from './content'
import { EXTERNAL, SITE_URL, type PageRoute } from './routes'

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function metaFor(route: PageRoute) {
  return content[route.lang].meta[route.key]
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
    `<meta property="og:locale" content="${route.lang === 'pt' ? 'pt_PT' : 'en_GB'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`,
  ]
  if (route.key === 'notFound') {
    tags.push(`<meta name="robots" content="noindex" />`)
  } else {
    tags.push(`<meta property="og:url" content="${url}" />`, `<link rel="canonical" href="${url}" />`)
    for (const [hreflang, href] of Object.entries(route.alternates)) {
      tags.push(`<link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}${href}" />`)
    }
  }
  if (route.key === 'home') {
    const org = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Paradise Villas',
      legalName: 'Powerfuleader, Lda.',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo-cor.png`,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: EXTERNAL.phone,
      email: EXTERNAL.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua da Esteva, Lote 14, 1ºA',
        postalCode: '8200-252',
        addressLocality: 'Albufeira',
        addressRegion: 'Faro',
        addressCountry: 'PT',
      },
      areaServed: 'Algarve',
      sameAs: [EXTERNAL.instagram],
    }
    tags.push(`<script type="application/ld+json">${JSON.stringify(org).replace(/</g, '\u003c')}</script>`)
  }
  return tags.join('\n    ')
}
