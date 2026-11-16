import React, { useState } from 'react';
import { BookOpen, Sparkles, Heart, Shield, Users, Sun, CheckCircle2 } from 'lucide-react';

export const WisdomLibrary: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<'darshan' | 'stages' | 'ages' | 'science'>('darshan');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-pink-500/5 to-sky-500/5 dark:from-[#0e1d2e] dark:via-[#131b2c] dark:to-[#0c1624] border border-amber-500/30 dark:border-amber-500/20 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>VidyaTech Darshan Archives</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif-display font-semibold text-slate-900 dark:text-white">
          Wisdom, Philosophy & Age Guides by Manoj YogaWala
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
          VidyaTech Darshan bridges timeless Himalayan yogic science with daily intuitive guidance. Explore the philosophy of the 4 stages, age-group adaptations, and anatomical wisdom.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-amber-500/20 dark:border-amber-500/15">
          <button
            onClick={() => setSelectedTopic('darshan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTopic === 'darshan'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-500/20'
                : 'bg-white dark:bg-[#111f32] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Manoj YogaWala's Vision
          </button>
          <button
            onClick={() => setSelectedTopic('stages')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTopic === 'stages'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-500/20'
                : 'bg-white dark:bg-[#111f32] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            The 4 Stages Explained
          </button>
          <button
            onClick={() => setSelectedTopic('ages')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTopic === 'ages'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-500/20'
                : 'bg-white dark:bg-[#111f32] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Guidelines for All Ages
          </button>
          <button
            onClick={() => setSelectedTopic('science')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedTopic === 'science'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-500/20'
                : 'bg-white dark:bg-[#111f32] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Breath & Spine Science
          </button>
        </div>
      </div>

      {/* Content Panels */}
      {selectedTopic === 'darshan' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-pink-500 to-sky-400 shadow-md shrink-0">
                <img
                  src="/assets/aistudio/Yogi_meditating_on_lotus_flower_20260929160250_9487d332.jpg"
                  alt="Manoj YogaWala"
                  className="w-full h-full object-cover rounded-full bg-white dark:bg-[#0c1624]"
                />
              </div>
              <div>
                <h2 className="text-xl font-serif-display font-semibold text-slate-900 dark:text-white">
                  The Philosophy of VidyaTech Darshan
                </h2>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  Direct Teachings & Guidance by Manoj YogaWala
                </p>
              </div>
            </div>

            <blockquote className="p-4 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/60 my-3">
              <p className="font-serif-display italic text-slate-800 dark:text-slate-200 text-base">
                "Vidya means true knowledge. Darshan means seeing reality as it is. Yoga is not an acrobatic display; it is a sacred meeting between your individual breath and the universal silence."
              </p>
              <footer className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-2 text-right">
                — Manoj YogaWala
              </footer>
            </blockquote>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
              Modern life often separates physical exercise from mental quietude. VidyaTech Darshan was conceived to reunite them: providing structured 12-month evolution where anyone, from a 7-year-old child to an 85-year-old elder, can experience authentic daily transformation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/60">
                <Sparkles className="w-5 h-5 text-amber-500 mb-2" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Patience Over Performance</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Never force the body past its comfort edge. Stability (Sthira) and Ease (Sukham) must always co-exist.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/60">
                <Heart className="w-5 h-5 text-pink-500 mb-2" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Daily Micro-Habit</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  15 steady minutes every morning creates far more lasting neurological change than 2 hours once a week.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/60">
                <Sun className="w-5 h-5 text-sky-500 mb-2" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Universal Inclusivity</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Yoga adapts to the human being, never the human being forced to fit an arbitrary yoga mold.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTopic === 'stages' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                Stage 1: Theory (Darshan)
              </span>
              <h3 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white mb-2">
                Mindful Intent & Philosophical Anchor
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Why begin with theory? Because when the mind understands the purpose and intention (Sankalpa) of practice, neurological receptivity triples. Theory frames the session not as a physical chore, but as an awakening of inner space.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider block mb-1">
                Stage 2: Breathwork (Pranayama)
              </span>
              <h3 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white mb-2">
                Clearing the Channels (Nadis)
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Breath is the direct remote control of the autonomic nervous system. By regulating inhalations, exhalations, and gentle pauses, we down-regulate sympathetic fight-or-flight circuits before moving the body.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider block mb-1">
                Stage 3: Body Poses (Asanas)
              </span>
              <h3 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white mb-2">
                Spinal Alignment & Joint Lubrication
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Asanas release stored fascial bracing, strengthen core stabilizers, and decompress the spine. Every posture in VidyaTech Darshan includes clear visual diagrams and modifications for chairs and props.
              </p>
            </div>

            <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-semibold text-pink-500 uppercase tracking-wider block mb-1">
                Stage 4: Meditation (Dhyana)
              </span>
              <h3 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white mb-2">
                Absorption & Transcendent Stillness
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The culmination of the entire session. Having cleared the mind with theory, tuned the breath with pranayama, and anchored the body with asana, meditation happens effortlessly without struggle.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedTopic === 'ages' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-serif-display font-semibold text-slate-900 dark:text-white mb-4">
              Practicing by Age Group & Life Stage
            </h2>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 dark:border-amber-500/20">
                <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-500" />
                  <span>Seniors & Golden Age Practitioners (60+ yrs)</span>
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Use a sturdy upright dining chair for balance in standing postures.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Avoid breath-holding (Kumbhaka); focus on gentle, continuous inhalations and exhalations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Prioritize ankle, wrist, and neck joint mobility to prevent falls and preserve independence.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/60 dark:border-slate-700/60">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-500" />
                  <span>Desk Workers & Working Adults (20 - 60 yrs)</span>
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                    <span>Open the chest and anterior hip flexors to reverse "computer slump" and forward head carriage.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                    <span>Engage Nadi Shodhana (Alternate Nostril) to soothe cognitive digital fatigue and screen strain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                    <span>Use the 15-minute Level 1-3 routines as a lunchtime break to reset cortisol levels.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-pink-500/10 dark:bg-pink-950/20 border border-pink-500/30 dark:border-pink-500/20">
                <h3 className="text-sm font-semibold text-pink-900 dark:text-pink-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  <span>Children & Young Teens (6 - 19 yrs)</span>
                </h3>
                <ul className="mt-2 space-y-1.5 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                    <span>Connect postures to animal stories (Cobra, Cat, Cow, Tree) to make practice joyful and intuitive.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                    <span>Practice Bhramari (Humming Bee breath) to improve study concentration and soothe bedtime restlessness.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0 mt-0.5" />
                    <span>Foster healthy spinal alignment early to prevent heavy backpack hunching.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTopic === 'science' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h2 className="text-xl font-serif-display font-semibold text-slate-900 dark:text-white mb-3">
              The Science of Breath & Spinal Alignment
            </h2>
            <div className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Modern neuro-cardiology has validated what Himalayan rishis taught thousands of years ago: <strong>slow, smooth nasal breathing at approximately 5.5 to 6 breaths per minute triggers Heart Rate Variability (HRV) coherence</strong>.
              </p>
              <p>
                During our Level 1 to Level 12 progression, the diaphragm's excursion increases by over 30%, which massages the internal abdominal viscera, supports healthy lymphatic return, and activates acetylcholine release via the vagus nerve.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/60 dark:border-slate-700/60 font-mono-numbers">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                  12-Level Progression Architecture:
                </span>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <li>· Levels 1-3 (Months 1-3): 15 mins daily — Foundation & Gentle Awakening</li>
                  <li>· Levels 4-6 (Months 4-6): 25 mins daily — Steadiness, Solar Strength & Core Alignment</li>
                  <li>· Levels 7-9 (Months 7-9): 35 mins daily — Deepening Strength, Flow & Pranic Flow</li>
                  <li>· Levels 10-12 (Months 10-12): 45 mins daily — Subtle Kundalini, Samadhi Stillness & Living Darshan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
