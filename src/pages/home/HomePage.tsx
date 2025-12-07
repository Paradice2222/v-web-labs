import { ProductList } from '@/widgets/product-list/ProductList'
import { useProductStore } from '@/entities/product/model/useProductStore'
import { products } from '@/shared/config/data'
import { type TProduct } from '@/shared/config/data'

export function HomePage() {
  const searchQuery = useProductStore((state) => state.searchQuery)

  const filteredProducts = (category: 'hoodies' | 'shorts'): TProduct[] => {
    return products
      .filter(p => p.category === category)
      .filter(p => 
        searchQuery.trim() === '' || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
  }

  const hoodies = filteredProducts('hoodies')
  const shorts = filteredProducts('shorts')

  return (
    <main className="container mx-auto px-6 py-12">
      <section className="mb-20">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Худи</h2>
        <ProductList products={hoodies} />
      </section>

      <section>
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Шорты</h2>
        <ProductList products={shorts} />
      </section>
    </main>
  )
}