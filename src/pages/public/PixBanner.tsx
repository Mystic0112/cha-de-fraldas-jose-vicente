interface PixBannerProps {
  onChoosePix: () => void
}

export function PixBanner({ onChoosePix }: PixBannerProps) {
  return (
    <section
      aria-label="Presente em PIX"
      className="card-nautical mb-8 relative overflow-hidden p-5 sm:p-6 border-2 border-amber-400/60 dark:border-amber-500/40 shadow-md transition-all hover:border-amber-400"
    >
      {/* Detalhe náutico sutil de fundo */}
      <div
        aria-hidden="true"
        className="absolute -right-8 -bottom-8 w-36 h-36 opacity-10 dark:opacity-5 pointer-events-none text-blue-900 dark:text-amber-400"
      >
        <svg viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="6" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="6" />
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
        <div className="flex items-start sm:items-center gap-4 text-left">
          {/* Ícone Náutico / PIX Dourado */}
          <div
            aria-hidden="true"
            className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm ring-4 ring-amber-100 dark:ring-amber-500/20"
          >
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M6 12h.01M18 12h.01" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950/70 dark:text-amber-300">
                Opção Prática
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Qualquer valor</span>
            </div>
            <h3 className="mt-1 text-xl font-black text-blue-950 dark:text-white font-nautical">
              Mimo em PIX para o José Vicente
            </h3>
            <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-md">
              Mora longe ou prefere contribuir com qualquer quantia? Deixe seu recado e receba a chave e o QR Code.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onChoosePix}
          className="btn-gold w-full sm:w-auto shrink-0 text-base py-3 px-6 cursor-pointer"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          Presentear via PIX
        </button>
      </div>
    </section>
  )
}
