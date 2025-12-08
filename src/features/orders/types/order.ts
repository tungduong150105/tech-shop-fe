type color = {
  name: string
  code: string
}

export type Item = {
  id: number
  name: string
  price: number
  final_price: number
  discount: number
  discount_percentage?: number
  quantity: number
  sold: number
  rating: number
  image_url: string
  specs: { label: string; value: string }[]
  specs_detail: { label: string; value: string }[]
  color: { name: string; code: string }
  category_id: number
}

export type Cart = {
  id: number
  total_number: number
  total_price: number
  total_original_price: number
  total_discount: number
  items: Item[]
}
