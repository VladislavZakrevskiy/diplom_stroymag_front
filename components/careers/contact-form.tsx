"use client"

import Link from "next/link"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
  })

  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // В реальном приложении здесь будет отправка данных на сервер
      // Имитация задержки для демонстрации
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Успешная отправка
      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        message: "",
      })
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)

      // Сбросить статус через 5 секунд
      setTimeout(() => {
        setSubmitStatus("idle")
      }, 5000)
    }
  }

  return (
    <div className="rounded-lg bg-white p-8 shadow-md">
      {submitStatus === "success" && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5" />
            <p className="font-medium">Ваше резюме успешно отправлено! Мы свяжемся с вами в ближайшее время.</p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            <p className="font-medium">
              Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами по email.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Ваше имя *
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
            <label htmlFor="email" className="mb-1 block font-medium">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className="mb-1 block font-medium">
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="input"
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div>
            <label htmlFor="position" className="mb-1 block font-medium">
              Интересующая вакансия
            </label>
            <select id="position" name="position" value={formData.position} onChange={handleChange} className="input">
              <option value="">Выберите вакансию</option>
              <option value="Менеджер по продажам">Менеджер по продажам</option>
              <option value="Кладовщик">Кладовщик</option>
              <option value="Водитель-экспедитор">Водитель-экспедитор</option>
              <option value="Специалист по интернет-маркетингу">Специалист по интернет-маркетингу</option>
              <option value="Менеджер по закупкам">Менеджер по закупкам</option>
              <option value="Другое">Другое</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block font-medium">
            Сопроводительное письмо
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="input"
            placeholder="Расскажите немного о себе и своем опыте работы"
          ></textarea>
        </div>

        <div>
          <label htmlFor="resume" className="mb-1 block font-medium">
            Прикрепить резюме (PDF, DOC, DOCX) *
          </label>
          <div className="relative">
            <input
              id="resume"
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx"
              required
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
            >
              <div className="flex items-center">
                <Upload className="mr-2 h-5 w-5 text-gray-500" />
                <span className="text-gray-500">{file ? file.name : "Выберите файл"}</span>
              </div>
              <button
                type="button"
                className="rounded bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Обзор
              </button>
            </div>
          </div>
          {file && (
            <p className="mt-1 text-sm text-green-600">
              Файл выбран: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} МБ)
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input
            id="privacy"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
            required
          />
          <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">
            Я согласен на обработку персональных данных в соответствии с{" "}
            <Link href="/privacy" className="text-gray-800 hover:underline">
              политикой конфиденциальности
            </Link>
          </label>
        </div>

        <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Отправить резюме"}
        </button>
      </form>
    </div>
  )
}

