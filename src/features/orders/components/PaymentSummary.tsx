import { useNavigate } from 'react-router-dom'

interface PaymentSummaryProps {
  subtotal: string
  discount: string
  shipment: string
  total: string
}

export default function PaymentSummary({
  subtotal,
  discount,
  shipment,
  total
}: PaymentSummaryProps) {
  const navigate = useNavigate()
  return (
    <div className="sticky top-[120px] flex flex-col items-center gap-4 p-4 rounded-lg border border-gray-200 bg-white">
      <h2 className="text-2xl font-medium text-gray-900 self-stretch">
        Payment Details
      </h2>

      <div className="flex flex-col gap-3 w-full p-2 rounded-lg bg-white">
        <div className="flex justify-between items-start">
          <span className="flex-1 text-sm font-light text-gray-500">
            Subtotal
          </span>
          <span className="flex-1 text-sm font-light text-gray-600 text-right">
            ${subtotal}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="flex-1 text-sm font-light text-gray-500">
            Discount
          </span>
          <span className="flex-1 text-sm font-light text-gray-600 text-right">
            ${discount}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="flex-1 text-sm font-light text-gray-500">
            Shipment cost
          </span>
          <span className="flex-1 text-sm font-light text-gray-600 text-right">
            ${shipment}
          </span>
        </div>

        <div className="h-px bg-gray-300" />

        <div className="flex justify-between items-start">
          <span className="flex-1 text-base font-medium text-gray-700">
            Grand Total
          </span>
          <span className="flex-1 text-base font-medium text-gray-700 text-right">
            ${total}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate('/checkout')}
        className="w-full h-12 px-4 flex items-center justify-center rounded-lg bg-primary text-white text-base font-normal hover:bg-primary-400 transition-colors"
      >
        Proceed to checkout
      </button>
    </div>
  )
}
