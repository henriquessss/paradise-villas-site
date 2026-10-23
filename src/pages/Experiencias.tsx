import { useState } from 'react'
import { ExperienceCard, PageHero } from '../components/blocks'
import { IconTile } from '../components/icons'
import { Reveal } from '../components/motion/Reveal'
import { Accent, ArrowUpRight, Button, card, Eyebrow, SectionHeading, swipe } from '../components/ui'
import { useLang } from '../content'
import { civitatisUrl, EXTERNAL } from '../routes'

type Filter = keyof ReturnType<typeof useLang>['t']['experiencias']['filters']

export function Experiencias() {
  const { t, lang } = useLang()
  const e = t.experiencias
  const [filter, setFilter] = useState<Filter>('all')
  const items = filter === 'all' ? e.items : e.items.filter((item) => item.category === filter)
  const extraLinks = [civitatisUrl(lang, 'transfers'), EXTERNAL.huglocals]

  return (
    <>
      <PageHero eyebrow={e.header.eyebrow} title={e.header.title} body={e.header.body} image="experiencias-mar" />

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <div role="group" aria-label={e.filtersLabel} className="flex flex-wrap gap-2">
            {(Object.keys(e.filters) as Filter[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  filter === key ? 'bg-terracotta text-white shadow-[0_8px_20px_-8px_rgba(214,89,55,0.7)]' : 'bg-white text-navy hover:bg-sand'
                }`}
              >
                {e.filters[key]}
              </button>
            ))}
          </div>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.slug.pt}>
                <ExperienceCard item={item} />
              </li>
            ))}
          </ul>

          <Reveal className={`${card} mt-16 p-8 text-center md:p-14`}>
            <Eyebrow>{e.more.eyebrow}</Eyebrow>
            <h2 className="font-display mx-auto mt-4 max-w-xl text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.1] text-navy">
              <Accent text={e.more.title} />
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-ink-soft">{e.more.body}</p>
            <div className="mt-8">
              <Button href={civitatisUrl(lang)}>{e.more.cta}</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-5 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow={e.extras.eyebrow} title={e.extras.title} body={e.extras.body} />
        <ul className={`mx-auto mt-14 grid max-w-[1000px] gap-6 md:grid-cols-2 ${swipe}`}>
          {e.extras.items.map((item, i) => {
            const cta = 'mt-6 inline-flex items-center gap-2 self-start rounded-full bg-terracotta px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark'
            return (
              <Reveal as="li" key={item.title} delay={i * 0.08} className={`${card} flex flex-col p-8`}>
                <IconTile name={item.icon} />
                <h3 className="mt-5 text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                <a href={extraLinks[i]} target="_blank" rel="noopener" className={cta}>
                  {item.cta} <ArrowUpRight />
                  <span className="sr-only"> {t.common.opensNewTab}</span>
                </a>
              </Reveal>
            )
          })}
        </ul>
      </section>
    </>
  )
}
