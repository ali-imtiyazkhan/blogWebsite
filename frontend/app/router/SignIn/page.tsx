"use client"

import { BlogHeader } from "@/components/blog-header"
import { useState } from "react"

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage("")

    try {
      const res = await fetch("https://backend.blog-backend-imtiyaz.workers.dev/api/v1/user/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage("Signin successful!")
        localStorage.setItem("token", data.token)
        window.location.href = "/"
      } else {
        setMessage(data.error || "Signin failed")
      }
    } catch (err) {
      setMessage("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header fixed at top */}
      <BlogHeader />

      {/* Main content takes rest of screen */}
      <div className="flex flex-1">
        {/* Left side → Signin form */}
        <div className="flex justify-center items-center w-1/2 bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md w-96"
          >
            <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 mb-3 border rounded"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 mb-3 border rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Sign In
            </button>

            <a
              href="/router/SignUp"
              className="block mt-4 text-sm text-gray-600 hover:underline hover:text-gray-900 text-center"
            >
              Don’t have an account? Sign Up
            </a>


            {message && <p className="mt-3 text-center text-gray-600">{message}</p>}
          </form>
        </div>

        {/* Right side → Quote */}
        <div className="w-1/2 flex justify-center items-center bg-gray-800 text-white p-10">
          <blockquote className="text-2xl font-semibold italic text-center leading-relaxed max-w-md">
            “The future belongs to those who believe in the beauty of their dreams.”
            <footer className="mt-4 text-lg font-light">— Eleanor Roosevelt</footer>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
