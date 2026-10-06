import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { routeFor } from '../routes'
import { metaFor } from '../seo'

/** Keeps <title>, meta description and <html lang> in sync on client-side navigation. */
export function HeadSync() {
  const { pathname } = useLocation()
  useEffect(() => {
    const route = routeFor(pathname)
    const { title, description } = metaFor(route)
    document.title = title
    document.documentElement.lang = route.lang
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [pathname])
  return null
}
