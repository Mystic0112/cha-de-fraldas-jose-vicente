import QRCode from 'qrcode'

export interface PixConfig {
  key: string
  keyType: 'Aleatória' | 'CPF' | 'CNPJ' | 'Celular' | 'E-mail'
  receiverName: string
  receiverCity: string
  description: string
  defaultPayload?: string
}

export const pixConfig: PixConfig = {
  // Chave PIX do Felipe. Pode ser sobrescrita via VITE_PIX_KEY no .env
  key: import.meta.env.VITE_PIX_KEY || 'felipe.presentes@pix.com',
  keyType: (import.meta.env.VITE_PIX_KEY_TYPE as PixConfig['keyType']) || 'E-mail',
  receiverName: import.meta.env.VITE_PIX_RECEIVER || 'Felipe',
  receiverCity: import.meta.env.VITE_PIX_CITY || 'SAO PAULO',
  description: 'Mimo Jose Vicente',
}

/**
 * Normaliza strings para o padrão EMVCo (sem acentos e caracteres especiais)
 */
function cleanEmvString(text: string, maxLength: number): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .trim()
    .slice(0, maxLength)
}

/**
 * Formata um campo no padrão TLV (Tag-Length-Value) do padrão BR Code
 */
function formatTlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, '0')
  return `${id}${len}${value}`
}

/**
 * Calcula o CRC16 (polinômio 0x1021) padrão do Banco Central para o BR Code
 */
function computeCrc16(payload: string): string {
  let crc = 0xffff
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff
      } else {
        crc = (crc << 1) & 0xffff
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0')
}

/**
 * Gera o código PIX Copia e Cola válido no padrão BR Code / Banco Central do Brasil
 */
export function generatePixPayload(config: PixConfig = pixConfig, amount?: number): string {
  const gui = formatTlv('00', 'br.gov.bcb.pix')
  const key = formatTlv('01', config.key)
  const descriptionTlv = config.description
    ? formatTlv('02', cleanEmvString(config.description, 40))
    : ''
  const merchantAccount = formatTlv('26', `${gui}${key}${descriptionTlv}`)

  const merchantCategory = formatTlv('52', '0000')
  const currency = formatTlv('53', '986') // BRL
  const transactionAmount = amount && amount > 0
    ? formatTlv('54', amount.toFixed(2))
    : ''
  const countryCode = formatTlv('58', 'BR')
  const merchantName = formatTlv('59', cleanEmvString(config.receiverName, 25))
  const merchantCity = formatTlv('60', cleanEmvString(config.receiverCity, 15))
  const additionalData = formatTlv('62', formatTlv('05', 'JOSEVICENTE'))

  const rawPayload =
    formatTlv('00', '01') +
    formatTlv('01', '12') + // 12 = QR dinâmico / estático
    merchantAccount +
    merchantCategory +
    currency +
    transactionAmount +
    countryCode +
    merchantName +
    merchantCity +
    additionalData +
    '6304'

  const crc = computeCrc16(rawPayload)
  return `${rawPayload}${crc}`
}

/**
 * Gera um Data URL (imagem base64 PNG) do QR Code PIX
 */
export async function generateQrCodeDataUrl(payload: string): Promise<string> {
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 320,
    color: {
      dark: '#0c1e40', // Azul marinho náutico elegante
      light: '#ffffff',
    },
  })
}
