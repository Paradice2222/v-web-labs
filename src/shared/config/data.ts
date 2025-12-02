// src/shared/config/data.ts
export type TProduct = {
  id: number
  title: string
  price: number
  oldPrice?: number
  category: 'hoodies' | 'shorts'
  image: string
}

export const products: TProduct[] = [
  { id: 1, title: 'Худи с принтом (скидка)', price: 999, oldPrice: 1199, category: 'hoodies', image: '/assets/product.svg' },
  { id: 2, title: 'Худи с принтом', price: 1199, category: 'hoodies', image: '/assets/product.svg' },
  { id: 3, title: 'Худи с принтом', price: 1199, category: 'hoodies', image: '/assets/product.svg' },
  { id: 4, title: 'Худи с принтом', price: 1199, category: 'hoodies', image: '/assets/product.svg' },
  { id: 5, title: 'Худи с принтом', price: 1199, category: 'hoodies', image: '/assets/product.svg' },
  { id: 6, title: 'Худи с принтом', price: 1199, category: 'hoodies', image: '/assets/product.svg' },
  { id: 7, title: 'Широкие шорты (скидка)', price: 999, oldPrice: 1199, category: 'shorts', image: '/assets/product.svg' },
  { id: 8, title: 'Широкие шорты', price: 1199, category: 'shorts', image: '/assets/product.svg' },
  { id: 9, title: 'Широкие шорты', price: 1199, category: 'shorts', image: '/assets/product.svg' },
  { id: 10, title: 'Широкие шорты', price: 1199, category: 'shorts', image: '/assets/product.svg' },
  { id: 11, title: 'Широкие шорты', price: 1199, category: 'shorts', image: '/assets/product.svg' },
  { id: 12, title: 'Широкие шорты', price: 1199, category: 'shorts', image: '/assets/product.svg' },
]