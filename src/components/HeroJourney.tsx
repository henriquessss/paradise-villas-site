import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLang } from '../content'
import heroFrames from '../hero-frames.json'
import { EXTERNAL } from '../routes'
import { Button } from './ui'

/*
 * Home hero as a scroll-driven "journey" through the Algarve.
 * The section is ~6 viewports tall with a sticky stage. Scroll progress scrubs a WebP frame
 * sequence on a canvas (five Higgsfield clips: cliffs → cave → beach → village → sunset) and
 * drives five text chapters that enter and leave, each with its own movement. At the end the
 * stage shrinks into a rounded card and hands over to the next section.
 * Prefers-reduced-motion: no frames are loaded; poster + chapters stacked as normal content.
 */

const EXIT_START = 0.93 // last 7% of the scroll: stage shrinks, frames stay on the last one
const FADE = 0.035 // scroll distance for a chapter to fade in / out
const ITEM_STAGGER = 0.012 // label → heading → body → CTA
const WORD_STAGGER = 0.005

// Chapter k spans [bounds[k], bounds[k+1]] of the scroll (clip boundaries from the frame build).
const bounds = [...heroFrames.chapters.map((c) => c * EXIT_START), EXIT_START]

type Variant = 'up' | 'left' | 'right' | 'scale' | 'clip' | 'blur'
/** [enter start, enter end, exit start, exit end] in scroll progress. */
type Range = [number, number, number, number]

function chapterRange(k: number): Range {
  const last = k === bounds.length - 2
  // First chapter starts visible (enter = 0), last one never leaves (exit = 1).
  const enter: [number, number] = k === 0 ? [0, 0] : [bounds[k] + 0.012, bounds[k] + 0.012 + FADE]
  const exit: [number, number] = last ? [1, 1] : k === 0 ? [0.11, 0.11 + FADE] : [bounds[k + 1] - 0.012 - FADE, bounds[k + 1] - 0.012]
  return [...enter, ...exit]
}

/** Delay a range for cascading items, keeping "starts visible" and "never leaves" intact. */
const shift = ([a, b, c, d]: Range, by: number): Range => (b <= 0 ? [a, b, c + by, d + by] : c >= 1 ? [a + by, b + by, c, d] : [a + by, b + by, c + by, d + by])

/** One element whose opacity/position follow the scroll inside its chapter range. */
function ScrollItem({
  progress,
  range,
  variant,
  children,
  className = '',
  as = 'div',
}: {
  progress: MotionValue<number>
  range: Range
  variant: Variant
  children: ReactNode
  className?: string
  as?: 'div' | 'span' | 'p'
}) {
  // Motion hands scroll-linked transforms to native WAAPI scroll timelines, which need offsets
  // in [0, 1] and non-decreasing. Clamp, and encode "already visible" / "never leaves" in the
  // output values instead of with out-of-range inputs.
  const startsVisible = range[1] <= 0
  const persists = range[2] >= 1
  const clamped = range.map((v) => Math.min(1, Math.max(0, v)))
  const input = clamped.map((v, i) => Math.max(v, ...clamped.slice(0, i)))
  const out = (enter: number, rest: number, leave: number) => [startsVisible ? rest : enter, rest, rest, persists ? rest : leave]

  const opacity = useTransform(progress, input, out(0, 1, 0))
  const y = useTransform(progress, input, variant === 'up' ? out(70, 0, -50) : variant === 'blur' ? out(20, 0, -30) : out(0, 0, -30))
  const x = useTransform(progress, input, variant === 'left' ? out(-90, 0, -40) : variant === 'right' ? out(90, 0, 40) : out(0, 0, 0))
  const scale = useTransform(progress, input, variant === 'scale' ? out(0.86, 1, 1.04) : out(1, 1, 1))
  const blur = useTransform(progress, input, variant === 'blur' ? out(12, 0, 10) : out(0, 0, 6))
  const filter = useTransform(blur, (b) => `blur(${b}px)`)
  const clipPath = useTransform(progress, [input[0], input[1]], [startsVisible ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)', 'inset(0 0 0% 0)'])
  const Tag = motion[as]
  return (
    <Tag
      style={{ opacity, x, y, scale, filter, ...(variant === 'clip' ? { clipPath } : {}) }}
      className={`will-change-transform motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:![filter:none] motion-reduce:![clip-path:none] ${className}`}
    >
      {children}
    </Tag>
  )
}

/** Heading split into words that cascade in and out. */
function ScrollWords({ progress, range, variant, text }: { progress: MotionValue<number>; range: Range; variant: Variant; text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <ScrollItem key={i} as="span" progress={progress} range={shift(range, i * WORD_STAGGER)} variant={variant} className="mr-[0.22em] inline-block">
          {word}
        </ScrollItem>
      ))}
    </>
  )
}

