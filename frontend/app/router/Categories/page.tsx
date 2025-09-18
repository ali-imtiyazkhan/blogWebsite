"use client"
import { useState } from "react"

interface Blog {
  id: number
  title: string
  content: string
  category: string
  published: boolean
  createdAt: string
}

export default function BlogWithCategories() {
  const [categories] = useState([
    { id: 1, name: "Technology" },
    { id: 2, name: "Travel" },
    { id: 3, name: "Food" },
    { id: 4, name: "Lifestyle" },
    { id: 5, name: "Education" },
  ])

  const [blogs] = useState<Blog[]>([
    {
      id: 1,
      title: "Next.js 14 New Features",
      content: "Next.js 14 comes with app router improvements and faster rendering...",
      category: "Technology",
      published: true,
      createdAt: "2025-07-12",
    },
    {
      id: 2,
      title: "My Trip to Manali",
      content: "Last month I visited Manali. The mountains, rivers and snowfall were amazing...",
      category: "Travel",
      published: true,
      createdAt: "2025-06-05",
    },
    {
      id: 3,
      title: "Top 5 Street Foods in Delhi",
      content: "From chole bhature to golgappe, Delhi has the most delicious street food...",
      category: "Food",
      published: true,
      createdAt: "2025-05-20",
    },
    {
      id: 4,
      title: "Morning Routine for Productivity",
      content: "Start your day with meditation, light exercise and journaling...",
      category: "Lifestyle",
      published: false,
      createdAt: "2025-04-18",
    },
    {
      id: 5,
      title: "Why Online Learning is the Future",
      content: "E-learning platforms are changing how we learn, offering flexibility and reach...",
      category: "Education",
      published: true,
      createdAt: "2025-03-10",
    },
  ])

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Categories */}
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <span
            key={cat.id}
            className="px-4 py-2 rounded-full bg-gray-700 text-white font-medium cursor-pointer hover:bg-gray-800"
          >
            {cat.name}
          </span>
        ))}
      </div>

      {/* Blogs */}
      <h2 className="text-2xl font-bold mb-4">All Blogs</h2>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-600 text-sm mb-2">Category: {blog.category}</p>
            <p className="text-gray-700">{blog.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Published: {blog.published ? "Yes" : "No"}
            </p>
            <p className="text-xs text-gray-400">
              Created at: {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
