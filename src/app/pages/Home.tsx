import { Header, Footer } from '@/shared/components/layout'
import { ListProduct, ProductHighlight } from '@/features/products/'

import { Button } from 'antd'

import { CategoryCard } from '../../features/categories/components/CategoryCard'

// Data
import { mockProductSales } from '../../__mocks__/data/productSales'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 md:space-y-8">
              <h1 className="text-4xl md:text-6xl font-semibold text-primary-700">
                Tech Heim
              </h1>
              <p className="text-2xl md:text-[32px] font-medium text-primary-700">
                "Join the{' '}
                <span className="text-secondary">digital revolution</span>"
              </p>
              <Button className="w-full md:w-72 h-14 bg-secondary hover:bg-secondary/90 text-white text-base rounded-lg">
                Explore More
              </Button>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/fd9e1e472d69e24785351c8be93a25665dd7fa65?width=1456"
                alt="Laptops"
                className="w-full max-w-[728px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            <CategoryCard
              name="Accessories"
              image="https://api.builder.io/api/v1/image/assets/TEMP/06433a87f3f8608f076653130793fe7e7d427251?width=296"
            />
            <CategoryCard
              name="Camera"
              image="https://api.builder.io/api/v1/image/assets/TEMP/177f27c03009cd56f6c891460f6ca6ac4a5ac675?width=296"
            />
            <CategoryCard
              name="Laptop"
              image="https://api.builder.io/api/v1/image/assets/TEMP/670226fb8003000580dcd9229506cbd48f0c0a82?width=296"
            />
            <CategoryCard
              name="Smart Phone"
              image="https://api.builder.io/api/v1/image/assets/TEMP/ef9a15793857e5e935495c7c103538f15b07716c?width=296"
            />
            <CategoryCard
              name="Gaming"
              image="https://api.builder.io/api/v1/image/assets/TEMP/3b88026f08447c1d1b359e6bc89c4fb61ee18172?width=296"
            />
            <CategoryCard
              name="Smart Watch"
              image="https://api.builder.io/api/v1/image/assets/TEMP/628564c828d86d2c564eb9cf0bb64de97ff028f3?width=296"
            />
          </div>
        </div>
      </section>

      {/* Products On Sale */}
      <section className="w-full bg-white py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px]">
          <ProductHighlight productList={mockProductSales} />
        </div>
      </section>

      {/* New Products */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px]">
          <ListProduct products={mockProductSales} title="New Products" />
        </div>
      </section>

      {/* Best Seller */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px]">
          <ListProduct products={mockProductSales} title="Best Seller" />
        </div>
      </section>

      {/* Top Brands */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px]">
          <div className="mb-8">
            <h2 className="text-2xl md:text-[32px] font-medium text-brand-black mb-4">
              Top Brands
            </h2>
            <div className="h-0.5 w-full bg-[#B4B4B4]" />
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/39b1143a65424ab296fe787840975fe2517d9859?width=2448"
            alt="Top Brands"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Smart Watch Banner */}
      <section className="w-full bg-white py-8 md:py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[50px]">
          <div className="relative h-[420px] rounded-lg overflow-hidden bg-[#223949]">
            <div className="absolute right-0 top-[-89px] w-[800px] h-[655px] rounded-full bg-[#FF6951] blur-[100px] opacity-70" />
            <div className="relative z-10 p-8 md:p-16 space-y-6 max-w-[400px]">
              <h3 className="text-4xl md:text-[44px] font-medium text-white">
                SMART WATCH
              </h3>
              <p className="text-2xl font-light text-white">
                Various designs and brands
              </p>
              <Button className="bg-[#FF6951] hover:bg-[#FF6951]/90 text-[#223949] h-12 px-8 rounded-lg font-normal">
                view
              </Button>
            </div>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/198ad7b1840e1127a9f5fbcdd1054393dc37820e?width=1000"
              alt="Smart Watches"
              className="absolute right-0 bottom-0 w-[500px] h-[338px] object-contain"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
