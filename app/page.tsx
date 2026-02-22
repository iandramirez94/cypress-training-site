import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.jpg" alt="Cypress Training Center" width={50} height={50} className="rounded" />
            <span className="font-bold text-xl">CTC</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/blog" className="text-gray-700 hover:text-black">Blog</Link>
            <Link href="/resources" className="text-gray-700 hover:text-black">Resources</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Train Smarter with CTC</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Strength-focused progressive overload with intelligent coaching. 
            Build muscle, get stronger, see results.
          </p>
          <a 
            href="https://web.telegram.org/a/#8575807393" 
            target="_blank"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Try Gayle - Free AI Coach →
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Progressive overload is king.</strong> We build systematic, measurable strength gains over time.
            </p>
            <p>
              <strong>Simple, proven movements.</strong> Big 5 compounds (squat, deadlift, bench, overhead press, row) 
              plus targeted accessories. No gimmicks.
            </p>
            <p>
              <strong>Coaching first, automation second.</strong> We adapt to injuries, equipment, schedule changes. 
              Programs are starting points, not rigid scripts.
            </p>
            <p className="italic">
              This is strength training that builds muscle, not bodybuilding splits with no progression scheme.
            </p>
          </div>
        </div>
      </section>

      {/* Gayle Callout */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="border-2 border-black rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Meet Gayle - Your Free AI Fitness Coach</h2>
          <p className="text-gray-700 mb-6">
            Gayle creates personalized strength programs based on your equipment, experience, and goals. 
            Available 24/7 via Telegram. Completely free.
          </p>
          <a 
            href="https://web.telegram.org/a/#8575807393" 
            target="_blank"
            className="inline-block bg-black text-white px-6 py-3 rounded font-semibold hover:bg-gray-800 transition"
          >
            Start Training with Gayle →
          </a>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Free Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-xl mb-2">Exercise Form Guide</h3>
              <p className="text-gray-600 mb-4">Master the Big 5 + key accessories</p>
              <Link href="/resources" className="text-black font-semibold hover:underline">
                Download →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-xl mb-2">Beginner Strength Program</h3>
              <p className="text-gray-600 mb-4">4-week linear progression plan</p>
              <Link href="/resources" className="text-black font-semibold hover:underline">
                Download →
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-xl mb-2">Weekly Training Tips</h3>
              <p className="text-gray-600 mb-4">Get new resources + blog posts</p>
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="px-4 py-2 border border-gray-300 rounded"
                />
                <button className="bg-black text-white px-4 py-2 rounded font-semibold hover:bg-gray-800">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>© 2026 Cypress Training Center. Build strength, build muscle.</p>
        </div>
      </footer>
    </main>
  )
}
