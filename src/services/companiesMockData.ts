import companiesData from '../data/companiesData.json'
import type { ProductId } from '../constants/products'

export type CompanyStatus = 'active' | 'inactive'

export interface Company {
  id: string
  name: string
  segment: string
  product: ProductId
  status: CompanyStatus
  activeUsers: number
  avgScreenTimeMin: number
  healthScore: number
  lastActivity: string
}

const PRODUCT_LABELS: Record<ProductId, string> = {
  'bank-manager': 'BankManager',
  'painel-fornecedor': 'Painel Fornecedor',
  'luna-pay': 'LunaPay',
}

const ALL_COMPANIES = companiesData.companies as Company[]

export const getProductLabel = (productId: string): string =>
  PRODUCT_LABELS[productId as ProductId] ?? productId

export interface GetCompaniesOptions {
  product?: string
  onlyActive?: boolean
  search?: string
}

export const getCompanies = (options: GetCompaniesOptions = {}): Company[] => {
  const { product = 'all', onlyActive = false, search = '' } = options

  return ALL_COMPANIES.filter((company) => {
    if (product !== 'all' && company.product !== product) return false
    if (onlyActive && company.status !== 'active') return false
    if (search.trim().length > 0) {
      const query = search.trim().toLowerCase()
      if (!company.name.toLowerCase().includes(query) && !company.segment.toLowerCase().includes(query)) {
        return false
      }
    }
    return true
  })
}

export interface CompaniesSummary {
  total: number
  active: number
  inactive: number
}

export const getCompaniesSummary = (product = 'all'): CompaniesSummary => {
  const scoped = product === 'all' ? ALL_COMPANIES : ALL_COMPANIES.filter((c) => c.product === product)
  const active = scoped.filter((c) => c.status === 'active').length

  return {
    total: scoped.length,
    active,
    inactive: scoped.length - active,
  }
}
