import { useNavigate } from "react-router-dom"
import type { Category } from '../../types/category'

interface CategoryNavProps {
  categories: Array<{
    id: number
    name: string
    image_url: string
  }>
}

const CategoryNav = ({ categories }: CategoryNavProps) => {
  const navigate = useNavigate()

  function goTo(categoryId: number) {
    navigate(`/collection/${categoryId}`)
  }

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {categories.map((cat) => (
            <div
              onClick={() => goTo(cat.id)}
              key={cat.id}
              className="flex flex-col items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
            >
              {cat.image_url ? (
                <img 
                  src={cat.image_url} 
                  alt={cat.name}
                  className="w-6 h-6 object-contain"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              )}
              <span className="text-xs text-gray-600">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryNav
