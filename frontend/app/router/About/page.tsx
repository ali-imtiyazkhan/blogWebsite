"use client"

import { BlogFooter } from "@/components/blog-footer"

export default function AboutSection() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
      <div className="bg-white shadow-md rounded-2xl p-6 space-y-4">
        <p className="text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold">My Blog</span>  – a space where ideas,
          experiences, and knowledge come together. Here, we share stories,
          tutorials, and insights across different categories like{" "}
          <span className="font-medium">Technology, Travel, Food, Lifestyle,</span> and{" "}
          <span className="font-medium">Education</span>.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Our mission is to create a platform where readers can learn, explore,
          and stay updated with the latest trends. Whether you’re a developer
          looking for coding tips, a traveler searching for guides, or someone
          who just loves food and lifestyle content – we’ve got you covered!
        </p>

        <p className="text-gray-700 leading-relaxed">
          Stay connected, keep exploring, and enjoy reading 💡
        </p>
      </div>
      <BlogFooter/>
    </div>
  )
}
