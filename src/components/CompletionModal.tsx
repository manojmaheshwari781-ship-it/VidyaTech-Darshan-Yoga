import React, { useState } from 'react';
import { Sparkles, CheckCircle, Heart, X, Award } from 'lucide-react';
import { LevelInfo, DailySessionData } from '../types/yoga';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: LevelInfo;
  session: DailySessionData;
  streak: number;
  totalMinutes: number;
  initialNote: string;
  onSaveNote: (note: string) => void;
  onNextDay: () => void;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
  isOpen,
  onClose,
  level,
  session,
  streak,
  totalMinutes,
  initialNote,
  onSaveNote,
  onNextDay,
}) => {
  const [note, setNote] = useState<string>(initialNote);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#0c1624] border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative aura matching logo colors */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-amber-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-sky-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-full transition-colors z-10"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 relative z-10">
          {/* Official Logo as sacred completion seal */}
          <div className="relative mx-auto inline-block">
            <div className="p-1 rounded-full bg-gradient-to-tr from-amber-500 via-pink-500 to-sky-400 shadow-lg glow-solar">
              <img
                src="/assets/aistudio/Yogi_meditating_on_lotus_flower_20260929160250_9487d332.jpg"
                alt="VidyaTech Darshan Official Logo"
                className="w-20 h-20 rounded-full object-cover bg-[#0c1624]"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-amber-500 text-white shadow-md">
              <Award className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-widest pt-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Sadhana Completed • Darshan Accomplished</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-slate-900 dark:text-white">
            Namaste, Dedicated Yogi
          </h2>

          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
            You have successfully completed Day {session.dayNumber} of {level.name}. You honored your body, awakened your prana, and grounded your awareness today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 my-5 text-center font-mono-numbers relative z-10">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wide">Daily Streak</span>
            <span className="text-lg md:text-xl font-bold text-amber-500 dark:text-amber-400">
              {streak} Days
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wide">Today's Session</span>
            <span className="text-lg md:text-xl font-bold text-sky-600 dark:text-sky-400">
              +{level.dailyMinutes}m
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/60 shadow-sm">
            <span className="text-[10px] text-slate-400 block uppercase tracking-wide">Total Journey</span>
            <span className="text-lg md:text-xl font-bold text-emerald-600 dark:text-emerald-400">
              {totalMinutes}m
            </span>
          </div>
        </div>

        {/* Darshan Blessing Quote */}
        <blockquote className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-pink-500/5 to-sky-500/5 dark:from-[#111f32] dark:to-[#0c1624] border border-amber-500/30 dark:border-amber-500/20 text-xs md:text-sm italic text-slate-700 dark:text-slate-300 font-serif-display text-center relative z-10">
          "The peace you created on the mat is not meant to stay on the mat. Carry this luminous clarity into every breath, thought, and interaction."
          <span className="block not-italic font-sans text-[11px] font-semibold text-amber-700 dark:text-amber-400 mt-1">
            — VidyaTech Darshan by Manoj YogaWala
          </span>
        </blockquote>

        {/* Reflection Note Input */}
        <div className="mt-4 space-y-1.5 relative z-10">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-pink-500" />
            <span>Reflect on your sensation or gratitude today:</span>
          </label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Felt my spine lengthen, steady rhythm in breath..."
            className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-6 relative z-10">
          <button
            onClick={() => {
              onSaveNote(note);
              onClose();
            }}
            className="w-1/2 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            Save & Close
          </button>

          <button
            onClick={() => {
              onSaveNote(note);
              onNextDay();
              onClose();
            }}
            className="w-1/2 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:to-orange-700 active:scale-95 rounded-xl transition-all shadow-md glow-solar flex items-center justify-center gap-1.5"
          >
            <span>Proceed to Next Day</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
