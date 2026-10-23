import { Link } from 'react-router'
import { ContactChannels, ExperienceCard } from '../components/blocks'
import { HomeHero } from '../components/HomeHero'
import { Icon, IconTile } from '../components/icons'
import { Reveal } from '../components/motion/Reveal'
import { Simulator } from '../components/Simulator'
import { Accent, ArrowUpRight, Button, card, Eyebrow, img, SectionHeading, swipe } from '../components/ui'
import { useLang } from '../content'
import { civitatisUrl, EXTERNAL } from '../routes'

function Services() {
  const { t, lang, to } = useLang()
  const s = t.home.services
  const links = [
    { href: EXTERNAL.booking },
    { to: to('experiencias') },
    { href: civitatisUrl(lang, 'transfers') },
  ]
  return (
    <section id="servicos" className="px-5 py-24 md:px-8 md:py-32">
      <SectionHeading eyebrow={s.eyebrow} title={s.title} body={s.body} />
      <ul className={`mx-auto mt-14 grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-3 ${swipe}`}>
        {s.items.map((item, i) => {
          const link = links[i]
          const body = (
            <>
              <IconTile name={item.icon} />
              <h3 className="mt-6 text-lg font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta">
                {item.cta} {link.href ? <ArrowUpRight /> : <span aria-hidden="true">→</span>}
              </span>
            </>
          )
          const cls = `${card} group flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-1`
          return (
            <Reveal as="li" key={item.title} delay={i * 0.08}>
              {link.href ? (
                <a href={link.href} target="_blank" rel="noopener" className={cls}>
                  {body}
                </a>
              ) : (
                <Link to={link.to!} className={cls}>
                  {body}
                </Link>
              )}
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}

function Featured() {
  const { t } = useLang()
  const f = t.home.featured
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow={f.eyebrow} title={f.title} body={f.body} align="left" />
          <Button href={EXTERNAL.booking} variant="outline" className="shrink-0 self-start md:self-auto">
            {f.cta}
          </Button>
        </div>
        <ul className={`mt-12 grid gap-6 md:grid-cols-3 ${swipe}`}>
          {f.villas.map((villa, i) => (
            <Reveal as="li" key={villa.name} delay={i * 0.1}>
              <a href={villa.href} target="_blank" rel="noopener" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                  <img src={img(villa.image)} alt={villa.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-navy backdrop-blur">
                    <Icon name="pin" className="h-3.5 w-3.5 text-terracotta" /> {villa.place}
                  </span>
                </div>
                <h3 className="font-display mt-5 flex items-center justify-between text-2xl text-navy">
                  {villa.name}
                  <ArrowUpRight className="h-5 w-5 text-terracotta transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{villa.text}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Management() {
  const { t, to } = useLang()
  const m = t.home.management
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal variant="left" className="relative">
          <img src={img('boas-vindas-interior')} alt={m.imageAlt} loading="lazy" className="aspect-[5/4] w-full rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgba(0,25,44,0.45)]" />
          <div className={`${card} absolute -right-3 -bottom-6 px-6 py-5 md:-right-8`}>
            <p className="font-display text-4xl leading-none text-terracotta">{m.badge.value}</p>
            <p className="mt-1.5 max-w-[9rem] text-xs leading-snug text-ink-soft">{m.badge.label}</p>
          </div>
        </Reveal>
        <Reveal variant="right">
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] text-navy">
            <Accent text={m.title} />
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">{m.body}</p>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {m.items.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-navy">
                <Icon name="checkCircle" className="h-5 w-5 shrink-0 text-terracotta" /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to={to('gestao')}>{m.cta}</Button>
            <Button anchor="#simulador" variant="outline" icon="none">
              <Icon name="calculator" className="-ml-1 h-4 w-4 text-terracotta" /> {m.simulate}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Algarve() {
  const { t } = useLang()
  const a = t.home.algarve
  const photos = ['algarve-praias', 'algarve-lugares', 'algarve-tradicao', 'experiencias-praia']
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] text-navy">
            <Accent text={a.title} />
          </h2>
          <p className="mt-5 leading-relaxed text-ink-soft">{a.body}</p>
          <ul className="mt-10 space-y-6">
            {a.features.map((f) => (
              <li key={f.title} className="flex gap-4">
                <IconTile name={f.icon} />
                <div>
                  <h3 className="font-semibold text-navy">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {photos.map((photo, i) => (
            <Reveal key={photo} delay={i * 0.08} variant="scale" className={i % 2 ? 'translate-y-10' : ''}>
              <img src={img(photo)} alt={a.imageAlt[i]} loading="lazy" className={`w-full rounded-3xl object-cover ${i === 0 || i === 3 ? 'aspect-[4/5]' : 'aspect-square'}`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experiences() {
  const { t, to } = useLang()
  const e = t.home.experiences
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-32">
      <SectionHeading eyebrow={e.eyebrow} title={e.title} body={e.body} />
      <ul className={`mx-auto mt-14 grid max-w-[1200px] gap-6 md:grid-cols-3 ${swipe}`}>
        {t.experiencias.items.slice(0, 3).map((item, i) => (
          <Reveal as="li" key={item.slug.pt} delay={i * 0.08}>
            <ExperienceCard item={item} />
          </Reveal>
        ))}
      </ul>
      <div className="mt-12 text-center">
        <Button to={to('experiencias')}>{e.cta}</Button>
      </div>
    </section>
  )
}

function DirectBooking() {
  const { t } = useLang()
  const d = t.home.direct
  return (
    <section className="relative overflow-hidden bg-navy-deep px-5 py-24 text-center text-white md:py-28">
      <img src={img('ig-villa-piscina')} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <Reveal className="relative mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/40 bg-terracotta/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-terracotta uppercase">
          <Icon name="percent" className="h-3.5 w-3.5" /> {d.badge}
        </span>
        <h2 className="font-display mt-6 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.06]">
          <Accent text={d.title} />
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/70">{d.body}</p>
        <ul className="mt-9 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
          {d.items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Icon name="check" className="h-4 w-4 text-terracotta" /> {item}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={EXTERNAL.booking}>{d.cta}</Button>
        </div>
      </Reveal>
    </section>
  )
}

function Testimonials() {
  const { t } = useLang()
  const r = t.home.testimonials
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <SectionHeading eyebrow={r.eyebrow} title={r.title} />
      <ul className={`mx-auto mt-14 grid max-w-[1200px] gap-6 md:grid-cols-3 ${swipe}`}>
        {r.items.map((item, i) => (
          <Reveal as="li" key={item.name} delay={i * 0.08} className={`${card} flex flex-col p-8`}>
            <div className="flex gap-1 text-terracotta" aria-hidden="true">
              {Array.from({ length: 5 }, (_, k) => (
                <svg key={k} viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M11.53 2.3a.53.53 0 0 1 .95 0l2.31 4.68a2.12 2.12 0 0 0 1.6 1.16l5.16.76a.53.53 0 0 1 .3.9l-3.74 3.64a2.12 2.12 0 0 0-.61 1.88l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.12 2.12 0 0 0-1.97 0L6.4 21.01a.53.53 0 0 1-.77-.56l.88-5.14a2.12 2.12 0 0 0-.61-1.88L2.16 9.8a.53.53 0 0 1 .3-.9l5.16-.76a2.12 2.12 0 0 0 1.6-1.16z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-5 flex-1 leading-relaxed text-navy">“{item.quote}”</blockquote>
            <footer className="mt-6 border-t border-navy/[0.07] pt-5">
              <p className="font-semibold text-navy">{item.name}</p>
              <p className="text-sm text-ink-soft">{item.role}</p>
            </footer>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

function Contact() {
  const { t } = useLang()
  const c = t.home.contact
  return (
    <section className="bg-sand px-5 py-24 md:px-8 md:py-32">
      <SectionHeading eyebrow={c.eyebrow} title={c.title} body={c.body} />
      <div className="mx-auto mt-14 max-w-[720px]">
        <ContactChannels />
      </div>
    </section>
  )
}

export function Home() {
  const { to } = useLang()
  return (
    <>
      <HomeHero />
      <Services />
      <Featured />
      <Management />
      {/* Right after management: its "Simular rendimento" button jumps here. */}
      <section id="simulador" className="bg-white px-5 py-24 md:px-8 md:py-32">
        <Simulator proposalHref={`${to('gestao')}#proposta`} />
      </section>
      <Algarve />
      <Experiences />
      <DirectBooking />
      <Testimonials />
      <Contact />
    </>
  )
}
