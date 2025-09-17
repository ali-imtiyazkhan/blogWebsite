"use client"

import { useState } from "react"

export default function PostBlogPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [published, setPublished] = useState(true)
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setMessage("⚠️ Please sign in first.")
        return
      }

      const res = await fetch("http://127.0.0.1:8787/api/v1/blog/postblog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          published,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setMessage(`✅ Blog posted! ID: ${data.id}`)
        setTitle("")
        setContent("")
      } else {
        const err = await res.json()
        setMessage(`❌ Error: ${err.message || "Failed to post blog"}`)
      }
    } catch (err) {
      console.error(err)
      setMessage("❌ Something went wrong")
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Post a New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded h-40"
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Publish immediately
        </label>
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Post Blog
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  )
}
