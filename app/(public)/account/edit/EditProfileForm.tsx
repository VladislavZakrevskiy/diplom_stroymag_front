'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { updateUserProfile } from '@/lib/api/auth'
import type { User } from '@/types/auth'

interface EditProfileFormProps {
    user: User
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
    const router = useRouter()
    const { getAccessToken, setUser } = useAuth()

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
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
        setIsLoading(true)

        try {
            const accessToken = await getAccessToken()

            if (!accessToken) {
                throw new Error('Необходимо авторизоваться')
            }

            const updatedUser = await updateUserProfile(accessToken, {
                firstName: formData.firstName,
                lastName: formData.lastName,
            })

            setUser(updatedUser)
            setSuccess('Профиль успешно обновлен')

            // Refresh the page data
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Ошибка при обновлении профиля')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>}
            {success && <div className="rounded-md bg-green-50 p-4 text-green-700">{success}</div>}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="firstName" className="mb-1 block font-medium">
                        Имя
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lastName" className="mb-1 block font-medium">
                        Фамилия
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="mb-1 block font-medium">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    className="input bg-gray-50"
                    disabled
                    title="Email нельзя изменить"
                />
                <p className="mt-1 text-xs text-gray-500">Для изменения email обратитесь в службу поддержки</p>
            </div>

            <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => router.push('/account')} className="btn-outline">
                    Отмена
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
                </button>
            </div>
        </form>
    )
}
