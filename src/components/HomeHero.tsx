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
      <div className="absolute inset-0 bg-navy-deep/40" />
      {/* Text sits straight on the video: extra shade behind the centre and the bottom stats. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,25,44,0.45),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-navy-deep/75" />
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

  // One white bar: a pill on desktop; on phones a compact 2×2 card (dates side by side, then
  // guests next to the button). Each segment is the <label>, so tapping the icon or the padding
  // focuses the control (bigger touch target). Inputs stay at 16px on phones so iOS does not zoom.
  const box = 'flex cursor-pointer items-center gap-2.5 rounded-2xl px-3 py-2 text-left transition-colors hover:bg-sand/60 focus-within:bg-sand/70 md:gap-3 md:rounded-full lg:px-5'
  const divider = 'relative before:absolute before:inset-y-2.5 before:left-0 before:w-px before:bg-navy/10'
  const label = 'block text-[0.62rem] font-bold tracking-[0.12em] text-ink-soft uppercase'
  const input = 'w-full bg-transparent text-base font-medium text-navy outline-none md:text-[0.95rem]'
  const dateIcon = 'hidden h-5 w-5 shrink-0 text-terracotta md:block'

  return (
    <form onSubmit={submit} aria-label={s.label} className="mx-auto grid max-w-[760px] grid-cols-2 gap-x-1 rounded-[1.5rem] bg-white p-1.5 shadow-[0_30px_60px_-25px_rgba(0,25,44,0.55)] md:grid-cols-[1fr_1fr_0.8fr_auto] md:items-center md:gap-x-0 md:rounded-full">
      <label htmlFor={`${id}-in`} className={box}>
        <Icon name="calendar" className={dateIcon} />
        <span className="min-w-0 flex-1">
          <span className={label}>{s.checkin}</span>
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
        </span>
      </label>
      <label htmlFor={`${id}-out`} className={`${box} ${divider}`}>
        <Icon name="calendar" className={dateIcon} />
        <span className="min-w-0 flex-1">
          <span className={label}>{s.checkout}</span>
          <input id={`${id}-out`} type="date" min={minCheckout} value={checkout} onChange={(e) => setCheckout(e.target.value)} className={input} aria-invalid={error} />
        </span>
      </label>
      <label
        htmlFor={`${id}-guests`}
        className={`${box} max-md:mt-1 max-md:bg-sand/60 md:relative md:before:absolute md:before:inset-y-2.5 md:before:left-0 md:before:w-px md:before:bg-navy/10`}
      >
        <Icon name="users" className="h-5 w-5 shrink-0 text-terracotta" />
        <span className="min-w-0 flex-1">
          <span className={label}>{s.guests}</span>
          <select id={`${id}-guests`} value={guests} onChange={(e) => setGuests(Number(e.target.value))} className={`${input} cursor-pointer appearance-none`}>
            {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? s.guest : s.guestsUnit}
              </option>
            ))}
          </select>
        </span>
      </label>
      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-terracotta px-4 py-3 font-semibold text-white shadow-[0_10px_24px_-10px_rgba(214,89,55,0.8)] transition-colors hover:bg-terracotta-dark md:mt-0 md:rounded-full md:px-5 lg:px-6"
      >
        <Icon name="search" className="h-5 w-5" />
        {s.submit}
      </button>
      {error && (
        <p role="alert" className="col-span-full px-4 pt-2 pb-1 text-left text-sm text-red-700">
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
    <section data-header-dark className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-navy-deep px-5 pt-24 pb-10 text-center text-white sm:pt-28 md:px-8">
      <HeroVideo />

      <div className="animate-rise relative w-full max-w-[1000px]">
        <h1 className="font-display mx-auto max-w-3xl text-[clamp(2.6rem,7vw,5.6rem)] leading-[1] tracking-[-0.015em] [text-shadow:0_2px_30px_rgba(0,25,44,0.35)] [&_em]:text-[#f2a07f]">
          <Accent text={h.title} />
        </h1>
        <p className="mx-auto mt-5 hidden max-w-xl text-[1.05rem] leading-relaxed text-white/80 sm:block">{h.lead}</p>

        <div className="mt-8 sm:mt-10">
          <SearchForm />
        </div>
      </div>

      <dl className="animate-rise relative mt-10 grid w-full max-w-[680px] grid-cols-3 gap-2 border-t border-white/15 pt-6 [animation-delay:0.15s] sm:mt-14">
        {h.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse justify-end">
            <dt className="mt-1.5 text-[0.7rem] leading-tight text-white/65 sm:text-xs">{stat.label}</dt>
            <dd className="font-display text-[1.5rem] leading-none sm:text-[2rem]">
              <CountUp to={stat.value} locale={t.locale} />
              {stat.suffix}
            </dd>
          </div>
        ))}
      </dl>

    </section>
  )
}
