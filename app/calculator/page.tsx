'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TDEECalculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    cut: number;
    bulk: number;
  } | null>(null);

  const calculateTDEE = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (!weightNum || !heightNum || !ageNum) {
      alert('Please fill in all fields');
      return;
    }

    // Convert imperial to metric for Mifflin-St Jeor equation
    const weightKg = weightNum * 0.453592; // lbs to kg
    const heightCm = heightNum * 2.54; // inches to cm

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    // Activity multipliers
    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdee = Math.round(bmr * activityMultipliers[activityLevel]);
    const cut = Math.round(tdee * 0.85); // 15% deficit
    const bulk = Math.round(tdee * 1.1); // 10% surplus

    setResults({
      bmr: Math.round(bmr),
      tdee,
      cut,
      bulk,
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
            Daily Calorie Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Find out how many calories you should eat based on your goals
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="25"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weight (lbs)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="165"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height (inches)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="69"
              />
            </div>

            {/* Activity Level */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="veryActive">Very Active (2x/day)</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateTDEE}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
          >
            Calculate My TDEE
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Your Daily Calorie Targets
            </h2>

            {/* Goal Targets - Featured */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-200 rounded-lg p-6 text-center">
                <p className="text-gray-700 font-semibold mb-2">To Lose Fat</p>
                <p className="text-5xl font-bold text-red-600 mb-2">{results.cut}</p>
                <p className="text-gray-500 text-sm">calories/day (15% deficit)</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-lg p-6 text-center">
                <p className="text-gray-700 font-semibold mb-2">To Build Muscle</p>
                <p className="text-5xl font-bold text-green-600 mb-2">{results.bulk}</p>
                <p className="text-gray-500 text-sm">calories/day (10% surplus)</p>
              </div>
            </div>

            {/* TDEE - Secondary */}
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-6 text-center mb-8">
              <p className="text-gray-600 text-sm mb-2">To Maintain Weight</p>
              <p className="text-4xl font-bold text-blue-600 mb-2">{results.tdee}</p>
              <p className="text-gray-500 text-sm">calories/day (maintenance)</p>
            </div>

            {/* BMR - Technical Detail */}
            <details className="mb-8">
              <summary className="cursor-pointer text-gray-700 font-medium mb-4">Show technical breakdown</summary>
              <div className="bg-gray-50 rounded-lg p-6 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Basal Metabolic Rate (BMR)</p>
                    <p className="text-gray-500 text-xs">Calories burned at rest</p>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{results.bmr}</p>
                </div>
              </div>
            </details>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Need Help Hitting These Targets?
              </h3>
              <p className="text-gray-700 mb-6">
                We'll build a custom meal plan, training program, and give you direct coaching support so you actually hit your numbers consistently.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use These Numbers</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong className="text-gray-900">To Lose Fat:</strong> Eat the fat loss target (~15% below maintenance). This gives you a sustainable rate of ~1 lb/week fat loss for most people.
            </p>
            <p>
              <strong className="text-gray-900">To Build Muscle:</strong> Eat the muscle gain target (~10% above maintenance). This supports muscle growth while minimizing fat gain.
            </p>
            <p>
              <strong className="text-gray-900">To Maintain Weight:</strong> Eat the maintenance number. Good for performance phases or taking a break from dieting.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              These are starting points based on your stats and activity level. Track your weight for 2-3 weeks and adjust by 100-200 calories if needed.
            </p>
            <p className="text-sm text-gray-600">
              Need help hitting these targets consistently? <Link href="/" className="text-blue-600 hover:underline font-medium">Work with us</Link> — we'll build a custom meal plan and training program around your numbers.
            </p>
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4">
            Want to break down your calories into protein, carbs, and fats?
          </p>
          <Link
            href="/macro-split"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Try the Macro Split Calculator →
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
