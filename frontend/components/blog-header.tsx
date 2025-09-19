import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu } from "lucide-react"

export function BlogHeader() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-700">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl text-balance">My Blog</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-800 hover:text-gray-900 transition-all duration-300 relative group"
            >
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/router/About"
              className="text-gray-800 hover:text-gray-900 transition-all duration-300 relative group"
            >
              About
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/router/Categories"
              className="text-gray-800 hover:text-gray-900 transition-all duration-300 relative group"
            >
              Categories
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/router/AllAuthor"
              className="text-gray-800 hover:text-gray-900 transition-all duration-300 relative group"
            >
              Authors
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gray-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search articles..." className="pl-10 w-64" />
              </div>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-800">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
