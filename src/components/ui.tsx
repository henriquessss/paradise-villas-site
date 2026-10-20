import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router'
import { useLang } from '../content'

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={`h-4 w-4 ${className}`}>
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" className={`h-4 w-4 ${className}`}>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Renders a title where `*text*` becomes the italic terracotta accent. */
export function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <em key={i} className="text-terracotta italic">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

/** Plain-text version of an accented title (aria-labels, alt texts). */
export const plain = (text: string) => text.replace(/\*/g, '')

type Variant = 'solid' | 'outline' | 'dark' | 'light' | 'ghost-light'

const variants: Record<Variant, string> = {
  solid: 'bg-terracotta text-white shadow-[0_8px_24px_-8px_rgba(214,89,55,0.6)] hover:bg-terracotta-dark',
  outline: 'border border-navy/20 bg-white text-navy hover:border-navy/40 hover:bg-sand',
  dark: 'bg-navy text-white hover:bg-navy-deep',
  light: 'bg-white text-navy hover:bg-sand',
  'ghost-light': 'border border-white/40 text-white hover:bg-white hover:text-navy',
}

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  className?: string
  /** Internal route. */
  to?: string
  /** External URL — opens in a new tab. */
  href?: string
  /** Same-page anchor or tel:/mailto: — no new tab. */
  anchor?: string
  icon?: 'arrow' | 'external' | 'none'
}

/** Rounded button. Internal (`to`), external (`href`) or plain link (`anchor`). */
export function Button({ children, variant = 'solid', className = '', to, href, anchor, icon }: ButtonProps) {
  const { t } = useLang()
  const classes = `group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.92rem] font-semibold transition-colors duration-300 ${variants[variant]} ${className}`
  const kind = icon ?? (href ? 'external' : 'arrow')
  const inner = (
    <>
      {/* inline-flex: preflight makes svg children display:block, which would break the line */}
      <span className="inline-flex items-center gap-2">{children}</span>
      {kind === 'external' && <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
      {kind === 'arrow' && <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  )
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {inner}
        <span className="sr-only"> {t.common.opensNewTab}</span>
      </a>
    )
  }
  if (anchor) {
    return (
      <a href={anchor} className={classes}>
        {inner}
      </a>
    )
  }
  return (
    <Link to={to ?? '/'} className={classes}>
      {inner}
    </Link>
  )
}

/** Small uppercase label above a title. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow text-terracotta ${className}`}>{children}</p>
}

/** Eyebrow + accented title + optional intro, centred by default. */
export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'center',
  as: Tag = 'h2',
  className = '',
  dark = false,
}: {
  eyebrow?: string
  title: string
  body?: string
  align?: 'center' | 'left'
  as?: 'h1' | 'h2'
  className?: string
  dark?: boolean
}) {
  const centred = align === 'center'
  return (
    <div className={`${centred ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag
        className={`font-display mt-4 leading-[1.08] tracking-[-0.01em] ${Tag === 'h1' ? 'text-[clamp(2.4rem,5.4vw,4.4rem)]' : 'text-[clamp(2rem,4vw,3.25rem)]'} ${dark ? 'text-white' : 'text-navy'}`}
      >
        <Accent text={title} />
      </Tag>
      {body && <p className={`mt-5 text-[1.05rem] leading-relaxed ${dark ? 'text-white/70' : 'text-ink-soft'}`}>{body}</p>}
    </div>
  )
}

/** White rounded card. */
export const card = 'rounded-3xl border border-navy/[0.06] bg-white shadow-[0_1px_2px_rgba(0,25,44,0.04),0_12px_32px_-16px_rgba(0,25,44,0.12)]'

export const img = (name: string) => `/images/${name}.webp`

/**
 * Phones: a card list becomes an edge-to-edge swipe row with the next card peeking; the grid takes over from `md`.
 * The row's cards skip their scroll reveal there (the peeking card is too clipped to ever "enter" the viewport) and
 * are `relative`, so absolutely positioned bits inside them (sr-only text) stay clipped by the row instead of widening the page.
 */
export const swipe =
  'max-md:-mx-5 max-md:flex max-md:snap-x max-md:snap-mandatory max-md:scroll-px-5 max-md:overflow-x-auto max-md:px-5 max-md:pb-6 max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden max-md:*:w-[84%] max-md:*:max-w-sm max-md:*:shrink-0 max-md:*:relative max-md:*:snap-start max-md:*:!transform-none max-md:*:!opacity-100'

/** Icon + title + text card: stacked from `sm`, icon beside the text on phones (about half the height). */
export const featureCard = `${card} p-7 max-sm:grid max-sm:grid-cols-[auto_1fr] max-sm:gap-x-4 max-sm:p-5 max-sm:text-left max-sm:[&>span]:row-span-2 max-sm:[&>h3]:mt-0 max-sm:[&>h3]:pt-0.5 max-sm:[&>p]:col-start-2 max-sm:[&>p]:mt-1`
