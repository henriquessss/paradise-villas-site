// Renders every route to static HTML after `vite build` + the SSR build of src/entry-server.tsx.
// Output: dist/<path>/index.html per page, dist/404.html, sitemap.xml and robots.txt.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const { render, pages, headFor, notFound, SITE_URL } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)

function page(html, head, lang) {
  return template
    .replace('<html lang="pt">', `<html lang="${lang}">`)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html)
}

for (const p of pages) {
  const file = path.join(dist, p.path, 'index.html')
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, page(render(p.path), headFor(p), p.lang))
}
await writeFile(path.join(dist, '404.html'), page(render(notFound.path), headFor(notFound), notFound.lang))

const urls = pages
  .map((p) => {
    const alternates = Object.entries(p.alternates)
      .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}${href}"/>`)
      .join('\n')
    return `  <url>\n    <loc>${SITE_URL}${p.path}</loc>\n${alternates}\n  </url>`
  })
  .join('\n')
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
)
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)

await rm(serverDir, { recursive: true, force: true })
console.log(`Prerendered ${pages.length} pages + 404`)
