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

export type { orderId, cartItems}