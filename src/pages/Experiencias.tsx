import { useState } from 'react'
import { ParallaxImage } from '../components/motion/Parallax'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal'
import { PageHeader } from '../components/PageHeader'
import { Rich } from '../components/Rich'
import { ArrowUpRight, Button, Eyebrow, img } from '../components/ui'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'

const stripImages = ['experiencias-mar', 'algarve-hospitalidade', 'algarve-lugares', 'algarve-praias']

export function Experiencias() {
  const { t, to } = useLang()
  const e = t.experiencias
  const [active, setActive] = useState(0)

  return (
    <>
      <PageHeader eyebrow={e.header.eyebrow} title={e.header.title} image={img('experiencias-arco')} />

      {/* Intro */}
      <section className="px-5 pt-28 md:px-10 md:pt-36">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12">
          <RevealGroup className="lg:col-span-6">
            <RevealItem>
              <h2 className="font-display text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{e.intro.title}</h2>
            </RevealItem>
            <RevealItem className="mt-10">
              <Button to={to('contactos')}>{t.common.faleConnosco}</Button>
            </RevealItem>
          </RevealGroup>
          <RevealGroup className="space-y-6 text-lg leading-relaxed text-ink-soft lg:col-span-5 lg:col-start-8">
            {e.intro.body.map((p) => (
              <RevealItem key={p}>
                <p>
                  <Rich text={p} />
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Expanding strips: hover / focus widens one */}
        <Reveal variant="clip" className="mx-auto mt-20 max-w-[1440px]">
          <ul className="flex h-[60vh] min-h-[420px] gap-2 md:gap-3">
            {stripImages.map((name, i) => (
              <li
                key={name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className={`relative overflow-hidden transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${active === i ? 'grow-[5]' : 'grow'}`}
                style={{ flexBasis: 0 }}
              >
                <img src={img(name)} alt={e.intro.stripAlt[i]} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Complete experience */}
      <section className="px-5 py-28 md:px-10 md:py-44">
        <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-12">
          <RevealGroup className="order-2 lg:order-1 lg:col-span-5">
            <RevealItem>
              <Eyebrow index="01" className="text-terracotta">
                {e.complete.eyebrow}
              </Eyebrow>
            </RevealItem>
            <RevealItem>
              <h2 className="font-display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{e.complete.title}</h2>
            </RevealItem>
            {e.complete.body.map((p) => (
              <RevealItem key={p}>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                  <Rich text={p} />
                </p>
              </RevealItem>
            ))}
            <RevealItem>
              <ul className="mt-10 space-y-4">
                {e.complete.checks.map((c) => (
                  <li key={c} className="flex gap-4">
                    <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" />
                      <path d="m6 10.5 2.6 2.5L14 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>
                      <Rich text={c} />
                    </span>
                  </li>
                ))}
              </ul>
            </RevealItem>
          </RevealGroup>
          <Reveal variant="clip" className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <ParallaxImage src={img('experiencias-praia')} alt="" className="aspect-[4/5] w-full md:aspect-[5/6]" />
          </Reveal>
        </div>
      </section>

      {/* Solutions */}
      <section className="grain relative overflow-hidden bg-navy text-cream">
        <ParallaxImage src={img('experiencias-capela')} alt="" strength={14} className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-navy/70" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-36">
          <Reveal>
            <Eyebrow index="02" className="text-terracotta">
              {e.solutions.eyebrow}
            </Eyebrow>
          </Reveal>
          <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-20">
            {e.solutions.items.map((s, i) => (
              <Reveal key={s.title} variant={i ? 'right' : 'left'} delay={i * 0.1}>
                <h2 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.05]">{s.title}</h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/75">
                  <Rich text={s.text} />
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <Button to={to('contactos')} variant="light">
              {t.common.faleConnosco}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Recommended experiences */}
      <section className="bg-sand px-5 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <RevealGroup>
              <RevealItem>
                <Eyebrow index="03" className="text-terracotta">
                  {e.list.eyebrow}
                </Eyebrow>
              </RevealItem>
              <RevealItem>
                <h2 className="font-display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{e.list.title}</h2>
              </RevealItem>
            </RevealGroup>
            <Reveal variant="right">
              <Button href={EXTERNAL.huglocals} variant="outline">
                {t.common.verTodas}
              </Button>
            </Reveal>
          </div>

          <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {e.list.items.map((x, i) => (
              <Reveal key={x.href} as="li" delay={(i % 4) * 0.08}>
                <a href={x.href} target="_blank" rel="noopener" className="group block">
                  <div className="overflow-hidden bg-dune">
                    <img
                      src={img(x.image)}
                      alt=""
                      loading="lazy"
                      className="aspect-[96/76] w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <p className="eyebrow mt-6 text-terracotta">{x.area}</p>
                  <h3 className="font-display mt-2 text-2xl">{x.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{x.text}</p>
                  <dl className="mt-5 flex gap-6 border-t border-navy/10 pt-4 text-sm">
                    <div>
                      <dt className="sr-only">{e.list.placeLabel}</dt>
                      <dd>{x.place}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">{e.list.durationLabel}</dt>
                      <dd className="text-ink-soft">{x.duration}</dd>
                    </div>
                  </dl>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.78rem] font-semibold tracking-[0.14em] uppercase transition-colors group-hover:text-terracotta">
                    {t.common.comprar}
                    <ArrowUpRight />
                  </span>
                  <span className="sr-only"> {t.common.opensNewTab}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
