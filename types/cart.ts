import { Product } from './product'

export interface CartItem {
    id: string
    cartId: string
    cart: Cart
    productId: string
    product: Product
    quantity: number
    createdAt: string
    updatedAt: string
}

export interface Cart {
    id: string
    items: CartItem[]
    userId: string
}
