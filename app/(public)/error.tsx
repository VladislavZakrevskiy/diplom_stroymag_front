"use client"

import { useEffect } from "react"
import Link from "next/link"

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="mb-4 text-2xl font-bold text-gray-800">Что-то пошло не так</h1>
      <p className="mb-8 max-w-md text-center text-gray-600">
        Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте еще раз или вернитесь на главную страницу.
      </p>
      <div className="flex gap-4">
        <button onClick={reset} className="btn-primary">
          Попробовать снова
        </button>
        <Link href="/" className="btn-outline">
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}

