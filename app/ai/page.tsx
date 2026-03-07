'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import ChatConversation from '@/components/ChatConversation';

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
              <div className="w-20 h-20 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-3xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8 shadow-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Choose Your Coach
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
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
              <div className="w-20 h-20 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-3xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8 shadow-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Answer a Few Questions
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
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
              <div className="w-20 h-20 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-3xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-8 shadow-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Start Training
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Follow workouts, log progress, and watch yourself get stronger.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real Coaching Feature */}
      <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Real Coaching.
              <br />
              Real Conversations.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Traveling? Injured? Equipment broken? Just text your coach. They adapt your program in real-time.
            </p>
          </motion.div>

          <ChatConversation
            messages={[
              { sender: 'user', message: "I'm going to be traveling next week. Will only have a hotel gym." },
              { sender: 'coach', message: "Got it — what's the setup like in the hotel gym? Just dumbbells, or do they have cables/a functional trainer too?" },
              { sender: 'user', message: "I'll have to let you know when I get there. Probably dumbbells and a cable machine." },
              { sender: 'coach', message: "Sounds good! Just keep me posted when you get the details about the gym. We'll adjust your workouts based on what you have available." }
            ]}
          />
        </div>
      </section>

      {/* Smart Program Adjustments */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Swap Exercises.
              <br />
              Keep Progressing.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Shoulder hurting? Don't like an exercise? Just text your coach. They'll find a safer, more effective alternative.
            </p>
          </motion.div>

          <ChatConversation
            messages={[
              { sender: 'user', message: "bench press is hurting my shoulder" },
              { sender: 'coach', message: "Let's avoid the bench press then. We'll switch to shoulder-friendly pressing variations that won't aggravate your shoulder. I'll replace that in your upcoming workouts. Everything else feels good?" },
              { sender: 'user', message: "yeah everything else feels okay." },
              { sender: 'coach', message: "Good to hear! I'll adjust your program to replace the bench press with a safer pressing variation. You'll still get a solid workout without risking your shoulder. Ready to tackle your next session?" }
            ]}
          />
        </div>
      </section>

      {/* Track Progress */}
      <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Track Every Rep.
              <br />
              See Your Progress.
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Log weights, reps, and effort for every set. Watch your strength grow week over week.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-gray-900">RPE Tracking</span>
                <span className="text-sm text-gray-500">Rate of Perceived Exertion</span>
              </div>
              <p className="text-gray-600 leading-relaxed">Track how hard each set feels. Your coach uses this to adjust your program intelligently.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-gray-900">Personal Records</span>
                <span className="text-sm text-gray-500">Celebrate milestones</span>
              </div>
              <p className="text-gray-600 leading-relaxed">Hit a new PR? Your coach notices and adjusts your training to keep you progressing.</p>
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
