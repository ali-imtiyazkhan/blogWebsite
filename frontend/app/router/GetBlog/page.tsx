"use client"

import { BlogHeader } from "@/components/blog-header"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Loader2 } from "lucide-react"

interface Blog {
  id: string
  title: string
  content: string
  published: boolean
  authorId: string
  createdAt: string
  updatedAt: string
  categories?: string | null
  image?: string | null
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const getRandomDate = () => {
    const start = new Date(2022, 0, 1).getTime()
    const end = new Date().getTime()
    const randomTime = start + Math.random() * (end - start)
    return new Date(randomTime).toLocaleDateString()
  }

  const getReadTime = (content: string) => {
    const words = content.split(" ").length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min read`
  }

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("https://backend.blog-backend-imtiyaz.workers.dev/api/v1/blog/bulk", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.ok) {
          const data = await res.json()

          const blogsWithExtras = (data.blogs || []).map((blog: Blog) => ({
            ...blog,
            createdAt: getRandomDate(),
            image:
              blog.image ||
              `https://picsum.photos/seed/${blog.id}/600/400`,
            readTime: getReadTime(blog.content),
          }))

          setBlogs(blogsWithExtras)
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-600" />
      </div>
    )

  if (error) return <p className="text-center py-10 text-red-500">{error}</p>

  return (
    <div>
      <BlogHeader />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
        {blogs.length === 0 ? (
          <p className="text-gray-600">No blogs found.</p>
        ) : (
          <div className="space-y-8">
            {blogs.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        {post.categories && (
                          <Badge variant="outline">{post.categories}</Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-balance hover:text-gray-700 transition-colors">
                        {post.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground text-pretty mb-4 leading-relaxed">
                        {post.content.slice(0, 150)}...
                      </p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.authorId || "unknown user"}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.createdAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.updatedAt}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
