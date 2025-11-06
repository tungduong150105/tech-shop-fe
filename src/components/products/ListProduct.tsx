import { useNavigate } from 'react-router-dom'
import ProductCard from '../collection/ProductCard'
import type { ListProductRes } from '../../types/product'

interface ListProductProps {
  title: string
  products: ListProductRes | null
}

const ListProduct = ({title, products} : ListProductProps) => {
  const navigate = useNavigate()

  function onClick(id: number) {
    navigate(`/product/${id}`)
  }

  function ViewAll() {
    navigate('/collection/all')
  }

  const DataRender = products?.products.slice(0, 4)

  return (
    <section className="mb-10 mt-5">
      <div className="flex justify-between items-center mx-2 mb-4 py-2 border-b border-b-black">
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <button onClick={ViewAll}>View All</button>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {DataRender?.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  )
}

export default ListProduct
