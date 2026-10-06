import { Button } from '../components/ui'
import { useLang } from '../content'

export function NotFound() {
  const { t, to } = useLang()
  const n = t.notFound
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-navy-deep px-5 text-cream md:px-10">
      <span className="font-display pointer-events-none absolute -right-[4vw] bottom-0 text-[42vw] leading-[0.75] text-cream/[0.04] select-none" aria-hidden="true">
        404
      </span>
      <div className="relative mx-auto w-full max-w-[1440px]">
        <p className="eyebrow animate-rise text-terracotta">{n.eyebrow}</p>
        <h1 className="font-display animate-rise mt-6 max-w-4xl text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.02em] [animation-delay:120ms]">{n.title}</h1>
        <p className="animate-rise mt-8 max-w-md text-lg text-cream/75 [animation-delay:220ms]">{n.body}</p>
        <div className="animate-rise mt-10 [animation-delay:320ms]">
          <Button to={to('home')}>{n.back}</Button>
        </div>
      </div>
    </section>
  )
}
