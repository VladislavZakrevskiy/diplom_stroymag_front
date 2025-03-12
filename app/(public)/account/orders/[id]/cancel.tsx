'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { cancelOrder } from '@/lib/api/orders'
import { XCircle } from 'lucide-react'
import { CookieManager } from '@/lib/cookie/CookieManager'

export default function CancelOrderButton({ orderId }: { orderId: string }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const cookieManager = useRef(new CookieManager())

    const handleCancel = async () => {
        setIsLoading(true)

        try {
            const accessToken = cookieManager.current.get('accessToken')

            if (!accessToken) {
                throw new Error('Необходимо авторизоваться')
            }

            await cancelOrder(accessToken, orderId)

            router.refresh()
        } catch (error) {
            console.error('Ошибка при отмене заказа:', error)
            alert('Не удалось отменить заказ. Пожалуйста, попробуйте позже.')
        } finally {
            setIsLoading(false)
            setShowConfirm(false)
        }
    }

    if (showConfirm) {
        return (
            <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <div className="mb-3 flex items-center">
                    <XCircle className="mr-2 h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-800">Вы уверены?</span>
                </div>
                <p className="mb-3 text-sm text-red-700">
                    Отмена заказа необратима. Вы действительно хотите отменить заказ?
                </p>
                <div className="flex space-x-2">
                    <button
                        onClick={handleCancel}
                        className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Отмена...' : 'Да, отменить'}
                    </button>
                    <button
                        onClick={() => setShowConfirm(false)}
                        className="rounded-md bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-300"
                        disabled={isLoading}
                    >
                        Нет, вернуться
                    </button>
                </div>
            </div>
        )
    }

    return (
        <button
            className="w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            onClick={() => setShowConfirm(true)}
        >
            Отменить заказ
        </button>
    )
}
