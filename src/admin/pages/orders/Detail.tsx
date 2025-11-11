import React from 'react'
import { useParams } from 'react-router-dom'
import { useAdminOrder, useUpdateAdminOrderStatus } from '../../hooks'

export default function AdminOrderDetail() {
  const { id } = useParams()
  const oid = Number(id)
  const { data, isLoading } = useAdminOrder(oid)
  const update = useUpdateAdminOrderStatus(oid)

  if (isLoading) return <div>Loading...</div>

  const order = data?.data
  if (!order) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Order #{order.id}</h1>
        <select
          className="border rounded px-2 py-1"
          value={order.status}
          onChange={e => update.mutate({ status: e.target.value as any })}
        >
          {[
            'pending',
            'confirmed',
            'processing',
            'shipped',
            'delivered',
            'cancelled'
          ].map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white rounded border p-3">
          <div className="text-sm text-gray-500">Customer</div>
          <div className="mt-1 text-sm">
            {order.user?.name} ({order.user?.email})
          </div>
        </div>
        <div className="bg-white rounded border p-3">
          <div className="text-sm text-gray-500">Payment</div>
          <div className="mt-1 text-sm">{order.payment_method || '—'}</div>
        </div>
        <div className="bg-white rounded border p-3">
          <div className="text-sm text-gray-500">Total</div>
          <div className="mt-1 text-sm font-medium">
            ${Number(order.total_amount)}
          </div>
        </div>
      </div>
      <div className="bg-white rounded border p-3">
        <div className="text-sm text-gray-500">Shipping address</div>
        <div className="mt-1 text-sm">
          {order.shipping_address?.street || ''}
          {order.shipping_address?.city
            ? `, ${order.shipping_address.city}`
            : ''}
          {order.shipping_address?.country
            ? `, ${order.shipping_address.country}`
            : ''}
        </div>
      </div>
      <div className="bg-white rounded border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-2">Product</th>
              <th className="text-left p-2">Qty</th>
              <th className="text-left p-2">Unit Price</th>
              <th className="text-left p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items.map(it => {
              const anyIt = it as any
              const name = anyIt.product?.name || `#${it.product_id}`
              return (
                <tr key={`${it.product_id}-${it.id}`} className="border-t">
                  <td className="p-2">{name}</td>
                  <td className="p-2">{it.quantity}</td>
                  <td className="p-2">${Number(it.unit_price)}</td>
                  <td className="p-2">${Number(it.total_price)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
