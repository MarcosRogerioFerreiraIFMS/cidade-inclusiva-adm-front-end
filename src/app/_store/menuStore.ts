import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface MenuState {
  showMenu: boolean
  toggleMenu: () => void
}

/**
 * Zustand store para gerenciar o estado do menu lateral (visível ou oculto).
 */
export const useMenuStore = create(
  persist<MenuState>(
    (set) => ({
      showMenu: true,
      toggleMenu: () => set((state) => ({ showMenu: !state.showMenu }))
    }),
    { name: 'menu-storage' }
  )
)
