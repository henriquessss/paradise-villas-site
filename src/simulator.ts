/*
 * Gestão AL revenue simulator — indicative figures only.
 * TODO(cliente): validar todos os valores com a Paradise Villas antes de publicar. São uma
 * primeira aproximação (preço médio por noite e ocupação típicos de alojamento local no
 * Algarve), não dados do cliente.
 */

export type PropertyType = 'apartamento' | 'moradia'

export interface SimulatorInput {
  location: string
  type: PropertyType
  /** 0 = studio; 6 means 6 or more. */
  bedrooms: number
  pool: boolean
  seaView: boolean
}

/** Average nightly rate (€) by bedrooms, for an apartment without pool or sea view. */
const NIGHTLY_RATE = [70, 90, 125, 170, 230, 290, 370]

/** Locations served, with a price factor and occupied nights per year. */
export const LOCATIONS: { id: string; name: string; price: number; nights: number }[] = [
  { id: 'albufeira', name: 'Albufeira', price: 1, nights: 175 },
  { id: 'armacao-pera', name: 'Armação de Pêra / Pêra', price: 0.95, nights: 160 },
  { id: 'carvoeiro-lagoa', name: 'Carvoeiro / Lagoa', price: 1.05, nights: 165 },
  { id: 'portimao', name: 'Portimão / Alvor', price: 0.95, nights: 165 },
  { id: 'lagos', name: 'Lagos', price: 1.05, nights: 170 },
  { id: 'vilamoura', name: 'Vilamoura / Quarteira', price: 1.1, nights: 170 },
  { id: 'loule-almancil', name: 'Loulé / Almancil', price: 1.15, nights: 155 },
  { id: 'faro', name: 'Faro', price: 0.85, nights: 165 },
  { id: 'tavira', name: 'Tavira', price: 0.9, nights: 155 },
  { id: 'silves', name: 'Silves', price: 0.8, nights: 135 },
]

export interface Estimate {
  low: number
  high: number
  nightly: number
  nights: number
}

const round = (value: number, step: number) => Math.round(value / step) * step

export function estimate(input: SimulatorInput): Estimate {
  const place = LOCATIONS.find((l) => l.id === input.location) ?? LOCATIONS[0]
  let nightly = NIGHTLY_RATE[Math.min(Math.max(input.bedrooms, 0), NIGHTLY_RATE.length - 1)] * place.price
  if (input.type === 'moradia') nightly *= 1.15
  if (input.pool) nightly *= 1.2
  if (input.seaView) nightly *= 1.1
  // Pools stretch the season (spring and autumn bookings).
  const nights = Math.round(place.nights * (input.pool ? 1.06 : 1))
  const yearly = nightly * nights
  return { low: round(yearly * 0.85, 500), high: round(yearly * 1.15, 500), nightly: round(nightly, 5), nights }
}
