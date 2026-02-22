import Link from 'next/link'

export default function Blog() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4">
        <nav className="max-w-6xl mx-auto px-4">
          <Link href="/" className="font-bold text-xl hover:underline">← Back to CTC</Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Training Blog</h1>
        <p className="text-gray-600 mb-12">
          No-BS strength training advice. New posts every week.
        </p>

        <div className="space-y-8">
          <p className="text-gray-500 italic">First posts coming this week...</p>
        </div>
      </div>
    </main>
  )
}
