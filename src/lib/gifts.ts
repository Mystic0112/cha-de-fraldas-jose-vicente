import type { Gift, GiftGroup } from './types'

const CATEGORY_ORDER: Record<string, number> = {
  'Higiene e Cuidados': 10,
  'Alimentação e Amamentação': 20,
  'Banho e Saúde': 30,
  'Roupas e Enxoval': 40,
  'Estímulo e Diversão': 50,
  'Presente em PIX': 60,
}

const TITLE_STANDARDIZATIONS: Record<string, string> = {
  'Trocador Portátil Marca Buba': 'Trocador Portátil - Marca Buba',
  'Trocador Portátil Buba': 'Trocador Portátil - Marca Buba',
  'Mordedores Buba': 'Mordedores - Buba',
  'Livros Sensoriais Buba': 'Livros Sensoriais - Buba',
  'Babador de Silicone Buba': 'Babador de Silicone - Buba',
  'Kit de Limpeza de Mamadeira Buba': 'Kit de Limpeza de Mamadeira - Buba',
  'Kit Brinquedos de Banho Buba': 'Kit Brinquedos de Banho - Buba',
  'Kit Cuidados Buba': 'Kit Cuidados - Buba (Cortador, lixa, etc.)',
  'Kit Cuidados Buba (Cortador, lixa, etc.)': 'Kit Cuidados - Buba (Cortador, lixa, etc.)',
  'Kit Escova e Pente Buba ou similar': 'Kit Escova e Pente - Marca Buba ou similar',
}

export function standardizeGiftTitle(title: string): string {
  return TITLE_STANDARDIZATIONS[title] ?? title
}

export function normalizeGift(gift: Gift): Gift {
  const standardTitle = standardizeGiftTitle(gift.title)
  if (standardTitle === gift.title) return gift
  return { ...gift, title: standardTitle }
}

function getCategoryPriority(cat: string): number {
  return CATEGORY_ORDER[cat] ?? 100
}

export function sortGifts(gifts: Gift[]): Gift[] {
  return gifts.map(normalizeGift).sort(
    (a, b) => {
      const orderDiff = getCategoryPriority(a.category) - getCategoryPriority(b.category)
      if (orderDiff !== 0) return orderDiff
      return (
        a.category.localeCompare(b.category, 'pt-BR') ||
        a.sort_order - b.sort_order ||
        a.title.localeCompare(b.title, 'pt-BR')
      )
    },
  )
}

export function groupByCategory(gifts: Gift[]): GiftGroup[] {
  const groups = new Map<string, Gift[]>()
  for (const gift of sortGifts(gifts)) {
    const list = groups.get(gift.category) ?? []
    list.push(gift)
    groups.set(gift.category, list)
  }
  return Array.from(groups, ([category, items]) => ({ category, gifts: items }))
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(
    new Date(iso),
  )
}
