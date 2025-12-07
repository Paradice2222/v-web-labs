import { Link } from 'react-router-dom';
import { useProductStore } from '@/entities/product/model/useProductStore';

const homeIcon = '/assets/home-icon.svg';
const searchIcon = '/assets/search-icon.svg';
const favoritesIcon = '/assets/favorites-icon.svg';
const cartIcon = '/assets/cart-icon.svg';

export function Header() {
    const cartItems = useProductStore((state) => state.cartItems);
    const likedItems = useProductStore((state) => state.likedItems);
    const searchQuery = useProductStore((state) => state.searchQuery);
    const setSearchQuery = useProductStore((state) => state.setSearchQuery);

    // Считаем общее кол-во товаров (сумма всех count)
    const totalCartCount = cartItems.reduce((acc, item) => acc + item.count, 0);

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 shadow-sm w-full h-16">
            {/* Ссылка на главную */}
            <Link to="/" className="p-2 transition-transform hover:scale-110">
                <img src={homeIcon} alt="Домой" className="w-6 h-6" />
            </Link>

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

            <div className="flex items-center gap-6">
                <Link to="/favorites" className="relative p-2 transition-transform hover:scale-110">
                    <img src={favoritesIcon} alt="Избранное" className="w-6 h-6" />
                    {likedItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                            {likedItems.length}
                        </span>
                    )}
                </Link>

                <Link to="/cart" className="relative p-2 transition-transform hover:scale-110">
                    <img src={cartIcon} alt="Корзина" className="w-6 h-6" />
                    {totalCartCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                            {totalCartCount}
                        </span>
                    )}
                </Link>
            </div>
        </header>
    );
}