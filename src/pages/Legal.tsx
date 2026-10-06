import { Markdown } from '../components/Markdown'
import { PageHeader } from '../components/PageHeader'
import { img } from '../components/ui'
import { useLang } from '../content'
import privacidadeEn from '../content/legal/privacidade.en.md?raw'
import privacidadePt from '../content/legal/privacidade.pt.md?raw'
import termosEn from '../content/legal/termos.en.md?raw'
import termosPt from '../content/legal/termos.pt.md?raw'

const docs = {
  privacidade: { pt: privacidadePt, en: privacidadeEn },
  termos: { pt: termosPt, en: termosEn },
}

export function Legal({ doc }: { doc: keyof typeof docs }) {
  const { t, lang } = useLang()
  const title = t.legal[doc].title
  return (
    <>
      <PageHeader eyebrow="Paradise Villas" title={title} image={img('experiencias-mar')} compact />
      <article className="mx-auto max-w-3xl px-5 py-24 text-lg leading-relaxed text-ink-soft md:py-32 [&_h2]:text-navy [&_strong]:text-navy">
        <Markdown source={docs[doc][lang]} />
      </article>
    </>
  )
}
