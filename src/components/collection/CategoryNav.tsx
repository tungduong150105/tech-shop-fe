interface Category {
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  label: string
}

interface Categories {
  categories: Category[]
}

const CategoryNav = ({ categories } : Categories) => {
  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
              <cat.icon className="w-6 h-6" />
              <span className="text-xs text-gray-600">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav