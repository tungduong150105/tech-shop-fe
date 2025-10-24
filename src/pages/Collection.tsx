import { useEffect, useState } from 'react'

const Collection = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    setTimeout(() => {
      const fetchProducts = []
      setProducts(fetchProducts)
    }, 1000)
  }, [])

  return <div>Collection</div>
}

export default Collection
