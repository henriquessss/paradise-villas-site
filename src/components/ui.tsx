import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useLang } from '../content'

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={`h-4 w-4 ${className}`}>
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
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
  solid: 'bg-terracotta text-cream hover:bg-navy',
  outline: 'border border-navy/30 text-navy hover:border-navy hover:bg-navy hover:text-cream',
  light: 'bg-cream text-navy hover:bg-terracotta hover:text-cream',
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

/** Pill button with a sliding arrow. Internal (`to`) or external (`href`). */
export function Button({ children, variant = 'solid', className = '', to, href }: ButtonProps) {
  const { t } = useLang()
  const classes = `group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.14em] uppercase transition-colors duration-300 ${variants[variant]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {href ? (
        <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      ) : (
        <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
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
