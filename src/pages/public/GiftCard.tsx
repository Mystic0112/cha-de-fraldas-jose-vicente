import type { Gift } from '../../lib/types'

interface GiftCardProps {
  gift: Gift
  onChoose: (gift: Gift) => void
}

function remainingLabel(n: number): string {
  return n === 1 ? 'Resta 1 unidade' : `Restam ${n} unidades`
}

export function GiftCard({ gift, onChoose }: GiftCardProps) {
  const isPix = gift.category === 'Presente em PIX' || gift.title.toLowerCase().includes('pix')

  return (
    <article className="card group flex h-full flex-col justify-between gap-4 p-4.5 sm:flex-row sm:items-center sm:gap-3 hover:border-blue-300 dark:hover:border-sky-500/50 hover:shadow-md transition-all">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          {isPix && (
            <span className="inline-flex items-center rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-900 dark:bg-amber-950/70 dark:text-amber-300">
              PIX
            </span>
          )}
        </div>
        <h4 className="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-900 dark:group-hover:text-sky-300 transition-colors leading-snug">
          {gift.title}
        </h4>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {isPix ? (
            <span className="font-medium text-amber-700 dark:text-amber-400">
              Valor livre · Quantidade ilimitada
            </span>
          ) : (
            <>
              <span className="font-bold text-blue-900 dark:text-sky-300">
                {remainingLabel(gift.available_quantity)}
              </span>{' '}
              <span className="text-slate-400 dark:text-slate-500">de {gift.total_quantity}</span>
            </>
          )}
        </p>
      </div>

      <button
        type="button"
        className={isPix ? 'btn-gold shrink-0 cursor-pointer' : 'btn-primary shrink-0 cursor-pointer'}
        onClick={() => onChoose(gift)}
        aria-label={`Escolher presente: ${gift.title}`}
      >
        {isPix ? (
          <>
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>Presentear</span>
          </>
        ) : (
          'Escolher'
        )}
      </button>
    </article>
  )
}
