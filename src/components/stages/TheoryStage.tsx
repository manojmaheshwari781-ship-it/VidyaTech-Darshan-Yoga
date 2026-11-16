import React from 'react';
import { DailySessionData, AgeGroup } from '../../types/yoga';
import { Volume2, Sparkles, BookOpen, Heart, Activity } from 'lucide-react';
import { voiceEngine } from '../../utils/voiceEngine';

interface TheoryStageProps {
  session: DailySessionData;
  ageGroup: AgeGroup;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export const TheoryStage: React.FC<TheoryStageProps> = ({
  session,
  ageGroup,
  voiceEnabled,
}) => {
  const { theory, sankalpa, title, sanskritTitle } = session;

  const handleReadDarshan = () => {
    const textToRead = `${title}. Today's Darshan by Manoj YogaWala: ${theory.philosophyTitle}. ${theory.darshanQuote}. ${theory.teaching}. Intention for today: ${sankalpa}`;
    voiceEngine.speak(textToRead);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Sanskrit Title & Sankalpa */}
      <div className="bg-gradient-to-r from-amber-500/10 via-pink-500/5 to-sky-500/5 dark:from-[#112033] dark:via-[#151a2d] dark:to-[#0c1624] border border-amber-500/30 dark:border-amber-500/20 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <span>Stage 1 of 4: Yogic Philosophy & Wisdom</span>
              <span>·</span>
              <span className="font-serif-display italic">{sanskritTitle}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReadDarshan}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-100/90 dark:bg-amber-950/60 hover:bg-amber-200/80 dark:hover:bg-amber-900/60 rounded-xl transition-colors border border-amber-300/50 dark:border-amber-700/50"
              title="Listen to Manoj YogaWala's spoken Darshan"
            >
              <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Listen to Guidance</span>
            </button>
          </div>
        </div>

        {/* Sankalpa / Intention Card */}
        <div className="mt-4 pt-4 border-t border-amber-500/20 dark:border-amber-500/15 flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-pink-500 dark:text-pink-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-semibold text-pink-700 dark:text-pink-300 uppercase tracking-wider block">
              Today's Sankalpa (Sacred Intention)
            </span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 italic mt-0.5">
              "{sankalpa}"
            </p>
          </div>
        </div>
      </div>

      {/* Main Darshan Teaching */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>Philosophy Principle</span>
              <span>·</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">{theory.philosophyTitle}</span>
            </div>

            {/* Master Darshan Quote */}
            <blockquote className="p-4 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/60 my-3">
              <p className="font-serif-display text-base md:text-lg italic text-slate-800 dark:text-slate-200 leading-relaxed">
                "{theory.darshanQuote}"
              </p>
              <footer className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-2 text-right">
                — Manoj YogaWala Darshan
              </footer>
            </blockquote>

            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
              {theory.teaching}
            </p>

            {/* Practical Everyday Integration */}
            <div className="mt-5 p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                <Heart className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Off-the-Mat Living Practice</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {theory.practicalLifeLesson}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: Anatomy & Age Guidance */}
        <div className="space-y-4">
          {/* Anatomical Insight */}
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <Activity className="w-4 h-4 text-sky-500" />
              <span>Body & Energy Science</span>
            </div>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {theory.anatomicalInsight}
            </p>
          </div>

          {/* Age-Specific Advice */}
          <div className="bg-slate-100/80 dark:bg-[#0f1d2e] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/60">
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
              Guidance for {ageGroup === 'seniors' ? 'Seniors & Gentle Chairs' : ageGroup === 'kids' ? 'Kids & Family' : ageGroup === 'adults' ? 'Adults & Desk Relief' : 'All Practitioners'}
            </span>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {theory.ageGuidance[ageGroup] || theory.ageGuidance.all}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
