// Site leads → backoffice (with an email fallback). Vercel Function (Web Request/Response signature).
// One endpoint for every form: contact, management proposal, income simulator, partners.
//
// Each lead is forwarded server to server to the backoffice (/api/pedido-site), which stores it,
// shows it under "Pedidos do site" and emails/pushes the team. If the backoffice is not configured
// or fails, the lead is emailed straight to the team via Resend, so nothing is lost.
//
// Env: BACKOFFICE_URL (e.g. https://paradise-villas.vercel.app), SITE_PEDIDOS_SEGREDO (same value as
//      in the backoffice project) — the main path.
//      RESEND_API_KEY, CONTACT_TO (e.g. info@paradisevillas.pt), CONTACT_FROM (sender on a domain
//      verified in Resend; defaults to onboarding@resend.dev, which only delivers to the Resend
//      account's own address) — the fallback.

const KINDS = {
  contacto: 'Contacto',
  gestao: 'Pedido de proposta: Gestão AL',
  simulador: 'Simulador de rendimento',
  parceiro: 'Candidatura a parceiro',
} as const
type Kind = keyof typeof KINDS

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_DETAILS = 20
const BACKOFFICE_TIMEOUT_MS = 8000

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

/** Simulator inputs and the estimate shown, as sent by the browser; the backoffice validates it. */
function simulation(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined
  const s = value as Record<string, unknown>
  return {
    localizacao: text(s.location, 80),
    tipoImovel: text(s.type, 40),
    quartos: text(s.bedrooms, 40),
    piscina: s.pool === true,
    vistaMar: s.seaView === true,
    estimativaMin: Number(s.low),
    estimativaMax: Number(s.high),
  }
}

interface Lead {
  kind: Kind
  name: string
  email: string
  phone: string
  service: string
  message: string
  extra: [string, string][]
  simulation: Record<string, unknown> | undefined
  lang: 'pt' | 'en'
  page: string
}

/** True when the backoffice stored the lead (and took over notifying the team). */
async function forwardToBackoffice(lead: Lead): Promise<boolean> {
  const base = process.env.BACKOFFICE_URL?.replace(/\/+$/, '')
  const secret = process.env.SITE_PEDIDOS_SEGREDO
  if (!base || !secret) return false
  try {
    const response = await fetch(`${base}/api/pedido-site`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${secret}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: lead.kind,
        nome: lead.name,
        email: lead.email,
        telefone: lead.phone,
        assunto: lead.service,
        mensagem: lead.message,
        detalhes: Object.fromEntries(lead.extra),
        simulacao: lead.simulation,
        idioma: lead.lang,
        pagina: lead.page,
      }),
      signal: AbortSignal.timeout(BACKOFFICE_TIMEOUT_MS),
    })
    if (response.ok) return true
    console.error('contacto: backoffice error', response.status, await response.text())
  } catch (error) {
    console.error('contacto: backoffice unreachable', error)
  }
  return false
}

async function sendEmail(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO
  const from = process.env.CONTACT_FROM || 'Paradise Villas <onboarding@resend.dev>'
  if (!apiKey || !to) {
    console.error('contacto: RESEND_API_KEY / CONTACT_TO not configured')
    return false
  }

  const s = lead.simulation
  const lines = [
    `Tipo: ${KINDS[lead.kind]}`,
    `Nome: ${lead.name}`,
    `Email: ${lead.email}`,
    ...(lead.phone ? [`Telemóvel: ${lead.phone}`] : []),
    ...(lead.service ? [`Assunto: ${lead.service}`] : []),
    ...(s ? [`Imóvel: ${s.tipoImovel} · ${s.quartos} · ${s.localizacao}`, `Estimativa: ${s.estimativaMin} – ${s.estimativaMax} €/ano`] : []),
    ...lead.extra.map(([k, v]) => `${k}: ${v}`),
    `Língua do site: ${lead.lang.toUpperCase()}`,
    ...(lead.message ? ['', lead.message] : []),
  ]

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: `${KINDS[lead.kind]} · ${lead.name}`,
        text: lines.join('\n'),
      }),
    })
    if (!response.ok) console.error('contacto: Resend error', response.status, await response.text())
    return response.ok
  } catch (error) {
    console.error('contacto: Resend unreachable', error)
    return false
  }
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
  const lead: Lead = {
    kind,
    name: text(payload.name, 120),
    email: text(payload.email, 200),
    phone: text(payload.phone, 30),
    service: text(payload.service, 80),
    message: text(payload.message, 5000),
    extra: details(payload.details),
    simulation: kind === 'simulador' ? simulation(payload.simulation) : undefined,
    lang: payload.lang === 'en' ? 'en' : 'pt',
    page: text(payload.page, 300),
  }

  if (!lead.name || !EMAIL.test(lead.email) || payload.consent !== true) return json({ error: 'invalid_fields' }, 422)
  // A general contact needs a message (the short home form has no phone); the others need a phone.
  if (kind === 'contacto' ? !lead.message : !lead.phone) return json({ error: 'invalid_fields' }, 422)

  if (await forwardToBackoffice(lead)) return json({ ok: true }, 200)
  if (await sendEmail(lead)) return json({ ok: true }, 200)
  return json({ error: 'send_failed' }, 502)
}
