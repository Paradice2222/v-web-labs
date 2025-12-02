// src/widgets/header/Header.jsx

import { useProductStore } from '@/entities/product/model/useProductStore';

// Пути к иконкам — из public/images (как мы договорились)
const homeIcon = 'public/assets/home-icon.svg';
const searchIcon = 'public/assets/search-icon.svg';
const favoritesIcon = 'public/assets/favorites-icon.svg';
const cartIcon = 'public/assets/cart-icon.svg';

export function Header() {
    const cartCount = useProductStore((state) => state.cartItems.length);
    const likedCount = useProductStore((state) => state.likedItems.length);

    // ← Это всё, что нужно для поиска
    const { searchQuery, setSearchQuery } = useProductStore();

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 shadow-sm w-full">

            {/* Кнопка домой */}
            <button className="p-2 transition-transform hover:scale-110">
                <img src={homeIcon} alt="Домой" className="w-6 h-6" />
            </button>

            {/* ← ОДИН ЕДИНСТВЕННЫЙ РАБОЧИЙ ПОИСК (оставляем только этот) */}
            <div className="relative flex-1 max-w-2xl mx-4">
                <img
                    src={searchIcon}
                    alt="Поиск"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-100 focus:border-blue-500 focus:bg-white outline-none transition"
                />
            </div>

            {/* Избранное и корзина */}
            <div className="flex items-center gap-6">
                <button className="relative p-2 transition-transform hover:scale-110">
                    <img src={favoritesIcon} alt="Избранное" className="w-6 h-6" />
                    {likedCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                            {likedCount}
                        </span>
                    )}
                </button>

                <button className="relative p-2 transition-transform hover:scale-110">
                    <img src={cartIcon} alt="Корзина" className="w-6 h-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                            {cartCount}
                        </span>
                    )}
                </button>
            </div>
        </header>
    );
}