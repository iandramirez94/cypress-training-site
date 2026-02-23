'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const heroImages = [
  '/images/CTC-1.jpg',
  '/images/CTC-2.jpg',
  '/images/CTC-3.jpg',
  '/images/CTC-4.jpg',
  '/images/CTC-5.jpg',
]

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0)
  const [email, setEmail] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')
    
    try {
      const response = await fetch('https://chad-mission-control.vercel.app/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
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

      {/* Hero Section with Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0">
          {heroImages.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={img}
                alt={`Gym ${idx + 1}`}
                fill
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          ))}
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 text-white">
            <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">
              Train Smarter.<br />Get Stronger.
            </h1>
            <p className="text-2xl mb-8 max-w-2xl drop-shadow-md">
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

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentImage ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Remote Coaching That Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Personalized Programs</h3>
              <p className="text-gray-600">
                Strength plans built around your equipment, experience level, and goals. No cookie-cutter templates.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Progressive Overload</h3>
              <p className="text-gray-600">
                Systematic strength gains over time. Track progress, adjust intensity, build real results.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3">Flexible & Adaptive</h3>
              <p className="text-gray-600">
                Adapt to injuries, schedule changes, equipment availability. Real coaching, not rigid scripts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section id="signup" className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join our email list for free training resources, program templates, and weekly tips.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 disabled:opacity-50 transition-all transform hover:scale-105 shadow-lg"
              >
                {submitStatus === 'loading' ? 'Subscribing...' : 'Get Started'}
              </button>
            </div>
            
            {submitStatus === 'success' && (
              <p className="mt-4 text-green-200 font-medium">✅ Thanks! Check your email for your first resource.</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-red-200 font-medium">❌ Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Free Training Resources</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all">
              <h3 className="font-bold text-2xl mb-3">Exercise Form Guide</h3>
              <p className="text-gray-600 mb-6">Master the Big 5 compounds + key accessory movements</p>
              <Link
                href="/resources"
                className="inline-block text-blue-600 font-semibold hover:text-blue-700 hover:underline"
              >
                Download Guide →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-xl transition-all">
              <h3 className="font-bold text-2xl mb-3">Beginner Program</h3>
              <p className="text-gray-600 mb-6">4-week linear progression strength plan</p>
              <Link
                href="/resources"
                className="inline-block text-green-600 font-semibold hover:text-green-700 hover:underline"
              >
                Download Program →
              </Link>
            </div>
            <div className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all">
              <h3 className="font-bold text-2xl mb-3">Weekly Blog</h3>
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
