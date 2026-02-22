import Link from 'next/link'

export default function Resources() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-200 py-4">
        <nav className="max-w-6xl mx-auto px-4">
          <Link href="/" className="font-bold text-xl hover:underline">← Back to CTC</Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Free Resources</h1>
        <p className="text-gray-600 mb-12">
          Everything you need to build strength and muscle. New resource added every week.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Exercise Form Guide</h2>
            <p className="text-gray-600 mb-4">
              Master the Big 5 compounds plus key accessories. Form cues, common mistakes, progressions.
            </p>
            <p className="text-sm text-gray-500 italic">Coming this week...</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Beginner Strength Program</h2>
            <p className="text-gray-600 mb-4">
              4-week linear progression plan. Big 5 focus, systematic strength gains.
            </p>
            <p className="text-sm text-gray-500 italic">Coming this week...</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Macro Basics Cheat Sheet</h2>
            <p className="text-gray-600 mb-4">
              Simple macro calculations, meal prep fundamentals.
            </p>
            <p className="text-sm text-gray-500 italic">Coming soon...</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-2">Home Workout Templates</h2>
            <p className="text-gray-600 mb-4">
              3 complete routines for bodyweight + minimal equipment.
            </p>
            <p className="text-sm text-gray-500 italic">Coming soon...</p>
          </div>
        </div>
      </div>
    </main>
  )
}
