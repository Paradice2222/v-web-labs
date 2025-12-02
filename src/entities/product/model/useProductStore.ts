// src/entities/product/model/useProductStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TProduct } from '@/shared/config/data'

type Store = {
  cartItems: TProduct[]
  likedItems: number[]
  searchQuery: string
  addToCart: (product: TProduct) => void
  removeFromCart: (id: number) => void
  toggleLike: (id: number) => void
  setSearchQuery: (query: string) => void
}

export const useProductStore = create<Store>()(
  persist(
    (set) => ({
      cartItems: [],
      likedItems: [],
      searchQuery: '',
      addToCart: (product) => set((state) => ({ cartItems: [...state.cartItems, product] })),
      removeFromCart: (id) => set((state) => ({ cartItems: state.cartItems.filter(i => i.id !== id) })),
      toggleLike: (id) => set((state) => ({
        likedItems: state.likedItems.includes(id)
          ? state.likedItems.filter(i => i !== id)
          : [...state.likedItems, id]
      })),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    { name: 'shop-storage' }
  )
)