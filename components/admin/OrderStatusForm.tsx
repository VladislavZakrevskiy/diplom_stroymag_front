'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { updateOrderStatus } from '@/lib/api/admin'
import type { Order } from '@/types/order'
import { OrderStatus } from '@/types/order'

interface OrderStatusFormProps {
    order: Order
}

export default function OrderStatusForm({ order }: OrderStatusFormProps) {
    const router = useRouter()
    const { getAccessToken } = useAuth()

    const [status, setStatus] = useState(order.status)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value as OrderStatus)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setIsSubmitting(true)

        try {
            const accessToken = await getAccessToken()

            if (!accessToken) {
                throw new Error('Необходимо авторизоваться')
            }

            await updateOrderStatus(accessToken, order.id, status)

            setSuccess('Статус заказа успешно обновлен')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Ошибка при обновлении статуса')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>}
            {success && <div className="rounded-md bg-green-50 p-4 text-green-700">{success}</div>}

            <div>
                <label htmlFor="status" className="mb-1 block font-medium">
                    Текущий статус
                </label>
                <select id="status" value={status} onChange={handleStatusChange} className="input">
                    <option value={OrderStatus.PENDING}>Новый</option>
                    <option value={OrderStatus.PROCESSING}>В обработке</option>
                    <option value={OrderStatus.SHIPPED}>Отправлен</option>
                    <option value={OrderStatus.DELIVERED}>Выполнен</option>
                    <option value={OrderStatus.CANCELLED}>Отменен</option>
                </select>
            </div>

            <button
                type="submit"
                className="w-full rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
                disabled={isSubmitting || status === order.status}
            >
                {isSubmitting ? 'Обновление...' : 'Обновить статус'}
            </button>
        </form>
    )
}
