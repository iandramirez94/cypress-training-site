'use client';

import { useState } from 'react';

export default function MacrosCalculator() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [results, setResults] = useState<{
    tdee: number;
    protein: { grams: number; calories: number };
    carbs: { grams: number; calories: number };
    fats: { grams: number; calories: number };
    totalCalories: number;
  } | null>(null);

  const calculateMacros = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (!weightNum || !heightNum || !ageNum) {
      alert('Please fill in all fields');
      return;
    }

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
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

    // Adjust for goal
    let targetCalories: number;
    if (goal === 'cut') {
      targetCalories = Math.round(tdee * 0.85); // 15% deficit
    } else if (goal === 'bulk') {
      targetCalories = Math.round(tdee * 1.1); // 10% surplus
    } else {
      targetCalories = tdee;
    }

    // Calculate macros
    // Protein: 1g per lb bodyweight (converted from kg)
    const proteinGrams = Math.round(weightNum / 0.453592); // kg to lbs
    const proteinCalories = proteinGrams * 4;

    // Fats: 25% of total calories
    const fatCalories = Math.round(targetCalories * 0.25);
    const fatGrams = Math.round(fatCalories / 9);

    // Carbs: remaining calories
    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbGrams = Math.round(carbCalories / 4);

    setResults({
      tdee,
      protein: { grams: proteinGrams, calories: proteinCalories },
      carbs: { grams: carbGrams, calories: carbCalories },
      fats: { grams: fatGrams, calories: fatCalories },
      totalCalories: targetCalories,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-white">
              Cypress Training Center
            </a>
            <nav className="flex gap-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="/resources" className="text-gray-300 hover:text-white transition-colors">
                Resources
              </a>
              <a href="/calculator" className="text-white font-semibold">
                Calculator
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Macro Calculator
          </h1>
          <p className="text-xl text-gray-300">
            Calculate your personalized daily macronutrient targets
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="25"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="75"
              />
            </div>

            {/* Height */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder="175"
              />
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Activity Level
              </label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="veryActive">Very Active (2x/day)</option>
              </select>
            </div>

            {/* Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="cut">Lose Fat (15% deficit)</option>
                <option value="maintain">Maintain Weight</option>
                <option value="bulk">Build Muscle (10% surplus)</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateMacros}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            Calculate My Macros
          </button>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Your Daily Targets
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900/50 rounded-lg p-6 text-center">
                <p className="text-gray-400 text-sm mb-2">Maintenance Calories (TDEE)</p>
                <p className="text-4xl font-bold text-white">{results.tdee}</p>
                <p className="text-gray-500 text-sm mt-1">calories/day</p>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 text-center">
                <p className="text-gray-400 text-sm mb-2">Target Calories</p>
                <p className="text-4xl font-bold text-blue-400">{results.totalCalories}</p>
                <p className="text-gray-500 text-sm mt-1">calories/day</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {/* Protein */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-white">Protein</h3>
                  <span className="text-gray-400">{results.protein.calories} cal</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-blue-400">{results.protein.grams}g</span>
                  <span className="text-gray-500">per day</span>
                </div>
              </div>

              {/* Carbs */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-white">Carbohydrates</h3>
                  <span className="text-gray-400">{results.carbs.calories} cal</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-400">{results.carbs.grams}g</span>
                  <span className="text-gray-500">per day</span>
                </div>
              </div>

              {/* Fats */}
              <div className="bg-gray-900/50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-white">Fats</h3>
                  <span className="text-gray-400">{results.fats.calories} cal</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-yellow-400">{results.fats.grams}g</span>
                  <span className="text-gray-500">per day</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 border border-blue-500/30 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Want a Custom Program to Hit These Numbers?
              </h3>
              <p className="text-gray-300 mb-6">
                Get a personalized training plan, meal guidance, and direct coaching support to reach your goals faster.
              </p>
              <a
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Work With Us
              </a>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="mt-12 bg-gray-800/30 rounded-lg border border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">How This Works</h2>
          <div className="space-y-3 text-gray-300">
            <p>
              <strong className="text-white">TDEE (Total Daily Energy Expenditure):</strong> Your maintenance calories based on the Mifflin-St Jeor equation + activity level.
            </p>
            <p>
              <strong className="text-white">Protein:</strong> 1g per pound of bodyweight. Preserves muscle during fat loss, supports growth during bulking.
            </p>
            <p>
              <strong className="text-white">Fats:</strong> 25% of total calories. Essential for hormone production and nutrient absorption.
            </p>
            <p>
              <strong className="text-white">Carbs:</strong> Remaining calories after protein and fats. Your primary energy source for training.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Note: These are starting points. Adjust based on your results after 2-3 weeks. Need help dialing it in? <a href="/" className="text-blue-400 hover:underline">Work with us</a>.
            </p>
          </div>
        </div>

        {/* Download Cheat Sheet CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 mb-4">
            Want a quick reference guide to keep with you?
          </p>
          <a
            href="/resources"
            className="inline-block text-blue-400 hover:text-blue-300 font-semibold underline"
          >
            Download the Macro Basics Cheat Sheet →
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">
          <p>&copy; 2026 Cypress Training Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
