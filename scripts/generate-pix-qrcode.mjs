import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const publicDir = path.resolve(rootDir, 'public')

// Normalização para o padrão EMVCo
function cleanEmvString(text, maxLength) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9 ]/g, '')
    .trim()
    .slice(0, maxLength)
}

function formatTlv(id, value) {
  const len = value.length.toString().padStart(2, '0')
  return `${id}${len}${value}`
}

function computeCrc16(payload) {
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

function buildPixPayload() {
  const key = '+5586988591158'
  const receiverName = 'Felipe'
  const receiverCity = 'TERESINA'
  const description = 'Mimo Jose Vicente'

  const gui = formatTlv('00', 'br.gov.bcb.pix')
  const keyTlv = formatTlv('01', key)
  const descTlv = formatTlv('02', cleanEmvString(description, 40))
  const merchantAccount = formatTlv('26', `${gui}${keyTlv}${descTlv}`)

  const merchantCategory = formatTlv('52', '0000')
  const currency = formatTlv('53', '986')
  const countryCode = formatTlv('58', 'BR')
  const nameTlv = formatTlv('59', cleanEmvString(receiverName, 25))
  const cityTlv = formatTlv('60', cleanEmvString(receiverCity, 15))
  const additionalData = formatTlv('62', formatTlv('05', 'JOSEVICENTE'))

  const raw =
    formatTlv('00', '01') +
    formatTlv('01', '11') +
    merchantAccount +
    merchantCategory +
    currency +
    countryCode +
    nameTlv +
    cityTlv +
    additionalData +
    '6304'

  const crc = computeCrc16(raw)
  return `${raw}${crc}`
}

async function main() {
  const payload = buildPixPayload()
  console.log('[qrcode-compiler] Gerando QR Code PIX BR Code oficial...')
  console.log(`[qrcode-compiler] Payload: ${payload}`)

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const pngPath = path.resolve(publicDir, 'pix-qrcode.png')
  const svgPath = path.resolve(publicDir, 'pix-qrcode.svg')

  // Compila PNG em alta resolução (800x800)
  await QRCode.toFile(pngPath, payload, {
    type: 'png',
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 800,
    color: {
      dark: '#0c1e40', // Azul marinho náutico elegante
      light: '#ffffff',
    },
  })
  console.log(`[qrcode-compiler] PNG gerado com sucesso em: ${pngPath}`)

  // Compila SVG vetorial
  const svgContent = await QRCode.toString(payload, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: {
      dark: '#0c1e40',
      light: '#ffffff',
    },
  })
  fs.writeFileSync(svgPath, svgContent, 'utf8')
  console.log(`[qrcode-compiler] SVG gerado com sucesso em: ${svgPath}`)

  console.log('[qrcode-compiler] Compilação de QR Code 100% open-source concluída!')
}

main().catch((err) => {
  console.error('[qrcode-compiler] Falha ao compilar QR Code:', err)
  process.exit(1)
})
