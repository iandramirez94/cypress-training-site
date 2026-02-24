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
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Free Resources</h1>
        <p className="text-gray-600 mb-12">
          Everything you need to build strength and muscle. New resource added every week.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border-2 border-blue-500 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🔥</span>
              <h2 className="text-2xl font-bold text-gray-900">TDEE Calculator</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Calculate your Total Daily Energy Expenditure and calorie targets for fat loss or muscle gain.
            </p>
            <Link 
              href="/calculator"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculate TDEE →
            </Link>
          </div>

          <div className="border-2 border-green-500 rounded-lg p-6 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🧮</span>
              <h2 className="text-2xl font-bold text-gray-900">Macro Split Calculator</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Break down your calories into protein, carbs, and fats based on your preference (high carb, low carb, or balanced).
            </p>
            <Link 
              href="/macro-split"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Calculate Macros →
            </Link>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Exercise Form Guide</h2>
            <p className="text-gray-600 mb-4">
              Master the Big 5 compounds plus key accessories. Form cues, common mistakes, progressions.
            </p>
            <p className="text-sm text-gray-500 italic">Coming this week...</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Beginner Strength Program</h2>
            <p className="text-gray-600 mb-4">
              4-week linear progression plan. Big 5 focus, systematic strength gains.
            </p>
            <p className="text-sm text-gray-500 italic">Coming this week...</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Macro Basics Cheat Sheet</h2>
            <p className="text-gray-600 mb-4">
              Simple macro calculations, meal prep fundamentals.
            </p>
            <p className="text-sm text-gray-500 italic">Coming soon...</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Home Workout Templates</h2>
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
