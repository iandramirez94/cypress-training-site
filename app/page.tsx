'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interest, setInterest] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')
    
    try {
      const response = await fetch('https://chad-mission-control.vercel.app/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, interest })
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setName('')
        setEmail('')
        setInterest('')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/logo.jpg" alt="Cypress Training Center" width={50} height={50} className="rounded-lg shadow-sm" />
            <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Cypress Training
            </span>
          </div>
          <div className="flex space-x-8">
            <Link href="/blog" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Resources
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/CTC-7.jpg"
            alt="Cypress Training Center"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 text-white">
            <h1 className="text-6xl font-bold mb-6 drop-shadow-2xl">
              Train Smarter.<br />Get Stronger.
            </h1>
            <p className="text-2xl mb-8 max-w-2xl drop-shadow-lg">
              Remote strength coaching built around your goals, equipment, and schedule.
            </p>
            <a
              href="#signup"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Start Training Today →
            </a>
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Review 1 - Placeholder */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-500 transition-all">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Ian's coaching transformed my training. Down 20lbs and hitting PRs I never thought possible. Best investment I've made."
              </p>
              <p className="font-semibold text-gray-900">— Client Name</p>
            </div>

            {/* Review 2 - Placeholder */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-500 transition-all">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Finally found a program that works with my schedule and equipment. No fluff, just results. Highly recommend."
              </p>
              <p className="font-semibold text-gray-900">— Client Name</p>
            </div>

            {/* Review 3 - Placeholder */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-100 hover:border-blue-500 transition-all">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Great coaching, clear programming, and always responsive. Ian knows his stuff and genuinely cares about results."
              </p>
              <p className="font-semibold text-gray-900">— Client Name</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Form */}
      <section id="signup" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Let's Get Started</h2>
            <p className="text-xl opacity-90">
              Tell us about your goals and we'll send you free training resources to get you moving.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
            </div>
            
            <textarea
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="What are your goals? (e.g., build muscle, lose fat, get stronger, improve performance...)"
              rows={4}
              className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-500 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 mb-4"
            />
            
            <button
              type="submit"
              disabled={submitStatus === 'loading'}
              className="w-full bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 disabled:opacity-50 transition-all transform hover:scale-105 shadow-lg"
            >
              {submitStatus === 'loading' ? 'Submitting...' : 'Get Started'}
            </button>
            
            {submitStatus === 'success' && (
              <p className="mt-4 text-center text-green-200 font-medium">✅ Thanks! Check your email for your first resource.</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-center text-red-200 font-medium">❌ Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Free Training Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all">
              <h3 className="font-bold text-2xl mb-3 text-gray-900">Exercise Form Guide</h3>
              <p className="text-gray-600 mb-6">Master the Big 5 compounds + key accessory movements</p>
              <Link
                href="/resources"
                className="inline-block text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                Download Guide →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all">
              <h3 className="font-bold text-2xl mb-3 text-gray-900">Beginner Program</h3>
              <p className="text-gray-600 mb-6">4-week linear progression strength plan</p>
              <Link
                href="/resources"
                className="inline-block text-green-600 font-semibold hover:text-green-700 hover:underline"
              >
                Download Program →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all">
              <h3 className="font-bold text-2xl mb-3 text-gray-900">Weekly Blog</h3>
              <p className="text-gray-600 mb-6">Training tips, form breakdowns, program design</p>
              <Link
                href="/blog"
                className="inline-block text-purple-600 font-semibold hover:text-purple-700 hover:underline"
              >
                Read Latest Post →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p className="text-lg">© 2026 Cypress Training Center. Build strength, build muscle.</p>
        </div>
      </footer>
    </main>
  )
}
