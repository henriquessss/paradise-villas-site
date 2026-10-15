import { useId, useState } from 'react'
import { CountUp } from '../components/motion/CountUp'
import { ParallaxImage } from '../components/motion/Parallax'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal'
import { PageHeader } from '../components/PageHeader'
import { Rich } from '../components/Rich'
import { Button, Eyebrow, img } from '../components/ui'
import { useLang } from '../content'

export function Gestao() {
  const { t, to } = useLang()
  const g = t.gestao
  return (
    <>
      <PageHeader eyebrow={g.header.eyebrow} title={g.header.title} image={img('gestao-quarto')} />

      {/* Intro */}
      <section className="px-5 py-28 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.04] tracking-[-0.02em]">{g.intro.title}</h2>
          </Reveal>
          <RevealGroup className="lg:col-span-4 lg:col-start-9 lg:pt-3">
            <RevealItem>
              <p className="text-lg leading-relaxed text-ink-soft">
                <Rich text={g.intro.body} />
              </p>
            </RevealItem>
            <RevealItem>
              <p className="font-display mt-6 text-xl italic">{g.intro.lead}</p>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Services: numbered editorial grid */}
        <RevealGroup className="mx-auto mt-20 grid max-w-[1440px] border-t border-navy/15 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {g.services.map((s, i) => (
            <RevealItem key={s.title} className="group relative border-b border-navy/15 py-10 sm:px-8 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0">
              <span className="font-display text-sm text-terracotta tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display mt-4 text-2xl md:text-3xl">{s.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{s.text}</p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-terracotta transition-all duration-700 group-hover:w-full" aria-hidden="true" />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Stats band */}
      <section className="grain relative overflow-hidden bg-navy-deep text-cream">
        <ParallaxImage src={img('gestao-mar')} alt="" strength={18} className="absolute inset-0 opacity-45" />
        <div className="absolute inset-0 bg-navy-deep/55" aria-hidden="true" />
        <dl className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-y-14 px-5 py-24 sm:grid-cols-3 md:px-10 md:py-32">
          {g.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="flex flex-col-reverse items-center text-center">
              <dt className="eyebrow mt-4 text-cream/70">{s.label}</dt>
              <dd className="font-display text-[clamp(3.6rem,7vw,6.5rem)] leading-none">
                <CountUp to={s.value} locale={t.locale} />
                <span className="text-terracotta">{s.suffix}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Licensing: sticky heading, steps scroll past */}
      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow index="01" className="text-terracotta">
                  {g.legal.eyebrow}
                </Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="font-display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{g.legal.title}</h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 text-lg leading-relaxed text-ink-soft">
                  <Rich text={g.legal.body} />
                </p>
              </Reveal>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {g.legal.steps.map((step, i) => (
              <Reveal key={step.title} as="li" variant="right" className="grid grid-cols-[auto_1fr] gap-8 border-b border-navy/15 py-10 first:pt-0">
                <span className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-none text-terracotta">{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl">{step.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-sand px-5 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <RevealGroup>
              <RevealItem>
                <Eyebrow index="02" className="text-terracotta">
                  {g.includes.eyebrow}
                </Eyebrow>
              </RevealItem>
              <RevealItem>
                <h2 className="font-display mt-6 max-w-3xl text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{g.includes.title}</h2>
              </RevealItem>
            </RevealGroup>
            <Reveal variant="right">
              <Button to={to('contactos')}>{t.common.contacteNos}</Button>
            </Reveal>
          </div>
          <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
            {g.includes.cards.map((card, i) => (
              <Reveal key={card.title} as="li" delay={i * 0.12}>
                <div className="overflow-hidden">
                  <img src={img(card.image)} alt="" loading="lazy" className="aspect-[74/40] w-full object-cover" />
                </div>
                <p className="eyebrow mt-8 text-terracotta">{g.includes.label}</p>
                <h3 className="font-display mt-3 text-3xl">{card.title}</h3>
                <ul className="mt-6 space-y-4 text-ink-soft">
                  {card.items.map((item) => (
                    <li key={item} className="border-t border-navy/10 pt-4 leading-relaxed">
                      <Rich text={item} />
                    </li>
                  ))}
                </ul>
                <Button to={to('contactos')} variant="outline" className="mt-8">
                  {t.common.comeceHoje}
                </Button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Faq />

      {/* Final CTA */}
      <section className="grain relative flex min-h-[80svh] items-center overflow-hidden bg-navy-deep py-28 text-cream">
        <ParallaxImage src={img('gestao-piscina')} alt="" strength={16} className="absolute inset-0" />
        <div className="absolute inset-0 bg-navy-deep/65" aria-hidden="true" />
        <RevealGroup className="relative mx-auto max-w-4xl px-5 text-center">
          <RevealItem>
            <Eyebrow className="justify-center text-terracotta">{g.cta.eyebrow}</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display mt-6 text-[clamp(2.6rem,6vw,5.6rem)] leading-[1] tracking-[-0.02em]">{g.cta.title}</h2>
          </RevealItem>
          <RevealItem>
            <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-cream/80">{g.cta.body}</p>
          </RevealItem>
          <RevealItem className="mt-12">
            <Button to={to('contactos')} variant="light">
              {t.common.contacteNos}
            </Button>
          </RevealItem>
        </RevealGroup>
      </section>
    </>
  )
}

function Faq() {
  const { t } = useLang()
  const f = t.gestao.faq
  const [open, setOpen] = useState<number | null>(0)
  const id = useId()
  return (
    <section className="bg-cream px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
        <RevealGroup className="lg:col-span-4">
          <RevealItem>
            <Eyebrow index="03" className="text-terracotta">
              {f.eyebrow}
            </Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{f.title}</h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-8 leading-relaxed text-ink-soft">{f.body}</p>
          </RevealItem>
        </RevealGroup>
        <ul className="lg:col-span-7 lg:col-start-6">
          {f.items.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} as="li" delay={i * 0.08} className="border-b border-navy/15">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="font-display text-xl md:text-2xl">{item.q}</span>
                    <span className="relative h-5 w-5 shrink-0" aria-hidden="true">
                      <span className="absolute top-1/2 left-0 h-px w-5 bg-terracotta" />
                      <span className={`absolute top-1/2 left-0 h-px w-5 bg-terracotta transition-transform duration-500 ${isOpen ? '' : 'rotate-90'}`} />
                    </span>
                  </button>
                </h3>
                {/* Answers stay in the DOM (prerendered for SEO); closed ones are collapsed and inert. */}
                <div
                  id={`${id}-${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-8 leading-relaxed text-ink-soft">
                      <Rich text={item.a} />
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
