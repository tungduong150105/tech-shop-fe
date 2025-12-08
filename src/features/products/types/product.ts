export type Product = {
  id: number
  name: string
  price: number
  final_price: number
  discount: number
  discount_percentage?: number
  quantity: number
  sold: number
  rating: number
  img: string[]
  specs: { label: string; value: string }[]
  specs_detail: { label: string; value: string }[]
  color: { name: string; code: string }[]
  category_id: number
  sub_category_id: number
}
