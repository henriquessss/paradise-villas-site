// Favicons from the brand mark (content-source/images/favicon-icone.png, 512×512).
// Google shows the favicon next to search results and wants a square icon in a multiple of 48 px
// (48×48 or larger), so we ship 48/96/192/512 PNGs, a multi-size favicon.ico and a web manifest.
// Run on its own (`node scripts/favicons.mjs`) or as part of `npm run media`.
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = path.join('content-source', 'images', 'favicon-icone.png')
const OUT = 'public'

const png = (size) => sharp(SRC).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

for (const [size, name] of [
  [32, 'favicon.png'],
  [48, 'favicon-48.png'],
  [96, 'favicon-96.png'],
  [192, 'favicon-192.png'],
  [512, 'favicon-512.png'],
]) {
  await writeFile(path.join(OUT, name), await png(size))
}

// apple-touch-icon: iOS fills transparency with black, so put the mark on the site's cream background.
await sharp(SRC)
  .resize(148, 148)
  .extend({ top: 16, bottom: 16, left: 16, right: 16, background: '#fcf8f4' })
  .flatten({ background: '#fcf8f4' })
  .png({ compressionLevel: 9 })
  .toFile(path.join(OUT, 'apple-touch-icon.png'))

// favicon.ico with 16, 32 and 48 px images (PNG-compressed entries, supported by every current browser).
const sizes = [16, 32, 48]
const images = await Promise.all(sizes.map(png))
const header = Buffer.alloc(6 + 16 * sizes.length)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type: icon
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
sizes.forEach((size, i) => {
  const entry = 6 + 16 * i
  header.writeUInt8(size, entry) // width
  header.writeUInt8(size, entry + 1) // height
  header.writeUInt8(0, entry + 2) // palette
  header.writeUInt8(0, entry + 3) // reserved
  header.writeUInt16LE(1, entry + 4) // colour planes
  header.writeUInt16LE(32, entry + 6) // bits per pixel
  header.writeUInt32LE(images[i].length, entry + 8)
  header.writeUInt32LE(offset, entry + 12)
  offset += images[i].length
})
await writeFile(path.join(OUT, 'favicon.ico'), Buffer.concat([header, ...images]))

await writeFile(
  path.join(OUT, 'site.webmanifest'),
  `${JSON.stringify(
    {
      name: 'Paradise Villas',
      short_name: 'Paradise Villas',
      start_url: '/',
      display: 'browser',
      background_color: '#fcf8f4',
      theme_color: '#fcf8f4',
      icons: [
        { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  )}\n`,
)

console.log('favicons (32/48/96/192/512, ico, apple-touch-icon, manifest) → public/')
