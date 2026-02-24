'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MacroSplitCalculator() {
  const [weight, setWeight] = useState('');
  const [calorieTarget, setCalorieTarget] = useState('');
  const [preference, setPreference] = useState('balanced');
  const [results, setResults] = useState<{
    protein: { grams: number; calories: number; percentage: number };
    carbs: { grams: number; calories: number; percentage: number };
    fats: { grams: number; calories: number; percentage: number };
    totalCalories: number;
  } | null>(null);

  const calculateMacros = () => {
    const weightNum = parseFloat(weight);
    const caloriesNum = parseInt(calorieTarget);

    if (!weightNum || !caloriesNum) {
      alert('Please fill in all fields');
      return;
    }

    // Protein: 0.7g per lb bodyweight (fixed)
    const proteinGrams = Math.round(weightNum * 0.7);
    const proteinCalories = proteinGrams * 4;

    // Remaining calories after protein
    const remainingCalories = caloriesNum - proteinCalories;

    let fatCalories = 0;
    let carbCalories = 0;

    // Split remaining calories based on preference
    if (preference === 'highCarb') {
      // High Carb: 20% fat, 80% carbs (of remaining)
      fatCalories = Math.round(remainingCalories * 0.2);
      carbCalories = remainingCalories - fatCalories;
    } else if (preference === 'lowCarb') {
      // Low Carb: 60% fat, 40% carbs (of remaining)
      fatCalories = Math.round(remainingCalories * 0.6);
      carbCalories = remainingCalories - fatCalories;
    } else {
      // Balanced: 30% fat, 70% carbs (of remaining)
      fatCalories = Math.round(remainingCalories * 0.3);
      carbCalories = remainingCalories - fatCalories;
    }

    const fatGrams = Math.round(fatCalories / 9);
    const carbGrams = Math.round(carbCalories / 4);

    // Calculate percentages
    const proteinPercentage = Math.round((proteinCalories / caloriesNum) * 100);
    const fatPercentage = Math.round((fatCalories / caloriesNum) * 100);
    const carbPercentage = Math.round((carbCalories / caloriesNum) * 100);

    setResults({
      protein: { grams: proteinGrams, calories: proteinCalories, percentage: proteinPercentage },
      carbs: { grams: carbGrams, calories: carbCalories, percentage: carbPercentage },
      fats: { grams: fatGrams, calories: fatCalories, percentage: fatPercentage },
      totalCalories: caloriesNum,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Macro Split Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your personalized protein, carbs, and fats breakdown
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8 mb-8">
          <div className="space-y-6 mb-6">
            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body Weight (lbs)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="165"
              />
            </div>

            {/* Calorie Target */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Calorie Target
              </label>
              <input
                type="number"
                value={calorieTarget}
                onChange={(e) => setCalorieTarget(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="2000"
              />
              <p className="text-xs text-gray-500 mt-1">
                Not sure? <Link href="/calculator" className="text-blue-600 hover:underline">Use the TDEE Calculator</Link> first
              </p>
            </div>

            {/* Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Macro Preference
              </label>
              <select
                value={preference}
                onChange={(e) => setPreference(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                <option value="balanced">Balanced (Moderate Carb)</option>
                <option value="highCarb">High Carb (Performance/Bulking)</option>
                <option value="lowCarb">Low Carb (Keto/Fat Loss)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Protein is fixed at 0.7g per lb bodyweight. This adjusts carb/fat split.
              </p>
            </div>
          </div>

          <button
            onClick={calculateMacros}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
          >
            Calculate My Macros
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Your Daily Macro Targets
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-6 text-center mb-8">
              <p className="text-gray-600 text-sm mb-2">Total Daily Calories</p>
              <p className="text-5xl font-bold text-blue-600">{results.totalCalories}</p>
            </div>

            <div className="space-y-4 mb-8">
              {/* Protein */}
              <div className="bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">Protein</h3>
                  <span className="text-lg font-bold text-blue-600">{results.protein.percentage}%</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-blue-600">{results.protein.grams}g</span>
                  <span className="text-gray-500">per day</span>
                </div>
                <p className="text-sm text-gray-600">{results.protein.calories} calories (0.7g per lb bodyweight)</p>
              </div>

              {/* Carbs */}
              <div className="bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">Carbohydrates</h3>
                  <span className="text-lg font-bold text-green-600">{results.carbs.percentage}%</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-green-600">{results.carbs.grams}g</span>
                  <span className="text-gray-500">per day</span>
                </div>
                <p className="text-sm text-gray-600">{results.carbs.calories} calories</p>
              </div>

              {/* Fats */}
              <div className="bg-gradient-to-r from-amber-50 to-white border-2 border-amber-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">Fats</h3>
                  <span className="text-lg font-bold text-amber-600">{results.fats.percentage}%</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-amber-600">{results.fats.grams}g</span>
                  <span className="text-gray-500">per day</span>
                </div>
                <p className="text-sm text-gray-600">{results.fats.calories} calories</p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Want Help Hitting These Numbers?
              </h3>
              <p className="text-gray-700 mb-6">
                Get a complete training and nutrition plan with meal guidance, food lists, and direct coaching support.
              </p>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                Work With Us
              </Link>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-12 bg-white rounded-lg border-2 border-gray-200 shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How This Works</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-gray-900">Protein (0.7g per lb):</strong> Fixed ratio to preserve muscle during fat loss and support growth during bulking. This is the minimum effective dose for most people.
            </p>
            <p>
              <strong className="text-gray-900">Balanced:</strong> Moderate carb/fat split. Good default for most people.
            </p>
            <p>
              <strong className="text-gray-900">High Carb:</strong> More carbs, less fat. Best for performance, high training volume, or bulking phases.
            </p>
            <p>
              <strong className="text-gray-900">Low Carb:</strong> More fat, fewer carbs. Works well for some people in fat loss phases or those who prefer keto-style eating.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Note: These are starting points. Adjust based on how you feel and perform after 2-3 weeks. Need help dialing it in? <Link href="/" className="text-blue-600 hover:underline font-medium">Work with us</Link>.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4">
            Not sure what your calorie target should be?
          </p>
          <Link
            href="/calculator"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Calculate Your TDEE First →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2026 Cypress Training Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
