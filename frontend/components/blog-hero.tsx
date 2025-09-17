"use client"


import { Button } from "@/components/ui/button"
import { ArrowRight, Router } from "lucide-react"
import { useRouter } from "next/navigation";



export function BlogHero() {



  const route = useRouter()
  function hangelgetblog(){
    route.push("/router/GetBlog")
  }


  function handlePost() {
    route.push("/router/PostBlog")

  }
  return (
    <section className="bg-gradient-to-br from-background to-muted py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">Welcome to My Blog</h1>
        <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
          Discover insights, stories, and ideas that inspire. Join our community of readers exploring the latest trends
          in technology, design, and innovation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={hangelgetblog} size="lg" className="text-lg px-8 bg-transparent border-gray-800 text-black hover:bg-gray-300">
            Start Reading
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button onClick={handlePost} variant="outline" size="lg" className="text-white px-8 bg-gray-800 hover:bg-gray-900 cursor-pointer">
            Post a Blog
          </Button>
        </div>
      </div>
    </section>
  )
}
