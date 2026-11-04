import type { Gift, GiftGroup } from './types'

const CATEGORY_ORDER: Record<string, number> = {
  'Higiene e Cuidados': 10,
  'Alimentação e Amamentação': 20,
  'Banho e Saúde': 30,
  'Roupas e Enxoval': 40,
  'Estímulo e Diversão': 50,
  'Presente em PIX': 60,
}

function getCategoryPriority(cat: string): number {
  return CATEGORY_ORDER[cat] ?? 100
}

export function sortGifts(gifts: Gift[]): Gift[] {
  return [...gifts].sort(
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
