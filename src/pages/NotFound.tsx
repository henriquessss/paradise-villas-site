import { Accent, Button } from '../components/ui'
import { useLang } from '../content'

export function NotFound() {
  const { t, to } = useLang()
  const n = t.notFound
  return (
    <section data-header-dark className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy-deep px-5 text-center text-white">
      <span className="font-display pointer-events-none absolute inset-0 flex items-center justify-center text-[40vw] leading-none text-white/[0.04] select-none" aria-hidden="true">
        404
      </span>
      <div className="animate-rise relative max-w-2xl">
        <p className="eyebrow text-terracotta">{n.eyebrow}</p>
        <h1 className="font-display mt-5 text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.02]">
          <Accent text={n.title} />
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-white/70">{n.body}</p>
        <div className="mt-10">
          <Button to={to('home')}>{n.back}</Button>
        </div>
      </div>
    </section>
  )
}
