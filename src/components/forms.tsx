import { useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'

/** Lead types accepted by /api/contacto. */
export type LeadKind = 'contacto' | 'gestao' | 'simulador' | 'parceiro'

export interface LeadPayload {
  name: string
  email: string
  phone: string
  service?: string
  message?: string
  /** Extra key → value pairs shown in the email (property details, estimate, …). */
  details?: Record<string, string>
}

type Status = 'idle' | 'sending' | 'success' | 'error'

/** Posts a lead to the Vercel function. Reads honeypot and consent from the form itself. */
export function useLead(kind: LeadKind) {
  const { lang } = useLang()
  const [status, setStatus] = useState<Status>('idle')

  async function send(form: HTMLFormElement, payload: LeadPayload): Promise<boolean> {
    const data = new FormData(form)
    setStatus('sending')
    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind, lang, consent: data.get('consent') === 'on', website: data.get('website') ?? '', ...payload }),
      })
      setStatus(response.ok ? 'success' : 'error')
      return response.ok
    } catch {
      setStatus('error')
      return false
    }
  }

  return { status, send, reset: () => setStatus('idle') }
}

/** Reads a named text field from a form. */
export const value = (form: HTMLFormElement, name: string) => String(new FormData(form).get(name) ?? '').trim()

export function Field({ label, htmlFor, required, children, className = '', dark = false }: { label: ReactNode; htmlFor: string; required?: boolean; children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={`field-label ${dark ? '!text-white/80' : ''}`}>
        {label}
        {required && (
          <span className="text-terracotta" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  )
}

/** Name, email and phone — the fields every lead form starts with. */
export function ContactFields({ id, dark = false, compact = false }: { id: string; dark?: boolean; compact?: boolean }) {
  const { t } = useLang()
  const f = t.form
  const cls = `field ${dark ? 'field-dark' : ''}`
  return (
    <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
      <Field label={f.name} htmlFor={`${id}-name`} required dark={dark} className={compact ? '' : 'sm:col-span-2'}>
        <input id={`${id}-name`} name="name" required autoComplete="name" placeholder={f.namePlaceholder} className={cls} />
      </Field>
      <Field label={f.email} htmlFor={`${id}-email`} required dark={dark}>
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder={f.emailPlaceholder} className={cls} />
      </Field>
      <Field label={f.phone} htmlFor={`${id}-phone`} required dark={dark}>
        <input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" placeholder={f.phonePlaceholder} className={cls} />
      </Field>
    </div>
  )
}

/** Privacy consent (required) and the bot honeypot. */
export function Consent({ id, dark = false }: { id: string; dark?: boolean }) {
  const { t, to } = useLang()
  return (
    <>
      <label htmlFor={`${id}-consent`} className={`flex items-start gap-3 text-sm ${dark ? 'text-white/70' : 'text-ink-soft'}`}>
        <input id={`${id}-consent`} name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-terracotta" />
        <span>
          {t.form.consent}{' '}
          <Link to={to('privacidade')} className="font-semibold text-terracotta underline-offset-4 hover:underline">
            {t.form.consentLink}
          </Link>
          .
        </span>
      </label>
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
    </>
  )
}

/** Success / error line under a form. */
export function FormMessage({ status, success, dark = false }: { status: Status; success: string; dark?: boolean }) {
  const { t } = useLang()
  if (status === 'success') {
    return (
      <p role="status" className={`rounded-2xl px-4 py-3 text-sm font-medium ${dark ? 'bg-white/10 text-white' : 'bg-emerald-50 text-emerald-800'}`}>
        {success}
      </p>
    )
  }
  if (status === 'error') {
    return (
      <p role="alert" className={`rounded-2xl px-4 py-3 text-sm ${dark ? 'bg-white/10 text-white' : 'bg-red-50 text-red-800'}`}>
        {t.form.error}{' '}
        <a href={`mailto:${EXTERNAL.email}`} className="font-semibold underline">
          {EXTERNAL.email}
        </a>
        .
      </p>
    )
  }
  return null
}
