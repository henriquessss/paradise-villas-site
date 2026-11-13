/*
 * Gestão AL revenue simulator: estimated GROSS yearly booking revenue, shown as a range.
 * Gross = what guests pay for the stays, before platform commissions, cleaning and management.
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────┐
 * │ ALL THE VALUES LIVE IN `VALORES` BELOW — edit only there.                            │
 * │ Calibration (Paradise Villas, meeting of 2026-11-13): a 4-bedroom villa with a pool  │
 * │ in Albufeira grosses 70 000–80 000 € a year. Everything else is our estimate, scaled │
 * │ from that reference, and waits for the administrators' figures                       │
 * │ (list in docs/simulador-valores-a-confirmar.md).                                     │
 * └──────────────────────────────────────────────────────────────────────────────────────┘
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

export const VALORES = {
  /**
   * Gross yearly revenue (€) of a property in ALBUFEIRA, middle of the range.
   * Index = bedrooms: [T0, T1, T2, T3, T4, T5, T6+].
   */
  receitaAnualAlbufeira: {
    apartamento: {
      semPiscina: [11_000, 15_000, 20_000, 26_000, 32_000, 38_000, 45_000],
      // Shared (condominium) pool.
      comPiscina: [12_500, 17_000, 23_000, 30_000, 37_000, 44_000, 52_000],
    },
    moradia: {
      semPiscina: [14_000, 18_000, 26_000, 36_000, 48_000, 58_000, 70_000],
      //                                       reference ↓ (70 000–80 000 €)
      comPiscina: [18_000, 24_000, 38_000, 55_000, 75_000, 92_000, 115_000],
    },
  },
  /** Revenue factor by zone, relative to Albufeira (1 = same as Albufeira). Order = order in the form. */
  zonas: [
    { id: 'albufeira', name: 'Albufeira', fator: 1 },
    { id: 'armacao-pera', name: 'Armação de Pêra / Pêra', fator: 0.87 },
    { id: 'carvoeiro-lagoa', name: 'Carvoeiro / Lagoa', fator: 1 },
    { id: 'portimao', name: 'Portimão / Alvor', fator: 0.9 },
    { id: 'lagos', name: 'Lagos', fator: 1.02 },
    { id: 'vilamoura', name: 'Vilamoura / Quarteira', fator: 1.07 },
    { id: 'loule-almancil', name: 'Loulé / Almancil', fator: 1.02 },
    { id: 'faro', name: 'Faro', fator: 0.8 },
    { id: 'tavira', name: 'Tavira', fator: 0.8 },
    { id: 'silves', name: 'Silves', fator: 0.62 },
  ],
  /** Extra for sea view (0.1 = +10 %). */
  vistaMar: 0.1,
  /** Width of the range around the middle value (0.07 = −7 % to +7 %; 75 000 € → 70 000–80 000 €). */
  margem: 0.07,
}

export const LOCATIONS = VALORES.zonas

export interface Estimate {
  low: number
  high: number
}

/** Rounds to 500 € below 20 000 € and to 1 000 € above, so the range reads as an estimate. */
const round = (value: number) => {
  const step = value < 20_000 ? 500 : 1_000
  return Math.round(value / step) * step
}

export function estimate(input: SimulatorInput): Estimate {
  const zone = VALORES.zonas.find((z) => z.id === input.location) ?? VALORES.zonas[0]
  const table = VALORES.receitaAnualAlbufeira[input.type][input.pool ? 'comPiscina' : 'semPiscina']
  const bedrooms = Math.min(Math.max(input.bedrooms, 0), table.length - 1)
  const middle = table[bedrooms] * zone.fator * (input.seaView ? 1 + VALORES.vistaMar : 1)
  return { low: round(middle * (1 - VALORES.margem)), high: round(middle * (1 + VALORES.margem)) }
}
