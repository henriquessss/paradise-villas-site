import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Moves its children vertically relative to the scroll position of the wrapper.
 * `speed` is the travel in % of the element height (negative = moves up faster).
 */
export function Parallax({ children, speed = 15, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${speed}%`, `${-speed}%`])
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}

/** Image clipped by its frame and drifting inside it as the page scrolls. */
export function ParallaxImage({
  src,
  alt,
  className = '',
  strength = 12,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  strength?: number
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])
  return (
    // Callers may position the frame themselves (e.g. `absolute inset-0` for backgrounds).
    <div ref={ref} className={`overflow-hidden ${/\b(absolute|fixed|sticky)\b/.test(className) ? '' : 'relative'} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1 + (strength * 2.2) / 100 }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
