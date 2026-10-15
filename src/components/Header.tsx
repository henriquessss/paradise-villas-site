import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { useLang } from '../content'
import { getLenis } from '../lib/lenis'
import { EXTERNAL, routeFor } from '../routes'
import { ArrowUpRight } from './ui'

export function Header() {
  const { t, lang, to } = useLang()
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    // Stay transparent over a dark full-bleed section (the home hero journey) until it ends.
    const dark = document.querySelector<HTMLElement>('[data-header-dark]')
    setSolid(y > (dark ? dark.offsetTop + dark.offsetHeight - 120 : 60))
    setHidden(y > 400 && y > previous && !open)
  })

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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-[0.7rem] font-semibold tracking-[0.24em] uppercase transition-opacity hover:opacity-100 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-current after:transition-all after:duration-500 ${
      isActive ? 'opacity-100 after:w-full' : 'opacity-80 after:w-0 hover:after:w-full'
    }`

  const onDark = !solid || open

  return (
    <>
      <a href="#conteudo" className="sr-only z-[60] rounded bg-cream px-4 py-2 text-navy focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
        {t.nav.skip}
      </a>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid && !open ? 'bg-cream/90 text-navy shadow-[0_1px_0_rgba(9,62,96,0.08)] backdrop-blur-md' : 'text-cream'
        }`}
      >
        <div className="mx-auto grid h-20 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-5 md:h-24 md:px-10">
          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            <a href={EXTERNAL.booking} target="_blank" rel="noopener" className={linkClass({ isActive: false })}>
              {t.nav.alojamentos}
            </a>
            <NavLink to={to('gestao')} className={linkClass}>
              {t.nav.gestao}
            </NavLink>
            <NavLink to={to('experiencias')} className={linkClass}>
              {t.nav.experiencias}
            </NavLink>
          </nav>

          <Link to={to('home')} className="col-start-1 justify-self-start lg:col-start-2 lg:justify-self-center" aria-label="Paradise Villas">
            <img
              src={onDark ? '/logo-texto-claro.png' : '/logo-texto.png'}
              alt="Paradise Villas"
              width={287}
              height={180}
              className="h-12 w-auto md:h-14"
            />
          </Link>

          <div className="col-start-3 flex items-center justify-end gap-6 lg:gap-8">
            <nav aria-label="Secundária" className="hidden items-center gap-8 lg:flex">
              <NavLink to={to('sobre')} className={linkClass}>
                {t.nav.sobre}
              </NavLink>
              <NavLink to={to('contactos')} className={linkClass}>
                {t.nav.contactos}
              </NavLink>
            </nav>
            <Link
              to={switchTo}
              hrefLang={otherLang}
              lang={otherLang}
              className="hidden text-[0.7rem] font-semibold tracking-[0.24em] opacity-80 transition-opacity hover:opacity-100 sm:block"
              aria-label={t.nav.switchLang}
            >
              {t.nav.switchLangShort}
            </Link>
            <a
              href={EXTERNAL.booking}
              target="_blank"
              rel="noopener"
              className={`hidden border px-6 py-3 text-[0.7rem] font-semibold tracking-[0.24em] uppercase transition-colors duration-500 md:inline-block ${
                onDark ? 'border-cream/45 hover:border-cream hover:bg-cream hover:text-navy-deep' : 'border-navy/25 hover:border-navy-deep hover:bg-navy-deep hover:text-cream'
              }`}
            >
              {t.nav.book}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
              <span aria-hidden="true" className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1'}`} />
              <span aria-hidden="true" className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1'}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="grain fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-navy-deep px-6 pt-28 pb-10 text-cream lg:hidden"
          >
            <nav aria-label={t.nav.menu}>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
                className="space-y-2"
              >
                {[
                  { label: t.nav.home, to: to('home') },
                  { label: t.nav.alojamentos, href: EXTERNAL.booking },
                  { label: t.nav.gestao, to: to('gestao') },
                  { label: t.nav.experiencias, to: to('experiencias') },
                  { label: t.nav.sobre, to: to('sobre') },
                  { label: t.nav.contactos, to: to('contactos') },
                ].map((item) => (
                  <motion.li key={item.label} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener" className="font-display flex items-center gap-3 text-[2.6rem] leading-tight">
                        {item.label} <ArrowUpRight className="h-6 w-6 text-terracotta" />
                      </a>
                    ) : (
                      <Link to={item.to!} className="font-display block text-[2.6rem] leading-tight">
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.7 } }} className="mt-12 space-y-4 text-sm">
              <a href={EXTERNAL.booking} target="_blank" rel="noopener" className="inline-block border border-cream/45 px-7 py-3.5 text-xs font-semibold tracking-[0.24em] uppercase">
                {t.nav.book}
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 opacity-80">
                <Link to={switchTo} hrefLang={otherLang} lang={otherLang}>
                  {t.nav.switchLang}
                </Link>
                <a href={EXTERNAL.ownerLogin} target="_blank" rel="noopener">
                  {t.nav.ownerLogin}
                </a>
                <a href={`tel:${EXTERNAL.phone}`}>{EXTERNAL.phoneDisplay}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
