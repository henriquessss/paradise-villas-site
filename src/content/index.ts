import { useLocation } from 'react-router'
import { langFromPath, paths, type Lang, type PageKey } from '../routes'
import { en } from './en'
import { pt, type Content } from './pt'

export const content: Record<Lang, Content> = { pt, en }

/** Current language (from the URL) plus its dictionary and a localized path helper. */
export function useLang() {
  const { pathname } = useLocation()
  const lang = langFromPath(pathname)
  return { lang, t: content[lang], to: (key: PageKey) => paths[key][lang] }
}
