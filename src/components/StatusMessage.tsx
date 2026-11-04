import type { ReactNode } from 'react'

interface StatusMessageProps {
  kind: 'loading' | 'error' | 'empty'
  children: ReactNode
  onRetry?: () => void
}

export function StatusMessage({ kind, children, onRetry }: StatusMessageProps) {
  return (
    <div
      className="card p-6 text-center"
      role={kind === 'error' ? 'alert' : 'status'}
      aria-live="polite"
    >
      <p className={kind === 'error' ? 'text-rose-600 dark:text-rose-400 font-medium' : 'text-slate-600 dark:text-slate-300 font-medium'}>{children}</p>
      {onRetry && (
        <button type="button" className="btn-ghost mt-4" onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  )
}
