import Hero from '../components/layout/Hero'
import Categories from '../components/products/Categories'
import ListProduct from '../components/products/ListProduct'
import { useNewProducts, usePopularProducts } from '../hooks/useNewProducts'

const Home = () => {
  const { data: newProduct } = useNewProducts()
  const { data: popularProduct } = usePopularProducts()

  return (
    <div>
      <Hero />
      <Categories />
      <div className="px-12">
        <ListProduct title="New Product" products={newProduct || null} />
      </div>
      <div className="px-12">
        <ListProduct title="Best Seller" products={popularProduct || null} />
      </div>
    </div>
  )
}

export default Home
