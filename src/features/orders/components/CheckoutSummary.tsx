import { Item } from '../types/order';
import CheckoutItemCard from './CheckoutItemCard'

interface CheckoutSummaryProps {
  items: Item[];
  subtotal: string;
  discount: string;
  shipment: string;
  total: string;
  onContinuePay?: () => void;
}

export default function CheckoutSummary({
  items,
  subtotal,
  discount,
  shipment,
  total,
  onContinuePay,
}: CheckoutSummaryProps) {
  return (
    <div className="flex flex-col gap-10 p-8 rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium text-gray-900">Your Order</h2>

        <div className="flex flex-col">
          {items.map((item, index) => (
            <CheckoutItemCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Discount Code */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="discount code"
          className="flex-1 px-3 py-3 rounded-lg border border-gray-400 text-sm font-light text-gray-500 placeholder:text-gray-500 outline-none focus:border-primary transition-colors"
        />
        <button className="px-4 py-3 rounded-lg border-2 border-primary text-primary text-base font-normal hover:bg-primary hover:text-white transition-colors">
          Apply
        </button>
      </div>

      {/* Bill Summary */}
      <div className="flex flex-col gap-3 p-2 rounded-lg bg-white">
        <div className="flex justify-between items-start">
          <span className="flex-1 text-sm font-light text-gray-500">
            Subtotal
          </span>
          <span className="flex-1 text-sm font-light text-gray-600 text-right">
            {subtotal}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="flex-1 text-sm font-light text-gray-500">
            Discount
          </span>
          <span className="flex-1 text-sm font-light text-gray-600 text-right">
            {discount}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="flex-1 text-sm font-light text-gray-500">
            Shipment cost
          </span>
          <span className="flex-1 text-sm font-light text-gray-600 text-right">
            {shipment}
          </span>
        </div>

        <div className="h-px bg-gray-300" />

        <div className="flex justify-between items-start">
          <span className="flex-1 text-base font-medium text-gray-700">
            Grand Total
          </span>
          <span className="flex-1 text-base font-medium text-gray-700 text-right">
            {total}
          </span>
        </div>
      </div>

      <button
        onClick={onContinuePay}
        className="w-full h-12 px-4 flex items-center justify-center rounded-lg bg-primary text-white text-base font-normal hover:bg-primary-400 transition-colors"
      >
        Continue to pay
      </button>
    </div>
  );
}
