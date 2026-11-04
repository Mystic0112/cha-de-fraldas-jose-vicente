import { useEffect, useState } from 'react'
import { generatePixPayload, generateQrCodeDataUrl, pixConfig } from '../../config/pix'

interface PixPaymentDetailsProps {
  guestName: string
  onClose: () => void
}

export function PixPaymentDetails({ guestName, onClose }: PixPaymentDetailsProps) {
  const [copiedKey, setCopiedKey] = useState(false)
  const [copiedPayload, setCopiedPayload] = useState(false)

  // URL de fallback para a imagem compilada estaticamente no build
  const fallbackQrUrl = `${import.meta.env.BASE_URL}pix-qrcode.png`
  const [qrCodeUrl, setQrCodeUrl] = useState<string>(fallbackQrUrl)

  const payload = generatePixPayload(pixConfig)
  const keyToCopy = pixConfig.rawKey || pixConfig.key

  useEffect(() => {
    let active = true
    // Compilação client-side via biblioteca open-source qrcode
    generateQrCodeDataUrl(payload)
      .then((url) => {
        if (active) setQrCodeUrl(url)
      })
      .catch((err) => {
        console.warn('QR Code gerado com fallback da imagem local pré-compilada:', err)
      })
    return () => {
      active = false
    }
  }, [payload])

  async function handleCopyKey() {
    try {
      await navigator.clipboard.writeText(keyToCopy)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2500)
    } catch {
      const input = document.createElement('input')
      input.value = keyToCopy
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2500)
    }
  }

  async function handleCopyPayload() {
    try {
      await navigator.clipboard.writeText(payload)
      setCopiedPayload(true)
      setTimeout(() => setCopiedPayload(false), 2500)
    } catch {
      const input = document.createElement('textarea')
      input.value = payload
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopiedPayload(true)
      setTimeout(() => setCopiedPayload(false), 2500)
    }
  }

  return (
    <div className="space-y-5 text-center py-1">
      {/* Mensagem de confirmação de cadastro carinhosa */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200/80 p-3.5 dark:bg-amber-950/40 dark:border-amber-800/60 text-slate-800 dark:text-slate-100">
        <p className="text-sm">
          Que alegria, <strong className="text-amber-800 dark:text-amber-300">{guestName}</strong>! Seu recado carinhoso já foi guardado com muito amor para o José Vicente e a família.
        </p>
      </div>

      {/* QR Code compilado via open-source qrcode */}
      <div className="mx-auto w-fit p-3 bg-white rounded-2xl border-2 border-blue-900/20 shadow-md dark:border-slate-700">
        <img
          src={qrCodeUrl || fallbackQrUrl}
          onError={(e) => {
            if (e.currentTarget.src !== fallbackQrUrl) {
              e.currentTarget.src = fallbackQrUrl
            }
          }}
          alt="QR Code PIX para presente do José Vicente"
          className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-lg object-contain"
        />
        <p className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Aponte a câmera do aplicativo do seu banco
        </p>
      </div>

      {/* Dados do Recebedor para Conferência */}
      <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs text-slate-600 dark:bg-slate-900/60 dark:border-slate-800 dark:text-slate-300 text-left space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-500 dark:text-slate-400">Titular da conta:</span>
          <span className="font-bold text-slate-900 dark:text-white">{pixConfig.receiverName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-500 dark:text-slate-400">Cidade:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200">{pixConfig.receiverCity}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-500 dark:text-slate-400">Tipo de Chave:</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200">{pixConfig.keyType}</span>
        </div>
        <div className="flex justify-between items-center border-t border-slate-200/60 dark:border-slate-800 pt-1 mt-1">
          <span className="font-semibold text-slate-500 dark:text-slate-400">Chave PIX:</span>
          <span className="font-mono font-bold text-sm text-blue-900 dark:text-sky-300">
            {pixConfig.displayKey || pixConfig.key}
          </span>
        </div>
      </div>

      {/* Botões de Ação para Cópia */}
      <div className="grid gap-2.5 sm:grid-cols-2 pt-1">
        <button
          type="button"
          onClick={handleCopyKey}
          className="btn-ghost flex items-center justify-center gap-2 py-3 cursor-pointer text-sm font-bold"
          aria-label="Copiar chave PIX pronta para colar no banco"
        >
          {copiedKey ? (
            <>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Chave Copiada!</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-800 dark:text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copiar Chave PIX</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleCopyPayload}
          className="btn-gold flex items-center justify-center gap-2 py-3 cursor-pointer text-sm font-bold"
          aria-label="Copiar código PIX Copia e Cola completo"
        >
          {copiedPayload ? (
            <>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Código Copiado!</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              </svg>
              <span>Copiar Copia e Cola</span>
            </>
          )}
        </button>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onClose}
          className="btn-primary w-full py-3 text-base"
        >
          Concluir e voltar à lista
        </button>
      </div>
    </div>
  )
}
