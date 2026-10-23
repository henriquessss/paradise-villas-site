import { useId, type FormEvent } from 'react'
import { ContactChannels, PageHero } from '../components/blocks'
import { Consent, ContactFields, Field, FormMessage, useLead, value } from '../components/forms'
import { Icon } from '../components/icons'
import { card } from '../components/ui'
import { useLang } from '../content'

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

export function Contactos() {
  const { t } = useLang()
  const c = t.contactos
  return (
    <>
      <PageHero eyebrow={c.header.eyebrow} title={c.header.title} body={c.header.body} image="banner-algarve" />
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <ContactChannels />
          <div className="mx-auto mt-12 max-w-3xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
