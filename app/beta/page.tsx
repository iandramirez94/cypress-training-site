"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const GAYLE_IMG = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699bd5e86e31b0017c5032d3/13446d4fc_generated_image.png";
const DANIEL_IMG = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/699bd5e86e31b0017c5032d3/28c5f14af_generated_image.png";
const APP_URL = "https://ctc-strength-ai.base44.app/Chat?coach=gayle";

function useScrollFadeUp(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return { ref, inView };
}

function FadeUp({ children, delay = 0, className = "" }) {
  const { ref, inView } = useScrollFadeUp();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Chat bubble component
function ChatBubble({ message, side, avatar, delay, parentInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -30 : 30 }}
      animate={parentInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={`flex items-end gap-2 ${side === "right" ? "flex-row-reverse" : "flex-row"}`}
    >
      {side === "left" && (
        <img src={avatar} alt="coach" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-1" />
      )}
      <div
        className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          side === "left"
            ? "bg-gray-100 text-gray-900 rounded-bl-sm"
            : "text-white rounded-br-sm"
        }`}
        style={side === "right" ? { background: "linear-gradient(135deg, #6366f1, #8b5cf6)" } : {}}
      >
        {message}
      </div>
    </motion.div>
  );
}

function ChatScenario({ title, subtitle, coach, messages }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const avatar = coach === "gayle" ? GAYLE_IMG : DANIEL_IMG;
  const coachName = coach === "gayle" ? "Gayle" : "Daniel";

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-2"
      >
        <div className="flex items-center gap-2 mb-1">
          <img src={avatar} alt={coachName} className="w-6 h-6 rounded-full object-cover" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Coach {coachName}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>
      </motion.div>

      <div className="bg-white rounded-3xl p-5 shadow-[0_2px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <ChatBubble
            key={i}
            message={msg.text}
            side={msg.side}
            avatar={avatar}
            delay={0.15 + i * 0.12}
            parentInView={inView}
          />
        ))}
      </div>
    </div>
  );
}

function Step({ number, title, description, index }) {
  const { ref, inView } = useScrollFadeUp();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="flex flex-col items-start gap-4"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
      >
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

const CARD_ACCENTS = [
  { bg: "from-indigo-50 to-white", bar: "bg-indigo-400" },
  { bg: "from-violet-50 to-white", bar: "bg-violet-400" },
  { bg: "from-purple-50 to-white", bar: "bg-purple-400" },
  { bg: "from-indigo-50 to-white", bar: "bg-indigo-500" },
  { bg: "from-violet-50 to-white", bar: "bg-violet-500" },
  { bg: "from-purple-50 to-white", bar: "bg-purple-500" },
];

function FeatureCard({ title, description, index }) {
  const { ref, inView } = useScrollFadeUp();
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      className={`group bg-gradient-to-b ${accent.bg} rounded-3xl p-8 border border-gray-100 shadow-[0_2px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_60px_rgba(99,102,241,0.12)] hover:-translate-y-1 transition-all duration-500 cursor-default overflow-hidden relative`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${accent.bar} rounded-t-3xl`} />
      <h3 className="text-lg font-bold text-gray-900 mb-3 mt-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
}

