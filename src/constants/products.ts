export interface ProductOption {
  value: string
  label: string
}

export const PRODUCTS: ProductOption[] = [
  { value: 'all', label: 'Todos' },
  { value: 'bank-manager', label: 'BankManager' },
  { value: 'painel-fornecedor', label: 'Painel Fornecedor' },
  { value: 'luna-pay', label: 'LunaPay' },
]

export type ProductId = 'bank-manager' | 'painel-fornecedor' | 'luna-pay'

export const PRODUCT_IDS: ProductId[] = ['bank-manager', 'painel-fornecedor', 'luna-pay']

export interface PeriodOption {
  value: string
  label: string
  days: number
}

export const PERIODS: PeriodOption[] = [
  { value: '7d', label: 'Últimos 7 dias', days: 7 },
  { value: '30d', label: 'Últimos 30 dias', days: 30 },
  { value: '90d', label: 'Últimos 90 dias', days: 90 },
  { value: '1y', label: 'Último ano', days: 365 },
]
