import { animate, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

/** Number that counts up from 0 the first time it enters the viewport. */
export function CountUp({ to, locale, className }: { to: number; locale: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  // Prerendered HTML carries the final value (SEO, no-JS). After hydration, a counter
  // still below the fold is reset to 0 so it can count up when the visitor reaches it.
  const [value, setValue] = useState(to)
  const armed = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top > window.innerHeight) {
      armed.current = true
      setValue(0)
    }
  }, [])

  useEffect(() => {
    if (!inView || !armed.current) return
    const controls = animate(0, to, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString(locale)}
    </span>
  )
}