export default function BetaLanding() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const chatScenarios = [
    {
      coach: "gayle",
      title: "Hotel gym. No problem.",
      subtitle: "Your program adapts to wherever you are.",
      messages: [
        { side: "right", text: "Traveling next week — only going to have a hotel gym." },
        { side: "left", text: "Got it. What's the setup usually like? Dumbbells only, or do they usually have cables?" },
        { side: "right", text: "Dumbbells and a cable machine. Maybe a bench." },
        { side: "left", text: "That's enough. I'll swap this week's sessions to dumbbell + cable versions — same movements, same progression. You won't lose a step." },
      ]
    },
    {
      coach: "daniel",
      title: "Injured. Program adjusted.",
      subtitle: "No guessing. Your coach finds a safer path.",
      messages: [
        { side: "right", text: "Bench press has been hurting my shoulder. Left side." },
        { side: "left", text: "Flat bar bench puts your shoulder in a compromised position at the bottom. Let's move to a landmine press or incline dumbbell — better shoulder positioning, still trains the same pattern. Which do you have access to?" },
        { side: "right", text: "I've got dumbbells. Incline bench too." },
        { side: "left", text: "Incline dumbbell press it is. I'll swap it across all remaining sessions in this block. If it still bothers you, we go to cable flies and close-grip pushups." },
      ]
    },
    {
      coach: "gayle",
      title: "Stronger than you think.",
      subtitle: "Your coach tracks every rep.",
      messages: [
        { side: "right", text: "Just finished. Squats felt heavy today." },
        { side: "left", text: "You hit 185 for 3×5 — that's 15 lbs more than Week 1. It's going to feel hard. That's the point." },
        { side: "right", text: "Okay that actually makes me feel better lol" },
        { side: "left", text: "I bumped your squat to 190 for next session. Same thing — you'll hit it, it'll feel hard, and two weeks from now 190 will feel easy." },
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        html { scroll-behavior: smooth; }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/60">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-900 tracking-tight">Cypress Training AI</span>
          <a
            href={APP_URL}
            className="text-sm font-semibold text-white px-5 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            Join Free Beta
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-16 relative overflow-hidden">
        {/* Subtle ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(99,102,241,0.07) 0%, transparent 70%)"
          }}
        />

        <motion.div
          ref={heroRef}
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-6"
          >
            Cypress Training Center
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            className="text-[clamp(52px,10vw,96px)] font-extrabold text-gray-900 leading-[0.95] tracking-[-0.03em] mb-6"
          >
            The Coach Who<br />
            <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Never Clocks Out.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Your AI coach builds custom training programs, tracks your progress, and coaches you through every workout — all from your pocket.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="flex flex-col items-center gap-3"
          >
            <a
              href={APP_URL}
              className="inline-flex items-center gap-2 text-white font-semibold text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              Join Free Beta
            </a>
            <p className="text-sm text-gray-400">
              🎉 <span className="font-semibold">Limited to first 10 users</span> — No credit card required
            </p>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-gray-700 font-medium text-sm px-6 py-2 hover:text-gray-900 transition-colors"
            >
              See How It Works →
            </a>
          </motion.div>

          {/* Coach avatars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-3 mt-12"
          >
            <div className="flex -space-x-2">
              <img src={GAYLE_IMG} alt="Gayle" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" />
              <img src={DANIEL_IMG} alt="Daniel" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-28 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-3">Process</p>
            <h2 className="text-[clamp(36px,6vw,60px)] font-extrabold text-gray-900 tracking-[-0.03em] leading-tight">
              Up and running<br />in under 5 minutes.
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-md mx-auto">No spreadsheets. No guesswork. Just a real program built for you.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                number: "1",
                title: "Choose your coach.",
                description: "Gayle is warm and encouraging. Daniel is technical and direct. Both build world-class programs."
              },
              {
                number: "2",
                title: "Answer 6 questions.",
                description: "Goal, equipment, schedule, injuries. Your coach has everything they need to build the right program."
              },
              {
                number: "3",
                title: "Start training.",
                description: "Your personalized 6-week program is ready. Follow workouts, log progress, text your coach anytime."
              }
            ].map((step, i) => (
              <Step key={i} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto max-w-4xl" />

      {/* ─── CHAT SCENARIOS ─── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-3">Real Coaching</p>
            <h2 className="text-[clamp(36px,6vw,60px)] font-extrabold text-gray-900 tracking-[-0.03em] leading-tight">
              Your coach texts back.<br />Immediately.
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-md mx-auto">Traveling. Injured. Not feeling it. Your coach adapts your program in real time.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chatScenarios.map((scenario, i) => (
              <ChatScenario key={i} {...scenario} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto max-w-4xl" />

      {/* ─── WORKOUT LOGGING SHOWCASE ─── */}
      <section className="py-28 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-3">Workout Logging</p>
            <h2 className="text-[clamp(36px,6vw,56px)] font-extrabold text-gray-900 tracking-[-0.03em] leading-tight">
              Log your sets.<br />Coach does the rest.
            </h2>
            <p className="text-gray-500 text-lg mt-4 max-w-lg mx-auto">Track every rep in seconds. Your coach reads your performance after each session and automatically adjusts next week's weights.</p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="bg-gray-50 rounded-3xl shadow-[0_2px_40px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden p-4 space-y-3">
              {/* Header */}
              <div className="bg-white/90 backdrop-blur-xl border-b border-gray-100 px-4 py-3 rounded-2xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 truncate">Upper Body Strength</p>
                  <p className="text-xs text-gray-400">Week 3, Day 2 — Upper Body Strength</p>
                </div>
              </div>

              {/* Exercise cards */}
              {[
                { name: "Bench Press", sets: 3, reps: "5", rpe: 7, rest: 180, cue: "Keep your shoulder blades packed. Bar to lower chest.", suggested: 155, loggedSets: [{w:155,r:5,done:true},{w:155,r:5,done:true},{w:155,r:5,done:true}] },
                { name: "Barbell Row", sets: 3, reps: "5", rpe: 7, rest: 180, cue: "Lead with your elbows. Don't let your lower back round.", suggested: 135, loggedSets: [{w:135,r:5,done:true},{w:135,r:5,done:true},{w:135,r:4,done:true}] },
                { name: "Overhead Press", sets: 3, reps: "5", rpe: 7, rest: 150, cue: "Squeeze your glutes at the top. Don't hyperextend.", suggested: 95, loggedSets: [{w:95,r:5,done:true},{w:95,r:5,done:true},{w:95,r:"",done:false}] },
              ].map((ex, ei) => {
                const allDone = ex.loggedSets.every(s => s.done && s.r !== "");
                return (
                  <div key={ei} className={`rounded-2xl border px-5 py-4 transition-colors ${allDone ? "border-green-200 bg-green-50/50" : "border-gray-100 bg-white"}`}>
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-base font-semibold text-gray-900">{ex.name}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300 text-sm">▶</span>
                        <span className="text-gray-300 text-sm">⊙</span>
                        <span className="text-gray-300 text-sm">⇄</span>
                        <span className="text-xs text-gray-400 font-medium">{ex.loggedSets.filter(s=>s.done).length}/{ex.sets}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{ex.sets} x {ex.reps} · RPE {ex.rpe} · Rest {ex.rest}s</p>
                    <p className="text-xs text-gray-400 italic mb-3">{ex.cue}</p>

                    {/* Set rows */}
                    <div className="space-y-2">
                      <div className="grid grid-cols-[40px_1fr_1fr_44px] gap-2 text-[11px] font-medium text-gray-400 uppercase tracking-wide px-1">
                        <span>Set</span><span>Weight</span><span>Reps</span><span></span>
                      </div>
                      {ex.loggedSets.map((set, si) => (
                        <div key={si} className={`grid grid-cols-[40px_1fr_1fr_44px] gap-2 items-center ${set.done && set.r !== "" ? "opacity-60" : ""}`}>
                          <span className="text-sm font-medium text-gray-500 pl-1">{si+1}</span>
                          <div className={`h-9 rounded-xl text-sm flex items-center px-3 border ${set.done && set.r !== "" ? "bg-gray-50 border-gray-200 text-gray-700" : "bg-gray-50 border-gray-200 text-gray-400"}`}>{set.w || ""}<span className="text-[10px] text-gray-400 ml-0.5">{set.w ? "lbs" : "lbs"}</span></div>
                          <div className={`h-9 rounded-xl text-sm flex items-center px-3 border bg-gray-50 border-gray-200 ${set.r !== "" ? "text-gray-700" : "text-gray-400"}`}>{set.r || ""}</div>
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${set.done && set.r !== "" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                        </div>
                      ))}
                      <div className="flex items-center gap-3 pt-2 border-t border-gray-50 mt-2">
                        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">Effort</span>
                        <div className="h-9 w-24 rounded-xl bg-gray-50 border border-gray-200 flex items-center px-3 text-sm text-gray-400">1-10</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Complete button */}
              <div className="pt-1 pb-2 px-1">
                <button className="w-full h-12 bg-blue-600 text-white rounded-2xl text-base font-semibold">Complete Workout</button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto max-w-4xl" />

      {/* ─── FEATURE HIGHLIGHTS ─── */}
      <section className="py-28 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-20">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-3">Features</p>
            <h2 className="text-[clamp(36px,6vw,60px)] font-extrabold text-gray-900 tracking-[-0.03em] leading-tight">
              Built to meet you where you're at.<br />Then push you further.
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Unlimited Adaptability.",
                description: "Traveling, injured, short on time? Your coach intelligently adjusts your program on the fly and checks in to make sure you stay on track — no disruption, no lost progress."
              },
              {
                title: "Programs that evolve.",
                description: "Your coach remembers everything. After 6 weeks, your next program builds on exactly where you left off."
              },
              {
                title: "Built for your schedule.",
                description: "2 days a week. 5 days a week. 20-minute sessions. 90-minute sessions. Your program matches your actual life."
              },
              {
                title: "Coach on demand.",
                description: "Ask anything. Form questions, nutrition, whether you can skip a day. Every answer is grounded in Cypress Training's actual coaching philosophy — not random internet advice."
              },
              {
                title: "Simple by design.",
                description: "One clean screen. No calendars to dig through, no menus to navigate. Your workout is right in front of you — and if you ever want to change something, just ask your coach."
              },
              {
                icon: "↑",
                title: "Progressive overload, automated.",
                description: "Every week you lift heavier. Your coach tracks your performance and adjusts weights session by session — no math, no guessing."
              }
            ].map((feature, i) => (
              <FeatureCard key={i} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── COACHES ─── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-3">Your Coach</p>
            <h2 className="text-[clamp(36px,6vw,56px)] font-extrabold text-gray-900 tracking-[-0.03em] leading-tight">
              Two coaches.<br />One standard.
            </h2>
            <p className="text-gray-500 text-lg mt-4">Same programming quality. Different styles. Pick your fit.</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                coach: "gayle",
                img: GAYLE_IMG,
                name: "Gayle",
                tagline: "Warm. Direct. No BS.",
                description: "She checks in, meets you where you're at, and makes training feel sustainable — not like punishment. She'll push you, but she won't make you feel bad if you miss a session."
              },
              {
                coach: "daniel",
                img: DANIEL_IMG,
                name: "Daniel",
                tagline: "Technical. Precise. Honest.",
                description: "No fluff, no hype — just straight answers, precise programming, and honest feedback when you need it. He'll explain the why, not just the what."
              }
            ].map(({ coach, img, name, tagline, description }, i) => (
              <FadeUp key={coach} delay={i * 0.1}>
                <div className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_2px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_60px_rgba(99,102,241,0.1)] hover:-translate-y-1 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-5">
                    <img src={img} alt={name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                      <p className="text-sm text-indigo-500 font-medium">{tagline}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto max-w-4xl" />

      {/* ─── NOT A GPT WRAPPER ─── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-4">Built Different</p>
              <h2 className="text-[clamp(32px,5vw,52px)] font-extrabold text-gray-900 tracking-[-0.03em] leading-tight mb-5">
                Not another<br />GPT wrapper.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Generic AI gives generic answers. Cypress Training AI is built on a specific, proven coaching philosophy — the same one we use ourselves at Cypress Training Center. Every response is consistent, principled, and grounded in real-world lifting experience.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed">
                Developed by an engineer turned personal trainer — someone who's spent years in the gym, not just studying it. That expertise is baked into every program, every recommendation, every answer. Our goal is to give as many people access to genuinely high-quality coaching as possible. We hope we can do that for you.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-4">
                {[
                  {
                    label: "Generic AI",
                    items: [
                      "Random answers from the internet",
                      "No consistent training philosophy",
                      "Can't track or adjust your program",
                      "Forgets everything between sessions",
                    ],
                    bad: true
                  },
                  {
                    label: "Cypress Training AI",
                    items: [
                      "Built on a specific, proven methodology",
                      "Consistent advice, session after session",
                      "Tracks your performance and adapts your program",
                      "Remembers your history and goals",
                    ],
                    bad: false
                  }
                ].map(({ label, items, bad }) => (
                  <div
                    key={label}
                    className={`rounded-2xl p-6 border ${bad ? "border-gray-100 bg-gray-50" : "border-indigo-100 bg-indigo-50/40"}`}
                  >
                    <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${bad ? "text-gray-400" : "text-indigo-500"}`}>{label}</p>
                    <ul className="space-y-2.5">
                      {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${bad ? "bg-gray-200 text-gray-400" : "text-white"}`}
                            style={bad ? {} : { background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                          >
                            {bad ? "✕" : "✓"}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6d28d9 100%)" }}
        />
        {/* Ambient glow shapes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <FadeUp>
            <h2 className="text-[clamp(36px,7vw,72px)] font-extrabold text-white tracking-[-0.03em] leading-tight mb-6">
              Ready to get<br />stronger?
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Your AI strength coach is waiting. First session ready in 5 minutes.
            </p>
            <a
              href={APP_URL}
              className="inline-flex items-center gap-2 bg-white font-semibold text-gray-900 text-base px-8 py-4 rounded-2xl hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all duration-200"
            >
              Join Free Beta — 10 Spots Left
            </a>
            <p className="text-white/40 text-sm mt-5">No download required. No credit card required.</p>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm font-semibold text-gray-400">Cypress Training Center</span>
          <span className="text-xs text-gray-300">© 2025 Cypress Training Center. All rights reserved. iPhone and Android apps coming soon.</span>
        </div>
      </footer>
    </div>
  );
}
