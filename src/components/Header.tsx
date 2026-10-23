import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useLang } from '../content'
import { getLenis } from '../lib/lenis'
import { EXTERNAL, routeFor } from '../routes'
import { Icon } from './icons'
import { ArrowUpRight } from './ui'

export function Header() {
  const { t, lang, to } = useLang()
  const { pathname } = useLocation()
  const [overDark, setOverDark] = useState(true)
  const [open, setOpen] = useState(false)

  // Transparent with light text at the very top of pages that open on a dark full-bleed
  // section ([data-header-dark]); solid white as soon as the page scrolls (the home hero card
  // would otherwise sit under a white logo on small screens).
  useEffect(() => {
    const update = () => {
      const dark = document.querySelector<HTMLElement>('[data-header-dark]')
      setOverDark(!!dark && dark.offsetTop === 0 && window.scrollY < 24)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  // Close the menu on navigation and lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) getLenis()?.stop()
    else getLenis()?.start()
  }, [open])

  const route = routeFor(pathname)
  const otherLang = lang === 'pt' ? 'en' : 'pt'
  const switchTo = route.alternates[otherLang === 'pt' ? 'pt-PT' : 'en'] ?? (otherLang === 'en' ? '/en/' : '/')
  const light = overDark && !open

  const items = [
    { label: t.nav.alojamentos, href: EXTERNAL.booking },
    { label: t.nav.experiencias, to: to('experiencias') },
    { label: t.nav.gestao, to: to('gestao') },
    { label: t.nav.parceiros, to: to('parceiros') },
    { label: t.nav.sobre, to: to('sobre') },
    { label: t.nav.contactos, to: to('contactos') },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-[0.9rem] font-medium transition-colors ${
      isActive ? (light ? 'bg-white/15 text-white' : 'bg-terracotta/10 text-terracotta') : light ? 'text-white/85 hover:text-white' : 'text-navy/75 hover:text-terracotta'
    }`

  return (
    <>
      <a href="#conteudo" className="sr-only z-[60] rounded bg-white px-4 py-2 text-navy focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
        {t.nav.skip}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
          light ? 'bg-gradient-to-b from-navy-deep/50 to-transparent text-white' : 'bg-white/95 text-navy shadow-[0_1px_0_rgba(0,25,44,0.06)] backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between gap-6 px-5 md:h-20 md:px-8">
          <Link to={to('home')} aria-label="Paradise Villas" className="shrink-0">
            <img src={light ? '/logo-texto-claro.png' : '/logo-texto.png'} alt="Paradise Villas" width={287} height={180} className="h-11 w-auto md:h-12" />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex">
            {items.map((item) =>
              item.href ? (
                <a key={item.label} href={item.href} target="_blank" rel="noopener" className={linkClass({ isActive: false })}>
                  {item.label}
                </a>
              ) : (
                <NavLink key={item.label} to={item.to!} className={linkClass}>
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`hidden items-center gap-1 rounded-full px-3 py-1.5 text-[0.78rem] font-semibold sm:flex ${light ? 'bg-white/10' : 'bg-sand'}`} aria-label={t.nav.langLabel}>
              <Icon name="globe" className="h-3.5 w-3.5 opacity-70" />
              {(['pt', 'en'] as const).map((l) =>
                l === lang ? (
                  <span key={l} aria-current="true" className="px-1 text-terracotta uppercase">
                    {l}
                  </span>
                ) : (
                  <Link key={l} to={switchTo} hrefLang={l} lang={l} className="px-1 uppercase opacity-60 transition-opacity hover:opacity-100" aria-label={t.nav.switchLang}>
                    {l}
                  </Link>
                ),
              )}
            </div>
            <a
              href={EXTERNAL.ownerLogin}
              target="_blank"
              rel="noopener"
              className="hidden rounded-full bg-terracotta px-5 py-2.5 text-[0.85rem] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(214,89,55,0.7)] transition-colors hover:bg-terracotta-dark md:inline-block"
            >
              {t.nav.owner}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="relative flex h-11 w-11 items-center justify-center xl:hidden"
            >
              <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
              <span aria-hidden="true" className={`absolute h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
              <span aria-hidden="true" className={`absolute h-0.5 w-6 rounded bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span aria-hidden="true" className={`absolute h-0.5 w-6 rounded bg-current transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white px-6 pt-24 pb-10 text-navy xl:hidden"
          >
            <nav aria-label={t.nav.menu}>
              <ul className="divide-y divide-navy/[0.07]">
                {[{ label: t.nav.home, to: to('home') }, ...items].map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener" className="font-display flex items-center justify-between py-4 text-2xl">
                        {item.label} <ArrowUpRight className="h-5 w-5 text-terracotta" />
                      </a>
                    ) : (
                      <NavLink to={item.to!} end className={({ isActive }) => `font-display block py-4 text-2xl ${isActive ? 'text-terracotta' : ''}`}>
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto space-y-3 pt-10">
              <a href={EXTERNAL.booking} target="_blank" rel="noopener" className="block rounded-full bg-terracotta px-6 py-3.5 text-center font-semibold text-white">
                {t.nav.book}
              </a>
              <a href={EXTERNAL.ownerLogin} target="_blank" rel="noopener" className="block rounded-full border border-navy/15 px-6 py-3.5 text-center font-semibold">
                {t.nav.ownerLogin}
              </a>
              <div className="flex items-center justify-between pt-4 text-sm text-ink-soft">
                <Link to={switchTo} hrefLang={otherLang} lang={otherLang} className="font-semibold text-navy">
                  {t.nav.switchLang}
                </Link>
                <a href={`tel:${EXTERNAL.phone}`} className="text-right">
                  {EXTERNAL.phoneDisplay}
                  <span className="block text-[0.7rem] opacity-75">{t.channels.phone.note}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
