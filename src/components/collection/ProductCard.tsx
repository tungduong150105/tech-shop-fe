import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react'

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow" onClick={() => {navigate(`/product/${product.id}`)}}>
      <div className="relative mb-4">
        <div className="absolute top-2 left-2 bg-orange-200 text-orange-800 text-xs font-semibold px-2 py-1 rounded">
          -{product.discount}%
        </div>
        <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center text-6xl">
          {product.image}
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 space-y-2">
          {[...Array(product.colors)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-400"></div>
          ))}
        </div>
      </div>
      <h3 className="text-sm text-gray-700 mb-2 truncate">{product.name}</h3>
      <div className="flex items-center gap-2 mb-2">
        {product.originalPrice && (
          <span className="text-xs text-gray-400 line-through">$ {product.originalPrice}</span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">$ {product.price}</span>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
          <span className="text-sm font-semibold">{product.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard