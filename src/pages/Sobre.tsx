import { motion } from 'motion/react'
import { Link } from 'react-router'
import { Parallax, ParallaxImage } from '../components/motion/Parallax'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal'
import { ScrollMarquee } from '../components/motion/ScrollMarquee'
import { PageHeader } from '../components/PageHeader'
import { Rich } from '../components/Rich'
import { Arrow, ArrowUpRight, Button, Eyebrow, img } from '../components/ui'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'

// [text, image] desktop grid order per pillar (literal classes for Tailwind).
const desktopOrder = [
  ['lg:order-1', 'lg:order-2'],
  ['lg:order-3', 'lg:order-4'],
  ['lg:order-6', 'lg:order-5'],
  ['lg:order-8', 'lg:order-7'],
]

/** Circular gauge whose arc draws itself when scrolled into view. */
function Ring({ value, label }: { value: number; label: string }) {
  return (
    <figure className="flex items-center gap-5">
      <div className="relative h-28 w-28 shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-navy/10" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-terracotta"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: value / 100 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="font-display absolute inset-0 flex items-center justify-center text-2xl">{value}%</span>
      </div>
      <figcaption className="eyebrow">{label}</figcaption>
    </figure>
  )
}

export function Sobre() {
  const { t, to } = useLang()
  const s = t.sobre
  const ctaLinks = [{ to: to('gestao') }, { href: EXTERNAL.booking }]
  const ctaLabels = [t.common.saberMais, t.common.verAlojamentos]

  return (
    <>
      <PageHeader eyebrow={s.header.eyebrow} title={s.header.title} image={img('ig-villa-piscina')} />

      {/* Intro */}
      <section className="px-5 py-28 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[1.02] tracking-[-0.02em]">{s.intro.title}</h2>
          </Reveal>
          <RevealGroup className="lg:col-span-6 lg:col-start-7">
            {s.intro.body.map((p) => (
              <RevealItem key={p}>
                <p className="mb-6 text-lg leading-relaxed text-ink-soft">
                  <Rich text={p} />
                </p>
              </RevealItem>
            ))}
            <RevealItem className="mt-10 flex flex-wrap gap-10">
              {s.intro.rings.map((r) => (
                <Ring key={r.label} value={r.value} label={r.label} />
              ))}
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <ScrollMarquee text={t.marquee.alojamentos} className="font-display pb-10 text-[13vw] leading-none text-navy/[0.07] italic md:pb-16 md:text-[10vw]" />

      {/* Mission / Vision / Values / Difference — checkerboard */}
      <section className="bg-sand">
        <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {s.pillars.map((p, i) => {
            const text = (
              <Reveal variant="fade" className="flex aspect-square flex-col justify-between bg-cream p-8 md:p-10">
                <span className="font-display text-5xl text-terracotta">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-3xl md:text-4xl">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </Reveal>
            )
            const image = (
              <Reveal variant="clip" delay={0.15}>
                <ParallaxImage src={img(p.image)} alt="" strength={8} className="aspect-square w-full" />
              </Reveal>
            )
            // DOM order is text, image per pillar (mobile / 2 columns). On desktop the second
            // row swaps to image, text so the four rows read as a checkerboard.
            return (
              <li key={p.title} className="contents">
                <div className={desktopOrder[i][0]}>{text}</div>
                <div className={desktopOrder[i][1]}>{image}</div>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Founder */}
      <section className="overflow-hidden px-5 py-28 md:px-10 md:py-40">
        <div className="mx-auto grid max-w-[1440px] items-center gap-16 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            <Reveal variant="clip">
              <img src={img('fundador')} alt={s.founder.imageAlt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </Reveal>
            <Parallax speed={-30} className="pointer-events-none absolute -right-6 -bottom-10 hidden md:block">
              <span className="font-display text-[9rem] leading-none text-terracotta/90 italic">“</span>
            </Parallax>
          </div>
          <RevealGroup className="lg:col-span-6 lg:col-start-7">
            <RevealItem>
              <Eyebrow className="text-terracotta">{s.founder.eyebrow}</Eyebrow>
            </RevealItem>
            <RevealItem>
              <h2 className="font-display mt-5 text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-[-0.02em]">{s.founder.name}</h2>
            </RevealItem>
            <RevealItem>
              <p className="font-display mt-6 text-2xl italic">{s.founder.title}</p>
            </RevealItem>
            {s.founder.body.map((p) => (
              <RevealItem key={p}>
                <p className="mt-6 leading-relaxed text-ink-soft">
                  <Rich text={p} />
                </p>
              </RevealItem>
            ))}
            <RevealItem>
              <p className="font-display mt-10 border-l-2 border-terracotta pl-6 text-xl leading-snug">{s.founder.closing}</p>
            </RevealItem>
            <RevealItem className="mt-10">
              <Button to={to('contactos')}>{t.common.contacteNos}</Button>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Two CTA cards */}
      <section className="grid md:grid-cols-2">
        {s.ctas.map((c, i) => {
          const link = ctaLinks[i]
          const body = (
            <>
              <ParallaxImage src={img(c.image)} alt="" strength={10} className="absolute inset-0 transition-transform duration-[1.4s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-navy-deep/20 transition-colors duration-700 group-hover:bg-navy-deep/30" aria-hidden="true" />
              <div className="relative flex h-full flex-col justify-end p-8 text-cream md:p-14">
                <h2 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.05]">{c.title}</h2>
                <p className="mt-4 max-w-md leading-relaxed text-cream/80">{c.text}</p>
                <span className="mt-8 inline-flex items-center gap-3 text-[0.8rem] font-semibold tracking-[0.14em] uppercase">
                  {ctaLabels[i]}
                  {'href' in link ? <ArrowUpRight /> : <Arrow className="transition-transform group-hover:translate-x-1" />}
                </span>
              </div>
            </>
          )
          const className = 'group grain relative block min-h-[70svh] overflow-hidden bg-navy-deep'
          return 'href' in link ? (
            <a key={c.title} href={link.href} target="_blank" rel="noopener" className={className}>
              {body}
            </a>
          ) : (
            <Link key={c.title} to={link.to!} className={className}>
              {body}
            </Link>
          )
        })}
      </section>
    </>
  )
}
