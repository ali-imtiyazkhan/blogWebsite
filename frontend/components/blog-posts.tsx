import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Explore the latest trends shaping the web development landscape, from AI integration to new frameworks that are revolutionizing how we build applications.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Technology",
    image: "/modern-web-dev-workspace.png",
  },
  {
    id: 2,
    title: "Building Accessible User Interfaces: A Complete Guide",
    excerpt:
      "Learn how to create inclusive digital experiences that work for everyone. This comprehensive guide covers best practices for accessibility in modern web design.",
    author: "Michael Chen",
    date: "March 12, 2024",
    readTime: "8 min read",
    category: "Design",
    image: "/accessible-design-interface-mockup.jpg",
  },
  {
    id: 3,
    title: "Mastering React Server Components: Performance and Best Practices",
    excerpt:
      "Dive deep into React Server Components and discover how they can dramatically improve your application's performance while simplifying your architecture.",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    readTime: "12 min read",
    category: "Development",
    image: "/react-code-screen.png",
  },
]

export function BlogPosts() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-balance">Latest Articles</h2>
      </div>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
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
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-balance hover:text-gray-700 transition-colors">{post.title}</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-pretty mb-4 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
