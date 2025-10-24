import ProductDetail from '../components/products/ProductDetail'
import { useState } from 'react'

const Product = {
  _id: 1,
  name: 'MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch',
  price: 1299,
  discount: 12,
  quantity: 1,
  sold: 5,
  rating: 4.5,
  img: [
    'https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_1__1_8.png',
    'https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-sa-mac-thumb-1-600x600.jpg'
  ],
  specs: [
    { label: 'brand', value: 'Apple' },
    { label: 'Model Name', value: 'Macbook Pro' },
    { label: 'Screen Size', value: '13.3 Inches' },
    { label: 'Hard Disk Size', value: '256 GB' },
    { label: 'CPU Model', value: 'Apple M1' },
    { label: 'CPU Model', value: 'Apple M1' },
    { label: 'CPU Model', value: 'Apple M1' },
    { label: 'CPU Model', value: 'Apple M1' },
    { label: 'CPU Model', value: 'Apple M1' },
    { label: 'CPU Model', value: 'Apple M1' }
  ],
  color: [
    { name: 'Silver', code: '#C0C0C0' },
    { name: 'Space Gray', code: '#4B4B4B' }
  ]
}

const Home = () => {
  return (
    <div>
      <ProductDetail Product={Product} />
    </div>
  )
}

export default Home
