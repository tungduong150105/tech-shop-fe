import { useNavigate } from "react-router-dom"
import { useCategories } from '../../hooks/useCategories'
import type {Categories as CategoryType} from '../../types/category'

interface Category {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  label: string
}

interface Categories {
  categories: Category[]
}

const CategoryNav = ({ categories }: Categories) => {
  const navigate = useNavigate()

  const { data: allCategory } = useCategories()

  function findIdByName(name: string) :number {
    const categoriesData: CategoryType = allCategory || []
    const category = categoriesData.find(cat => cat.name === name)
    return category ? category.id : -1
  }

  function goTo(name: string) {
    let categoryId = findIdByName(name)
    navigate(`/collection/${categoryId}`)
  }

  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {categories.map((cat, idx) => (
            <div
              onClick={() => goTo(cat.label)}
              key={idx}
              className="flex flex-col items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors"
            >
              <cat.icon className="w-6 h-6" />
              <span className="text-xs text-gray-600">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryNav
