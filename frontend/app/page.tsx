import { BlogHeader } from "@/components/blog-header"
import { BlogHero } from "@/components/blog-hero"
import { BlogPosts } from "@/components/blog-posts"
import { BlogSidebar } from "@/components/blog-sidebar"
import { BlogFooter } from "@/components/blog-footer"

export default function BlogHome() {
  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <BlogHero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BlogPosts />
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </div>
      <BlogFooter />
    </div>
  )
}
