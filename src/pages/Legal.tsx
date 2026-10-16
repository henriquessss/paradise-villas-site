import { PageHero } from '../components/blocks'
import { Markdown } from '../components/Markdown'
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
      <PageHero eyebrow="Paradise Villas" title={title} image="experiencias-mar" />
      <article className="mx-auto max-w-3xl px-5 py-20 text-[1.05rem] leading-relaxed text-ink-soft md:py-28 [&_h2]:text-navy [&_strong]:text-navy">
        <Markdown source={docs[doc][lang]} />
      </article>
    </>
  )
}
