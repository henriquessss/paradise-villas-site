// Site leads → email via Resend. Vercel Function (Web Request/Response signature).
// One endpoint for every form: contact, management proposal, income simulator, partners.
// Env: RESEND_API_KEY, CONTACT_TO (e.g. info@paradisevillas.pt),
//      CONTACT_FROM (verified Resend sender, e.g. "Paradise Villas <site@paradisevillas.pt>").

const KINDS = {
  contacto: 'Contacto',
  gestao: 'Pedido de proposta — Gestão AL',
  simulador: 'Simulador de rendimento',
  parceiro: 'Candidatura a parceiro',
} as const
type Kind = keyof typeof KINDS

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_DETAILS = 20

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const json = (body: unknown, status: number) => Response.json(body, { status })

/** Keeps a flat string → string map, bounded in size. */
function details(value: unknown): [string, string][] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return []
  return Object.entries(value as Record<string, unknown>)
    .slice(0, MAX_DETAILS)
    .map(([k, v]) => [text(k, 60), text(v, 300)] as [string, string])
    .filter(([k, v]) => k && v)
}

export async function POST(request: Request): Promise<Response> {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (text(payload.website, 200)) return json({ ok: true }, 200)

  const kind = (typeof payload.kind === 'string' && payload.kind in KINDS ? payload.kind : 'contacto') as Kind
  const name = text(payload.name, 120)
  const email = text(payload.email, 200)
  const phone = text(payload.phone, 30)
  const service = text(payload.service, 80)
  const message = text(payload.message, 5000)
  const extra = details(payload.details)
  const lang = payload.lang === 'en' ? 'en' : 'pt'

  if (!name || !EMAIL.test(email) || !phone || payload.consent !== true) return json({ error: 'invalid_fields' }, 422)
  // The general contact form needs a subject and a message; the others carry details instead.
  if (kind === 'contacto' && (!service || !message)) return json({ error: 'invalid_fields' }, 422)

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM
  if (!apiKey || !to || !from) {
    console.error('contacto: RESEND_API_KEY / CONTACT_TO / CONTACT_FROM not configured')
    return json({ error: 'not_configured' }, 500)
  }

  const lines = [
    `Tipo: ${KINDS[kind]}`,
    `Nome: ${name}`,
    `Email: ${email}`,
    `Telemóvel: ${phone}`,
    ...(service ? [`Assunto: ${service}`] : []),
    ...extra.map(([k, v]) => `${k}: ${v}`),
    `Língua do site: ${lang.toUpperCase()}`,
    ...(message ? ['', message] : []),
  ]

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `${KINDS[kind]} — ${name}`,
      text: lines.join('\n'),
    }),
  })

  if (!response.ok) {
    console.error('contacto: Resend error', response.status, await response.text())
    return json({ error: 'send_failed' }, 502)
  }
  return json({ ok: true }, 200)
}
