import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

/** Oversized line of text that slides horizontally as the section scrolls past. */
export function ScrollMarquee({ text, className = '', reverse = false }: { text: string; className?: string; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ['-30%', '0%'] : ['0%', '-30%'])
  return (
    <div ref={ref} className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <motion.div style={{ x }} className="inline-block will-change-transform">
        {`${text} · `.repeat(4)}
      </motion.div>
    </div>
  )
}
