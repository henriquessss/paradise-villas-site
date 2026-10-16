import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useLang } from '../content'
import { civitatisUrl, EXTERNAL } from '../routes'
import { Icon, IconTile } from './icons'
import { Reveal } from './motion/Reveal'
import { Accent, ArrowUpRight, card, img } from './ui'

/** Dark header for inner pages: photo, eyebrow, accented title, intro, breadcrumb. */
export function PageHero({ eyebrow, title, body, image, children }: { eyebrow: string; title: string; body?: string; image: string; children?: ReactNode }) {
  const { t, to } = useLang()
  return (
    <section data-header-dark className="relative overflow-hidden bg-navy-deep px-5 pt-36 pb-20 text-center text-white md:pt-44 md:pb-28">
      <img src={img(image)} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/80" aria-hidden="true" />
      <div className="animate-rise relative mx-auto max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
          <Link to={to('home')} className="transition-colors hover:text-white">
            {t.common.home}
          </Link>
          <span className="mx-2" aria-hidden="true">
            /
          </span>
          <span className="text-white/85">{eyebrow}</span>
        </nav>
        <p className="eyebrow text-terracotta">{eyebrow}</p>
        <h1 className="font-display mt-4 text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.04] tracking-[-0.015em]">
          <Accent text={title} />
        </h1>
        {body && <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">{body}</p>}
        {children && <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  )
}

/** Phone, email and WhatsApp cards. */
export function ContactChannels() {
  const { t } = useLang()
  const c = t.channels
  const items = [
    { icon: 'phone', title: c.phone.title, value: EXTERNAL.phoneDisplay, note: c.phone.note, href: `tel:${EXTERNAL.phone}` },
    { icon: 'mail', title: c.email.title, value: EXTERNAL.email, href: `mailto:${EXTERNAL.email}` },
    { icon: 'message', title: c.whatsapp.title, value: c.whatsapp.value, href: EXTERNAL.whatsapp, external: true },
  ]
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 0.08}>
          <a
            href={item.href}
            {...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
            className={`${card} group flex h-full flex-col items-center p-8 text-center transition-transform duration-300 hover:-translate-y-1`}
          >
            <IconTile name={item.icon} className="h-14 w-14" />
            <span className="mt-5 font-semibold text-navy">{item.title}</span>
            <span className="mt-1.5 text-ink-soft transition-colors group-hover:text-terracotta">{item.value}</span>
            {item.note && <span className="mt-1 text-xs text-ink-soft/80">{item.note}</span>}
          </a>
        </Reveal>
      ))}
    </ul>
  )
}

export type Experience = (ReturnType<typeof useLang>['t'])['experiencias']['items'][number]

/** Civitatis activity card. */
export function ExperienceCard({ item }: { item: Experience }) {
  const { t, lang } = useLang()
  const category = t.experiencias.filters[item.category as keyof typeof t.experiencias.filters]
  return (
    <a
      href={civitatisUrl(lang, item.slug[lang])}
      target="_blank"
      rel="noopener sponsored"
      className={`${card} group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={img(item.image)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute top-4 left-4 rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-white">{category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
          <Icon name="pin" className="h-3.5 w-3.5 text-terracotta" /> {item.place}
        </p>
        <h3 className="mt-2 text-lg leading-snug font-semibold text-navy">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta">
          {t.common.reservarAgora} <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          <span className="sr-only"> {t.common.opensNewTab}</span>
        </span>
      </div>
    </a>
  )
}

/** Dark band with an accented title and actions (end-of-page calls to action). */
export function CtaBand({ eyebrow, title, body, children }: { eyebrow: string; title: string; body: string; children: ReactNode }) {
  return (
    <section className="bg-navy-deep px-5 py-20 text-center text-white md:py-28">
      <Reveal className="mx-auto max-w-2xl">
        <p className="eyebrow text-terracotta">{eyebrow}</p>
        <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08]">
          <Accent text={title} />
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/70">{body}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">{children}</div>
      </Reveal>
    </section>
  )
}
