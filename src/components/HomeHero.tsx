import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useLang } from '../content'
import { bookingSearchUrl, EXTERNAL } from '../routes'
import { Icon } from './icons'
import { CountUp } from './motion/CountUp'
import { Accent } from './ui'

const isoDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
const parseDate = (value: string) => {
  const [y, m, d] = value.split('-').map(Number)
  return y && m && d ? new Date(y, m - 1, d) : null
}

/**
 * Background montage of the client's villas. The poster is the prerendered LCP image (one
 * per breakpoint via <picture>); the video gets its source after hydration, matching the
 * screen, and never plays for reduced motion.
 */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.src = window.matchMedia('(max-width: 767px)').matches ? '/video/hero-mobile.mp4' : '/video/hero-desktop.mp4'
    video.play().catch(() => {})
  }, [])

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <picture>
        <source media="(max-width: 767px)" srcSet="/video/hero-mobile.webp" />
        <img src="/video/hero-desktop.webp" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${playing ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-navy-deep/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/60" />
    </div>
  )
}

function SearchForm() {
  const { t, lang } = useLang()
  const s = t.home.hero.search
  const id = useId()
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState(2)
  const [error, setError] = useState(false)
  // "Today" only after hydration, so the prerendered HTML does not carry a build date.
  const [today, setToday] = useState<string>()
  useEffect(() => setToday(isoDate(new Date())), [])

  const from = parseDate(checkin)
  const minCheckout = from ? isoDate(new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1)) : today

  function submit(event: FormEvent) {
    event.preventDefault()
    const to = parseDate(checkout)
    if (from && to && to <= from) return setError(true)
    setError(false)
    const url = from && to ? bookingSearchUrl(lang, { from, to, guests }) : EXTERNAL.booking
    window.open(url, '_blank', 'noopener')
  }

  const box = 'flex items-center gap-3 rounded-2xl border border-navy/10 bg-white px-4 py-2.5 text-left transition-colors focus-within:border-terracotta'
  const label = 'block text-[0.68rem] font-bold tracking-[0.12em] text-ink-soft uppercase'
  const input = 'w-full bg-transparent text-[0.95rem] font-medium text-navy outline-none'

  return (
    <form onSubmit={submit} aria-label={s.label} className="grid gap-3 md:grid-cols-[1fr_1fr_0.85fr_auto]">
      <div className={box}>
        <Icon name="calendar" className="h-5 w-5 shrink-0 text-terracotta" />
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-in`} className={label}>
            {s.checkin}
          </label>
          <input
            id={`${id}-in`}
            type="date"
            min={today}
            value={checkin}
            onChange={(e) => {
              setCheckin(e.target.value)
              const next = parseDate(e.target.value)
              const out = parseDate(checkout)
              if (next && out && out <= next) setCheckout('')
            }}
            className={input}
          />
        </div>
      </div>
      <div className={box}>
        <Icon name="calendar" className="h-5 w-5 shrink-0 text-terracotta" />
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-out`} className={label}>
            {s.checkout}
          </label>
          <input id={`${id}-out`} type="date" min={minCheckout} value={checkout} onChange={(e) => setCheckout(e.target.value)} className={input} aria-invalid={error} />
        </div>
      </div>
      <div className={box}>
        <Icon name="users" className="h-5 w-5 shrink-0 text-terracotta" />
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-guests`} className={label}>
            {s.guests}
          </label>
          <select id={`${id}-guests`} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={`${input} cursor-pointer appearance-none`}>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? s.guest : s.guestsUnit}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-terracotta px-7 py-4 font-semibold text-white shadow-[0_10px_24px_-10px_rgba(214,89,55,0.8)] transition-colors hover:bg-terracotta-dark"
      >
        <Icon name="search" className="h-5 w-5" />
        {s.submit}
      </button>
      {error && (
        <p role="alert" className="text-sm text-red-700 md:col-span-4">
          {s.invalid}
        </p>
      )}
    </form>
  )
}

export function HomeHero() {
  const { t } = useLang()
  const h = t.home.hero

  return (
    <section data-header-dark className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy-deep px-4 pt-28 pb-20 md:px-8">
      <HeroVideo />

      <div className="animate-rise relative w-full max-w-[920px] rounded-[2rem] bg-white/[0.93] p-6 text-center shadow-[0_40px_80px_-30px_rgba(0,25,44,0.6)] backdrop-blur-xl md:p-10">
        <ul className="flex flex-wrap justify-center gap-2">
          {h.badges.map((badge, i) => (
            <li key={badge} className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3.5 py-1.5 text-xs font-semibold text-navy">
              <Icon name={i === 0 ? 'pin' : 'star'} className="h-3.5 w-3.5 text-terracotta" />
              {badge}
            </li>
          ))}
        </ul>
        <h1 className="font-display mx-auto mt-6 max-w-2xl text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.015em] text-navy">
          <Accent text={h.title} />
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">{h.lead}</p>

        <div className="mt-8">
          <SearchForm />
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-y-5 border-t border-navy/[0.08] pt-7 md:grid-cols-4">
          {h.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-xs font-medium text-ink-soft">{stat.label}</dt>
              <dd className="font-display text-[2rem] leading-none text-navy">
                <CountUp to={stat.value} locale={t.locale} />
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a href="#servicos" className="animate-bob absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full border border-white/30 p-2.5 text-white md:block" aria-label={t.common.scroll}>
        <Icon name="arrowDown" className="h-4 w-4" />
      </a>
    </section>
  )
}
