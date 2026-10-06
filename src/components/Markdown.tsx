import type { ReactNode } from 'react'
import { Rich } from './Rich'

/**
 * Minimal renderer for the legal texts in src/content/legal: `### heading`,
 * `- list item`, `> note` and paragraphs separated by blank lines.
 */
export function Markdown({ source }: { source: string }) {
  const blocks = source.trim().split(/\n{2,}/)
  const out: ReactNode[] = []
  blocks.forEach((block, i) => {
    if (block.startsWith('### ')) {
      out.push(
        <h2 key={i} className="font-display mt-14 mb-4 text-2xl text-navy first:mt-0 md:text-3xl">
          {block.slice(4)}
        </h2>,
      )
    } else if (block.startsWith('> ')) {
      out.push(
        <p key={i} className="mb-10 border-l-2 border-terracotta pl-4 text-sm text-ink-soft italic">
          {block.slice(2)}
        </p>,
      )
    } else if (block.split('\n').every((line) => line.startsWith('- '))) {
      out.push(
        <ul key={i} className="my-5 space-y-3">
          {block.split('\n').map((line, j) => (
            <li key={j} className="relative pl-6 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-3 before:bg-terracotta">
              <Rich text={line.slice(2)} />
            </li>
          ))}
        </ul>,
      )
    } else {
      out.push(
        <p key={i} className="my-4">
          <Rich text={block.replace(/\n/g, ' ')} />
        </p>,
      )
    }
  })
  return <>{out}</>
}
