'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'
import { processPayment } from '@/lib/api/payments'
import { formatPrice } from '@/lib/utils'
import { CreditCard, Calendar, Lock } from 'lucide-react'

interface PaymentFormProps {
    orderId: string
    amount: number
}

export default function PaymentForm({ orderId, amount }: PaymentFormProps) {
    const router = useRouter()
    const { getAccessToken } = useAuth()
    const { clearCart } = useCart()

    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
    })

    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState('')
    const [step, setStep] = useState<'form' | 'processing' | 'success'>('form')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // Format card number with spaces
        if (name === 'cardNumber') {
            const formatted = value
                .replace(/\s/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim()
            setFormData((prev) => ({ ...prev, [name]: formatted }))
            return
        }

        // Format expiry date with slash
        if (name === 'expiryDate') {
            const cleaned = value.replace(/\D/g, '')
            let formatted = cleaned

            if (cleaned.length > 2) {
                formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
            }

            setFormData((prev) => ({ ...prev, [name]: formatted }))
            return
        }

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const validateForm = () => {
        // Remove spaces from card number
        const cardNumber = formData.cardNumber.replace(/\s/g, '')

        if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
            setError('Введите корректный номер карты (16 цифр)')
            return false
        }

        if (!formData.cardHolder.trim()) {
            setError('Введите имя держателя карты')
            return false
        }

        const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
        if (!expiryDatePattern.test(formData.expiryDate)) {
            setError('Введите корректную дату в формате ММ/ГГ')
            return false
        }

        if (formData.cvv.length !== 3 || !/^\d+$/.test(formData.cvv)) {
            setError('CVV должен содержать 3 цифры')
            return false
        }

        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!validateForm()) {
            return
        }

        setIsProcessing(true)
        setStep('processing')

        try {
            const accessToken = await getAccessToken()

            if (!accessToken) {
                throw new Error('Необходимо авторизоваться')
            }

            // Simulate payment processing delay
            await new Promise((resolve) => setTimeout(resolve, 2000))

            // Process payment
            await processPayment(accessToken, {
                orderId,
                paymentMethod: 'card',
                cardDetails: {
                    // In a real app, you would use a secure payment gateway
                    // and not send card details directly to your server
                    cardNumber: formData.cardNumber.replace(/\s/g, ''),
                    cardHolder: formData.cardHolder,
                    expiryDate: formData.expiryDate,
                    cvv: formData.cvv,
                },
            })

            // Clear cart after successful payment
            await clearCart()

            // Show success animation briefly before redirecting
            setStep('success')
            setTimeout(() => {
                router.push(`/checkout/success/${orderId}`)
            }, 1500)
        } catch (err: any) {
            setError(err.message || 'Ошибка при обработке платежа')
            setStep('form')
            setIsProcessing(false)
        }
    }

    if (step === 'processing') {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800"></div>
                <h2 className="mb-2 text-xl font-bold">Обработка платежа</h2>
                <p className="text-gray-600">Пожалуйста, не закрывайте страницу</p>
            </div>
        )
    }

    if (step === 'success') {
        return (
            <div className="py-12 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 className="mb-2 text-xl font-bold">Платеж успешно выполнен</h2>
                <p className="text-gray-600">Перенаправление на страницу подтверждения...</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>}

            <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
                <p className="flex items-center">
                    <Lock className="mr-2 h-5 w-5" />
                    <span>Это демонстрационная форма. Введите любые данные для тестирования.</span>
                </p>
            </div>

            <div>
                <label htmlFor="cardNumber" className="mb-1 block font-medium">
                    Номер карты
                </label>
                <div className="relative">
                    <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        className="input pl-10"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                    />
                    <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div>
                <label htmlFor="cardHolder" className="mb-1 block font-medium">
                    Имя держателя карты
                </label>
                <input
                    id="cardHolder"
                    name="cardHolder"
                    type="text"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    className="input"
                    placeholder="IVAN IVANOV"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="expiryDate" className="mb-1 block font-medium">
                        Срок действия
                    </label>
                    <div className="relative">
                        <input
                            id="expiryDate"
                            name="expiryDate"
                            type="text"
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="input pl-10"
                            placeholder="MM/ГГ"
                            maxLength={5}
                            required
                        />
                        <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div>
                    <label htmlFor="cvv" className="mb-1 block font-medium">
                        CVV
                    </label>
                    <input
                        id="cvv"
                        name="cvv"
                        type="password"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="input"
                        placeholder="123"
                        maxLength={3}
                        required
                    />
                </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between">
                    <span>Сумма к оплате:</span>
                    <span className="font-bold">{formatPrice(amount)}</span>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" className="btn-primary w-full" disabled={isProcessing}>
                    Оплатить {formatPrice(amount)}
                </button>
            </div>
        </form>
    )
}
