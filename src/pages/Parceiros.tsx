import { useId, type FormEvent } from 'react'
import { PageHero } from '../components/blocks'
import { Consent, ContactFields, Field, FormMessage, useLead, value } from '../components/forms'
import { Icon, IconTile } from '../components/icons'
import { Reveal } from '../components/motion/Reveal'
import { Accent, Button, card, Eyebrow, SectionHeading } from '../components/ui'
import { useLang } from '../content'
import { PARTNER_RATE } from '../routes'

function PartnerForm() {
  const { t } = useLang()
  const f = t.parceiros.form
  const id = useId()
  const lead = useLead('parceiro')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const ok = await lead.send(form, {
      name: value(form, 'name'),
      email: value(form, 'email'),
      phone: value(form, 'phone'),
      message: value(form, 'message'),
      details: { Empresa: value(form, 'company'), 'Tipo de parceiro': value(form, 'partnerType') },
    })
    if (ok) form.reset()
  }

  return (
    <form onSubmit={submit} className={`${card} relative space-y-5 p-6 md:p-8`}>
      <ContactFields id={`${id}-f`} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.company} htmlFor={`${id}-company`}>
          <input id={`${id}-company`} name="company" autoComplete="organization" placeholder={f.companyPlaceholder} className="field" />
        </Field>
        <Field label={f.partnerType} htmlFor={`${id}-type`} required>
          <select id={`${id}-type`} name="partnerType" required defaultValue="" className="field">
            <option value="" disabled>
              {t.form.select}
            </option>
            {f.partnerTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label={f.message} htmlFor={`${id}-msg`}>
        <textarea id={`${id}-msg`} name="message" rows={4} className="field resize-y" />
      </Field>
      <Consent id={`${id}-f`} />
      <button
        type="submit"
        disabled={lead.status === 'sending'}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-terracotta px-6 py-4 font-semibold text-white transition-colors hover:bg-terracotta-dark disabled:opacity-60"
      >
        {lead.status === 'sending' ? t.form.sending : f.submit}
      </button>
      <FormMessage status={lead.status} success={f.success} />
    </form>
  )
}

export function Parceiros() {
  const { t } = useLang()
  const p = t.parceiros

  return (
    <>
      <PageHero eyebrow={p.hero.eyebrow} title={p.hero.title} body={p.hero.body} image="gestao-mar">
        <Button anchor="#candidatura">{p.hero.cta}</Button>
      </PageHero>

      <div className="relative z-10 -mt-12 px-5">
        <Reveal className={`${card} mx-auto flex max-w-xl flex-col items-center gap-2 p-8 text-center sm:flex-row sm:gap-8 sm:text-left`}>
          <p className="font-display shrink-0 text-[4.5rem] leading-none text-terracotta">
            {PARTNER_RATE}
            <span className="text-[0.55em]">%</span>
          </p>
          <div>
            <p className="eyebrow text-navy">{p.rate.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.rate.text}</p>
          </div>
        </Reveal>
      </div>

      <section className="px-5 py-24 md:px-8 md:py-28">
        <SectionHeading eyebrow={p.who.eyebrow} title={p.who.title} />
        <ul className="mx-auto mt-14 grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {p.who.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08} className={`${card} p-7`}>
              <IconTile name={item.icon} />
              <h3 className="mt-5 font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-white px-5 py-24 md:px-8 md:py-28">
        <SectionHeading eyebrow={p.steps.eyebrow} title={p.steps.title} />
        <ol className="mx-auto mt-14 grid max-w-[1100px] gap-10 md:grid-cols-3 md:gap-8">
          {p.steps.items.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.1} className="relative text-center">
              <span className="font-display mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-2xl text-white shadow-[0_12px_28px_-12px_rgba(214,89,55,0.8)]">
                {i + 1}
              </span>
              {i < p.steps.items.length - 1 && <span className="absolute top-8 left-[calc(50%+3rem)] hidden h-px w-[calc(100%-6rem)] bg-navy/10 md:block" aria-hidden="true" />}
              <h3 className="mt-6 text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="candidatura" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow>{p.form.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] text-navy">
              <Accent text={p.form.title} />
            </h2>
            <p className="mt-5 leading-relaxed text-ink-soft">{p.form.body}</p>
            <div className="mt-10 rounded-3xl bg-navy-deep p-8 text-white">
              <h3 className="font-display text-xl">
                <Accent text={p.benefits.title} />
              </h3>
              <ul className="mt-6 space-y-3.5">
                {p.benefits.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/85">
                    <Icon name="checkCircle" className="h-5 w-5 shrink-0 text-terracotta" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PartnerForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
