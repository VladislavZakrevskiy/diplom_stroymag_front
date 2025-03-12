import { Address } from '@/lib/api/addresses'
import { User } from './auth'
import { Product } from './product'

export interface OrderItem {
    id: string
    orderId: string
    order: Order
    productId: string
    product: Product
    quantity: number
    price: number
    discount: number
    createdAt: string
    updatedAt: string
}

export interface Order {
    id: string
    userId: string
    user: User
    items: OrderItem[]
    status: OrderStatus
    totalAmount: number
    deliveryMethod: string
    deliveryCost: number
    address: string
    phone: string
    paymentMethod: string
    paymentStatus: PaymentStatus
    trackingNumber?: string
    notes?: string
    createdAt: string
    updatedAt: string
}

export enum OrderStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
}
