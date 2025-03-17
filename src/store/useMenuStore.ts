import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MenuState {
  showMenu: boolean
  toggleMenu: () => void
}

export const useMenuStore = create(
  persist<MenuState>(
    (set) => ({
      showMenu: true,
      toggleMenu: () => set((state) => ({ showMenu: !state.showMenu }))
    }),
    { name: 'menu-storage' }
  )
)
