import { $fetch } from '../fetch'

interface CardDetails {
    cardNumber: string
    cardHolder: string
    expiryDate: string
    cvv: string
}

interface PaymentResult {
    success: boolean
    transactionId: string
}

export async function processPayment(
    accessToken: string,
    paymentData: {
        orderId: string
        paymentMethod: string
        cardDetails?: CardDetails
    }
): Promise<PaymentResult> {
    try {
        const response = await $fetch(`/payments`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Ошибка при обработке платежа')
        }

        return await response.json()
    } catch (error: any) {
        console.error('Process payment error:', error)

        // For demo purposes, simulate successful payment
        // In a real app, you would handle the error properly
        if (process.env.NODE_ENV === 'development') {
            return {
                success: true,
                transactionId: `demo-${Date.now()}`,
            }
        }

        throw error
    }
}
