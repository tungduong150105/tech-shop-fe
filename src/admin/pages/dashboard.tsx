import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Total Sales"
          subtitle="Last 7 days"
          value="$350K"
          delta="+10.4%"
          prev="Previous 7days (325K)"
        />
        <KpiCard
          title="Total Orders"
          subtitle="Last 7 days"
          value="10.7K"
          delta="+14.6%"
          prev="Previous 7days (7.4k)"
        />
        <KpiSplitCard
          title="Pending & Canceled"
          subtitle="Last 7 days"
          left={{ label: 'Pending', value: '509', delta: '+12.0%' }}
          right={{ label: 'Canceled', value: '94', delta: '-14.4%' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded border">
          <div className="p-4 flex items-center justify-between border-b">
            <div className="font-semibold">Report for this week</div>
            <div className="flex items-center gap-2 text-sm">
              <button className="px-2 py-1 rounded border bg-green-50 text-green-700">
                This week
              </button>
              <button className="px-2 py-1 rounded border">Last week</button>
              <button className="p-2 rounded border">⋮</button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 p-4 text-center text-sm">
            <div>
              <div className="text-2xl font-semibold">52k</div>
              <div className="text-gray-500">Customers</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">3.5k</div>
              <div className="text-gray-500">Total Products</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">2.5k</div>
              <div className="text-gray-500">Stock Products</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">0.5k</div>
              <div className="text-gray-500">Out of Stock</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">250k</div>
              <div className="text-gray-500">Revenue</div>
            </div>
          </div>
          <ChartPlaceholder />
        </div>
        <div className="bg-white rounded border">
          <div className="p-4 flex items-center justify-between border-b">
            <div className="font-semibold">Top Products</div>
            <Link to="#" className="text-sm text-blue-600">
              All product
            </Link>
          </div>
          <div className="p-4">
            <div className="relative mb-3">
              <input
                className="w-full border rounded px-3 py-2 pl-9 text-sm"
                placeholder="Search"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <div className="space-y-3 text-sm">
              {topProducts.map(p => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-gray-200" />
                    <div>
                      <div className="font-medium">{p.name}</div>
                      <div className="text-gray-500">{p.sku}</div>
                    </div>
                  </div>
                  <div className="font-semibold">{p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiCard({
  title,
  subtitle,
  value,
  delta,
  prev
}: {
  title: string
  subtitle: string
  value: string
  delta: string
  prev: string
}) {
  return (
    <div className="bg-white rounded border p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-2xl font-semibold">{value}</div>
        <span
          className={`text-xs ${
            delta.startsWith('-') ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {delta}
        </span>
      </div>
      <div className="mt-1 text-xs text-blue-600">{prev}</div>
      <div className="mt-3 text-right">
        <button className="px-3 py-1.5 text-xs border rounded">Details</button>
      </div>
    </div>
  )
}

function KpiSplitCard({
  title,
  subtitle,
  left,
  right
}: {
  title: string
  subtitle: string
  left: { label: string; value: string; delta: string }
  right: { label: string; value: string; delta: string }
}) {
  return (
    <div className="bg-white rounded border p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-xs text-gray-400">{subtitle}</div>
      <div className="mt-3 grid grid-cols-2 gap-4">
        {[left, right].map((s, idx) => (
          <div key={idx}>
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className="mt-1 flex items-baseline gap-2">
              <div className="text-2xl font-semibold">{s.value}</div>
              <span
                className={`text-xs ${
                  s.delta.startsWith('-') ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {s.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 text-right">
        <button className="px-3 py-1.5 text-xs border rounded">Details</button>
      </div>
    </div>
  )
}

function ChartPlaceholder() {
  return (
    <div className="p-4">
      <div className="h-48 rounded bg-gradient-to-b from-green-100 to-white border flex items-end">
        <div className="w-full h-full">
          <svg
            viewBox="0 0 400 150"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120 C40 80, 80 100, 120 70 C160 40, 200 90, 240 70 C280 50, 320 90, 360 80 L400 150 L0 150 Z"
              fill="#bbf7d0"
            />
            <path
              d="M0 120 C40 80, 80 100, 120 70 C160 40, 200 90, 240 70 C280 50, 320 90, 360 80"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

const topProducts = [
  { name: 'Apple iPhone 13', sku: 'IP13', price: '$999.00' },
  { name: 'Nike Air Jordan', sku: 'NK-AJ', price: '$72.40' },
  { name: 'T-shirt', sku: 'TS-001', price: '$35.40' },
  { name: 'Assorted Cross Bag', sku: 'ACB-1', price: '$80.00' }
]
