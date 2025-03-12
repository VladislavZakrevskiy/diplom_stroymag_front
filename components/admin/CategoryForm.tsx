"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { createCategory, updateCategory } from "@/lib/api/admin"

interface CategoryFormProps {
  category?: {
    id: string
    name: string
    description?: string
  }
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const { getAccessToken } = useAuth()

  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const accessToken = await getAccessToken()

      if (!accessToken) {
        throw new Error("Необходимо авторизоваться")
      }

      if (category) {
        // Update existing category
        await updateCategory(accessToken, category.id, formData)
      } else {
        // Create new category
        await createCategory(accessToken, formData)
      }

      router.push("/admin/categories")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Ошибка при сохранении категории")
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {error && <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>}

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Название категории *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block font-medium">
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="input"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push("/admin/categories")}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Отмена
        </button>
        <button
          type="submit"
          className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Сохранение..." : category ? "Сохранить изменения" : "Создать категорию"}
        </button>
      </div>
    </form>
  )
}

