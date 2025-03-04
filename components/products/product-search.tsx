"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"

interface ProductSearchProps {
  initialValue?: string
}

export default function ProductSearch({ initialValue = "" }: ProductSearchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(initialValue)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())

    if (searchTerm) {
      params.set("search", searchTerm)
    } else {
      params.delete("search")
    }

    // Reset to page 1 when search changes
    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск товаров..."
        className="input pr-10"
      />
      <button type="submit" className="absolute right-0 top-0 h-full px-3 text-gray-600" aria-label="Поиск">
        <Search size={20} />
      </button>
    </form>
  )
}