/** Loads the frame sequence progressively and paints the frame for the current scroll. */
function useFrameCanvas(canvas: React.RefObject<HTMLCanvasElement | null>, progress: MotionValue<number>) {
  const frames = useRef<HTMLImageElement[]>([])
  const target = useRef(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const set = window.matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop'
    const count = heroFrames[set]
    const list: HTMLImageElement[] = []
    frames.current = list
    let cancelled = false

    const ctx = canvas.current?.getContext('2d')
    const paint = () => {
      const el = canvas.current
      if (!el || !ctx) return
      // Nearest frame that has finished loading (a coarse pass loads every 8th frame first).
      const loaded = (i: number) => list[i]?.complete && list[i].naturalWidth > 0
      let img: HTMLImageElement | undefined
      for (let d = 0; d < count && !img; d++) {
        if (loaded(target.current - d)) img = list[target.current - d]
        else if (loaded(target.current + d)) img = list[target.current + d]
      }
      if (!img) return
      const scale = Math.max(el.width / img.naturalWidth, el.height / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      ctx.drawImage(img, (el.width - w) / 2, (el.height - h) / 2, w, h)
    }

    const resize = () => {
      const el = canvas.current
      if (!el) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      el.width = Math.round(el.clientWidth * dpr)
      el.height = Math.round(el.clientHeight * dpr)
      paint()
    }

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        if (cancelled || list[i]) return resolve()
        const img = new Image()
        img.decoding = 'async'
        img.onload = img.onerror = () => {
          if (i === 0) setReady(true)
          if (Math.abs(i - target.current) < 8) paint()
          resolve()
        }
        img.src = `/hero/${set}/${String(i + 1).padStart(4, '0')}.webp`
        list[i] = img
      })

    // First frame, then a coarse pass (every 8th), then the rest — 6 requests in flight.
    const order = [0, ...Array.from({ length: count }, (_, i) => i).filter((i) => i % 8 === 0 && i), ...Array.from({ length: count }, (_, i) => i).filter((i) => i % 8)]
    const queue = [...order]
    const worker = async () => {
      while (queue.length && !cancelled) await load(queue.shift()!)
    }
    // Let the page (fonts, LCP poster) settle before pulling ~10 MB of frames.
    const start = window.setTimeout(() => Array.from({ length: 6 }, worker), 400)

    const onProgress = (p: number) => {
      target.current = Math.round(Math.min(p / EXIT_START, 1) * (count - 1))
      paint()
    }
    const unsubscribe = progress.on('change', onProgress)
    onProgress(progress.get())
    resize()
    window.addEventListener('resize', resize)
    return () => {
      cancelled = true
      window.clearTimeout(start)
      unsubscribe()
      window.removeEventListener('resize', resize)
    }
  }, [canvas, progress])

  return ready
}

