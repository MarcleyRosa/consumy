interface cartItems {
  cart_id: number
  id: number
  price: number
  product: {id: number, store_id: number, title: string, price: number, image: string }
  product_id: string
  quantity: number
}
interface orderId {
  order: {
    id: number
  }
}

interface FullOrder {
  id: number, buyer_id: number, store_id: number, created_at: string, updated_at: string, state: string, order_items: { id: number,
  order_id: number,
  product_id: number,
  amount: number,
  price: string,
  created_at: string,
  updated_at: string,
  product: { id: 1, store_id: 1, title: string, price: string, created_at: string, updated_at: string, image_url: string }}[]
}

export type { orderId, cartItems, FullOrder }