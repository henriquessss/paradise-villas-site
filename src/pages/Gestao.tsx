import { useId, type FormEvent } from 'react'
import { CtaBand } from '../components/blocks'
import { Consent, ContactFields, Field, FormMessage, useLead, value } from '../components/forms'
import { Icon, IconTile } from '../components/icons'
import { CountUp } from '../components/motion/CountUp'
import { Reveal } from '../components/motion/Reveal'
import { Rich } from '../components/Rich'
import { Simulator } from '../components/Simulator'
import { Accent, Button, card, Eyebrow, featureCard, SectionHeading } from '../components/ui'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'

function ProposalForm() {
  const { t } = useLang()
  const p = t.gestao.proposal
  const id = useId()
  const lead = useLead('gestao')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const ok = await lead.send(form, {
      name: value(form, 'name'),
      email: value(form, 'email'),
      phone: value(form, 'phone'),
      details: {
        Tipo: value(form, 'type'),
        Quartos: value(form, 'bedrooms'),
        Localização: value(form, 'location'),
        Piscina: new FormData(form).get('pool') ? 'Sim' : '',
      },
    })
    if (ok) form.reset()
  }

  return (
    <form id="proposta" onSubmit={submit} className={`${card} relative space-y-5 p-6 md:p-8`}>
      <h2 className="font-display text-2xl text-navy">{p.title}</h2>
      <ContactFields id={`${id}-p`} />
      <fieldset className="space-y-4 border-t border-navy/[0.07] pt-5">
        <legend className="field-label pt-5">
          <Icon name="home" className="h-4 w-4 text-terracotta" /> {p.details}
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={p.type} htmlFor={`${id}-type`}>
            <select id={`${id}-type`} name="type" defaultValue="" className="field">
              <option value="">{t.form.select}</option>
              {p.types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </Field>
          <Field label={p.bedrooms} htmlFor={`${id}-bed`}>
            <select id={`${id}-bed`} name="bedrooms" defaultValue="" className="field">
              <option value="">{t.form.select}</option>
              {t.gestao.simulator.bedroomOptions.map((label) => (
                <option key={label}>{label}</option>
              ))}
            </select>
          </Field>
          <Field label={p.location} htmlFor={`${id}-loc`}>
            <input id={`${id}-loc`} name="location" placeholder={p.locationPlaceholder} className="field" />
          </Field>
          <label className="flex items-center gap-3 self-end rounded-[0.85rem] border border-navy/14 bg-white px-4 py-3 text-sm font-medium text-navy">
            <input type="checkbox" name="pool" className="h-4 w-4 accent-terracotta" /> {p.pool}
          </label>
        </div>
      </fieldset>
      <Consent id={`${id}-p`} />
      <button
        type="submit"
        disabled={lead.status === 'sending'}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-terracotta px-6 py-4 font-semibold text-white shadow-[0_10px_24px_-10px_rgba(214,89,55,0.8)] transition-colors hover:bg-terracotta-dark disabled:opacity-60"
      >
        <Icon name="message" className="h-5 w-5" />
        {lead.status === 'sending' ? t.form.sending : p.submit}
      </button>
      <FormMessage status={lead.status} success={p.success} />
    </form>
  )
}

function Faq() {
  const { t } = useLang()
  const f = t.gestao.faq
  return (
    <section className="bg-white px-5 py-24 md:px-8 md:py-32">
      <SectionHeading eyebrow={f.eyebrow} title={f.title} />
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {f.items.map((item) => (
          <details key={item.q} className={`${card} group p-0 [&_summary::-webkit-details-marker]:hidden`}>
            <summary className="flex cursor-pointer items-center justify-between gap-6 px-6 py-5 font-semibold text-navy md:px-8">
              {item.q}
              <Icon name="chevronDown" className="h-5 w-5 shrink-0 text-terracotta transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <p className="px-6 pb-6 leading-relaxed text-ink-soft md:px-8">
              <Rich text={item.a} />
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function Gestao() {
  const { t } = useLang()
  const g = t.gestao

  return (
    <>
      <section className="px-5 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28">
        <div className="mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="animate-rise lg:sticky lg:top-32">
            <Eyebrow>{g.hero.eyebrow}</Eyebrow>
            <h1 className="font-display mt-4 text-[clamp(2.6rem,6vw,4.6rem)] leading-[1.02] tracking-[-0.015em] text-navy">
              <Accent text={g.hero.title} />
            </h1>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">{g.hero.body}</p>
            <div className={`${card} mt-8 flex max-w-md items-center gap-5 p-5`}>
              <p className="font-display text-4xl leading-none text-terracotta">{g.hero.highlight.value}</p>
              <p className="text-sm leading-snug text-ink-soft">
                <strong className="font-semibold text-navy">{g.hero.highlight.label}</strong> {g.hero.highlight.text}
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {g.hero.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-navy">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                    <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise [animation-delay:120ms]">
            <ProposalForm />
          </div>
        </div>
      </section>

      <section className="bg-navy-deep px-5 py-16 text-white md:py-20">
        <dl className="mx-auto grid max-w-[1000px] grid-cols-1 gap-y-10 text-center sm:grid-cols-3">
          {g.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="eyebrow mt-3 text-white/60">{s.label}</dt>
              <dd className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none">
                <CountUp to={s.value} locale={t.locale} />
                <span className="text-terracotta">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-5 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow={g.services.eyebrow} title={g.services.title} body={g.services.body} />
        <ul className="mx-auto mt-14 grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {g.services.items.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 0.08} className={featureCard}>
              <IconTile name={s.icon} />
              <h3 className="mt-5 font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-white px-5 py-24 md:px-8 md:py-32">
        <SectionHeading eyebrow={g.legal.eyebrow} title={g.legal.title} body={g.legal.body} />
        <ol className="mx-auto mt-14 grid max-w-[1200px] gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {g.legal.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className={`${featureCard} relative text-center sm:p-6`}>
              <span className="absolute top-4 right-5 font-display text-sm text-ink-soft/50">0{i + 1}</span>
              <IconTile name={s.icon} />
              <h3 className="mt-5 font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="simulador" className="px-5 py-24 md:px-8 md:py-32">
        <Simulator proposalHref="#proposta" />
      </section>

      <Faq />

      <CtaBand eyebrow={g.cta.eyebrow} title={g.cta.title} body={g.cta.body}>
        <Button anchor="#proposta">{g.cta.button}</Button>
        <Button anchor={`tel:${EXTERNAL.phone}`} variant="ghost-light" icon="none">
          <Icon name="phone" className="-ml-1 h-4 w-4" /> {EXTERNAL.phoneDisplay}
        </Button>
      </CtaBand>
    </>
  )
}
