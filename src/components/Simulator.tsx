import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { useLang } from '../content'
import { estimate, LOCATIONS, type Estimate, type PropertyType, type SimulatorInput } from '../simulator'
import { Consent, ContactFields, Field, useLead, value } from './forms'
import { Icon } from './icons'
import { Button, card, SectionHeading } from './ui'

type Step = 'property' | 'contact' | 'result'

/**
 * Gestão AL income simulator. The estimate is only shown after the visitor leaves their
 * contact, which is sent to the team as a lead (kind "simulador").
 */
export function Simulator({ proposalHref }: { proposalHref: string }) {
  const { t } = useLang()
  const locale = t.locale
  const s = t.gestao.simulator
  const id = useId()
  const [step, setStep] = useState<Step>('property')
  const [input, setInput] = useState<SimulatorInput>({ location: '', type: 'apartamento', bedrooms: 2, pool: false, seaView: false })
  const [result, setResult] = useState<Estimate | null>(null)
  const [sendFailed, setSendFailed] = useState(false)
  const lead = useLead('simulador')
  const heading = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  // Move focus to the step title so screen readers follow the change.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    heading.current?.focus()
  }, [step])

  const euro = (n: number) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
  const set = <K extends keyof SimulatorInput>(key: K, v: SimulatorInput[K]) => setInput((prev) => ({ ...prev, [key]: v }))

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const est = estimate(input)
    const place = LOCATIONS.find((l) => l.id === input.location)?.name ?? input.location
    const ok = await lead.send(form, {
      name: value(form, 'name'),
      email: value(form, 'email'),
      phone: value(form, 'phone'),
      details: {
        Localização: place,
        Tipo: s.types[input.type],
        Quartos: s.bedroomOptions[input.bedrooms],
        Piscina: input.pool ? 'Sim' : 'Não',
        'Vista mar': input.seaView ? 'Sim' : 'Não',
        'Estimativa anual': `${euro(est.low)} – ${euro(est.high)}`,
      },
    })
    setSendFailed(!ok)
    setResult(est)
    setStep('result')
  }

  const chip = (active: boolean) =>
    `flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
      active ? 'border-terracotta bg-terracotta/10 text-terracotta' : 'border-navy/14 bg-white text-navy hover:border-navy/30'
    }`

  return (
    <div>
      <SectionHeading eyebrow={s.eyebrow} title={s.title} body={s.body} />

      <div className={`${card} mx-auto mt-12 max-w-2xl p-6 md:p-10`} aria-live="polite">
        <ol className="mb-8 flex items-center gap-2" aria-hidden="true">
          {(['property', 'contact', 'result'] as Step[]).map((k, i) => (
            <li key={k} className={`h-1.5 flex-1 rounded-full transition-colors ${(['property', 'contact', 'result'] as Step[]).indexOf(step) >= i ? 'bg-terracotta' : 'bg-navy/10'}`} />
          ))}
        </ol>

        {step === 'property' && (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setStep('contact')
            }}
            className="space-y-6"
          >
            <h3 ref={heading} tabIndex={-1} className="sr-only">
              {s.title.replace(/\*/g, '')}
            </h3>
            <Field
              label={
                <>
                  <Icon name="pin" className="h-4 w-4 text-terracotta" /> {s.location} <span className="font-normal text-ink-soft">{s.locationNote}</span>
                </>
              }
              htmlFor={`${id}-loc`}
              required
            >
              <select id={`${id}-loc`} required value={input.location} onChange={(e) => set('location', e.target.value)} className="field">
                <option value="" disabled>
                  {s.locationPlaceholder}
                </option>
                {LOCATIONS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </Field>

            <fieldset>
              <legend className="field-label">
                <Icon name="home" className="h-4 w-4 text-terracotta" /> {s.type}
              </legend>
              <div className="flex gap-3">
                {(Object.keys(s.types) as PropertyType[]).map((type) => (
                  <label key={type} className={chip(input.type === type)}>
                    <input type="radio" name="type" value={type} checked={input.type === type} onChange={() => set('type', type)} className="sr-only" />
                    {s.types[type]}
                  </label>
                ))}
              </div>
            </fieldset>

            <Field
              label={
                <>
                  <Icon name="key" className="h-4 w-4 text-terracotta" /> {s.bedrooms}
                </>
              }
              htmlFor={`${id}-bed`}
            >
              <select id={`${id}-bed`} value={input.bedrooms} onChange={(e) => set('bedrooms', Number(e.target.value))} className="field">
                {s.bedroomOptions.map((label, i) => (
                  <option key={label} value={i}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>

            <fieldset>
              <legend className="field-label">
                <Icon name="sparkles" className="h-4 w-4 text-terracotta" /> {s.extras}
              </legend>
              <div className="flex gap-3">
                {(['pool', 'seaView'] as const).map((key) => (
                  <label key={key} className={chip(input[key])}>
                    <input type="checkbox" checked={input[key]} onChange={(e) => set(key, e.target.checked)} className="sr-only" />
                    <Icon name={input[key] ? 'checkCircle' : key === 'pool' ? 'waves' : 'sun'} className="h-4 w-4" />
                    {s[key]}
                  </label>
                ))}
              </div>
            </fieldset>

            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-terracotta px-6 py-4 font-semibold text-white transition-colors hover:bg-terracotta-dark">
              <Icon name="calculator" className="h-5 w-5" />
              {s.next}
            </button>
          </form>
        )}

        {step === 'contact' && (
          <form onSubmit={submitContact} className="relative space-y-6">
            <div>
              <h3 ref={heading} tabIndex={-1} className="font-display text-2xl text-navy outline-none">
                {s.contactTitle}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.contactBody}</p>
            </div>
            <ContactFields id={`${id}-c`} />
            <Consent id={`${id}-c`} />
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button type="button" onClick={() => setStep('property')} className="rounded-2xl border border-navy/14 px-6 py-4 font-semibold text-navy transition-colors hover:bg-sand">
                {s.back}
              </button>
              <button
                type="submit"
                disabled={lead.status === 'sending'}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-terracotta px-6 py-4 font-semibold text-white transition-colors hover:bg-terracotta-dark disabled:opacity-60"
              >
                {lead.status === 'sending' ? t.form.sending : s.submit}
              </button>
            </div>
          </form>
        )}

        {step === 'result' && result && (
          <div className="text-center">
            <h3 ref={heading} tabIndex={-1} className="eyebrow text-terracotta outline-none">
              {s.resultTitle}
            </h3>
            <p className="font-display mt-4 text-[clamp(2rem,6vw,3.4rem)] leading-tight text-navy">
              {euro(result.low)} <span className="text-[0.55em] text-ink-soft">{s.to}</span> {euro(result.high)}
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-sand p-4">
                <dd className="font-display text-2xl text-navy">{euro(result.nightly)}</dd>
                <dt className="mt-1 text-xs text-ink-soft">{s.perNight}</dt>
              </div>
              <div className="rounded-2xl bg-sand p-4">
                <dd className="font-display text-2xl text-navy">{result.nights}</dd>
                <dt className="mt-1 text-xs text-ink-soft">{s.nights}</dt>
              </div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-ink-soft">{s.disclaimer}</p>
            {sendFailed && <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">{s.sendError}</p>}
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button anchor={proposalHref}>{s.cta}</Button>
              <button
                type="button"
                onClick={() => {
                  setStep('property')
                  lead.reset()
                }}
                className="rounded-full border border-navy/14 px-6 py-3.5 text-[0.92rem] font-semibold text-navy transition-colors hover:bg-sand"
              >
                {s.restart}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
