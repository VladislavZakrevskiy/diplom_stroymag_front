"use client"

import { useState } from "react"
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react"

interface JobProps {
  job: {
    id: string
    title: string
    department: string
    location: string
    type: string
    description: string
    requirements: string[]
    salary: string
  }
}

export default function JobCard({ job }: JobProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex cursor-pointer items-center justify-between p-6" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h3 className="text-xl font-bold">{job.title}</h3>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Briefcase className="mr-1 h-4 w-4" />
              {job.department}
            </div>
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {job.type}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-4 font-bold text-gray-800">{job.salary}</div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <div className="mb-4">
            <h4 className="mb-2 font-bold">Описание:</h4>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div>
            <h4 className="mb-2 font-bold">Требования:</h4>
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <button className="btn-primary">Откликнуться на вакансию</button>
          </div>
        </div>
      )}
    </div>
  )
}

