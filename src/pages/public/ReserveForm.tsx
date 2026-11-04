import { useId, useState, type FormEvent } from 'react'

export interface ReserveFormValues {
  name: string
  phone: string
  message: string
}

interface ReserveFormProps {
  sending: boolean
  error: string | null
  isPix?: boolean
  onSubmit: (values: ReserveFormValues) => void
  onCancel: () => void
}

export function ReserveForm({ sending, error, isPix = false, onSubmit, onCancel }: ReserveFormProps) {
  const id = useId()
  const [values, setValues] = useState<ReserveFormValues>({ name: '', phone: '', message: '' })
  const [nameError, setNameError] = useState<string | null>(null)

  const update = (field: keyof ReserveFormValues) => (value: string) =>
    setValues((v) => ({ ...v, [field]: value }))

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const name = values.name.trim()
    if (!name) {
      setNameError('Por favor, informe seu nome.')
      document.getElementById(`${id}-name`)?.focus()
      return
    }
    setNameError(null)
    onSubmit({ name, phone: values.phone.trim(), message: values.message.trim() })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {isPix && (
        <div className="rounded-xl bg-amber-50 border border-amber-200/80 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:border-amber-800/60 dark:text-amber-200">
          Informe seu nome para que a família do José Vicente saiba quem enviou o carinho. Em seguida você verá a chave e o QR Code.
        </div>
      )}

      <div>
        <label htmlFor={`${id}-name`} className="field-label">
          Seu nome <span className="text-rose-600" aria-hidden="true">*</span>
        </label>
        <input
          id={`${id}-name`}
          className="field-input"
          value={values.name}
          onChange={(e) => update('name')(e.target.value)}
          maxLength={100}
          autoComplete="name"
          placeholder="Como gostaria de ser identificado(a)"
          required
          aria-required="true"
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? `${id}-name-err` : undefined}
        />
        {nameError && (
          <p id={`${id}-name-err`} className="mt-1 text-sm text-rose-700 dark:text-rose-400">
            {nameError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-phone`} className="field-label">
          Telefone / WhatsApp <span className="font-normal text-slate-400">(opcional)</span>
        </label>
        <input
          id={`${id}-phone`}
          type="tel"
          inputMode="tel"
          placeholder="(DDD) 99999-9999"
          className="field-input"
          value={values.phone}
          onChange={(e) => update('phone')(e.target.value)}
          maxLength={30}
          autoComplete="tel"
        />
      </div>

      <div>
        <label htmlFor={`${id}-msg`} className="field-label">
          Recado para o José Vicente e família <span className="font-normal text-slate-400">(opcional)</span>
        </label>
        <textarea
          id={`${id}-msg`}
          placeholder="Deixe uma mensagem de carinho e bênçãos para a chegada do nosso pequeno marinheiro..."
          className="field-input min-h-24 resize-y"
          value={values.message}
          onChange={(e) => update('message')(e.target.value)}
          maxLength={500}
          aria-describedby={`${id}-msg-count`}
        />
        <p id={`${id}-msg-count`} className="mt-1 text-right text-xs text-slate-400">
          {values.message.length}/500
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-rose-950/60 border border-rose-800/80 p-3 text-sm text-rose-300">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end pt-2">
        <button type="button" className="btn-ghost" onClick={onCancel} disabled={sending}>
          Cancelar
        </button>
        <button
          type="submit"
          className={isPix ? 'btn-gold' : 'btn-primary'}
          disabled={sending}
        >
          {sending
            ? 'Salvando...'
            : isPix
              ? 'Ver dados do PIX'
              : 'Confirmar presente'}
        </button>
      </div>
    </form>
  )
}
