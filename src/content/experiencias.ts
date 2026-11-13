import type { Lang } from '../routes'
import { en } from './en'
import { pt } from './pt'

/** One Civitatis activity card, in one language. */
export interface Experience {
  /** Backoffice id (only for the backoffice list). */
  id?: string
  title: string
  text: string
  place: string
  category: string
  /** Key of /images/<image>.webp. */
  image: string
  /** Civitatis paths: `slug` or `destination/slug` (see civitatisUrl). */
  slug: { pt: string; en: string }
  /** Affiliate link managed in the backoffice. Absent for the embedded list, where civitatisUrl() builds it. */
  link?: string
}

/** Shape written by scripts/experiencias.mjs (already validated there). */
interface Generated {
  afiliadoId: string
  campanha: string
  experiencias: {
    id: string
    categoria: string
    local: string
    imagem: string
    titulo: Record<Lang, string>
    texto: Record<Lang, string>
    slug: Record<Lang, string>
    link: Record<Lang, string>
  }[]
}

// Optional import: the file only exists when the pre-build fetch from the backoffice succeeded.
const generated = Object.values(import.meta.glob<Generated>('./experiencias.gerado.json', { eager: true, import: 'default' }))[0]

const fromBackoffice = (data: Generated, lang: Lang): Experience[] =>
  data.experiencias.map((e) => ({
    id: e.id,
    title: e.titulo[lang],
    text: e.texto[lang],
    place: e.local,
    category: e.categoria,
    image: e.imagem,
    slug: e.slug,
    link: e.link[lang],
  }))

/** Experiences per language: the backoffice list when it was fetched at build time, else the embedded one. */
export const experiences: Record<Lang, Experience[]> = generated
  ? { pt: fromBackoffice(generated, 'pt'), en: fromBackoffice(generated, 'en') }
  : { pt: pt.experiencias.items, en: en.experiencias.items }
