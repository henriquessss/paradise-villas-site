import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

export type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'clip' | 'fade'

const offscreen: Record<RevealVariant, Variants['hidden']> = {
  up: { opacity: 0, y: 48 },
  left: { opacity: 0, x: -64 },
  right: { opacity: 0, x: 64 },
  scale: { opacity: 0, scale: 0.92 },
  clip: { clipPath: 'inset(0 0 100% 0)' },
  fade: { opacity: 0 },
}

const onscreen: Record<RevealVariant, Variants['visible']> = {
  up: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  clip: { clipPath: 'inset(0 0 0% 0)' },
  fade: { opacity: 1 },
}

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'p' | 'span' | 'h2' | 'h3' | 'figure'
}

/** Animates its content once when it scrolls into view. */
export function Reveal({ children, variant = 'up', delay = 0, className, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  const transition = { duration: variant === 'clip' ? 1.2 : 0.9, delay, ease: [0.16, 1, 0.3, 1] as const }
  if (variant === 'clip') {
    // Chrome's IntersectionObserver honours the target's own clip-path, so a fully clipped
    // element never "enters" the viewport. Observe an unclipped wrapper, clip the child.
    return (
      <Tag className={className} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
        <motion.div variants={{ hidden: offscreen.clip, visible: onscreen.clip }} transition={transition}>
          {children}
        </motion.div>
      </Tag>
    )
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ hidden: offscreen[variant], visible: onscreen[variant] }}
      transition={transition}
    >
      {children}
    </Tag>
  )
}

/** Container that staggers its <RevealItem> children (label → heading → body → CTA). */
export function RevealGroup({ children, className, stagger = 0.1 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className, variant = 'up' }: { children: ReactNode; className?: string; variant?: RevealVariant }) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: offscreen[variant], visible: onscreen[variant] }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
