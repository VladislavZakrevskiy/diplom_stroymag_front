"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  onClose?: () => void
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
      if (onClose) {
        onClose()
      }
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск товаров..."
        className="input pr-20"
        autoFocus
      />
      <div className="absolute right-0 top-0 h-full flex items-center">
        <button type="submit" className="h-full px-3 text-gray-600 hover:text-gray-800" aria-label="Поиск">
          <Search size={20} />
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="h-full px-3 text-gray-600 hover:text-gray-800"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </form>
  )
}

