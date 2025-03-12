import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mb-6 text-2xl font-medium">Страница не найдена</h2>
      <p className="mb-8 max-w-md text-center text-gray-600">
        Запрашиваемая страница не существует или была удалена. Пожалуйста, проверьте URL или вернитесь на главную
        страницу.
      </p>
      <Link href="/" className="btn-primary">
        Вернуться на главную
      </Link>
    </div>
  )
}

