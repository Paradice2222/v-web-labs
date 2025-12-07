import { createContext, useContext, useState, type ReactNode } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TProduct } from '@/shared/config/data'

// Тип элемента корзины
export type CartItem = {
  product: TProduct
  count: number
  isSelected: boolean
}

// Тип состояния
type ProductState = {
  cartItems: CartItem[]
  likedItems: number[]
  searchQuery: string
  
  // Действия
  addToCart: (product: TProduct) => void
  removeFromCart: (id: number) => void
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
  toggleSelection: (id: number) => void
  toggleSelectAll: (isSelected: boolean) => void
  deleteSelected: () => void

  toggleLike: (id: number) => void
  setSearchQuery: (query: string) => void
}

// 1. Фабрика стора
const createProductStore = (initialState: Partial<ProductState> = {}) => {
  return createStore<ProductState>()(
    persist(
      (set, get) => ({
        cartItems: [],
        likedItems: [],
        searchQuery: '',
        ...initialState,

        addToCart: (product) => {
          const { cartItems } = get()
          const exists = cartItems.find(item => item.product.id === product.id)
          
          if (exists) {
            set({
              cartItems: cartItems.map(item => 
                item.product.id === product.id 
                  ? { ...item, count: item.count + 1 } 
                  : item
              )
            })
          } else {
            set({ cartItems: [...cartItems, { product, count: 1, isSelected: true }] })
          }
        },
        
        removeFromCart: (id) => set((state) => ({ 
          cartItems: state.cartItems.filter(i => i.product.id !== id) 
        })),

        increaseQty: (id) => set((state) => ({
          cartItems: state.cartItems.map(item => 
            item.product.id === id ? { ...item, count: item.count + 1 } : item
          )
        })),

        decreaseQty: (id) => set((state) => ({
          cartItems: state.cartItems.map(item => 
            item.product.id === id && item.count > 1 
              ? { ...item, count: item.count - 1 } 
              : item
          )
        })),

        toggleSelection: (id) => set((state) => ({
          cartItems: state.cartItems.map(item => 
            item.product.id === id ? { ...item, isSelected: !item.isSelected } : item
          )
        })),

        toggleSelectAll: (val) => set((state) => ({
          cartItems: state.cartItems.map(item => ({ ...item, isSelected: val }))
        })),

        deleteSelected: () => set((state) => ({
            cartItems: state.cartItems.filter(item => !item.isSelected)
        })),
        
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
}

// 2. Создание контекста
const ProductStoreContext = createContext<ReturnType<typeof createProductStore> | null>(null)

// 3. Провайдер
export const ProductStoreProvider = ({ children, initialState }: { children: ReactNode, initialState?: Partial<ProductState> }) => {
  const [store] = useState(() => createProductStore(initialState))
  return <ProductStoreContext.Provider value={store}>{children}</ProductStoreContext.Provider>
}

// 4. Хук
export function useProductStore<T>(selector: (state: ProductState) => T): T {
  const store = useContext(ProductStoreContext)
  if (!store) throw new Error('useProductStore must be used within a ProductStoreProvider')
  return useZustandStore(store, selector)
}