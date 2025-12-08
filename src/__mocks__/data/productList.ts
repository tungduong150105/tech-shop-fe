import { Product } from '../../features/products/types/product'

export const mockProductList: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro M2 2023',
    price: 1999,
    final_price: 1799,
    discount: 10,
    quantity: 50,
    sold: 120,
    rating: 4.8,
    img: [
      'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/b/mbp14-silver-select-202301_1_4_1.jpg'
    ],
    specs: [
      { label: 'CPU', value: 'Apple M2 Pro' },
      { label: 'RAM', value: '16GB' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '14.2-inch Liquid Retina XDR' }
    ],
    specs_detail: [
      {
        label: 'Processor',
        value: 'Apple M2 Pro with 10-core CPU, 16-core GPU'
      },
      { label: 'Memory', value: '16GB unified memory' },
      { label: 'Storage', value: '512GB SSD' },
      {
        label: 'Display',
        value: '14.2-inch Liquid Retina XDR display, 3024x1964'
      },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Weight', value: '1.61 kg' }
    ],
    color: [
      { name: 'Space Gray', code: '#53565A' },
      { name: 'Silver', code: '#E2E2E2' }
    ],
    category_id: 1,
    sub_category_id: 101
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    price: 1299,
    final_price: 1199,
    discount: 8,
    quantity: 100,
    sold: 350,
    rating: 4.9,
    img: [
      'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_5.png'
    ],
    specs: [
      { label: 'Chip', value: 'A17 Pro' },
      { label: 'RAM', value: '8GB' },
      { label: 'Storage', value: '256GB' },
      { label: 'Camera', value: '48MP Main + 12MP Ultra Wide + 12MP Telephoto' }
    ],
    specs_detail: [
      { label: 'Chip', value: 'A17 Pro chip with 6-core CPU, 6-core GPU' },
      {
        label: 'Display',
        value: '6.7-inch Super Retina XDR display, 2796x1290'
      },
      {
        label: 'Camera',
        value: '48MP Main, 12MP Ultra Wide, 12MP 5x Telephoto'
      },
      { label: 'Battery', value: 'Up to 29 hours video playback' },
      { label: 'Connectivity', value: '5G, Wi-Fi 6E, Bluetooth 5.3' }
    ],
    color: [
      { name: 'Natural Titanium', code: '#8F8F8F' },
      { name: 'Blue Titanium', code: '#5A7D9A' },
      { name: 'White Titanium', code: '#F1F1F1' },
      { name: 'Black Titanium', code: '#1D1D1F' }
    ],
    category_id: 2,
    sub_category_id: 201
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    final_price: 1099,
    discount: 8,
    quantity: 75,
    sold: 200,
    rating: 4.7,
    img: [
      'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/ss-s24-timultra-22_1.png'
    ],
    specs: [
      { label: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { label: 'RAM', value: '12GB' },
      { label: 'Storage', value: '256GB' },
      {
        label: 'Camera',
        value: '200MP Main + 50MP Periscope + 12MP Ultra Wide'
      }
    ],
    specs_detail: [
      { label: 'Processor', value: 'Qualcomm Snapdragon 8 Gen 3 for Galaxy' },
      { label: 'Display', value: '6.8-inch Dynamic AMOLED 2X, 3120x1440' },
      {
        label: 'Camera',
        value: '200MP Wide + 50MP Telephoto + 12MP Ultra Wide + 10MP Telephoto'
      },
      { label: 'Battery', value: '5000mAh, 45W fast charging' },
      { label: 'S Pen', value: 'Included' }
    ],
    color: [
      { name: 'Titanium Gray', code: '#71797E' },
      { name: 'Titanium Black', code: '#1D1D1F' },
      { name: 'Titanium Violet', code: '#B8AFE6' },
      { name: 'Titanium Yellow', code: '#F7DC6F' }
    ],
    category_id: 2,
    sub_category_id: 202
  },
  {
    id: 4,
    name: 'iPad Air M1 2024',
    price: 799,
    final_price: 699,
    discount: 13,
    quantity: 60,
    sold: 90,
    rating: 4.6,
    img: [
      'https://cdn2.cellphones.com.vn/x/media/catalog/product/5/_/5_158_3.jpg'
    ],
    specs: [
      { label: 'Chip', value: 'Apple M1' },
      { label: 'RAM', value: '8GB' },
      { label: 'Storage', value: '64GB' },
      { label: 'Display', value: '11-inch Liquid Retina' }
    ],
    specs_detail: [
      { label: 'Chip', value: 'Apple M1 chip with 8-core CPU, 7-core GPU' },
      { label: 'Display', value: '11-inch Liquid Retina display, 2388x1668' },
      { label: 'Storage', value: '64GB' },
      {
        label: 'Camera',
        value: '12MP Wide camera, 12MP Ultra Wide front camera'
      },
      { label: 'Battery', value: 'Up to 10 hours' },
      { label: 'Connectivity', value: 'Wi-Fi 6, 5G, USB-C' }
    ],
    color: [
      { name: 'Space Gray', code: '#53565A' },
      { name: 'Silver', code: '#F0F0F0' },
      { name: 'Pink', code: '#FADADD' },
      { name: 'Purple', code: '#D1CDDA' },
      { name: 'Blue', code: '#A4DDED' }
    ],
    category_id: 3,
    sub_category_id: 301
  },
  {
    id: 5,
    name: 'Dell XPS 13 Plus',
    price: 1499,
    final_price: 1299,
    discount: 13,
    quantity: 30,
    sold: 45,
    rating: 5.5,
    img: [
      'https://cdn2.cellphones.com.vn/x/media/catalog/product/t/e/text_ng_n_3__7_102.png'
    ],
    specs: [
      { label: 'Processor', value: 'Intel Core i7-1360P' },
      { label: 'RAM', value: '16GB' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '13.4-inch FHD+' }
    ],
    specs_detail: [
      {
        label: 'Processor',
        value: '13th Gen Intel Core i7-1360P (12 cores, 16 threads)'
      },
      { label: 'Memory', value: '16GB LPDDR5' },
      { label: 'Storage', value: '512GB M.2 PCIe NVMe SSD' },
      { label: 'Display', value: '13.4-inch FHD+ (1920x1200) InfinityEdge' },
      { label: 'Graphics', value: 'Intel Iris Xe Graphics' },
      { label: 'Battery', value: '55Whr, up to 12 hours' }
    ],
    color: [
      { name: 'Platinum Silver', code: '#C0C0C0' },
      { name: 'Graphite', code: '#424242' }
    ],
    category_id: 1,
    sub_category_id: 102
  },
  {
    id: 6,
    name: 'Dell XPS 13 Plus',
    price: 1499,
    final_price: 1299,
    discount: 13,
    quantity: 30,
    sold: 45,
    rating: 4.5,
    img: [
      'https://cdn2.cellphones.com.vn/x/media/catalog/product/t/e/text_ng_n_3__7_102.png'
    ],
    specs: [
      { label: 'Processor', value: 'Intel Core i7-1360P' },
      { label: 'RAM', value: '16GB' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '13.4-inch FHD+' }
    ],
    specs_detail: [
      {
        label: 'Processor',
        value: '13th Gen Intel Core i7-1360P (12 cores, 16 threads)'
      },
      { label: 'Memory', value: '16GB LPDDR5' },
      { label: 'Storage', value: '512GB M.2 PCIe NVMe SSD' },
      { label: 'Display', value: '13.4-inch FHD+ (1920x1200) InfinityEdge' },
      { label: 'Graphics', value: 'Intel Iris Xe Graphics' },
      { label: 'Battery', value: '55Whr, up to 12 hours' }
    ],
    color: [
      { name: 'Platinum Silver', code: '#C0C0C0' },
      { name: 'Graphite', code: '#424242' }
    ],
    category_id: 1,
    sub_category_id: 102
  },
  {
    id: 7,
    name: 'Dell XPS 13 Plus',
    price: 1499,
    final_price: 1299,
    discount: 13,
    quantity: 30,
    sold: 45,
    rating: 4.5,
    img: [
      'https://cdn2.cellphones.com.vn/x/media/catalog/product/t/e/text_ng_n_3__7_102.png'
    ],
    specs: [
      { label: 'Processor', value: 'Intel Core i7-1360P' },
      { label: 'RAM', value: '16GB' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '13.4-inch FHD+' }
    ],
    specs_detail: [
      {
        label: 'Processor',
        value: '13th Gen Intel Core i7-1360P (12 cores, 16 threads)'
      },
      { label: 'Memory', value: '16GB LPDDR5' },
      { label: 'Storage', value: '512GB M.2 PCIe NVMe SSD' },
      { label: 'Display', value: '13.4-inch FHD+ (1920x1200) InfinityEdge' },
      { label: 'Graphics', value: 'Intel Iris Xe Graphics' },
      { label: 'Battery', value: '55Whr, up to 12 hours' }
    ],
    color: [
      { name: 'Platinum Silver', code: '#C0C0C0' },
      { name: 'Graphite', code: '#424242' }
    ],
    category_id: 1,
    sub_category_id: 102
  }
]