export function HeroJourney() {
  const { t, to } = useLang()
  const h = t.home.hero
  const section = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress: p } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const ready = useFrameCanvas(canvas, p)

  // Exit: the stage becomes a rounded card and the text steps back.
  const stageScale = useTransform(p, [EXIT_START, 1], [1, 0.86])
  const stageRadius = useTransform(p, [EXIT_START, 1], [0, 36])
  const progressBar = useTransform(p, [0, EXIT_START], ['0%', '100%'])
  const [chapter, setChapter] = useState(0)
  useMotionValueEvent(p, 'change', (v) => {
    const k = bounds.findLastIndex((b, i) => i < bounds.length - 1 && v >= b)
    setChapter(Math.max(0, k))
  })

  const total = bounds.length - 1
  const labels = [h.title.join(' '), ...h.chapters.map((c) => c.eyebrow)]
  // Side zones alternate so the text never sits in the middle of the picture.
  const layout = [
    { variant: 'up' as Variant, words: 'blur' as Variant, align: 'items-start text-left', box: 'max-w-[40rem]' },
    { variant: 'left' as Variant, words: 'up' as Variant, align: 'items-start text-left', box: 'max-w-[36rem]' },
    // Right-aligned text keeps clear of the chapter rail on large screens.
    { variant: 'right' as Variant, words: 'right' as Variant, align: 'items-end text-right', box: 'max-w-[36rem] lg:mr-64' },
    { variant: 'clip' as Variant, words: 'clip' as Variant, align: 'items-start text-left', box: 'max-w-[36rem]' },
    { variant: 'scale' as Variant, words: 'blur' as Variant, align: 'items-start text-left', box: 'max-w-[44rem]' },
  ]

  return (
    <section
      ref={section}
      data-header-dark
      aria-label={h.title.join(' ')}
      className="relative h-[620vh] bg-navy-deep text-cream max-md:h-[520vh] motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden motion-reduce:static motion-reduce:h-auto">
        <motion.div
          style={{ scale: stageScale, borderRadius: stageRadius }}
          className="grain absolute inset-0 overflow-hidden bg-navy-deep motion-reduce:!scale-100 motion-reduce:!rounded-none"
        >
          {/* Poster: prerendered, paints first (LCP) and stays for reduced motion. */}
          <img
            src="/hero/poster.webp"
            alt=""
            fetchPriority="high"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
          />
          <canvas ref={canvas} className="absolute inset-0 h-full w-full motion-reduce:hidden" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-navy-deep/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,25,44,0.55)_100%)]" aria-hidden="true" />
        </motion.div>

        {/* Chapters */}
        <div className="relative mx-auto h-full max-w-[1440px] px-5 md:px-10 motion-reduce:h-auto motion-reduce:space-y-24 motion-reduce:py-40">
          {/* 0 — Explore o Algarve */}
          <div className={`absolute inset-x-5 bottom-16 flex flex-col md:inset-x-10 md:bottom-24 motion-reduce:static ${layout[0].align}`}>
            <h1 className="font-display leading-[0.86] tracking-[-0.03em]">
              <span className="block text-[clamp(4.2rem,15vw,13.5rem)]">
                <ScrollWords progress={p} range={chapterRange(0)} variant={layout[0].words} text={h.title[0]} />
              </span>
              <span className="flex items-baseline gap-[0.18em] text-[clamp(4.2rem,15vw,13.5rem)]">
                <ScrollItem as="span" progress={p} range={shift(chapterRange(0), WORD_STAGGER)} variant="blur" className="text-[0.42em] text-terracotta italic">
                  {h.title[1]}
                </ScrollItem>
                <ScrollWords progress={p} range={shift(chapterRange(0), 2 * WORD_STAGGER)} variant={layout[0].words} text={h.title[2]} />
              </span>
            </h1>
            <div className="mt-8 flex w-full flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
              <ScrollItem progress={p} range={shift(chapterRange(0), ITEM_STAGGER)} variant="up">
                <p className="max-w-md text-lg leading-relaxed text-cream/85">{h.lead}</p>
              </ScrollItem>
              <ScrollItem progress={p} range={shift(chapterRange(0), 2 * ITEM_STAGGER)} variant="up" className="flex flex-wrap gap-3">
                <Button href={EXTERNAL.booking}>{t.common.verAlojamentos}</Button>
                <Button to={to('gestao')} variant="ghost-light">
                  {h.secondary}
                </Button>
              </ScrollItem>
            </div>
          </div>

          {/* 1-4 — the journey */}
          {h.chapters.map((c, i) => {
            const k = i + 1
            const range = chapterRange(k)
            const l = layout[k]
            const last = k === total - 1
            return (
              <div key={c.eyebrow} className={`absolute inset-x-5 top-1/2 flex -translate-y-1/2 flex-col md:inset-x-10 motion-reduce:static motion-reduce:translate-y-0 ${l.align}`}>
                <div className={`flex flex-col ${l.align} ${l.box}`}>
                  <ScrollItem progress={p} range={range} variant={l.variant}>
                    <p className="eyebrow flex items-center gap-3 text-terracotta">
                      <span className="tabular-nums">{String(k + 1).padStart(2, '0')}</span>
                      <span className="h-px w-8 bg-current opacity-50" aria-hidden="true" />
                      {c.eyebrow}
                    </p>
                  </ScrollItem>
                  <h2 className={`font-display mt-6 leading-[0.98] tracking-[-0.02em] ${last ? 'text-[clamp(2.8rem,6.4vw,6.4rem)]' : 'text-[clamp(2.6rem,5.6vw,5.4rem)]'}`}>
                    <ScrollWords progress={p} range={shift(range, ITEM_STAGGER)} variant={l.words} text={c.title} />
                  </h2>
                  <ScrollItem progress={p} range={shift(range, 2 * ITEM_STAGGER)} variant={l.variant}>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/85">{c.text}</p>
                  </ScrollItem>
                  {last && (
                    <ScrollItem progress={p} range={shift(range, 3 * ITEM_STAGGER)} variant="up" className="mt-10 flex flex-wrap gap-3">
                      <Button href={EXTERNAL.booking}>{t.common.verAlojamentos}</Button>
                      <Button to={to('gestao')} variant="ghost-light">
                        {h.secondary}
                      </Button>
                    </ScrollItem>
                  )}
                </div>
              </div>
            )
          })}

          {/* Chapter rail */}
          <div className="absolute top-1/2 right-5 hidden -translate-y-1/2 flex-col items-end gap-4 md:right-10 lg:flex motion-reduce:!hidden" aria-hidden="true">
            <span className="font-display text-sm tabular-nums">
              {String(chapter + 1).padStart(2, '0')} <span className="text-cream/40">/ {String(total).padStart(2, '0')}</span>
            </span>
            <div className="relative h-40 w-px bg-cream/20">
              <motion.div style={{ height: progressBar }} className="absolute top-0 left-0 w-px bg-terracotta" />
            </div>
            <ul className="space-y-2 text-right text-[0.65rem] tracking-[0.2em] uppercase">
              {labels.map((label, i) => (
                <li key={label} className={`transition-all duration-500 ${i === chapter ? 'text-cream' : 'text-cream/35'}`}>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Scroll cue, only at the start */}
          <ScrollItem progress={p} range={[0, 0, 0.02, 0.05]} variant="up" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block motion-reduce:!hidden">
            <span className="flex flex-col items-center gap-3 text-[0.65rem] tracking-[0.3em] uppercase" aria-hidden="true">
              {t.common.scroll}
              <span className="relative h-14 w-px overflow-hidden bg-cream/25">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-cream" />
              </span>
            </span>
          </ScrollItem>
        </div>
      </div>
    </section>
  )
}
