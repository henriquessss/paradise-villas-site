// One-off media pipeline: content-source/ (scraped originals, not in git) → public/ (optimized).
// Run with `npm run media`. Re-running overwrites outputs.
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'content-source/images'
const OUT = 'public/images'

// [source file, output name, max width]
const images = [
  ['home-boas-vindas-layer-1.png', 'boas-vindas-piscina', 1200],
  ['home-boas-vindas-layer-2.png', 'boas-vindas-interior', 1100],
  ['villa-goreti.jpg', 'villa-goreti', 740],
  ['apt-palmeiras.jpg', 'apt-palmeiras', 740],
  ['villa-marina.jpg', 'villa-marina', 740],
  ['home-vantagens-reservar-bg.jpg', 'vantagens', 2400],
  ['gestao-al-bg-1.jpg', 'gestao-piscina', 1800],
  ['gestao-al-bg-2.jpg', 'gestao-quarto', 1800],
  ['gestao-al-stats-bg.jpg', 'gestao-mar', 1920],
  ['gestao-al-roupas-atoalhados.jpg', 'gestao-roupas', 740],
  ['gestao-al-manutencao.jpg', 'gestao-manutencao', 740],
  ['gestao-al-marketing.jpg', 'gestao-marketing', 740],
  ['porque-algarve-varios-desportos.jpg', 'algarve-desportos', 1170],
  ['porque-algarve-simpatia-hospitalidade.jpg', 'algarve-hospitalidade', 1170],
  ['porque-algarve-lugares-magicos.jpg', 'algarve-lugares', 1170],
  ['porque-algarve-familias-amigos.jpg', 'algarve-familias', 1170],
  ['porque-algarve-tradicao-modernidade.jpg', 'algarve-tradicao', 1170],
  ['experiencias-intro-layer-4.jpg', 'algarve-praias', 1170],
  ['experiencias-intro-layer-1.jpg', 'experiencias-mar', 2194],
  ['experiencias-intro-layer-3.jpg', 'experiencias-arco', 2194],
  ['experiencias-completa-bg.jpg', 'experiencias-praia', 1800],
  ['experiencias-recomendadas-bg.jpg', 'experiencias-capela', 1796],
  ['exp-golfinhos-grutas.jpg', 'exp-golfinhos-grutas', 960],
  ['exp-caiaque-linha-costeira.jpg', 'exp-caiaque', 960],
  ['exp-dois-mergulhos.jpg', 'exp-mergulho', 960],
  ['exp-prova-vinhos-silves.jpg', 'exp-vinhos-silves', 960],
  ['exp-zoomarine.jpg', 'exp-zoomarine', 960],
  ['exp-aquashow.jpg', 'exp-aquashow', 960],
  ['exp-krazy-world.jpg', 'exp-krazy-world', 960],
  ['exp-paraquedismo-tandem.jpg', 'exp-paraquedismo', 960],
  ['exp-safari-jipe.jpg', 'exp-safari', 960],
  ['exp-churrasco-praia.jpg', 'exp-churrasco', 960],
  ['exp-festa-barco.jpg', 'exp-festa-barco', 960],
  ['exp-parasailing.jpg', 'exp-parasailing', 960],
  ['banner-paginas-internas.jpg', 'banner-algarve', 1920],
  ['sobre-nos-card-missao.jpg', 'sobre-missao', 960],
  ['sobre-nos-card-visao.jpg', 'sobre-visao', 960],
  ['sobre-nos-card-valores.jpg', 'sobre-valores', 960],
  ['sobre-nos-card-diferenciacao.jpg', 'sobre-diferenciacao', 960],
  ['sobre-nos-fundador-bruno-pereira.png', 'fundador', 1170],
  ['sobre-nos-cta-gestao-al.jpg', 'sobre-cta-gestao', 740],
  ['sobre-nos-cta-alojamentos.jpg', 'sobre-cta-alojamentos', 740],
]

await mkdir(OUT, { recursive: true })
for (const [file, name, width] of images) {
  // PNG "image layers" from the old theme carry transparent padding: trim it away.
  const source = file.endsWith('.png') ? sharp(await sharp(path.join(SRC, file)).trim().toBuffer()) : sharp(path.join(SRC, file))
  await source
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(path.join(OUT, `${name}.webp`))
}
console.log(`${images.length} imagens → ${OUT}`)

