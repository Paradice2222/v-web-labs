// src/entities/product/ui/ProductCard.tsx
import { type TProduct } from '@/shared/config/data'
import { type ReactNode } from 'react'

type Props = {
  product: TProduct
  featureSlots?: {
    toggleLike?: ReactNode
    addToCart?: ReactNode
  }
}

export function ProductCard({ product, featureSlots }: Props) {
  const { title, price, oldPrice, image } = product

  return (
    <article className="relative bg-white border border-gray-200 rounded-xl p-5 shadow-md flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Лайк */}
      {featureSlots?.toggleLike}

      <img src={image} alt={title} className="max-w-full h-36 object-contain rounded-lg mb-4" />

      <div className="flex items-center justify-center gap-2 my-2 flex-wrap">
        {oldPrice && <span className="text-gray-400 text-sm line-through">{oldPrice} ₽</span>}
        <span className="font-semibold text-lg text-green-600">{price} ₽</span>
      </div>

      <p className="text-base font-medium text-gray-700 w-full">{title}</p>

      <div className="mt-auto pt-4 w-full">
        {featureSlots?.addToCart}
      </div>
    </article>
  )
}