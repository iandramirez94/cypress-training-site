'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    // Protein: 1g per lb bodyweight
    const proteinGrams = Math.round(weightNum);
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
            Macro Calculator
          </h1>
          <p className="text-xl text-gray-600">
            Calculate your personalized daily macronutrient targets
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
            <div>
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

            {/* Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
              >
                <option value="cut">Lose Fat (15% deficit)</option>
                <option value="maintain">Maintain Weight</option>
                <option value="bulk">Build Muscle (10% surplus)</option>
              </select>
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
              Your Daily Targets
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600 text-sm mb-2">Maintenance Calories (TDEE)</p>
                <p className="text-4xl font-bold text-gray-900">{results.tdee}</p>
                <p className="text-gray-500 text-sm mt-1">calories/day</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-lg p-6 text-center">
                <p className="text-gray-600 text-sm mb-2">Target Calories</p>
                <p className="text-4xl font-bold text-blue-600">{results.totalCalories}</p>
                <p className="text-gray-500 text-sm mt-1">calories/day</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {/* Protein */}
              <div className="bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">Protein</h3>
                  <span className="text-gray-600">{results.protein.calories} cal</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-blue-600">{results.protein.grams}g</span>
                  <span className="text-gray-500">per day</span>
                </div>
              </div>

              {/* Carbs */}
              <div className="bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">Carbohydrates</h3>
                  <span className="text-gray-600">{results.carbs.calories} cal</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-green-600">{results.carbs.grams}g</span>
                  <span className="text-gray-500">per day</span>
                </div>
              </div>

              {/* Fats */}
              <div className="bg-gradient-to-r from-amber-50 to-white border-2 border-amber-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">Fats</h3>
                  <span className="text-gray-600">{results.fats.calories} cal</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-amber-600">{results.fats.grams}g</span>
                  <span className="text-gray-500">per day</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Want a Custom Program to Hit These Numbers?
              </h3>
              <p className="text-gray-700 mb-6">
                Get a personalized training plan, meal guidance, and direct coaching support to reach your goals faster.
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
              <strong className="text-gray-900">TDEE (Total Daily Energy Expenditure):</strong> Your maintenance calories based on the Mifflin-St Jeor equation + activity level.
            </p>
            <p>
              <strong className="text-gray-900">Protein:</strong> 1g per pound of bodyweight. Preserves muscle during fat loss, supports growth during bulking.
            </p>
            <p>
              <strong className="text-gray-900">Fats:</strong> 25% of total calories. Essential for hormone production and nutrient absorption.
            </p>
            <p>
              <strong className="text-gray-900">Carbs:</strong> Remaining calories after protein and fats. Your primary energy source for training.
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Note: These are starting points. Adjust based on your results after 2-3 weeks. Need help dialing it in? <Link href="/" className="text-blue-600 hover:underline font-medium">Work with us</Link>.
            </p>
          </div>
        </div>

        {/* Download Cheat Sheet CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-700 mb-4">
            Want a quick reference guide to keep with you?
          </p>
          <Link
            href="/resources"
            className="inline-block text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Download the Macro Basics Cheat Sheet →
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
