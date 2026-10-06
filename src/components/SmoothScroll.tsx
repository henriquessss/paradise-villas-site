import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { setLenis } from '../lib/lenis'

/** Lenis smooth scrolling (skipped for reduced motion) + scroll-to-top on navigation. */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({ lerp: 0.1, anchors: true, autoRaf: true })
    lenis.current = instance
    setLenis(instance)
    return () => {
      instance.destroy()
      lenis.current = null
      setLenis(null)
    }
  }, [])

  useEffect(() => {
    if (hash) return
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
