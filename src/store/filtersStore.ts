import { create } from 'zustand'

interface FiltersState {
  product: string
  period: string
  setProduct: (product: string) => void
  setPeriod: (period: string) => void
}

export const useFiltersStore = create<FiltersState>((set) => ({
  product: 'all',
  period: '30d',
  setProduct: (product) => set({ product }),
  setPeriod: (period) => set({ period }),
}))
