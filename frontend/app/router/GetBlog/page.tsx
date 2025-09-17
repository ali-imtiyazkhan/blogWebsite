"use client"

import { useEffect, useState } from "react"

interface Blog {
  id: string
  title: string
  content: string
  published: boolean
  authorId: string
  createdAt: string
  updatedAt: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://127.0.0.1:8787/api/v1/blog/bulk", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            
          },
        })

        if (res.ok) {
          const data = await res.json()
          setBlogs(data.blogs || [])
        } else {
          const err = await res.json()
          setError(err.message || "Failed to load blogs")
        }
      } catch (err) {
        console.error(err)
        setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  if (loading) return <p className="text-center py-10">⏳ Loading blogs...</p>
  if (error) return <p className="text-center py-10 text-red-500"> {error}</p>

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs found.</p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="border p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-700 mt-2">{blog.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Published: {blog.published ? " Yes" : " No"}
              </p>
              <p className="text-xs text-gray-400">
                Created at: {new Date(blog.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
