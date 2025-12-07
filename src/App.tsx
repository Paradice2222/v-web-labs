import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductStoreProvider } from '@/entities/product/model/useProductStore'
import { Layout } from '@/app/Layout'
import { HomePage } from '@/pages/home/HomePage'
import { CartPage } from '@/pages/home/cart/CartPage'    
function App() {
  return (
    <ProductStoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
             <Route index element={<HomePage />} />
             <Route path="cart" element={<CartPage />} />
             {/* Можно добавить маршрут для избранного, если захочешь */}
             <Route path="favorites" element={<div className="p-10 text-center">Страница избранного (в разработке)</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductStoreProvider>
  )
}

export default App