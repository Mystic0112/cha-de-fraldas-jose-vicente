import type { Gift } from '../../lib/types'

interface SummaryProps {
  gifts: Gift[]
  reservationsCount: number
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card p-4.5 border-sky-100 dark:border-slate-800">
      <dt className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">{label}</dt>
      <dd className="mt-1.5 text-2xl font-black text-blue-950 dark:text-white">{value}</dd>
    </div>
  )
}

export function Summary({ gifts, reservationsCount }: SummaryProps) {
  // Separa itens físicos do item ilimitado de PIX para estatísticas realistas
  const physicalGifts = gifts.filter(
    (g) => g.category !== 'Presente em PIX' && !g.title.toLowerCase().includes('pix'),
  )

  const total = physicalGifts.reduce((sum, g) => sum + g.total_quantity, 0)
  const available = physicalGifts.reduce((sum, g) => sum + g.available_quantity, 0)
  const chosen = total - available
  const percent = total > 0 ? Math.round((chosen / total) * 100) : 0

  return (
    <section aria-labelledby="resumo-titulo">
      <h2 id="resumo-titulo" className="mb-3 text-lg font-bold text-blue-950 dark:text-white font-nautical">
        Resumo do Chá de Fraldas
      </h2>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Presentes físicos" value={total} />
        <Stat label="Itens escolhidos" value={chosen} />
        <Stat label="Ainda disponíveis" value={available} />
        <Stat label="Total de reservas" value={reservationsCount} />
      </dl>
      <div className="mt-4 card p-4 border-sky-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
          <span>Progresso de presentes físicos escolhidos</span>
          <span className="font-bold text-blue-900 dark:text-sky-300">{percent}%</span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-sky-100 dark:bg-slate-950 border border-sky-200 dark:border-slate-800"
          role="progressbar"
          aria-label="Progresso da lista"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-800 to-sky-500 dark:from-sky-500 dark:to-cyan-300 transition-all shadow-xs"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  )
}
