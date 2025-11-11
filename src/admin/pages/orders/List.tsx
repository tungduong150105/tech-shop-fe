import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminOrders } from '../../hooks'
import SkeletonTable from '../../components/common/SkeletonTable'

export default function AdminOrdersList() {
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [status, setStatus] = useState<string | undefined>(undefined)
  const [q, setQ] = useState('')
  const { data, isLoading } = useAdminOrders({
    page,
    limit,
    status,
    q: q || undefined
  })
  const pages = useMemo(
    () => Math.max(1, data?.data.pagination.pages || 1),
    [data]
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <KpiCard title="Total Orders" value="1,240" delta="+10.4%" />
        <KpiCard title="New Orders" value="240" delta="+20%" />
        <KpiCard title="Completed Orders" value="960" delta="+5%" />
        <KpiCard title="Canceled Orders" value="87" delta="-14.8%" />
      </div>

      <div className="bg-white rounded border">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex gap-2">
            {[
              { label: 'All order', value: undefined },
              { label: 'Completed', value: 'delivered' },
              { label: 'Pending', value: 'pending' },
              { label: 'Canceled', value: 'cancelled' }
            ].map(t => (
              <button
                key={t.label}
                onClick={() => {
                  setStatus(t.value)
                  setPage(1)
                }}
                className={`px-3 py-1.5 rounded text-sm ${
                  status === t.value || (!status && t.value === undefined)
                    ? 'bg-green-100 text-green-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              className="border rounded px-3 py-1.5 text-sm w-56"
              placeholder="Search order report"
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setPage(1)}
            />
            <button className="p-2 border rounded" onClick={() => setPage(1)}>
              ⟳
            </button>
            <button className="p-2 border rounded">≣</button>
            <button className="p-2 border rounded">⋮</button>
          </div>
        </div>

        {isLoading ? (
          <SkeletonTable rows={5} cols={7} />
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-green-50">
              <tr>
                <th className="text-left p-2">No.</th>
                <th className="text-left p-2">Order Id</th>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Payment</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.orders.map((o, idx) => (
                <tr key={o.id} className="border-t">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">#{String(o.id).padStart(6, '0')}</td>
                  <td className="p-2">{o.order_items?.length || 0} items</td>
                  <td className="p-2">
                    {o.created_at
                      ? new Date(o.created_at).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="p-2">${Number(o.total_amount)}</td>
                  <td className="p-2 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-xs ${
                        Math.random() > 0.5 ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          Math.random() > 0.5 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                      {Math.random() > 0.5 ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="p-2">
                    <Link
                      to={`/admin/orders/${o.id}`}
                      className={statusClass(o.status)}
                    >
                      {o.status}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex items-center justify-between p-3 border-t text-sm">
          <button
            className="px-3 py-1.5 border rounded"
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <div className="space-x-1">
            {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                className={`px-3 py-1.5 rounded border ${
                  n === (data?.data.pagination.page || 1)
                    ? 'bg-green-600 text-white border-green-600'
                    : ''
                }`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            className="px-3 py-1.5 border rounded"
            disabled={page >= pages}
            onClick={() => setPage(p => Math.min(pages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

function KpiCard({
  title,
  value,
  delta
}: {
  title: string
  value: string
  delta: string
}) {
  const positive = !delta.startsWith('-')
  return (
    <div className="bg-white rounded border p-4">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold">{value}</div>
        <span
          className={`text-xs ${positive ? 'text-green-600' : 'text-red-600'}`}
        >
          {delta}
        </span>
      </div>
    </div>
  )
}

function statusClass(status: string) {
  switch (status) {
    case 'delivered':
      return 'px-2 py-1 rounded bg-green-100 text-green-700'
    case 'pending':
      return 'px-2 py-1 rounded bg-yellow-100 text-yellow-700'
    case 'shipped':
      return 'px-2 py-1 rounded bg-blue-100 text-blue-700'
    case 'cancelled':
      return 'px-2 py-1 rounded bg-red-100 text-red-700'
    default:
      return 'px-2 py-1 rounded bg-gray-100 text-gray-700'
  }
}
