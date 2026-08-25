import { create } from 'zustand'

export type ViewId = 'dashboard' | 'companies'

interface NavigationState {
  view: ViewId
  setView: (view: ViewId) => void
}

export const useNavigationStore = create<NavigationState>((set) => ({
  view: 'dashboard',
  setView: (view) => set({ view }),
}))
