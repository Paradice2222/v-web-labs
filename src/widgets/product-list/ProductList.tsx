// src/widgets/product-list/ProductList.tsx
import {ProductCard} from '../../entities/product/ui/ProductCard'
import { AddToCartButton } from '../../features/add-to-cart/AddToCartButton'
import { ToggleLikeButton } from '../../features/toggle-like/ToggleLikeButton'
import {  type TProduct } from '../../shared/config/data'

type Props = {
  products: TProduct[]
}

export function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          featureSlots={{
            toggleLike: <ToggleLikeButton productId={product.id} />,
            addToCart: <AddToCartButton productId={product.id} />,
          }}
        />
      ))}
    </div>
  )
}