import { NauticalMotionScene } from '../../components/NauticalMotionScene'

export function Hero() {
  return (
    <header className="py-6 sm:py-10 text-center relative">
      {/* Cenário Náutico 3D Interativo com Three.js (Pequeno Marinheiro) */}
      <div className="relative mx-auto mb-6 flex items-center justify-center">
        {/* Âncora Esquerda Decorativa (Desktop) */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute -left-12 top-1/2 -translate-y-1/2 opacity-35 dark:opacity-25 pointer-events-none transition-transform hover:scale-110"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-amber-600 dark:text-amber-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="5" r="3" />
            <line x1="12" y1="8" x2="12" y2="21" />
            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
          </svg>
        </div>

        {/* Palco Náutico 3D com Three.js */}
        <div className="relative w-full max-w-xl h-56 sm:h-72 rounded-3xl overflow-hidden border border-sky-200/80 dark:border-blue-900/60 bg-gradient-to-b from-sky-100/50 via-sky-50/20 to-transparent dark:from-slate-900/90 dark:via-blue-950/40 dark:to-slate-950/40 shadow-lg shadow-blue-950/5 dark:shadow-blue-950/40 backdrop-blur-xs">
          <NauticalMotionScene className="w-full h-full" />

          {/* Selo Náutico Superior no Cenário */}
          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full px-3 py-1 bg-white/85 dark:bg-slate-900/85 border border-sky-200/70 dark:border-blue-800/70 text-blue-950 dark:text-sky-300 shadow-xs pointer-events-none backdrop-blur-xs">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" aria-hidden="true" />
            <span className="text-[11px] font-bold tracking-wider uppercase font-sans">
              Maré em Tempo Real
            </span>
          </div>

          {/* Dica de Navegação Náutica */}
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-white/80 dark:bg-slate-900/80 border border-sky-200/50 dark:border-blue-800/50 text-[10px] font-medium text-slate-500 dark:text-slate-400 pointer-events-none backdrop-blur-xs">
            <svg
              viewBox="0 0 24 24"
              className="w-3 h-3 text-amber-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
            <span>Mova o mouse ou toque para navegar</span>
          </div>
        </div>

        {/* Boia / Rosa dos Ventos Direita Decorativa (Desktop) */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 opacity-35 dark:opacity-25 pointer-events-none transition-transform hover:scale-110"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10 text-amber-600 dark:text-amber-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
          </svg>
        </div>
      </div>

      {/* Selo Náutico do Convite */}
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-900 dark:bg-blue-950/60 dark:border-blue-800/80 dark:text-sky-300 shadow-xs mb-3">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
        <span className="text-xs font-bold tracking-[0.2em] uppercase font-sans">
          Chá de Fraldas · Pequeno Marinheiro
        </span>
      </div>

      {/* Nome do Bebê com Fonte Náutica 'MedievalSharp' */}
      <h1 className="mt-1 text-5xl sm:text-6xl font-black tracking-wide text-blue-950 dark:text-white font-nautical">
        José Vicente
      </h1>

      {/* Frase Oficial do Convite */}
      <p className="mx-auto mt-4 max-w-xl text-lg sm:text-xl font-bold text-blue-900 dark:text-sky-300 leading-snug">
        Rumo à mais linda aventura: A chegada do nosso Pequeno Marinheiro!
      </p>

      {/* Subtexto Poético Oficial */}
      <p className="mx-auto mt-2 max-w-lg text-sm sm:text-base text-slate-600 dark:text-slate-300 italic font-medium leading-relaxed">
        Prepare o coração e venha navegar conosco por um mar de amor e alegria!
      </p>

      {/* Linha Divisória Náutica com Âncora Central */}
      <div className="flex items-center justify-center gap-3 my-6 max-w-xs mx-auto text-amber-500 dark:text-amber-400 opacity-80" aria-hidden="true">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-400" />
        <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" />
          <line x1="12" y1="8" x2="12" y2="21" />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-400" />
      </div>

      {/* Instruções para os Convidados */}
      <p className="mx-auto max-w-md text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        Escolha um presente da lista abaixo. Assim que você confirmar, ele é reservado no seu nome
        e sai da lista para os outros convidados.
      </p>
    </header>
  )
}
