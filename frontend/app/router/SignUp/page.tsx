"use client"

import { useState } from "react"

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage("")

    try {
      const res = await fetch("http://127.0.0.1:8787/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(" Signup successful!")
        localStorage.setItem("token", data.token)
        window.location.href = ("/")
      } else {
        setMessage((data.error || "Signup failed"))
      }
    } catch (err) {
      setMessage("Something went wrong")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
          required
        />

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
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-800"
        >
          Sign Up
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  )
}
