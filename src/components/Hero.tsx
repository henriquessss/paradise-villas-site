import { useEffect, useState, type CSSProperties } from 'react'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'
import { Button, img } from './ui'

/*
 * Home hero: a private window onto the Algarve.
 * On load the picture opens from a narrow vertical slit to full bleed, like a shutter (CSS, so it
 * plays from the prerendered HTML before hydration), then the title rises. Four scenes crossfade
 * with a slow push-in; the hairline under the active scene fills up and its animationend moves to
 * the next one, so hovering the hero (which pauses the fill) pauses the sequence too.
 * Reduced motion: no opening, no push-in and no autoplay; the scenes stay clickable.
 */

// `focus` is the object-position; portrait screens show only a narrow slice of each photo, so
// `mobile` can pick another one. `flip` mirrors the aerial shot so the boat sits clear of the
// title on desktop; on mobile its slice leaves the boat out (it would sit under the buttons).
const SCENES: { image: string; focus: string; mobile?: string; flip?: boolean }[] = [
  { image: img('vantagens'), focus: '30% 50%', mobile: '60% 50%', flip: true },
  { image: img('experiencias-arco'), focus: '58% 50%' },
  { image: img('gestao-piscina'), focus: '35% 50%' },
  { image: '/hero/poster.webp', focus: '25% 50%' },
]

export function Hero() {
  const { t, to } = useLang()
  const h = t.home.hero
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  // The first fill waits for the opening; later ones start at once.
  const [started, setStarted] = useState(false)
  // Only the first scene is in the prerendered HTML (LCP); the rest load after the page.
  const [loadAll, setLoadAll] = useState(false)

  useEffect(() => {
    const load = () => setLoadAll(true)
    if (document.readyState === 'complete') {
      const id = setTimeout(load, 300)
      return () => clearTimeout(id)
    }
    window.addEventListener('load', load, { once: true })
    return () => window.removeEventListener('load', load)
  }, [])

  const go = (next: number) => {
    const i = (next + SCENES.length) % SCENES.length
    if (i === active) return
    setStarted(true)
    setPrevious(active)
    setActive(i)
  }

  return (
    <section data-header-dark aria-label={h.title.join(' ')} data-hero className="relative h-[100svh] min-h-[640px] overflow-hidden bg-navy-deep text-cream">
      <div className="animate-aperture absolute inset-0">
        {SCENES.map((s, i) => (
          <div
            key={s.image}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.45,0,0.55,1)] ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            {(i === 0 || loadAll) && (
              <img
                src={s.image}
                alt=""
                fetchPriority={i === 0 ? 'high' : 'low'}
                style={{ '--focus': s.focus, '--focus-mobile': s.mobile ?? s.focus, scale: s.flip ? '-1 1' : undefined } as CSSProperties}
                // The outgoing scene keeps its push-in while it fades, so it never snaps back.
                className={`h-full w-full object-cover [object-position:var(--focus-mobile)] md:[object-position:var(--focus)] ${
                  i === active || i === previous ? 'animate-pushin' : ''
                }`}
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy-deep/5 to-navy-deep/85" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,25,44,0.45)_100%)]" aria-hidden="true" />
        <div className="grain absolute inset-0" aria-hidden="true" />
      </div>

      {/* Passe-partout and the postcard details along the edges. */}
      <div className="animate-fade pointer-events-none absolute inset-3 border border-cream/20 [--delay:1.5s] md:inset-6" aria-hidden="true" />
      <p className="animate-fade eyebrow absolute top-1/2 left-10 hidden -translate-y-1/2 rotate-180 text-cream/55 [--delay:1.8s] [writing-mode:vertical-rl] lg:block" aria-hidden="true">
        Paradise Villas — Algarve
      </p>
      <p className="animate-fade eyebrow absolute top-1/2 right-10 hidden -translate-y-1/2 text-cream/55 tabular-nums [--delay:1.8s] [writing-mode:vertical-rl] lg:block" aria-hidden="true">
        37°05′N · 8°15′W
      </p>

      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-10 md:px-10 md:pb-16 lg:px-20">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow animate-rise text-cream/80 [--delay:1.25s]">{h.eyebrow}</p>
            <h1 className="font-display mt-5 leading-[0.86] tracking-[-0.03em]">
              <span className="animate-rise block text-[clamp(3.8rem,11.5vw,10.5rem)] [--delay:1.35s]">{h.title[0]}</span>
              <span className="animate-rise flex items-baseline gap-[0.18em] text-[clamp(3.8rem,11.5vw,10.5rem)] [--delay:1.5s]">
                <em className="text-[0.42em] text-terracotta">{h.title[1]}</em>
                <span>{h.title[2]}</span>
              </span>
            </h1>
            <div className="animate-rise mt-8 flex flex-wrap gap-3 [--delay:1.7s] md:mt-10">
              <Button href={EXTERNAL.booking} variant="light">
                {t.common.verAlojamentos}
              </Button>
              <Button to={to('gestao')} variant="ghost-light">
                {h.secondary}
              </Button>
            </div>
          </div>

          <div role="group" aria-label={h.scenesLabel} className="animate-rise [--delay:1.9s] lg:col-span-4">
            <ol className="grid grid-cols-4 gap-3 lg:ml-auto lg:max-w-xs lg:grid-cols-1 lg:gap-1">
              {h.scenes.map((label, i) => (
                <li key={label}>
                  <button type="button" onClick={() => go(i)} aria-current={i === active} className="group block w-full py-2 text-left">
                    <span className="relative block h-px w-full overflow-hidden bg-cream/25">
                      {i === active && (
                        <span
                          key={active}
                          onAnimationEnd={() => go(active + 1)}
                          className={`animate-fill absolute inset-0 origin-left bg-cream ${started ? '' : '[--delay:2s]'}`}
                        />
                      )}
                    </span>
                    <span className={`eyebrow mt-3 block transition-colors duration-500 ${i === active ? 'text-cream' : 'text-cream/50 group-hover:text-cream/85'}`}>
                      <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className="sr-only sm:not-sr-only sm:ml-2">{label}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
