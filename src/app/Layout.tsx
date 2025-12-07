import { Outlet, Link, useLocation } from 'react-router-dom'
import { Header } from '@/widgets/header/Header'
import { Footer } from '@/widgets/footer/Footer' // <-- Импортируем футер

export function Layout() {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path ? 'text-black font-bold' : 'text-gray-500'

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Хедер (общий для всех) */}
      <Header />

      {/* Контент страницы */}
      <div className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </div>

      {/* Футер (общий для всех) */}
      <Footer />

      {/* Нижнее меню для мобилок */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-3 z-50 pb-safe">
        <Link to="/" className={`flex flex-col items-center text-xs ${isActive('/')}`}>
           <span className="text-2xl mb-1">🏠</span>
           Главная
        </Link>
        <Link to="/favorites" className={`flex flex-col items-center text-xs ${isActive('/favorites')}`}>
           <span className="text-2xl mb-1">❤️</span>
           Избранное
        </Link>
        <Link to="/cart" className={`flex flex-col items-center text-xs ${isActive('/cart')}`}>
           <span className="text-2xl mb-1">🛒</span>
           Корзина
        </Link>
      </div>
    </div>
  )
}