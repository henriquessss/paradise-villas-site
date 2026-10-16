import { useId, useState, type FormEvent } from 'react'
import { ContactChannels, PageHero } from '../components/blocks'
import { Consent, ContactFields, Field, FormMessage, useLead, value } from '../components/forms'
import { Icon } from '../components/icons'
import { card } from '../components/ui'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'

const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(EXTERNAL.address)}&t=m&z=14&output=embed`
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EXTERNAL.address)}`

function ContactForm() {
  const { t } = useLang()
  const f = t.contactos.form
  const id = useId()
  const lead = useLead('contacto')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const ok = await lead.send(form, {
      name: value(form, 'name'),
      email: value(form, 'email'),
      phone: value(form, 'phone'),
      service: value(form, 'service'),
      message: value(form, 'message'),
    })
    if (ok) form.reset()
  }

  return (
    <form onSubmit={submit} className={`${card} relative space-y-5 p-6 md:p-10`}>
      <h2 className="font-display text-3xl text-navy">{f.title}</h2>
      <ContactFields id={`${id}-c`} />
      <Field label={f.service} htmlFor={`${id}-service`} required>
        <select id={`${id}-service`} name="service" required defaultValue="" className="field">
          <option value="" disabled>
            {t.form.select}
          </option>
          {f.services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>
      <Field label={f.message} htmlFor={`${id}-msg`} required>
        <textarea id={`${id}-msg`} name="message" required rows={5} className="field resize-y" />
      </Field>
      <Consent id={`${id}-c`} />
      <button
        type="submit"
        disabled={lead.status === 'sending'}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-terracotta px-6 py-4 font-semibold text-white transition-colors hover:bg-terracotta-dark disabled:opacity-60 sm:w-auto sm:px-10"
      >
        <Icon name="message" className="h-5 w-5" />
        {lead.status === 'sending' ? t.form.sending : f.submit}
      </button>
      <FormMessage status={lead.status} success={f.success} />
    </form>
  )
}

/** Google Maps only loads on request (it sets cookies). */
function Map() {
  const { t } = useLang()
  const m = t.contactos.map
  const [show, setShow] = useState(false)
  return (
    <div className={`${card} relative h-full min-h-[360px] overflow-hidden`}>
      {show ? (
        <iframe title={m.title} src={MAP_EMBED} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-sand p-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-terracotta">
            <Icon name="pin" className="h-6 w-6" />
          </span>
          <h2 className="font-display mt-5 text-2xl text-navy">{m.title}</h2>
          <p className="mt-2 text-sm text-navy">{EXTERNAL.address}</p>
          <p className="mt-3 max-w-xs text-xs text-ink-soft">{m.notice}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setShow(true)} className="rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-deep">
              {m.load}
            </button>
            <a href={MAP_LINK} target="_blank" rel="noopener" className="rounded-full border border-navy/15 bg-white px-5 py-2.5 text-sm font-semibold text-navy">
              {m.open}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export function Contactos() {
  const { t } = useLang()
  const c = t.contactos
  return (
    <>
      <PageHero eyebrow={c.header.eyebrow} title={c.header.title} body={c.header.body} image="banner-algarve" />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <ContactChannels />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <ContactForm />
            <Map />
          </div>
        </div>
      </section>
    </>
  )
}
