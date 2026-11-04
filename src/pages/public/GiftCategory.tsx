import type { Gift, GiftGroup } from '../../lib/types'
import { GiftCard } from './GiftCard'

interface GiftCategoryProps {
  group: GiftGroup
  onChoose: (gift: Gift) => void
}

function CategoryIcon({ category }: { category: string }) {
  const cat = category.toLowerCase()

  if (cat.includes('pix')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  }

  if (cat.includes('higiene') || cat.includes('cuidados')) {
    // Âncora / Cuidados
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-800 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <line x1="12" y1="8" x2="12" y2="21" />
        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      </svg>
    )
  }

  if (cat.includes('alimenta') || cat.includes('amamenta')) {
    // Boia Salva-vidas
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-800 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <line x1="5.64" y1="5.64" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="18.36" y2="18.36" />
        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
        <line x1="5.64" y1="18.36" x2="9.17" y2="14.83" />
      </svg>
    )
  }

  if (cat.includes('banho') || cat.includes('saúde')) {
    // Farol Náutico
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-800 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 22h6M10 18h4M11 2h2l2 16H9L11 2zM9 8h6M8 12h8" />
      </svg>
    )
  }

  if (cat.includes('roupas') || cat.includes('enxoval')) {
    // Nó Náutico / Barco a Vela
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-800 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1 2.4 2.4 0 0 1 2-1 2.4 2.4 0 0 1 2 1 2.4 2.4 0 0 0 2 1 2.4 2.4 0 0 0 2-1" />
        <path d="M4 18l1-12 13 12H4z" />
        <line x1="4" y1="6" x2="18" y2="18" />
      </svg>
    )
  }

  // Estímulo e Diversão / Outros: Timão
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-800 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
    </svg>
  )
}

export function GiftCategory({ group, onChoose }: GiftCategoryProps) {
  const headingId = `cat-${group.category.replace(/\W+/g, '-').toLowerCase()}`

  return (
    <section aria-labelledby={headingId} className="scroll-mt-6">
      <div className="mb-3.5 flex items-center gap-3 px-1">
        <div
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100/70 border border-blue-200/60 dark:bg-slate-800 dark:border-slate-700 shadow-xs"
        >
          <CategoryIcon category={group.category} />
        </div>
        <h3 id={headingId} className="text-xl sm:text-2xl font-bold tracking-wide text-blue-950 dark:text-white font-nautical">
          {group.category}
        </h3>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent dark:from-slate-800" aria-hidden="true" />
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {group.gifts.map((gift) => (
          <li key={gift.id}>
            <GiftCard gift={gift} onChoose={onChoose} />
          </li>
        ))}
      </ul>
    </section>
  )
}
