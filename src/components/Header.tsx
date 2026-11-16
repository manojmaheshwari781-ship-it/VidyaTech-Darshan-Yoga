import React from 'react';
import { Sparkles, Moon, Sun, Volume2, VolumeX, Shield, User } from 'lucide-react';
import { RegisteredUser } from '../types/yoga';

interface HeaderProps {
  currentTab: 'practice' | 'roadmap' | 'wisdom' | 'sound';
  onSelectTab: (tab: 'practice' | 'roadmap' | 'wisdom' | 'sound') => void;
  onQuickStart: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  currentUser: RegisteredUser | null;
  onOpenUserModal: () => void;
  onOpenAdminLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onQuickStart,
  isDarkMode,
  onToggleDarkMode,
  voiceEnabled,
  onToggleVoice,
  currentUser,
  onOpenUserModal,
  onOpenAdminLogin,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0c1624]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand title with prominent official logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onSelectTab('practice'); }}
          className="text-lg md:text-xl font-serif-display font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-emerald-600 via-amber-500 to-pink-500 shadow-sm shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
            <img
              src="/assets/aistudio/Yogi_meditating_on_lotus_flower_20260929160250_9487d332.jpg"
              alt="VidyaTech Darshan Official Logo"
              className="w-full h-full object-cover rounded-full bg-white dark:bg-slate-900"
            />
          </div>
          <div className="flex flex-col">
            <span className="leading-tight">VidyaTech Darshan</span>
            <span className="text-[10px] font-sans font-medium tracking-wider text-amber-600 dark:text-amber-400 -mt-0.5">
              by Manoj YogaWala
            </span>
          </div>
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => onSelectTab('practice')}
            className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'practice' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Daily Practice
          </button>

          <button
            onClick={() => onSelectTab('roadmap')}
            className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'roadmap' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            12 Levels Path
          </button>

          <button
            onClick={() => onSelectTab('wisdom')}
            className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'wisdom' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Wisdom & Guides
          </button>

          <button
            onClick={() => onSelectTab('sound')}
            className={`hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'sound' ? 'text-amber-600 dark:text-amber-400 font-semibold border-b-2 border-amber-500 pb-0.5' : ''
            }`}
          >
            Sound Studio
          </button>
        </nav>

        {/* Zone 3: Quick controls + Account + Admin Portal + Primary CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Voice guidance indicator */}
          <button
            onClick={onToggleVoice}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={voiceEnabled ? 'Voice Guidance Active' : 'Voice Guidance Muted'}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-amber-500" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Dual Theme Switcher */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Member Sign Up / Profile */}
          <button
            onClick={onOpenUserModal}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-[#152438] hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 border border-slate-200/80 dark:border-slate-700"
            title="Practitioner Sign Up & Unlock Codes"
          >
            <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="max-w-[90px] truncate">
              {currentUser ? currentUser.name.split(' ')[0] : 'Sign Up'}
            </span>
          </button>

          {/* Admin Portal */}
          <button
            onClick={onOpenAdminLogin}
            className="px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            title="Open Admin Portal"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Admin Portal</span>
          </button>

          {/* 1 Primary Action */}
          <button
            onClick={onQuickStart}
            className="hidden sm:flex px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 rounded-xl transition-all shadow-sm shadow-amber-500/20 whitespace-nowrap shrink-0 items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-100" />
            <span>Begin Practice</span>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet nav row */}
      <div className="lg:hidden flex items-center justify-around py-2 px-3 border-t border-slate-200/60 dark:border-slate-800 text-xs">
        <button
          onClick={() => onSelectTab('practice')}
          className={`py-1 px-2 font-medium ${currentTab === 'practice' ? 'text-amber-500 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Daily Practice
        </button>
        <button
          onClick={() => onSelectTab('roadmap')}
          className={`py-1 px-2 font-medium ${currentTab === 'roadmap' ? 'text-amber-500 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          12 Levels
        </button>
        <button
          onClick={() => onSelectTab('wisdom')}
          className={`py-1 px-2 font-medium ${currentTab === 'wisdom' ? 'text-amber-500 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Wisdom
        </button>
        <button
          onClick={() => onSelectTab('sound')}
          className={`py-1 px-2 font-medium ${currentTab === 'sound' ? 'text-amber-500 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Sounds
        </button>
      </div>
    </header>
  );
};
