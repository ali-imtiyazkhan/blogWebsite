import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, TrendingUp, Tag } from "lucide-react"

const recentPosts = [
  {
    title: "10 CSS Tricks Every Developer Should Know",
    date: "March 8, 2024",
  },
  {
    title: "The Rise of AI in Content Creation",
    date: "March 5, 2024",
  },
  {
    title: "Building Scalable APIs with Node.js",
    date: "March 2, 2024",
  },
]

const categories = [
  { name: "Technology", count: 12 },
  { name: "Design", count: 8 },
  { name: "Development", count: 15 },
  { name: "AI & Machine Learning", count: 6 },
  { name: "Web Performance", count: 4 },
]

const tags = [
  "React",
  "Next.js",
  "TypeScript",
  "CSS",
  "JavaScript",
  "Node.js",
  "Design Systems",
  "UX/UI",
  "Performance",
  "Accessibility",
]

export function BlogSidebar() {
  return (
    <div className="space-y-6">
      {/* Newsletter Signup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-gray-800" />
            Subscribe to Newsletter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-pretty">
            Get the latest articles and insights delivered directly to your inbox.
          </p>
          <div className="space-y-2">
            <Input placeholder="Enter your email" type="email" />
            <Button className="w-full bg-gray-800 hover:bg-gray-700">Subscribe</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-800" />
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentPosts.map((post, index) => (
            <div key={index} className="space-y-1">
              <h4 className="text-sm font-medium text-balance hover:text-gray-700 cursor-pointer transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-muted-foreground">{post.date}</p>
              {index < recentPosts.length - 1 && <hr className="my-3" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm hover:text-gray-700 cursor-pointer transition-colors">{category.name}</span>
              <Badge variant="secondary" className="text-xs bg-gray-700">
                {category.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-800" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs hover:bg-gray-700 hover:text-gray-foreground cursor-pointer transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
