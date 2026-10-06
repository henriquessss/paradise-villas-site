import { useEffect, useRef } from 'react'

/**
 * Muted looping background video. Plays only while on screen (saves CPU/battery)
 * and never plays for users who prefer reduced motion — they get the poster.
 * `eager` is for the above-the-fold hero: autoplay + full preload.
 */
export function AmbientVideo({ src, poster, className = '', eager = false }: { src: string; poster: string; className?: string; eager?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.05 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      poster={poster}
      muted
      loop
      playsInline
      preload={eager ? 'auto' : 'metadata'}
      // Above-the-fold video starts before hydration; the effect pauses it for reduced motion.
      autoPlay={eager}
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
