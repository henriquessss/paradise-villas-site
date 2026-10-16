// Home hero background: a short montage of the client's own villa videos
// (media-jobs/raw/cliente/, not in git) → public/video/hero-*.mp4 + posters.
// Run with `npm run media:hero`. Shots are [file, start s, duration s], picked between cuts.
import { execFileSync } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const RAW = 'media-jobs/raw/cliente'
const H = 'VIVENDA COSTA HORIZONTAL.mp4'
const I = 'IMG_1648.mov'
const V = 'VIVENDA COSTA VERTICAL_V2.mp4'

const cuts = {
  // 16:9 — pool, pool with parasols, pool bridge, drone, villa front, top-down, villa and pool
  desktop: {
    size: [1440, 810],
    crf: 30,
    shots: [
      [H, 1.8, 3.0],
      [I, 43.0, 3.4],
      [H, 52.2, 3.4],
      [H, 56.0, 4.2],
      [I, 131.0, 2.3],
      [H, 68.0, 4.0],
      [I, 5.5, 2.2],
    ],
  },
  // 9:16 — the vertical edit of the same villa
  mobile: {
    size: [720, 1280],
    crf: 30,
    shots: [
      [V, 34.0, 3.6],
      [V, 48.2, 2.4],
      [V, 0.1, 1.8],
      [V, 61.7, 1.5],
      [V, 65.3, 3.6],
    ],
  },
}

const FADE = 0.5
const ffmpeg = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args], { stdio: 'inherit' })
await mkdir('public/video', { recursive: true })

for (const [name, { size: [w, h], crf, shots }] of Object.entries(cuts)) {
  const inputs = shots.flatMap(([file, start, dur]) => ['-ss', String(start), '-t', String(dur), '-i', path.join(RAW, file)])
  const filters = shots.map((_, i) => `[${i}:v]scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},fps=25,format=yuv420p,setpts=PTS-STARTPTS[v${i}]`)
  let chain = 'v0'
  let offset = 0
  for (let i = 1; i < shots.length; i++) {
    offset += shots[i - 1][2] - FADE
    filters.push(`[${chain}][v${i}]xfade=transition=fade:duration=${FADE}:offset=${offset.toFixed(2)}[x${i}]`)
    chain = `x${i}`
  }
  const out = `public/video/hero-${name}.mp4`
  ffmpeg([...inputs, '-filter_complex', filters.join(';'), '-map', `[${chain}]`, '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out])
  // First frame as the poster (LCP before the video starts, and the reduced-motion still).
  ffmpeg(['-i', out, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '78', `public/video/hero-${name}.webp`])
  console.log(`${out}`)
}
