import { PRODUCT_IDS, type ProductId } from '../constants/products'
import analyticsData from '../data/analyticsData.json'

export interface AnalyticsDataPoint {
  date: string
  activeUsers: number
  avgScreenTimeMin: number
  screenViews: number
}

export interface AnalyticsSummary {
  activeUsers: number
  activeUsersVariation: number
  avgScreenTimeMin: number
  avgScreenTimeVariation: number
  screenViews: number
  screenViewsVariation: number
}

export interface NewVsReturningPoint {
  date: string
  newUsers: number
  returningUsers: number
}

interface RawDataPoint {
  date: string
  activeUsers: number
  avgScreenTimeMin: number
  screenViews: number
  newUsers: number
}

const RAW_PRODUCTS = analyticsData.products as Record<ProductId, RawDataPoint[]>

const DAYS_BY_PERIOD: Record<string, number> = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
  '1y': 365,
}

const formatDate = (isoDate: string): string => {
  const [, month, day] = isoDate.split('-')
  return `${day}/${month}` // dd/mm
}

const getLastNDays = (points: RawDataPoint[], days: number): AnalyticsDataPoint[] => {
  const slice = points.slice(-days)
  return slice.map((point) => ({
    date: formatDate(point.date),
    activeUsers: point.activeUsers,
    avgScreenTimeMin: point.avgScreenTimeMin,
    screenViews: point.screenViews,
  }))
}

const generateAllProductsSeries = (days: number): AnalyticsDataPoint[] => {
  const perProduct = PRODUCT_IDS.map((id) => RAW_PRODUCTS[id].slice(-days))
  const length = perProduct[0]?.length ?? 0
  const merged: AnalyticsDataPoint[] = []

  for (let idx = 0; idx < length; idx++) {
    const activeUsers = perProduct.reduce((sum, series) => sum + series[idx].activeUsers, 0)
    const screenViews = perProduct.reduce((sum, series) => sum + series[idx].screenViews, 0)
    const avgScreenTimeMin = Number(
      (perProduct.reduce((sum, series) => sum + series[idx].avgScreenTimeMin, 0) / perProduct.length).toFixed(1)
    )

    merged.push({
      date: formatDate(perProduct[0][idx].date),
      activeUsers,
      avgScreenTimeMin,
      screenViews,
    })
  }

  return merged
}

export const getAnalyticsSeries = (product: string, period: string): AnalyticsDataPoint[] => {
  const days = DAYS_BY_PERIOD[period] ?? 30

  if (product === 'all') {
    return generateAllProductsSeries(days)
  }

  return getLastNDays(RAW_PRODUCTS[product as ProductId], days)
}

export const getAnalyticsSummary = (product: string, period: string): AnalyticsSummary => {
  const series = getAnalyticsSeries(product, period)
  const half = Math.max(1, Math.floor(series.length / 2))
  const recent = series.slice(half)
  const previous = series.slice(0, half)

  const sum = (arr: AnalyticsDataPoint[], key: keyof AnalyticsDataPoint) =>
    arr.reduce((acc, item) => acc + (item[key] as number), 0)

  const avg = (arr: AnalyticsDataPoint[], key: keyof AnalyticsDataPoint) =>
    arr.length ? sum(arr, key) / arr.length : 0

  const variation = (current: number, prev: number) =>
    prev === 0 ? 0 : Number((((current - prev) / prev) * 100).toFixed(1))

  const activeUsers = Math.round(avg(recent, 'activeUsers'))
  const activeUsersPrev = Math.round(avg(previous, 'activeUsers'))

  const avgScreenTimeMin = Number(avg(recent, 'avgScreenTimeMin').toFixed(1))
  const avgScreenTimePrev = Number(avg(previous, 'avgScreenTimeMin').toFixed(1))

  const screenViews = Math.round(sum(recent, 'screenViews'))
  const screenViewsPrev = Math.round(sum(previous, 'screenViews'))

  return {
    activeUsers,
    activeUsersVariation: variation(activeUsers, activeUsersPrev),
    avgScreenTimeMin,
    avgScreenTimeVariation: variation(avgScreenTimeMin, avgScreenTimePrev),
    screenViews,
    screenViewsVariation: variation(screenViews, screenViewsPrev),
  }
}

export const getNewVsReturningSeries = (product: string, period: string): NewVsReturningPoint[] => {
  const days = DAYS_BY_PERIOD[period] ?? 30

  const buildSeries = (points: RawDataPoint[]): NewVsReturningPoint[] =>
    points.slice(-days).map((point) => ({
      date: formatDate(point.date),
      newUsers: point.newUsers,
      returningUsers: Math.max(0, point.activeUsers - point.newUsers),
    }))

  if (product === 'all') {
    const perProduct = PRODUCT_IDS.map((id) => RAW_PRODUCTS[id].slice(-days))
    const length = perProduct[0]?.length ?? 0
    const merged: NewVsReturningPoint[] = []

    for (let idx = 0; idx < length; idx++) {
      const newUsers = perProduct.reduce((sum, series) => sum + series[idx].newUsers, 0)
      const activeUsers = perProduct.reduce((sum, series) => sum + series[idx].activeUsers, 0)

      merged.push({
        date: formatDate(perProduct[0][idx].date),
        newUsers,
        returningUsers: Math.max(0, activeUsers - newUsers),
      })
    }

    return merged
  }

  return buildSeries(RAW_PRODUCTS[product as ProductId])
}

export interface ProductBreakdown {
  product: string
  activeUsers: number
  screenViews: number
}

const PRODUCT_LABELS: Record<ProductId, string> = {
  'bank-manager': 'BankManager',
  'painel-fornecedor': 'Painel Fornecedor',
  'luna-pay': 'LunaPay',
}

export const getProductBreakdown = (period: string): ProductBreakdown[] => {
  const days = DAYS_BY_PERIOD[period] ?? 30

  return PRODUCT_IDS.map((id) => {
    const series = getLastNDays(RAW_PRODUCTS[id], days)
    return {
      product: PRODUCT_LABELS[id],
      activeUsers: Math.round(series.reduce((sum, item) => sum + item.activeUsers, 0) / series.length),
      screenViews: series.reduce((sum, item) => sum + item.screenViews, 0),
    }
  })
}
