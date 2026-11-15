import { Link } from 'react-router'
import { PageHero } from '../components/blocks'
import { IconTile } from '../components/icons'
import { Reveal } from '../components/motion/Reveal'
import { Rich } from '../components/Rich'
import { Accent, ArrowUpRight, Eyebrow, featureCard, img, SectionHeading } from '../components/ui'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'

export function Sobre() {
  const { t, to } = useLang()
  const s = t.sobre
  const ctaLinks = [{ to: to('gestao') }, { href: EXTERNAL.booking }]
  const ctaLabels = [t.common.saberMais, t.common.verAlojamentos]

  return (
    <>
      <PageHero eyebrow={s.header.eyebrow} title={s.header.title} body={s.header.body} image="ig-villa-piscina" />

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal variant="left">
            {/* 3:2 is the photo's own shape: shown whole, no cropping. */}
            <img src={img('sobre-casa')} alt={s.intro.imageAlt} loading="lazy" width={1400} height={933} className="aspect-[3/2] w-full rounded-3xl object-cover" />
          </Reveal>
          <Reveal variant="right">
            <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-[1.1] text-navy">
              <Accent text={s.intro.title} />
            </h2>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-ink-soft [&_strong]:text-navy">
              {s.intro.body.map((p) => (
                <p key={p}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-5 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow={s.pillars.eyebrow} title={s.pillars.title} />
        <ul className="mx-auto mt-14 grid max-w-[1040px] gap-5 sm:grid-cols-2">
          {s.pillars.items.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 0.08} className={`${featureCard} md:p-9`}>
              <div className="flex items-center gap-4">
                <IconTile name={p.icon} />
                <h3 className="font-display text-2xl text-navy">{p.title}</h3>
              </div>
              <div className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
                {p.text.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          <Reveal variant="scale">
            {/* 3:4 is the portrait's own shape: shown whole. */}
            <img
              src={img('fundador')}
              alt={s.founder.imageAlt}
              loading="lazy"
              width={1086}
              height={1448}
              className="mx-auto aspect-[3/4] w-full max-w-[460px] rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgba(0,25,44,0.45)] lg:max-w-none"
            />
          </Reveal>
          <Reveal>
            <Eyebrow>{s.founder.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] text-navy">
              <Accent text={s.founder.title} />
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
              {s.founder.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <figure className="mt-8 border-l-2 border-terracotta pl-5">
              <blockquote className="font-display text-xl leading-snug text-navy italic">“{s.founder.closing}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="block font-semibold text-navy">{s.founder.name}</span>
                <span className="text-ink-soft">{s.founder.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-5 py-24 md:px-8 md:py-28">
        <ul className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2">
          {s.ctas.map((cta, i) => {
            const link = ctaLinks[i]
            const inner = (
              <>
                <img src={img(cta.image)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-transparent" aria-hidden="true" />
                <div className="relative mt-auto p-8 text-white md:p-10">
                  <h2 className="font-display text-3xl">{cta.title}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">{cta.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-navy">
                    {ctaLabels[i]} {link.href ? <ArrowUpRight /> : <span aria-hidden="true">→</span>}
                  </span>
                </div>
              </>
            )
            const cls = 'group relative flex min-h-[420px] overflow-hidden rounded-3xl'
            return (
              <Reveal as="li" key={cta.title} delay={i * 0.1}>
                {link.href ? (
                  <a href={link.href} target="_blank" rel="noopener" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link to={link.to!} className={cls}>
                    {inner}
                  </Link>
                )}
              </Reveal>
            )
          })}
        </ul>
      </section>
    </>
  )
}
