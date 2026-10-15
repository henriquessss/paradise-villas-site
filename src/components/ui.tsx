import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useLang } from '../content'

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className={`h-3 w-8 ${className}`}>
      <path d="M0 6h30M25 1l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`h-4 w-4 ${className}`}>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type Variant = 'solid' | 'outline' | 'light' | 'ghost-light'

const variants: Record<Variant, string> = {
  /** On light backgrounds. */
  solid: 'bg-navy-deep text-cream hover:bg-terracotta',
  outline: 'border border-navy/25 text-navy hover:border-navy-deep hover:bg-navy-deep hover:text-cream',
  /** On dark backgrounds and imagery. */
  light: 'bg-cream text-navy-deep hover:bg-terracotta hover:text-cream',
  'ghost-light': 'border border-cream/40 text-cream hover:border-cream hover:bg-cream hover:text-navy',
}

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  className?: string
  /** Internal route. */
  to?: string
  /** External URL — opens in a new tab. */
  href?: string
}

/** Square-cut button with a sliding hairline arrow. Internal (`to`) or external (`href`). */
export function Button({ children, variant = 'solid', className = '', to, href }: ButtonProps) {
  const { t } = useLang()
  const classes = `group inline-flex items-center gap-4 px-6 py-4 text-[0.68rem] font-semibold tracking-[0.2em] uppercase sm:px-8 sm:tracking-[0.24em] transition-colors duration-500 ${variants[variant]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {href ? (
        <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : (
        <Arrow className="transition-transform duration-500 group-hover:translate-x-1.5" />
      )}
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
  return (
    <Link to={to ?? '/'} className={classes}>
      {inner}
    </Link>
  )
}

/** Section label like "02 — Reserve connosco". */
export function Eyebrow({ index, children, className = '' }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      {index && <span className="tabular-nums">{index}</span>}
      {index && <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />}
      <span>{children}</span>
    </p>
  )
}

export const img = (name: string) => `/images/${name}.webp`
