import type { Product } from "../types/product"
import { ProductCard } from "./ProductCard"

interface ProductGridProps {
  products: Product[] | []
}

export default function ProductGrid({products} : ProductGridProps) {
  console.log("ProductGrid products:", products);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, i) => (
          <div key={i} className="">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}
