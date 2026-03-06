'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import PhoneMockup from '@/components/PhoneMockup';

export default function AIPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Your AI Strength Coach.
            </span>
            <br />
            <span className="text-gray-900">In Your Pocket.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Your AI coach builds custom training programs, tracks your progress, and coaches you through every workout — all via text.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Download on the App Store
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-full border-2 border-gray-200 hover:border-gray-300 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              See How It Works
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes. No complicated setup. Just real coaching.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  1
                </div>
                <PhoneMockup
                  src="/app-screenshots/01-coach-selection.jpg"
                  alt="Choose your coach"
                  width={340}
                  height={680}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Choose Your Coach
              </h3>
              <p className="text-lg text-gray-600">
                Pick the coaching style that fits you. Your coach learns your goals and builds programs that fit your life.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  2
                </div>
                <PhoneMockup
                  src="/app-screenshots/03-experience.jpg"
                  alt="Answer questions about yourself"
                  width={340}
                  height={680}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Answer a Few Questions
              </h3>
              <p className="text-lg text-gray-600">
                Training experience, equipment, schedule — your coach tailors everything to you.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  3
                </div>
                <PhoneMockup
                  src="/app-screenshots/09-workout.jpg"
                  alt="Start training"
                  width={340}
                  height={680}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Start Training
              </h3>
              <p className="text-lg text-gray-600">
                Follow workouts, log progress, and watch yourself get stronger.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real Coaching Feature */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Real Coaching.
                <br />
                Real Conversations.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Traveling? Injured? Equipment broken? Just text your coach. They adapt your program in real-time.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Swap Exercises On the Fly</h4>
                    <p className="text-gray-600">Shoulder hurting? Your coach finds a safer alternative instantly.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Adjust to Your Life</h4>
                    <p className="text-gray-600">Hotel gym? Home setup? Your coach rebuilds workouts based on what you have.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Form Tips & Technique</h4>
                    <p className="text-gray-600">Ask anything. Your coach explains every movement in plain English.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <PhoneMockup
                  src="/app-screenshots/08-injury.jpg"
                  alt="Real coaching conversation"
                  width={340}
                  height={680}
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-[200px] z-20">
                  <p className="text-sm text-gray-600 italic">"My coach swapped my bench press for a shoulder-friendly variation instantly."</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Smart Program Adjustments */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              <PhoneMockup
                src="/app-screenshots/10-swap.jpg"
                alt="Exercise swap interface"
                width={340}
                height={680}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Swap Exercises.
                <br />
                Keep Progressing.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Don't like an exercise? Don't have the equipment? Just tap to swap. Your coach suggests alternatives that keep your program effective.
              </p>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Why the swap?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#667eea] rounded-full"></div>
                    Just not feeling it
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#667eea] rounded-full"></div>
                    Don't have the equipment
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#667eea] rounded-full"></div>
                    Hurts or uncomfortable
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#667eea] rounded-full"></div>
                    Want variety
                  </li>
                </ul>
                <p className="text-sm text-gray-500 mt-6">
                  Every swap improves your coach's understanding of what works for you.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Track Progress */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Track Every Rep.
                <br />
                See Your Progress.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Log weights, reps, and effort for every set. Watch your strength grow week over week.
              </p>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">RPE Tracking</span>
                    <span className="text-sm text-gray-500">Rate of Perceived Exertion</span>
                  </div>
                  <p className="text-gray-600">Track how hard each set feels. Your coach uses this to adjust your program intelligently.</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">Personal Records</span>
                    <span className="text-sm text-gray-500">Celebrate milestones</span>
                  </div>
                  <p className="text-gray-600">Hit a new PR? Your coach notices and adjusts your training to keep you progressing.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex justify-center lg:justify-end"
            >
              <PhoneMockup
                src="/app-screenshots/12-logged.jpg"
                alt="Workout tracking"
                width={340}
                height={680}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Get Stronger?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              Your AI strength coach is waiting. Download Cypress Training AI and start training smarter.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-10 py-5 bg-white text-gray-900 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
            >
              Download on the App Store
            </a>
            <p className="text-sm opacity-75 mt-8">
              Free 7-day trial. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            Questions? Email us at{' '}
            <a href="mailto:ian@cypresstrainingcenter.com" className="text-white hover:underline">
              ian@cypresstrainingcenter.com
            </a>
          </p>
          <p className="text-xs mt-4">© 2026 Cypress Training Center. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
