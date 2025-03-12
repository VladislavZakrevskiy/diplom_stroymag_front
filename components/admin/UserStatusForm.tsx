"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { updateUserStatus } from "@/lib/api/admin"
import type { User } from "@/types/auth"

interface UserStatusFormProps {
  user: User & { isActive: boolean }
}

export default function UserStatusForm({ user }: UserStatusFormProps) {
  const router = useRouter()
  const { getAccessToken } = useAuth()

  const [isActive, setIsActive] = useState(user.isActive)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleStatusChange = () => {
    setIsActive(!isActive)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsSubmitting(true)

    try {
      const accessToken = await getAccessToken()

      if (!accessToken) {
        throw new Error("Необходимо авторизоваться")
      }

      await updateUserStatus(accessToken, user.id, isActive)

      setSuccess(`Пользователь успешно ${isActive ? "активирован" : "заблокирован"}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Ошибка при обновлении статуса")
      setIsActive(user.isActive) // Revert to original state on error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>}
      {success && <div className="rounded-md bg-green-50 p-4 text-green-700">{success}</div>}

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isActive}
            onChange={handleStatusChange}
            className="mr-2 h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
          />
          <span>Пользователь активен</span>
        </label>
        <p className="mt-1 text-sm text-gray-500">
          {isActive
            ? "Пользователь может входить в систему и совершать покупки"
            : "Пользователь не сможет входить в систему и совершать покупки"}
        </p>
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
        disabled={isSubmitting || isActive === user.isActive}
      >
        {isSubmitting ? "Обновление..." : isActive ? "Активировать пользователя" : "Заблокировать пользователя"}
      </button>
    </form>
  )
}

