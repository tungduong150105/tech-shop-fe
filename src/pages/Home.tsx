import Hero from '../components/layout/Hero'
import Categories from '../components/products/Categories'
import NewProduct from '../components/products/NewProduct'
import ProductDetail from '../components/products/ProductDetail'

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <NewProduct />
      {/*<ProductDetail />*/}
    </div>
  )
}

export default Home
