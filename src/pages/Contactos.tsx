import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { Reveal, RevealGroup, RevealItem } from '../components/motion/Reveal'
import { PageHeader } from '../components/PageHeader'
import { Button, Eyebrow, img } from '../components/ui'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'

const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(EXTERNAL.address)}&t=m&z=14&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EXTERNAL.address)}`

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contactos() {
  const { t, lang, to } = useLang()
  const c = t.contactos
  const [status, setStatus] = useState<Status>('idle')
  const [showMap, setShowMap] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, consent: data.consent === 'on', lang }),
      })
      if (!response.ok) throw new Error(String(response.status))
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const field =
    'peer w-full border-0 border-b border-navy/25 bg-transparent px-0 pt-6 pb-3 text-lg text-navy placeholder-transparent transition-colors focus:border-terracotta focus:ring-0 focus:outline-none'
  const label =
    'pointer-events-none absolute top-6 left-0 text-ink-soft transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-[0.14em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:uppercase'

  const info = [
    { label: c.info.location, value: c.info.locationValue },
    { label: c.info.phone, value: EXTERNAL.phoneDisplay, href: `tel:${EXTERNAL.phone}` },
    { label: c.info.email, value: EXTERNAL.email, href: `mailto:${EXTERNAL.email}` },
  ]

  return (
    <>
      <PageHeader eyebrow={c.header.eyebrow} title={c.header.title} image={img('experiencias-capela')} />

      <section className="px-5 py-28 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-20 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealGroup>
              <RevealItem>
                <h2 className="font-display text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">{c.form.title}</h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">{c.form.body}</p>
              </RevealItem>
            </RevealGroup>
            <dl className="mt-14 space-y-8">
              {info.map((item, i) => (
                <Reveal key={item.label} variant="left" delay={i * 0.1} className="border-t border-navy/15 pt-6">
                  <dt className="eyebrow text-terracotta">{item.label}</dt>
                  <dd className="font-display mt-2 text-2xl md:text-3xl">
                    {item.href ? (
                      <a href={item.href} className="transition-colors hover:text-terracotta">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal variant="up" delay={0.15} className="lg:col-span-6 lg:col-start-7">
            {status === 'sent' ? (
              <div role="status" className="bg-sand p-10 md:p-14">
                <Eyebrow className="text-terracotta">✓</Eyebrow>
                <p className="font-display mt-4 text-3xl leading-snug">{c.form.success}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-10">
                {/* Honeypot: hidden from people, tempting for bots. */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <div className="grid gap-10 sm:grid-cols-2">
                  <div className="relative">
                    <input id="nome" name="name" required maxLength={120} autoComplete="name" placeholder={c.form.name} className={field} />
                    <label htmlFor="nome" className={label}>
                      {c.form.name}
                    </label>
                  </div>
                  <div className="relative">
                    <input id="telemovel" name="phone" type="tel" required maxLength={30} autoComplete="tel" placeholder={c.form.phone} className={field} />
                    <label htmlFor="telemovel" className={label}>
                      {c.form.phone}
                    </label>
                  </div>
                </div>
                <div className="relative">
                  <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder={c.form.email} className={field} />
                  <label htmlFor="email" className={label}>
                    {c.form.email}
                  </label>
                </div>
                <div>
                  <label htmlFor="servico" className="eyebrow block text-ink-soft">
                    {c.form.service}
                  </label>
                  <select id="servico" name="service" required defaultValue="" className="mt-2 w-full border-0 border-b border-navy/25 bg-transparent px-0 py-3 text-lg focus:border-terracotta focus:ring-0 focus:outline-none">
                    <option value="" disabled>
                      {c.form.servicePlaceholder}
                    </option>
                    {c.form.services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <textarea id="mensagem" name="message" required rows={5} maxLength={5000} placeholder={c.form.message} className={`${field} resize-none`} />
                  <label htmlFor="mensagem" className={label}>
                    {c.form.message}
                  </label>
                </div>
                <label className="flex items-start gap-3 text-sm text-ink-soft">
                  <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-terracotta" />
                  <span>
                    {c.form.consent}{' '}
                    <Link to={to('privacidade')} className="underline underline-offset-4 hover:text-terracotta">
                      {c.form.consentLink}
                    </Link>
                    .
                  </span>
                </label>
                {status === 'error' && (
                  <p role="alert" className="text-sm text-terracotta-dark">
                    {c.form.error}{' '}
                    <a href={`mailto:${EXTERNAL.email}`} className="underline">
                      {EXTERNAL.email}
                    </a>
                    .
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-full bg-terracotta px-9 py-4 text-[0.8rem] font-semibold tracking-[0.14em] text-cream uppercase transition-colors hover:bg-navy disabled:opacity-60"
                >
                  {status === 'sending' ? c.form.sending : c.form.submit}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* Map: loaded only on request (Google sets cookies). */}
      <section className="relative h-[60vh] min-h-[420px] bg-navy-deep text-cream">
        {showMap ? (
          <iframe title={c.map.title} src={MAP_EMBED} className="h-full w-full border-0 grayscale-[30%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        ) : (
          <div className="grain relative flex h-full items-center justify-center overflow-hidden">
            <img src={img('gestao-mar')} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="relative px-5 text-center">
              <h2 className="font-display text-4xl md:text-5xl">{c.map.title}</h2>
              <p className="mt-3 text-cream/80">{EXTERNAL.address}</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-cream/60">{c.map.notice}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowMap(true)}
                  className="rounded-full bg-cream px-7 py-3.5 text-[0.8rem] font-semibold tracking-[0.14em] text-navy uppercase transition-colors hover:bg-terracotta hover:text-cream"
                >
                  {c.map.load}
                </button>
                <Button href={MAP_LINK} variant="ghost-light">
                  {c.map.open}
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
