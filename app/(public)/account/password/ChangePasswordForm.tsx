'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { changePassword } from '@/lib/api/auth'
import { LockKeyhole } from 'lucide-react'

export default function ChangePasswordForm() {
    const router = useRouter()
    const { getAccessToken } = useAuth()

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Новый пароль и подтверждение не совпадают')
            return
        }

        // Validate password strength
        if (formData.newPassword.length < 8) {
            setError('Новый пароль должен содержать не менее 8 символов')
            return
        }

        setIsLoading(true)

        try {
            const accessToken = await getAccessToken()

            if (!accessToken) {
                throw new Error('Необходимо авторизоваться')
            }

            await changePassword(accessToken, formData.currentPassword, formData.newPassword)

            setSuccess('Пароль успешно изменен')
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            })
        } catch (err: any) {
            setError(err.message || 'Ошибка при смене пароля')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>}
            {success && <div className="rounded-md bg-green-50 p-4 text-green-700">{success}</div>}

            <div className="rounded-lg bg-blue-50 p-4 text-blue-800">
                <div className="flex items-start">
                    <LockKeyhole className="mr-2 mt-1 h-5 w-5 flex-shrink-0" />
                    <p>
                        Для безопасности используйте пароль длиной не менее 8 символов, содержащий буквы, цифры и
                        специальные символы. Не используйте один и тот же пароль на разных сайтах.
                    </p>
                </div>
            </div>

            <div>
                <label htmlFor="currentPassword" className="mb-1 block font-medium">
                    Текущий пароль
                </label>
                <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>

            <div>
                <label htmlFor="newPassword" className="mb-1 block font-medium">
                    Новый пароль
                </label>
                <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="input"
                    required
                    minLength={8}
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="mb-1 block font-medium">
                    Подтверждение нового пароля
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>

            <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => router.push('/account')} className="btn-outline">
                    Отмена
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Сохранение...' : 'Изменить пароль'}
                </button>
            </div>
        </form>
    )
}
