"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, BriefcaseIcon, MapPinIcon, DollarSignIcon } from 'lucide-react'

// Mock data for job listings
const jobListings = [
  { id: 1, title: "Brand Ambassador", company: "Brisk Marketing", location: "Nairobi", salary: "KES8000 - KES12000", type: "Full-time" },
  { id: 2, title: "Promoter", company: "Sense8", location: "Kisumu", salary: "KES9000 - KES14000", type: "Full-time" },
  { id: 2, title: "Team Leader", company: "Sense8", location: "Kisumu", salary: "KES9000 - KES14000", type: "Full-time" },
  { id: 2, title: "Project Manager", company: "Sense8", location: "Kisumu", salary: "KES9000 - KES14000", type: "Full-time" },
  { id: 3, title: "Sandwich Board Holder", company: "Blue Antelope", location: "Machakos", salary: "KES7000 - KES11000", type: "Contract" },
  { id: 4, title: "Brand Ambassador", company: "Brisk Marketing", location: "Nairobi", salary: "KES10000 - KES15000", type: "Full-time" },
  { id: 5, title: "Team Leader", company: "AfterSix", location: "Nairobi", salary: "KES8000 - KES13000", type: "Part-time" },
]

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [jobType, setJobType] = useState("All")

  const filteredJobs = jobListings.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (jobType === "All" || job.type === jobType)
  )

  return (
    <div className="container mx-auto p-4 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">Hokela - Open Positions</h1>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <Select onValueChange={setJobType} defaultValue="All">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            <SelectItem value="Full-time">Full-time</SelectItem>
            <SelectItem value="Part-time">Part-time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <SearchIcon className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.map(job => (
          <Card key={job.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-800">{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-blue-600">
                  <BriefcaseIcon className="mr-2 h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <DollarSignIcon className="mr-2 h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{job.type}</Badge>
              </div>
              <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">Apply Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}