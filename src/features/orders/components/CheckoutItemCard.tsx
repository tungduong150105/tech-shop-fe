import type { Item } from '../types/order'

interface CheckoutItemCardProps {
  item: Item
}

export default function CheckoutItemCard({ item }: CheckoutItemCardProps) {
  return (
    <div className="flex gap-2 py-2 px-3 border-b border-gray-300">
      <img
        src={item.image_url}
        alt={item.name}
        className="w-[87px] h-auto rounded flex-shrink-0"
      />

      <div className="flex flex-col gap-2 flex-1">
        <h4 className="text-xs font-light text-gray-700 line-clamp-1">
          {item.name}
        </h4>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium text-gray-500">{item.color.name}</span>
          <span className="text-[10px] font-medium text-gray-500">
            ×{item.quantity}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end justify-start gap-1">
        {item.discount && (
          <span className="text-xs font-light text-gray-500 line-through">
            from {item.price}
          </span>
        )}
        <span className="text-xs font-light text-gray-700">{item.final_price}</span>
      </div>
    </div>
  )
}
