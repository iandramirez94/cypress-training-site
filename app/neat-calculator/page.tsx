'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NEATCalculator() {
  const [occupation, setOccupation] = useState('sedentary');
  const [dailySteps, setDailySteps] = useState('');
  const [standingHours, setStandingHours] = useState('');
  const [houseworkHours, setHouseworkHours] = useState('');
  const [weight, setWeight] = useState('');
  const [results, setResults] = useState<{
    totalNEAT: number;
    breakdown: {
      occupation: number;
      steps: number;
      standing: number;
      housework: number;
    };
    level: string;
    tips: string[];
  } | null>(null);

  const calculateNEAT = () => {
    const weightNum = parseFloat(weight);
    const stepsNum = parseInt(dailySteps) || 0;
    const standingNum = parseFloat(standingHours) || 0;
    const houseworkNum = parseFloat(houseworkHours) || 0;

    if (!weightNum) {
      alert('Please enter your weight');
      return;
    }

    // Occupation base calories (8-hour workday)
    const occupationCalories: { [key: string]: number } = {
      sedentary: 300, // Desk job, mostly sitting
      lightlyActive: 500, // Teacher, retail, some standing/walking
      moderatelyActive: 700, // Nurse, waiter, construction (light)
      veryActive: 1000, // Construction (heavy), mover, mail carrier
    };

    const occCals = occupationCalories[occupation];

    // Steps (rough estimate: 0.04-0.05 cal per step for average person)
    const stepCals = Math.round(stepsNum * 0.045 * (weightNum / 154)); // Adjusted for body weight (154 lbs avg)

    // Standing (50-60 cal/hour more than sitting)
    const standingCals = Math.round(standingNum * 55);

    // Housework/chores (150-200 cal/hour)
    const houseworkCals = Math.round(houseworkNum * 175);

    const totalNEAT = occCals + stepCals + standingCals + houseworkCals;

    // Determine level and tips
    let level = '';
    let tips: string[] = [];

    if (totalNEAT < 600) {
      level = 'Low NEAT';
      tips = [
        'Add 2,000-3,000 steps to your day (20-30 min walk)',
        'Stand during phone calls or TV time',
        'Park farther away from entrances',
        'Take the stairs instead of elevator',
        'Set a timer to stand/walk every hour',
      ];
    } else if (totalNEAT < 1000) {
      level = 'Moderate NEAT';
      tips = [
        'Add another 2,000 steps (walk after dinner)',
        'Do household chores more frequently',
        'Use a standing desk part of the day',
        'Walk during lunch breaks',
      ];
    } else if (totalNEAT < 1500) {
      level = 'High NEAT';
      tips = [
        "You're doing great! Keep it consistent.",
        'Add variety: gardening, cleaning, active hobbies',
        'Track steps to maintain current level',
      ];
    } else {
      level = 'Very High NEAT';
      tips = [
        "Excellent! You're burning significant calories through daily activity.",
        "Make sure you're eating enough to support this activity level.",
        'Focus on recovery and sleep quality.',
      ];
    }

    setResults({
      totalNEAT,
      breakdown: {
        occupation: occCals,
        steps: stepCals,
        standing: standingCals,
        housework: houseworkCals,
      },
      level,
      tips,
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
            NEAT Calculator
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Calculate calories burned from daily non-exercise activity
          </p>
          <p className="text-sm text-gray-500">
            NEAT = Non-Exercise Activity Thermogenesis (walking, standing, fidgeting, chores)
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

            {/* Occupation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupation Type (8-hour workday)
              </label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                <option value="sedentary">Sedentary (desk job, mostly sitting)</option>
                <option value="lightlyActive">Lightly Active (teacher, retail, some standing/walking)</option>
                <option value="moderatelyActive">Moderately Active (nurse, waiter, light construction)</option>
                <option value="veryActive">Very Active (heavy construction, mover, mail carrier)</option>
              </select>
            </div>

            {/* Daily Steps */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Steps (optional)
              </label>
              <input
                type="number"
                value={dailySteps}
                onChange={(e) => setDailySteps(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="5000"
              />
              <p className="text-xs text-gray-500 mt-1">Average: 3,000-5,000 steps/day for sedentary people</p>
            </div>

            {/* Standing Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Standing Per Day (optional)
              </label>
              <input
                type="number"
                step="0.5"
                value={standingHours}
                onChange={(e) => setStandingHours(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="2"
              />
            </div>

            {/* Housework/Chores */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours of Housework/Chores Per Day (optional)
              </label>
              <input
                type="number"
                step="0.5"
                value={houseworkHours}
                onChange={(e) => setHouseworkHours(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
                placeholder="1"
              />
              <p className="text-xs text-gray-500 mt-1">Cleaning, cooking, yard work, laundry, etc.</p>
            </div>
          </div>

          <button
            onClick={calculateNEAT}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
          >
            Calculate My NEAT
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Your Daily NEAT
            </h2>

            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-6 text-center mb-8">
              <p className="text-gray-600 text-sm mb-2">{results.level}</p>
              <p className="text-5xl font-bold text-blue-600 mb-2">{results.totalNEAT}</p>
              <p className="text-gray-500">calories/day from daily activity</p>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Breakdown</h3>
            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                <span className="text-gray-700">Occupation</span>
                <span className="font-semibold text-gray-900">{results.breakdown.occupation} cal</span>
              </div>
              {results.breakdown.steps > 0 && (
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                  <span className="text-gray-700">Daily Steps</span>
                  <span className="font-semibold text-gray-900">{results.breakdown.steps} cal</span>
                </div>
              )}
              {results.breakdown.standing > 0 && (
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                  <span className="text-gray-700">Standing</span>
                  <span className="font-semibold text-gray-900">{results.breakdown.standing} cal</span>
                </div>
              )}
              {results.breakdown.housework > 0 && (
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                  <span className="text-gray-700">Housework/Chores</span>
                  <span className="font-semibold text-gray-900">{results.breakdown.housework} cal</span>
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">How to Increase Your NEAT</h3>
            <ul className="space-y-2 mb-8">
              {results.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Want Help Optimizing Your Daily Activity?
              </h3>
              <p className="text-gray-700 mb-6">
                NEAT is just one piece of the puzzle. Get a complete training and nutrition plan tailored to your lifestyle.
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

        {/* Learn More */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4">
            Want to learn more about NEAT and why it matters for fat loss?
          </p>
          <Link
            href="/blog/why-neat-matters-more-than-cardio"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Read: Why NEAT Matters More Than Cardio →
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
