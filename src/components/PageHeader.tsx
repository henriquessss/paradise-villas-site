import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router'
import { useLang } from '../content'

/** Tall image header for inner pages: parallax photo, oversized title, breadcrumb. */
export function PageHeader({ eyebrow, title, image, compact = false }: { eyebrow: string; title: string; image: string; compact?: boolean }) {
  const { t, to } = useLang()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <header ref={ref} className={`grain relative flex items-end overflow-hidden bg-navy-deep text-cream ${compact ? 'h-[56svh] min-h-[420px]' : 'h-[78svh] min-h-[520px]'}`}>
      <motion.img
        src={image}
        alt=""
        style={{ y }}
        className="animate-unveil absolute inset-0 h-[120%] w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/30" aria-hidden="true" />
      <motion.div style={{ y: titleY, opacity: fade }} className="relative mx-auto w-full max-w-[1440px] px-5 pb-14 md:px-10 md:pb-20">
        <nav aria-label="Breadcrumb" className="animate-rise mb-6 text-xs tracking-[0.18em] uppercase opacity-80">
          <Link to={to('home')} className="hover:text-terracotta">
            {t.common.home}
          </Link>
          <span className="mx-3" aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <p className="eyebrow animate-rise text-terracotta [--delay:120ms]">{eyebrow}</p>
        <h1 className={`font-display animate-rise mt-4 leading-[0.92] tracking-[-0.02em] [--delay:200ms] ${compact ? 'text-[clamp(2.6rem,7vw,6.5rem)]' : 'text-[clamp(3.2rem,11vw,10rem)]'}`}>
          {title}
        </h1>
      </motion.div>
    </header>
  )
}
