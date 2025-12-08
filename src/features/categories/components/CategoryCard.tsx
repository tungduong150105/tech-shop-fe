interface CategoryCardProps {
  name: string
  image: string
}

export function CategoryCard({ name, image }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white shadow-[0_2px_15px_-1px_rgba(113,113,113,0.12)] hover:shadow-[0_4px_20px_-1px_rgba(113,113,113,0.20)] transition-shadow cursor-pointer">
      <img
        src={image}
        alt={name}
        className="w-[148px] h-[148px] object-contain"
      />
      <p className="text-center text-base font-light text-neutral-gray-2D">
        {name}
      </p>
    </div>
  )
}
