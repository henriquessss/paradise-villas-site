// Contact form → email via Resend. Vercel Function (Web Request/Response signature).
// Env: RESEND_API_KEY, CONTACT_TO (e.g. info@paradisevillas.pt),
//      CONTACT_FROM (verified Resend sender, e.g. "Paradise Villas <site@paradisevillas.pt>").

const SERVICES = ['Reservas para férias', 'Gestão de Alojamento Local', 'Holiday bookings', 'Holiday rental management']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface Payload {
  name?: unknown
  email?: unknown
  phone?: unknown
  service?: unknown
  message?: unknown
  consent?: unknown
  website?: unknown
  lang?: unknown
}

const text = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')
const json = (body: unknown, status: number) => Response.json(body, { status })

export async function POST(request: Request): Promise<Response> {
  let payload: Payload
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'invalid_json' }, 400)
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (text(payload.website, 200)) return json({ ok: true }, 200)

  const name = text(payload.name, 120)
  const email = text(payload.email, 200)
  const phone = text(payload.phone, 30)
  const service = text(payload.service, 80)
  const message = text(payload.message, 5000)
  const lang = payload.lang === 'en' ? 'en' : 'pt'

  if (!name || !EMAIL.test(email) || !phone || !SERVICES.includes(service) || !message || payload.consent !== true) {
    return json({ error: 'invalid_fields' }, 422)
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM
  if (!apiKey || !to || !from) {
    console.error('contacto: RESEND_API_KEY / CONTACT_TO / CONTACT_FROM not configured')
    return json({ error: 'not_configured' }, 500)
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Contacto pelo site — ${service} — ${name}`,
      text: [
        `Nome: ${name}`,
        `Email: ${email}`,
        `Telemóvel: ${phone}`,
        `Serviço: ${service}`,
        `Língua do site: ${lang.toUpperCase()}`,
        '',
        message,
      ].join('\n'),
    }),
  })

  if (!response.ok) {
    console.error('contacto: Resend error', response.status, await response.text())
    return json({ error: 'send_failed' }, 502)
  }
  return json({ ok: true }, 200)
}
