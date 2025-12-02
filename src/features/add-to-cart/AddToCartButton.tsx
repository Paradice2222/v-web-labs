// src/features/add-to-cart/AddToCartButton.tsx
import { useProductStore } from '@/entities/product/model/useProductStore'
import { type TProduct } from '@/shared/config/data'

type Props = {
  productId: number
}

export function AddToCartButton({ productId }: Props) {
  const { cartItems, addToCart, removeFromCart } = useProductStore()

  const isInCart = cartItems.some(item => item.id === productId)

  const handleClick = () => {
    isInCart ? removeFromCart(productId) : addToCart({ id: productId } as TProduct)
  }

  const buttonClass = `w-full text-white border-none py-2 px-5 rounded-full cursor-pointer transition-colors duration-300 
    ${isInCart ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`

  return (
    <button onClick={handleClick} className={buttonClass}>
      {isInCart ? 'Убрать из корзины' : 'В корзину'}
    </button>
  )
}