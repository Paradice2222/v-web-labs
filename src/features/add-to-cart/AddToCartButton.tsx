import { useProductStore } from '@/entities/product/model/useProductStore'
import { products } from '@/shared/config/data' // <--- ВАЖНО: Импортируем базу товаров

type Props = {
  productId: number
}

export function AddToCartButton({ productId }: Props) {
  const cartItems = useProductStore((state) => state.cartItems)
  const addToCart = useProductStore((state) => state.addToCart)
  
  // Проверяем наличие (учитываем вложенность product.id)
  const isInCart = cartItems.some(item => item.product.id === productId)

  const handleClick = () => {
    // 1. Ищем НАСТОЯЩИЙ товар со всеми данными (ценой, картинкой)
    const product = products.find(p => p.id === productId)

    // 2. Если товар найден — добавляем его целиком
    if (product) {
        addToCart(product)
    }
  }

  const buttonClass = `w-full text-white border-none py-2 px-5 rounded-full cursor-pointer transition-colors duration-300 font-medium
    ${isInCart ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`

  return (
    <button onClick={handleClick} className={buttonClass}>
      {isInCart ? 'Добавить ещё' : 'В корзину'}
    </button>
  )
}