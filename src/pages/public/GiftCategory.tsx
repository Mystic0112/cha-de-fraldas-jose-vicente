import { useState } from 'react'
import type { Gift, GiftGroup } from '../../lib/types'
import { GiftCard } from './GiftCard'

interface GiftCategoryProps {
  group: GiftGroup
  onChoose: (gift: Gift) => void
  isOpen?: boolean
  onToggle?: () => void
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
      <circle cx="12" cy="2" r="2" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
    </svg>
  )
}

export function GiftCategory({
  group,
  onChoose,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}: GiftCategoryProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true)
  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  function handleToggle() {
    if (isControlled && controlledOnToggle) {
      controlledOnToggle()
    } else {
      setInternalIsOpen((prev) => !prev)
    }
  }

  const categorySlug = group.category.replace(/\W+/g, '-').toLowerCase()
  const headingId = `cat-heading-${categorySlug}`
  const buttonId = `cat-btn-${categorySlug}`
  const contentId = `cat-content-${categorySlug}`

  const count = group.gifts.length
  const countLabel = count === 1 ? '1 item disponível' : `${count} itens disponíveis`

  return (
    <section aria-labelledby={headingId} className="scroll-mt-6">
      <div className="mb-2">
        <h3 id={headingId}>
          <button
            id={buttonId}
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls={contentId}
            className="w-full group flex items-center justify-between gap-3 px-3 py-2.5 -mx-1 rounded-2xl text-left transition-all duration-200 hover:bg-sky-100/60 dark:hover:bg-slate-800/60 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:focus-visible:ring-sky-400 cursor-pointer select-none"
          >
            <div className="flex flex-1 items-center gap-3 min-w-0">
              <div
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100/80 border border-blue-200/70 dark:bg-slate-800 dark:border-slate-700 shadow-2xs text-blue-900 dark:text-sky-400 group-hover:scale-105 transition-transform"
              >
                <CategoryIcon category={group.category} />
              </div>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 min-w-0">
                <span className="text-lg sm:text-2xl font-bold tracking-wide text-blue-950 dark:text-white font-nautical">
                  {group.category}
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-slate-800 text-blue-800 dark:text-sky-300 border border-blue-200/70 dark:border-slate-700 px-2.5 py-0.5 text-xs font-sans font-medium whitespace-nowrap">
                  {countLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100/60 border border-blue-200/60 text-blue-900 dark:bg-slate-800 dark:border-slate-700 dark:text-sky-300 transition-colors shadow-2xs group-hover:bg-blue-200/70 dark:group-hover:bg-slate-700"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </button>
        </h3>
      </div>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        className={isOpen ? 'block pt-1' : 'hidden'}
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {group.gifts.map((gift) => (
            <li key={gift.id}>
              <GiftCard gift={gift} onChoose={onChoose} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
