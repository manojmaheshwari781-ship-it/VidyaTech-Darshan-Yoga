import React from 'react';
import { LevelInfo } from '../types/yoga';
import { Clock, CheckCircle2, Sparkles, Lock, Unlock, KeyRound } from 'lucide-react';

interface LevelSelectorProps {
  levels: LevelInfo[];
  selectedLevelId: number;
  onSelectLevel: (levelId: number) => void;
  selectedDayNumber: number;
  onSelectDay: (dayNumber: number) => void;
  completedDays: Record<string, boolean>;
  unlockedLevels: number[];
  hasFullAccess: boolean;
  onRequestUnlock: (levelId?: number) => void;
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({
  levels,
  selectedLevelId,
  onSelectLevel,
  selectedDayNumber,
  onSelectDay,
  completedDays,
  unlockedLevels,
  hasFullAccess,
  onRequestUnlock,
}) => {
  const currentLevel = levels.find((l) => l.id === selectedLevelId) || levels[0];

  const isLevelUnlocked = (lvlId: number) =>
    lvlId === 1 || hasFullAccess || unlockedLevels.includes(lvlId);

  // Helper to count completed days in a level
  const getLevelCompletedCount = (lvlId: number) => {
    let count = 0;
    for (let day = 1; day <= 30; day++) {
      if (completedDays[`${lvlId}-${day}`]) {
        count++;
      }
    }
    return count;
  };

  return (
    <div className="space-y-6">
      {/* 30-Day Calendar Strip for Selected Level */}
      <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-5 md:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <span>{currentLevel.name}</span>
              <span>·</span>
              <span>Month {currentLevel.month}</span>
              <span>·</span>
              <span className="font-mono-numbers text-pink-600 dark:text-pink-400">{currentLevel.dailyMinutes} mins daily</span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif-display font-semibold text-slate-900 dark:text-white">
              30-Day Daily Darshan Path
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono-numbers">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>
              {getLevelCompletedCount(selectedLevelId)} / 30 Days Completed in this Level
            </span>
          </div>
        </div>

        {/* 30-Day Grid */}
        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-15 gap-1.5 md:gap-2">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isCompleted = Boolean(completedDays[`${selectedLevelId}-${day}`]);
            const isCurrent = day === selectedDayNumber;

            return (
              <button
                key={day}
                onClick={() => onSelectDay(day)}
                className={`h-11 rounded-xl text-xs font-medium transition-all flex flex-col items-center justify-center relative ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold ring-2 ring-amber-500 ring-offset-2 dark:ring-offset-[#0c1624] shadow-md shadow-amber-500/20'
                    : isCompleted
                    ? 'bg-pink-500/10 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300 border border-pink-400/30'
                    : 'bg-slate-50 dark:bg-[#111f32] text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-[#17283c]'
                }`}
                title={`Day ${day}: ${isCompleted ? 'Completed' : 'Ready'}`}
              >
                <span className="font-mono-numbers text-xs">{day}</span>
                {isCompleted && !isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Membership / Unlock Code Banner when not Full Access */}
      {!hasFullAccess && (
        <div className="bg-gradient-to-r from-emerald-600/10 via-amber-500/10 to-transparent dark:from-emerald-950/40 dark:via-amber-950/20 dark:to-[#0c1624] rounded-2xl p-4 sm:p-5 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                Unlock Levels 2 to 12 with Secret Code or Admin Approval
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Level 1 is open to all practitioners. Paid via Easypaisa or JazzCash? Enter your Secret Unlock Voucher to open higher levels immediately.
              </p>
            </div>
          </div>
          <button
            onClick={() => onRequestUnlock()}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 rounded-xl transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Redeem Unlock Code</span>
          </button>
        </div>
      )}

      {/* 12-Month / 12-Level Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg md:text-xl font-serif-display font-semibold text-slate-900 dark:text-white">
              12 Levels Comprehensive Journey
            </h3>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              1 Month per Level · 15m (Lv 1-3) · 25m (Lv 4-6) · 35m (Lv 7-9) · 45m (Lv 10-12)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {levels.map((lvl) => {
            const isSelected = lvl.id === selectedLevelId;
            const unlocked = isLevelUnlocked(lvl.id);
            const completedCount = getLevelCompletedCount(lvl.id);
            const percent = Math.round((completedCount / 30) * 100);

            const tierBadge = lvl.dailyMinutes === 15
              ? 'Foundation & Awakening'
              : lvl.dailyMinutes === 25
              ? 'Steadiness & Alignment'
              : lvl.dailyMinutes === 35
              ? 'Strength & Pranic Flow'
              : 'Mastery & Stillness';

            return (
              <div
                key={lvl.id}
                onClick={() => {
                  if (unlocked) {
                    onSelectLevel(lvl.id);
                  } else {
                    onRequestUnlock(lvl.id);
                  }
                }}
                className={`rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between relative ${
                  !unlocked
                    ? 'bg-slate-50/80 dark:bg-[#09121e] border-slate-200/70 dark:border-slate-800/80 opacity-90 hover:border-amber-500/50'
                    : isSelected
                    ? 'bg-gradient-to-br from-amber-500/10 via-pink-500/5 to-transparent dark:from-[#112033] dark:via-[#151c2d] dark:to-[#0c1624] border-amber-500/60 ring-1 ring-amber-500/30 shadow-md'
                    : 'bg-white dark:bg-[#0c1624] border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      Month {lvl.month} · Level {lvl.id}
                    </span>
                    <div className="flex items-center gap-2 font-mono-numbers text-slate-700 dark:text-slate-300">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>{lvl.dailyMinutes}m/day</span>
                      </span>
                      {!unlocked && (
                        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white">
                    {lvl.name}
                  </h4>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-serif-display italic">
                    {lvl.sanskritName}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                    {lvl.description}
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{lvl.chakraFocus}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {unlocked ? (
                    <>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-mono-numbers">
                        <span>{tierBadge}</span>
                        <span>{completedCount} / 30 Days</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 via-pink-500 to-sky-400 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <span>Click to Unlock Level {lvl.id}</span>
                      <KeyRound className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
