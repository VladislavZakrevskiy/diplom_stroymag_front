"use client"

import { useRouter } from "next/navigation"

interface AdminOrdersFilterProps {
  selectedStatus: string
}

export default function AdminOrdersFilter({ selectedStatus }: AdminOrdersFilterProps) {
  const router = useRouter()

  const statuses = [
    { value: "", label: "Все заказы" },
    { value: "new", label: "Новые" },
    { value: "processing", label: "В обработке" },
    { value: "shipped", label: "Отправленные" },
    { value: "completed", label: "Выполненные" },
    { value: "cancelled", label: "Отмененные" },
  ]

  const handleStatusChange = (status: string) => {
    router.push(`/admin/orders${status ? `?status=${status}` : ""}`)
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-bold">Фильтры</h2>

      <div>
        <label className="mb-2 block font-medium">Статус заказа</label>
        <div className="space-y-2">
          {statuses.map((status) => (
            <label key={status.value} className="flex items-center">
              <input
                type="radio"
                name="status"
                value={status.value}
                checked={selectedStatus === status.value}
                onChange={() => handleStatusChange(status.value)}
                className="mr-2 h-4 w-4"
              />
              <span>{status.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

