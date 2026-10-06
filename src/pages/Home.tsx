import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { HeroJourney } from '../components/HeroJourney'
import { CountUp } from '../components/motion/CountUp'
import { Parallax, ParallaxImage } from '../components/motion/Parallax'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal'
import { ScrollMarquee } from '../components/motion/ScrollMarquee'
import { Rich } from '../components/Rich'
import { ArrowUpRight, Button, Eyebrow, img } from '../components/ui'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'

export function Home() {
  return (
    <>
      <HeroJourney />
      <Welcome />
      <Featured />
      <Advantages />
      <WhyAlgarve />
      <Testimonials />
      <Management />
      <InstagramStrip />
      <FinalCta />
    </>
  )
}

function Welcome() {
  const { t } = useLang()
  const w = t.home.welcome
  return (
    <section className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-12">
        <div className="relative h-[460px] sm:h-[560px] lg:col-span-6 lg:h-[680px]">
          <Parallax speed={6} className="absolute top-0 left-0 w-[70%]">
            <Reveal variant="clip">
              <img src={img('boas-vindas-piscina')} alt={w.imageAlt[0]} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </Reveal>
          </Parallax>
          <Parallax speed={-14} className="absolute right-0 bottom-0 w-[46%]">
            <Reveal variant="clip" delay={0.2}>
              <img src={img('boas-vindas-interior')} alt={w.imageAlt[1]} loading="lazy" className="aspect-[4/5] w-full border-[10px] border-cream object-cover" />
            </Reveal>
          </Parallax>
        </div>

        <RevealGroup className="lg:col-span-5 lg:col-start-8">
          <RevealItem>
            <Eyebrow index="01" className="text-terracotta">
              {w.eyebrow}
            </Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{w.title}</h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">{w.body}</p>
          </RevealItem>
          <RevealItem>
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-navy/15 pt-10">
              {w.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="eyebrow mt-3 text-ink-soft">{s.label}</dt>
                  <dd className="font-display text-[clamp(3.5rem,6vw,5.5rem)] leading-none">
                    <CountUp to={s.value} locale={t.locale} />
                    <span className="text-terracotta">{s.suffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}

function Featured() {
  const { t } = useLang()
  const f = t.home.featured
  const speeds = [0, 12, 4]
  return (
    <section className="bg-sand pt-6 pb-28 md:pb-44">
      <ScrollMarquee text={t.marquee.alojamentos} className="font-display py-10 text-[13vw] leading-none text-navy/[0.07] italic md:py-16 md:text-[10vw]" />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <RevealGroup className="max-w-2xl">
            <RevealItem>
              <Eyebrow index="02" className="text-terracotta">
                {f.eyebrow}
              </Eyebrow>
            </RevealItem>
            <RevealItem>
              <h2 className="font-display mt-6 text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] tracking-[-0.02em]">{f.title}</h2>
            </RevealItem>
          </RevealGroup>
          <Reveal variant="right">
            <Button href={EXTERNAL.booking} variant="outline">
              {t.common.verTodos}
            </Button>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
          {f.villas.map((v, i) => (
            <li key={v.name} className={i === 1 ? 'md:mt-24' : ''}>
              <Parallax speed={speeds[i]}>
                <Reveal variant="up" delay={i * 0.12}>
                  <a href={v.href} target="_blank" rel="noopener" className="group block">
                    <div className="relative aspect-[37/52] overflow-hidden bg-dune">
                      <img
                        src={img(v.image)}
                        alt={v.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" aria-hidden="true" />
                      <div className="absolute inset-x-0 bottom-0 p-7 text-cream">
                        <p className="eyebrow text-cream/80">{v.place} · Algarve</p>
                        <h3 className="font-display mt-2 flex items-center justify-between text-4xl">
                          {v.name}
                          <ArrowUpRight className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </h3>
                      </div>
                    </div>
                    <p className="mt-5 max-w-sm leading-relaxed text-ink-soft">{v.text}</p>
                    <span className="sr-only"> {t.common.opensNewTab}</span>
                  </a>
                </Reveal>
              </Parallax>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Advantages() {
  const { t } = useLang()
  const a = t.home.advantages
  return (
    <section className="grain relative overflow-hidden bg-navy text-cream">
      <ParallaxImage src={img('vantagens')} alt="" strength={14} className="absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-5 py-28 md:px-10 md:py-40 lg:grid-cols-12">
        <RevealGroup className="lg:col-span-5">
          <RevealItem>
            <Eyebrow index="03" className="text-terracotta">
              {a.eyebrow}
            </Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{a.title}</h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 text-lg leading-relaxed text-cream/75">{a.body}</p>
          </RevealItem>
          <RevealItem className="mt-10">
            <Button href={EXTERNAL.booking}>{t.common.verAlojamentos}</Button>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="grid content-end gap-x-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7" stagger={0.08}>
          {a.items.map((item, i) => (
            <RevealItem key={item} variant="left" className="flex items-baseline gap-5 border-b border-cream/15 py-6">
              <span className="font-display text-sm text-terracotta tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-2xl md:text-3xl">{item}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/** Pinned section: the page stops while the six cards slide horizontally (desktop). */
function WhyAlgarve() {
  const { t } = useLang()
  const a = t.home.algarve
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLUListElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const measure = () => {
      const el = track.current
      const pinned = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches
      setDistance(el && pinned ? Math.max(0, el.scrollWidth - window.innerWidth) : 0)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const pinned = distance > 0
  return (
    <section ref={section} className="relative bg-cream" style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}>
      <div className={pinned ? 'sticky top-0 flex h-screen flex-col justify-center overflow-hidden' : 'py-28'}>
        <div className="mx-auto mb-12 flex w-full max-w-[1440px] items-end justify-between gap-8 px-5 md:px-10">
          <div>
            <Eyebrow index="04" className="text-terracotta">
              {a.eyebrow}
            </Eyebrow>
            <h2 className="font-display mt-5 text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.02] tracking-[-0.02em]">{a.title}</h2>
          </div>
          {pinned && (
            <div className="hidden h-px w-48 bg-navy/15 md:block" aria-hidden="true">
              <motion.div style={{ width: bar }} className="h-px bg-terracotta" />
            </div>
          )}
        </div>
        <motion.ul
          ref={track}
          style={pinned ? { x } : undefined}
          className={`flex gap-6 px-5 md:gap-8 md:px-10 ${pinned ? 'w-max will-change-transform' : 'snap-x snap-mandatory overflow-x-auto pb-4'}`}
        >
          {a.items.map((item, i) => (
            <li key={item.title} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] md:w-[34vw] lg:w-[28vw]">
              <div className="relative aspect-[4/5] overflow-hidden bg-dune">
                <img src={img(item.image)} alt="" loading="lazy" className="h-full w-full object-cover" />
                <span className="font-display absolute top-5 left-5 text-sm text-cream tabular-nums">
                  {String(i + 1).padStart(2, '0')} / {String(a.items.length).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display mt-6 text-3xl">{item.title}</h3>
              <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">{item.text}</p>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function Testimonials() {
  const { t } = useLang()
  const s = t.home.testimonials
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = s.items.length
  const go = (step: number) => setIndex((i) => (i + step + count) % count)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000)
    return () => clearInterval(id)
  }, [paused, count])

  const item = s.items[index]
  return (
    <section
      className="relative overflow-hidden bg-sand px-5 py-28 md:px-10 md:py-40"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <Eyebrow index="05" className="justify-center text-terracotta">
            {s.eyebrow}
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display mx-auto mt-5 max-w-2xl text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">{s.title}</h2>
        </Reveal>

        <Reveal variant="scale" delay={0.2} className="relative mt-14 min-h-[340px] md:min-h-[300px]">
          <span className="font-display pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 text-[12rem] leading-none text-terracotta/20" aria-hidden="true">
            “
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              aria-live="polite"
            >
              <blockquote className="font-display relative text-[clamp(1.5rem,2.8vw,2.4rem)] leading-snug italic">{item.quote}</blockquote>
              <figcaption className="mt-8">
                <span className="font-semibold">{item.name}</span>
                <span className="mx-3 text-terracotta" aria-hidden="true">—</span>
                <span className="text-ink-soft">{item.role}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </Reveal>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button type="button" onClick={() => go(-1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/25 transition-colors hover:bg-navy hover:text-cream">
            <span className="sr-only">{s.prev}</span>
            <ArrowUpRight className="-rotate-[135deg]" />
          </button>
          <div className="flex gap-2" aria-hidden="true">
            {s.items.map((_, i) => (
              <span key={i} className={`h-px transition-all duration-500 ${i === index ? 'w-10 bg-terracotta' : 'w-4 bg-navy/25'}`} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/25 transition-colors hover:bg-navy hover:text-cream">
            <span className="sr-only">{s.next}</span>
            <ArrowUpRight className="rotate-45" />
          </button>
        </div>
      </div>
    </section>
  )
}

function Management() {
  const { t, to } = useLang()
  const m = t.home.management
  return (
    <section className="relative overflow-hidden bg-cream pb-28 md:pb-40">
      <ScrollMarquee text={t.marquee.gestao} reverse className="font-display py-10 text-[13vw] leading-none text-navy/[0.07] italic md:py-16 md:text-[10vw]" />
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-5 md:px-10 lg:grid-cols-12">
        <Reveal variant="clip" className="lg:col-span-6">
          <ParallaxImage src={img('gestao-piscina')} alt="" className="aspect-[4/5] w-full md:aspect-[5/6]" />
        </Reveal>
        <RevealGroup className="lg:col-span-5 lg:col-start-8">
          <RevealItem>
            <Eyebrow index="06" className="text-terracotta">
              {m.eyebrow}
            </Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{m.title}</h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 text-lg leading-relaxed text-ink-soft">
              <Rich text={m.body} />
            </p>
          </RevealItem>
          <RevealItem>
            <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {m.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-px w-5 bg-terracotta" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem className="mt-12">
            <Button to={to('gestao')}>{t.common.saberMais}</Button>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  )
}

const instagramPhotos = ['ig-villa-raul', 'ig-townhouse-rosa', 'ig-villa-marina', 'ig-vista-ondas', 'ig-villa-paulo', 'ig-villa-goreti']

function InstagramStrip() {
  const { t } = useLang()
  return (
    <section className="overflow-hidden bg-sand py-24 md:py-32">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 md:flex-row md:items-end md:px-10">
        <Reveal>
          <Eyebrow index="07" className="text-terracotta">
            {t.footer.follow}
          </Eyebrow>
          <a href={EXTERNAL.instagram} target="_blank" rel="noopener" className="font-display mt-4 block text-[clamp(2.4rem,6vw,5.5rem)] leading-none transition-colors hover:text-terracotta">
            {EXTERNAL.instagramHandle}
            <span className="sr-only"> {t.common.opensNewTab}</span>
          </a>
        </Reveal>
      </div>
      <ul className="mt-14 flex gap-4 px-5 md:gap-6 md:px-10" aria-label="Instagram">
        {instagramPhotos.map((photo, i) => (
          <li key={photo} className="w-[42vw] shrink-0 sm:w-[30vw] lg:w-[calc((100%-7.5rem)/6)]">
            <Parallax speed={i % 2 ? -10 : 10}>
              <a href={EXTERNAL.instagram} target="_blank" rel="noopener" className="group block overflow-hidden" tabIndex={-1}>
                <img src={img(photo)} alt="" loading="lazy" className="aspect-[6/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </a>
            </Parallax>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FinalCta() {
  const { t, to } = useLang()
  const c = t.home.cta
  return (
    <section className="grain relative flex min-h-[90svh] items-center overflow-hidden bg-navy-deep py-28 text-cream">
      <ParallaxImage src={img('ig-villa-piscina')} alt="" strength={16} className="absolute inset-0" />
      <div className="absolute inset-0 bg-navy-deep/65" aria-hidden="true" />
      <RevealGroup className="relative mx-auto max-w-4xl px-5 text-center">
        <RevealItem>
          <Eyebrow className="justify-center text-terracotta">{c.eyebrow}</Eyebrow>
        </RevealItem>
        <RevealItem>
          <h2 className="font-display mt-6 text-[clamp(2.6rem,6vw,5.6rem)] leading-[1] tracking-[-0.02em]">{c.title}</h2>
        </RevealItem>
        <RevealItem>
          <p className="font-display mt-8 text-xl italic md:text-2xl">{c.lead}</p>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-cream/80">{c.body}</p>
        </RevealItem>
        <RevealItem className="mt-12 flex flex-wrap justify-center gap-3">
          <Button to={to('gestao')}>{t.common.saberMais}</Button>
          <Button to={to('contactos')} variant="ghost-light">
            {t.common.contacteNos}
          </Button>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}
