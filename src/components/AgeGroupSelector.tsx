import React from 'react';
import { AgeGroup } from '../types/yoga';
import { Users, Armchair, Dumbbell, Smile } from 'lucide-react';

interface AgeGroupSelectorProps {
  currentAgeGroup: AgeGroup;
  onChangeAgeGroup: (group: AgeGroup) => void;
}

const AGE_OPTIONS: { id: AgeGroup; label: string; icon: React.ComponentType<{ className?: string }>; description: string }[] = [
  { id: 'all', label: 'All Ages (Universal)', icon: Users, description: 'Classic balanced alignment' },
  { id: 'seniors', label: 'Seniors & Gentle Chair', icon: Armchair, description: 'Supported joint-friendly moves' },
  { id: 'adults', label: 'Active Adults & Desk Relief', icon: Dumbbell, description: 'Spine decompression & vitality' },
  { id: 'kids', label: 'Teens & Kids', icon: Smile, description: 'Playful animal postures' },
];

export const AgeGroupSelector: React.FC<AgeGroupSelectorProps> = ({
  currentAgeGroup,
  onChangeAgeGroup,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 bg-slate-100/90 dark:bg-[#0f1d2e]/80 rounded-2xl border border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 px-2 shrink-0">
        <Users className="w-4 h-4 text-amber-500" />
        <span className="font-semibold">Practice Mode:</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 w-full">
        {AGE_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = opt.id === currentAgeGroup;
          return (
            <button
              key={opt.id}
              onClick={() => onChangeAgeGroup(opt.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all text-left whitespace-nowrap ${
                isSelected
                  ? 'bg-white dark:bg-[#152438] text-slate-900 dark:text-white shadow-sm border border-amber-500/40 ring-1 ring-amber-500/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-500' : 'text-slate-400'}`} />
              <div className="truncate">
                <span className="block font-medium truncate">{opt.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
