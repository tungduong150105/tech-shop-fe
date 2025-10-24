import { useState } from 'react'
import EmptyState from './EmptyStatus'
import OrderStatus from './OrderStatus'
import OrderDetails from './OrderDetail'
import OrderCard from './OrderCard'

interface Product {
  name: string
  image?: string
  color?: string
  quantity?: number
  price?: number
  originalPrice?: number
}

interface Order {
  id: string
  placedOn: string
  total: number
  delivered?: string
  sentTo: string
  address?: string
  products: Product[]
  status?: 'processing' | 'on-the-way' | 'delivered'
  paymentType?: string
  transactionId?: string
  amountPaid?: number
}

const mockOrders: Order[] = [
  {
    id: '8967856',
    placedOn: '2023/08/20',
    total: 10998.0,
    delivered: '2023/08/22',
    sentTo: 'Jimmy Smith',
    products: [
      { name: 'iMac', image: '🖥️' },
      { name: 'iPad Pro', image: '📱' },
      { name: 'AirPods', image: '🎧' },
      { name: 'iPhone', image: '📱' },
      { name: 'Apple Watch', image: '⌚' },
      { name: 'Headphones', image: '🎧' }
    ]
  },
  {
    id: '3615950',
    placedOn: '2023/06/30',
    total: 5643.32,
    delivered: '2023/07/05',
    sentTo: 'Jimmy Smith',
    address: '31,Albuquerque, New York',
    products: [
      { name: 'Phone Case', image: '📱' },
      { name: 'Apple Watch', image: '⌚' },
      { name: 'Keyboard', image: '⌨️' },
      { name: 'PS5', image: '🎮' },
      { name: 'Headphones', image: '🎧' }
    ]
  },
  {
    id: '1050486',
    placedOn: '2023/04/15',
    total: 543.02,
    sentTo: 'Jimmy Smith',
    address: '31,Albuquerque,New York',
    status: 'processing',
    paymentType: 'Net Banking',
    transactionId: '2345678910',
    amountPaid: 543.02,
    products: [
      {
        name: 'MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch',
        color: 'Black',
        quantity: 1,
        price: 433.0,
        originalPrice: 1299.0
      },
      {
        name: 'Inateck 12.3-13 Inch Laptop Case Sleeve 360° Protection',
        color: 'Blue',
        quantity: 1,
        price: 63.26
      },
      {
        name: 'Laptop Privacy Screen for 13 inch MacBook Pro & MacBook Air',
        color: 'Black',
        quantity: 1,
        price: 23.26
      }
    ]
  }
]

const Order = () => {
  const [view, setView] = useState<'list' | 'detail' | 'empty'>('list')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orderTab, setOrderTab] = useState<
    'current' | 'delivered' | 'canceled' | 'returned'
  >('delivered')

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order)
    setView('detail')
  }

  const getFilteredOrders = () => {
    if (orderTab === 'delivered') {
      return mockOrders.filter(o => o.delivered)
    } else if (orderTab === 'current') {
      return mockOrders.filter(o => !o.delivered)
    }
    return []
  }

  const filteredOrders = getFilteredOrders()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex max-w-7xl mx-auto">
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Order History</h1>
            <p className="text-gray-500">Track, return or purchase items</p>
          </div>
          {view === 'detail' && selectedOrder ? (
            <>
              {selectedOrder.status && (
                <OrderStatus status={selectedOrder.status} />
              )}
              <OrderDetails order={selectedOrder} />
            </>
          ) : (
            <>
              <div className="flex space-x-6 mb-6 border-b border-gray-200">
                {[
                  {
                    key: 'current',
                    label: 'Current',
                    count: mockOrders.filter(o => !o.delivered).length
                  },
                  {
                    key: 'delivered',
                    label: 'Delivered',
                    count: mockOrders.filter(o => o.delivered).length
                  },
                  { key: 'canceled', label: 'Canceled', count: 0 },
                  { key: 'returned', label: 'Returned', count: 0 }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setOrderTab(tab.key as any)
                      setView(tab.count === 0 ? 'empty' : 'list')
                    }}
                    className={`pb-3 px-1 relative ${
                      orderTab === tab.key
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {tab.label}{' '}
                    {tab.count > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                        {tab.count}
                      </span>
                    )}
                    {orderTab === tab.key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                ))}
              </div>

              {view === 'empty' ? (
                <EmptyState />
              ) : (
                <div>
                  {filteredOrders.map(order => (
                    <OrderCard
                      order={order}
                      onClick={
                        orderTab === 'current'
                          ? () => handleOrderClick(order)
                          : undefined
                      }
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Order
