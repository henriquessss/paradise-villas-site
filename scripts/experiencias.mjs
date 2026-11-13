// Runs before every build (local and Vercel): fetches the Civitatis experiences the team manages in the
// backoffice («Experiências do site») and writes src/content/experiencias.gerado.json for the site to use.
//
// Env: BACKOFFICE_URL, SITE_PEDIDOS_SEGREDO (the same pair api/contacto.ts uses).
// Without them, or on any failure, the site falls back to the list embedded in src/content/pt.ts/en.ts.
// This script never fails the build and never logs the secret.
import { access, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const OUT = path.join(root, 'src/content/experiencias.gerado.json')
const OUT_LABEL = 'src/content/experiencias.gerado.json'
const TIMEOUT_MS = 10_000
const MIN_ITEMS = 3
const LANGS = ['pt', 'en']
const CATEGORIES = new Set(['barco', 'aventura', 'natureza', 'cultura'])
const IMAGE_KEY = /^[a-z0-9][a-z0-9-]*$/
const SLUG = /^[a-z0-9-]+\/[a-z0-9-]+$/
const LINK_PREFIX = 'https://www.civitatis.com/'

const SECRET = process.env.SITE_PEDIDOS_SEGREDO?.trim()
/** Belt and braces: whatever ends up in a message, the secret never reaches the log. */
const scrub = (message) => (SECRET ? String(message).replaceAll(SECRET, '***') : String(message))
const log = (message) => console.log(`[experiencias] ${scrub(message)}`)
const warn = (message) => console.warn(`[experiencias] AVISO: ${scrub(message)}`)

const exists = (file) =>
  access(file).then(
    () => true,
    () => false,
  )

const isObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value)
const nonEmpty = (value) => typeof value === 'string' && value.trim() !== ''

/** Checks the whole response; returns [errors, normalized data]. Normalized = only the known fields. */
async function validate(body) {
  const errors = []
  if (!isObject(body)) return [['a resposta não é um objeto JSON'], null]
  if (!nonEmpty(body.afiliadoId)) errors.push('afiliadoId em falta')
  if (!nonEmpty(body.campanha)) errors.push('campanha em falta')
  if (!Array.isArray(body.experiencias)) return [[...errors, 'experiencias não é uma lista'], null]
  if (body.experiencias.length < MIN_ITEMS) errors.push(`só ${body.experiencias.length} experiências (mínimo ${MIN_ITEMS})`)

  const ids = new Set()
  const experiencias = []
  for (const [i, item] of body.experiencias.entries()) {
    const at = `experiencias[${i}]`
    if (!isObject(item)) {
      errors.push(`${at} não é um objeto`)
      continue
    }
    if (!nonEmpty(item.id)) errors.push(`${at}.id em falta`)
    else if (ids.has(item.id)) errors.push(`${at}.id repetido`)
    else ids.add(item.id)
    if (!CATEGORIES.has(item.categoria)) errors.push(`${at}.categoria inválida (${JSON.stringify(item.categoria)})`)
    if (!nonEmpty(item.local)) errors.push(`${at}.local em falta`)
    if (typeof item.imagem !== 'string' || !IMAGE_KEY.test(item.imagem)) errors.push(`${at}.imagem com formato inválido`)
    else if (!(await exists(path.join(root, 'public/images', `${item.imagem}.webp`)))) errors.push(`${at}.imagem não existe (public/images/${item.imagem}.webp)`)
    for (const field of ['titulo', 'texto', 'slug', 'link']) {
      if (!isObject(item[field])) {
        errors.push(`${at}.${field} em falta`)
        continue
      }
      for (const lang of LANGS) {
        const value = item[field][lang]
        const ref = `${at}.${field}.${lang}`
        if (!nonEmpty(value)) errors.push(`${ref} vazio`)
        else if (field === 'slug' && !SLUG.test(value)) errors.push(`${ref} fora do formato destino/slug`)
        else if (field === 'link' && (!value.startsWith(LINK_PREFIX) || /\s/.test(value))) errors.push(`${ref} não começa por ${LINK_PREFIX}`)
      }
    }
    const pick = (field) => ({ pt: item[field]?.pt?.trim?.(), en: item[field]?.en?.trim?.() })
    experiencias.push({
      id: item.id,
      categoria: item.categoria,
      local: item.local?.trim?.(),
      imagem: item.imagem,
      titulo: pick('titulo'),
      texto: pick('texto'),
      slug: pick('slug'),
      link: pick('link'),
    })
  }
  return [errors, { afiliadoId: body.afiliadoId, campanha: body.campanha, experiencias }]
}

/** Any failure: warn, drop a previously generated file so the build uses the embedded list. */
async function fallBack(reason, details = []) {
  const shown = details.slice(0, 10).map((d) => `\n  - ${d}`).join('') + (details.length > 10 ? `\n  - … mais ${details.length - 10}` : '')
  warn(`${reason}. A usar a lista embutida.${shown}`)
  if (await exists(OUT)) {
    await rm(OUT, { force: true })
    warn(`${OUT_LABEL} apagado.`)
  }
}

async function main() {
  const base = process.env.BACKOFFICE_URL?.trim().replace(/\/+$/, '')
  const secret = SECRET
  if (!base || !secret) {
    // Nothing else to do. Locally a file from an earlier run may still be there (never on Vercel: it is gitignored).
    log(
      (await exists(OUT))
        ? `BACKOFFICE_URL ou SITE_PEDIDOS_SEGREDO não definidos: a usar o ${OUT_LABEL} que já existe (apaga-o para usar a lista embutida).`
        : 'BACKOFFICE_URL ou SITE_PEDIDOS_SEGREDO não definidos: a usar a lista embutida.',
    )
    return
  }

  const url = `${base}/api/experiencias-site`
  let response
  try {
    response = await fetch(url, { headers: { Authorization: `Bearer ${secret}`, Accept: 'application/json' }, signal: AbortSignal.timeout(TIMEOUT_MS) })
  } catch (error) {
    const code = error?.cause?.code ?? error?.cause?.errors?.[0]?.code ?? error?.cause?.message ?? error?.name ?? 'erro'
    const reason = error?.name === 'TimeoutError' ? `sem resposta em ${TIMEOUT_MS / 1000} s` : `pedido falhou (${code})`
    return fallBack(`${url}: ${reason}`)
  }
  if (response.status !== 200) {
    const hint = { 401: 'segredo errado', 404: 'backoffice ainda sem este endpoint', 503: 'backoffice sem configuração ou sem migração' }[response.status]
    return fallBack(`${url} respondeu ${response.status}${hint ? ` (${hint})` : ''}`)
  }

  let body
  try {
    body = await response.json()
  } catch {
    return fallBack(`${url}: a resposta não é JSON válido`)
  }
  const [errors, data] = await validate(body)
  if (errors.length) return fallBack(`${url}: resposta inválida (${errors.length} problema(s))`, errors)

  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`)
  log(`${data.experiencias.length} experiências do backoffice gravadas em ${OUT_LABEL}.`)
}

// Never break the build: every unexpected error ends in the embedded list.
try {
  await main()
} catch (error) {
  await fallBack(`erro inesperado (${error?.name ?? 'erro'}: ${error?.message ?? ''})`).catch(() => {})
}
process.exitCode = 0
