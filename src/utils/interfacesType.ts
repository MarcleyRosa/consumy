interface cartItems {
  cart_id: number
  id: number
  price: number
  product: {id: number, store_id: number, title: string, price: number, image_url: string }
  product_id: string
  quantity: number
}
interface orderId {
  order: {
    id: number
  }
}

interface Store {
  name: string, id: string, image_url: string, active: boolean
}

type OptionsState = 'loading' |'created' | 'paid' | 'payment_failed' | 'accepted' | 'prepared' | 'shipped' | 'completed'

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

interface State {
  loading: string,
  payment_failed: string,
  created: string,
  paid: string,
  accepted: string,
  prepared: string,
  shipped: string,
  completed: string
}

interface Orders {
  orders: {  id: number, buyer_id: number, store_id: number, created_at: string, updated_at: string, state: OptionsState, order_items: { id: number,
    order_id: number,
    product_id: number,
    amount: number,
    price: string,
    created_at: string,
    updated_at: string,
    product: { id: 1, store_id: 1, title: string, price: string, created_at: string, updated_at: string, image_url: string }}[]}[]
}

interface Product {
  id: number,
  title: string,
  image_url: string,
  price: number
  store_id: number,
  stock: number
}
interface User {
  id: number
  email: string
  created_at: string
  updated_at: string
  role: string
  address: {
    id: number
    street: string
    house_number: string
    neighborhood: string
    city: string
    state: string
    zip_code: string
    country: string
    user_id: number
    created_at: string
    updated_at: string
  }
}


export type { orderId, cartItems, FullOrder, State, Orders, OptionsState, Product, User, Store }