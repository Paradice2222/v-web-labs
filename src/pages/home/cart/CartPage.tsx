import { useProductStore } from '@/entities/product/model/useProductStore'

export function CartPage() {
  const cartItems = useProductStore((state) => state.cartItems)
  const increaseQty = useProductStore((state) => state.increaseQty)
  const decreaseQty = useProductStore((state) => state.decreaseQty)
  const toggleSelection = useProductStore((state) => state.toggleSelection)
  const removeFromCart = useProductStore((state) => state.removeFromCart)
  const toggleSelectAll = useProductStore((state) => state.toggleSelectAll)
  const deleteSelected = useProductStore((state) => state.deleteSelected)

  const allSelected = cartItems.length > 0 && cartItems.every(i => i.isSelected)
  
  // Подсчет итогов
  const selectedItems = cartItems.filter(i => i.isSelected)
  const totalCount = selectedItems.reduce((acc, item) => acc + item.count, 0)
  const totalPrice = selectedItems.reduce((acc, item) => acc + (item.product.price * item.count), 0)
  const totalDiscount = selectedItems.length > 0 ? 600 : 0 

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Корзина</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Левая колонка - Список товаров */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
             <label className="flex items-center gap-3 cursor-pointer select-none group">
                <input 
                  type="checkbox" 
                  checked={allSelected} 
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                  className="w-5 h-5 accent-black cursor-pointer" 
                />
                <span className="font-medium text-gray-700 group-hover:text-black transition">Выбрать все</span>
             </label>
             {selectedItems.length > 0 && (
                 <button onClick={deleteSelected} className="text-gray-400 hover:text-red-500 transition flex items-center gap-1">
                    <span>Удалить выбранные</span>
                    <span>🗑️</span>
                 </button>
             )}
          </div>

          {cartItems.length === 0 && (
              <div className="text-center py-20">
                  <p className="text-xl text-gray-500 mb-4">В корзине пока пусто</p>
                  <a href="/" className="text-blue-500 hover:underline">Перейти к покупкам</a>
              </div>
          )}

          <div className="space-y-8">
            {cartItems.map(({ product, count, isSelected }) => (
              <div key={product.id} className="flex gap-4 sm:gap-6 items-start">
                {/* Чекбокс */}
                <div className="pt-8">
                    <input 
                    type="checkbox" 
                    checked={isSelected} 
                    onChange={() => toggleSelection(product.id)}
                    className="w-5 h-5 accent-black cursor-pointer" 
                    />
                </div>
                
                {/* Картинка */}
                <div className="w-24 h-28 sm:w-32 sm:h-36 bg-gray-50 rounded-xl flex items-center justify-center shrink-0">
                    <img src={product.image} className="w-full h-full object-contain p-2" alt={product.title} />
                </div>

                {/* Информация */}
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-lg text-gray-900 leading-tight max-w-xs">{product.title}</h3>
                    <p className="text-sm text-gray-500">Цвет: Черный • Размер: M</p>
                    <div className="flex gap-3 mt-auto pt-2">
                        <button className="text-gray-400 hover:text-red-500 transition text-sm flex items-center gap-1">
                            ❤️ <span className="hidden sm:inline">В избранное</span>
                        </button>
                        <button onClick={() => removeFromCart(product.id)} className="text-gray-400 hover:text-red-500 transition text-sm flex items-center gap-1">
                            🗑️ <span className="hidden sm:inline">Удалить</span>
                        </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                      <p className="font-bold text-xl">{product.price} ₽</p>
                      
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button 
                            onClick={() => decreaseQty(product.id)} 
                            className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition disabled:opacity-50"
                            disabled={count <= 1}
                        >
                            −
                        </button>
                        <span className="px-3 font-medium text-gray-900 min-w-[2rem] text-center">{count}</span>
                        <button 
                            onClick={() => increaseQty(product.id)} 
                            className="px-3 py-1 hover:bg-gray-100 text-gray-600 transition"
                        >
                            +
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Правая колонка - Итог */}
        {cartItems.length > 0 && (
            <div className="w-full lg:w-96 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Ваша корзина</h3>
                
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Товары ({totalCount})</span>
                        <span>{totalPrice + totalDiscount} ₽</span>
                    </div>
                    <div className="flex justify-between text-red-500 font-medium">
                        <span>Скидка</span>
                        <span>− {totalDiscount} ₽</span>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center mb-8">
                    <span className="text-lg font-bold">Итого</span>
                    <span className="text-2xl font-bold text-gray-900">{totalPrice} ₽</span>
                </div>

                <button className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 active:scale-95 transition-all">
                Перейти к оформлению
                </button>

                <p className="text-xs text-gray-400 text-center mt-4">
                    Доступные способы и время доставки можно выбрать при оформлении заказа
                </p>
            </div>
            </div>
        )}
      </div>
    </div>
  )
}