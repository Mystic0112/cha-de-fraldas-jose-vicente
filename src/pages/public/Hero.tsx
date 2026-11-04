export function Hero() {
  return (
    <header className="py-10 text-center sm:py-14 relative">
      {/* Decoração Náutica Superior: Timão & Âncora */}
      <div className="relative mx-auto mb-6 flex items-center justify-center">
        {/* Âncora Esquerda Decorativa */}
        <div aria-hidden="true" className="hidden sm:block absolute left-1/2 -translate-x-32 top-3 opacity-40 dark:opacity-30">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="5" r="3" />
            <line x1="12" y1="8" x2="12" y2="21" />
            <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
          </svg>
        </div>

        {/* Timão de Navio Central Náutico */}
        <div
          aria-hidden="true"
          className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-900 to-slate-900 border-2 border-amber-500/80 shadow-lg shadow-blue-950/20 ring-4 ring-sky-100 dark:ring-blue-900/40 transition-transform hover:rotate-45 duration-700"
        >
          {/* Timão em SVG detalhado */}
          <svg viewBox="0 0 100 100" className="h-16 w-16 text-amber-400" fill="currentColor">
            {/* Aro Externo */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="5" />
            {/* Aro Interno */}
            <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="3" />
            {/* Cubo Central */}
            <circle cx="50" cy="50" r="11" fill="currentColor" />
            <circle cx="50" cy="50" r="5" fill="#0c1e40" />
            {/* Raios do Timão */}
            <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="16" y1="16" x2="84" y2="84" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="16" y1="84" x2="84" y2="16" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
            {/* Puxadores do Timão */}
            <circle cx="50" cy="3" r="3" />
            <circle cx="50" cy="97" r="3" />
            <circle cx="3" cy="50" r="3" />
            <circle cx="97" cy="50" r="3" />
          </svg>
        </div>

        {/* Boia / Farol Direita Decorativa */}
        <div aria-hidden="true" className="hidden sm:block absolute right-1/2 translate-x-32 top-3 opacity-40 dark:opacity-30">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