// Instagram (@paradisevillas_). Feed posts carry an info band on the lower third:
// keep only the photo above it.
const IG = 'content-source/instagram'
await sharp(path.join(IG, '2026-04-10_DW9fqMiir0-_1.jpg')).resize({ width: 1920 }).webp({ quality: 80 }).toFile(path.join(OUT, 'ig-villa-piscina.webp'))
const igPosts = [
  ['2026-06-15_DZncDJ4CfO9_1.jpg', 'ig-villa-raul'],
  ['2026-03-16_DV9Ok6-ldFH_1.jpg', 'ig-villa-marina'],
  ['2026-07-13_DaviTqIFtw3_1.jpg', 'ig-townhouse-rosa'],
  ['2026-06-01_DZDY6-1ltsU_1.jpg', 'ig-vista-ondas'],
  ['2026-05-04_DX7SqaPlCKn_1.jpg', 'ig-villa-paulo'],
  ['2026-05-18_DYfVyn3lCmm_1.jpg', 'ig-villa-goreti'],
]
for (const [file, name] of igPosts) {
  await sharp(path.join(IG, file)).extract({ left: 0, top: 0, width: 1440, height: 1200 }).resize({ width: 900 }).webp({ quality: 78 }).toFile(path.join(OUT, `${name}.webp`))
}
console.log(`${igPosts.length + 1} imagens do Instagram → ${OUT}`)

// Social share image (JPEG for maximum compatibility).
await sharp(path.join(SRC, 'gestao-al-bg-1.jpg'))
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-image.jpg')

// Logos. The desktop logo has an opaque white background: key it out to get a
// transparent navy/terracotta version for light backgrounds.
const { data, info } = await sharp(path.join(SRC, 'logo-header-desktop.png'))
  .trim({ threshold: 10 })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
for (let i = 0; i < data.length; i += 4) {
  const lightness = Math.min(data[i], data[i + 1], data[i + 2])
  // Fully white → transparent; anti-aliased edge pixels get partial alpha.
  if (lightness > 245) data[i + 3] = 0
  else if (lightness > 200) data[i + 3] = Math.round(((245 - lightness) / 45) * 255)
}
await sharp(data, { raw: info }).resize({ height: 240 }).png({ compressionLevel: 9 }).toFile('public/logo-cor.png')

// Header lockups: the wordmark without the sun (rows below the first transparent gap),
// in navy for light backgrounds and recoloured white (terracotta script kept) for dark ones.
const rowHasInk = (y) => {
  for (let x = 0; x < info.width; x++) if (data[(y * info.width + x) * 4 + 3] > 40) return true
  return false
}
// The sun is drawn in stripes, so take the tallest empty band as the sun/wordmark split.
let top = 0
for (let y = 0, gapStart = -1, best = 0; y < info.height; y++) {
  if (!rowHasInk(y)) {
    if (gapStart < 0) gapStart = y
  } else if (gapStart >= 0) {
    if (gapStart > 0 && y - gapStart > best) [best, top] = [y - gapStart, y]
    gapStart = -1
  }
}
const wordmark = await sharp(data, { raw: info })
  .extract({ left: 0, top, width: info.width, height: info.height - top })
  .trim()
  .resize({ height: 180 })
  .raw()
  .toBuffer({ resolveWithObject: true })
await sharp(wordmark.data, { raw: wordmark.info }).png({ compressionLevel: 9 }).toFile('public/logo-texto.png')
const light = Buffer.from(wordmark.data)
for (let i = 0; i < light.length; i += 4) {
  // Navy pixels (blue channel dominant over red) become white; terracotta stays.
  if (light[i + 2] >= light[i]) light[i] = light[i + 1] = light[i + 2] = 255
}
await sharp(light, { raw: wordmark.info }).png({ compressionLevel: 9 }).toFile('public/logo-texto-claro.png')
await sharp(path.join(SRC, 'logo-footer.png')).trim().resize({ height: 240 }).png({ compressionLevel: 9 }).toFile('public/logo-escuro.png')
for (const [size, name] of [[32, 'favicon.png'], [180, 'apple-touch-icon.png']]) {
  await sharp(path.join(SRC, 'favicon-icone.png')).resize(size, size).png().toFile(path.join('public', name))
}
console.log('logos + favicons → public/')
