export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  imageUrl: string
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  total: number
}

