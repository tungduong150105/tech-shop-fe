import { Header, Footer } from '@/shared/components/layout'
import OrderProductCard from '../components/OrderCart'
import { useCart } from '../hooks/useOrder'

import {
  CreditCardOutlined,
  LoadingOutlined,
  TruckOutlined
} from '@ant-design/icons'
import { Flex, Steps } from 'antd'
import PaymentSummary from '../components/PaymentSummary'
import { useEffect, useState } from 'react'

export function Order() {
  const [totalSubCost, setTotalSubCost] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const { data: OrderData,  } = useCart()

  useEffect(() => {
    if (OrderData?.cart) {
      setTotalCost(0)
      setTotalSubCost(0)
      OrderData?.cart.items.forEach(item => {
        console.log('item', item)
        setTotalSubCost(prev => prev + item.price * item.quantity)
        setTotalCost(prev => prev + item.final_price * item.quantity)
      })
    }
  }, [OrderData])

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-6 lg:px-[108px]">
          <Flex
            vertical
            gap="large"
            style={{
              flex: 'auto',
              alignItems: 'center',
              justifyItems: 'center',
              paddingTop: '50px',
              paddingBottom: '50px',
              paddingLeft: '200px',
              paddingRight: '200px'
            }}
          >
            <Steps
              items={[
                {
                  title: 'Cart',
                  status: 'process',
                  icon: <LoadingOutlined />
                },
                {
                  title: 'Check out',
                  status: 'wait',
                  icon: <TruckOutlined />
                },
                {
                  title: 'Payment',
                  status: 'wait',
                  icon: <CreditCardOutlined />
                }
              ]}
            />
          </Flex>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-[104px] mb-24">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {OrderData?.cart.items.map((item, index) => (
                <OrderProductCard key={index} product={item} />
              ))}
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <PaymentSummary
                subtotal={totalSubCost.toFixed(2)}
                discount={(totalSubCost - totalCost).toFixed(2)}
                shipment="$22.50"
                total={totalCost.toFixed(2)}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
