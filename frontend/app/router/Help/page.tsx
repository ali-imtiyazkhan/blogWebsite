"use client"

import { BlogFooter } from "@/components/blog-footer"
import { BlogHeader } from "@/components/blog-header"
import { useState } from "react"

const faqs = [
  {
    question: "How do I create an account?",
    answer: "Click on the Sign Up button at the top right, fill in your details, and verify your email.",
  },
  {
    question: "I forgot my password. What should I do?",
    answer: "Go to the login page and click on 'Forgot Password'. Follow the instructions to reset it.",
  },
  {
    question: "How can I contact support?",
    answer: "You can reach us via the Contact Us form or email us directly at support@example.com.",
  },
  {
    question: "Is my personal data safe?",
    answer: "Yes, we use modern encryption and follow industry best practices to secure your data.",
  },
]

export default function HelpSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div>
      <BlogHeader />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Help & FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-sm bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50"
              >
                {faq.question}
                <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}


        </div>
      </div>
      <BlogFooter />
    </div>)
}
