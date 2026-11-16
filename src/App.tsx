/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { AgeGroupSelector } from './components/AgeGroupSelector';
import { SessionPlayer } from './components/SessionPlayer';
import { LevelSelector } from './components/LevelSelector';
import { WisdomLibrary } from './components/WisdomLibrary';
import { SoundStudio } from './components/SoundStudio';
import { CompletionModal } from './components/CompletionModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { UserAuthModal } from './components/UserAuthModal';
import { LEVELS_DATA, getDailySession } from './data/levelsData';
import {
  loadUserProgress,
  saveUserProgress,
  markDayCompleted,
} from './utils/userProgress';
import { UserProgress, AgeGroup, RegisteredUser } from './types/yoga';
import { voiceEngine } from './utils/voiceEngine';
import { Flame, Clock, Calendar, KeyRound, Shield } from 'lucide-react';

const ACTIVE_USER_ID_KEY = 'vidyatech_active_user_id';
const ADMIN_TOKEN_KEY = 'vidyatech_admin_token';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [currentTab, setCurrentTab] = useState<'practice' | 'roadmap' | 'wisdom' | 'sound'>('practice');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState<boolean>(false);

  // Member Account & Access State
  const [currentUser, setCurrentUser] = useState<RegisteredUser | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [requestedUnlockLevelId, setRequestedUnlockLevelId] = useState<number | null>(null);

  // Admin Portal State
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(ADMIN_TOKEN_KEY);
  });
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);

  // Sync dark mode class on html tag
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Sync voice engine
  useEffect(() => {
    voiceEngine.setEnabled(progress.voiceEnabled);
  }, [progress.voiceEnabled]);

  // Hydrate current signed-in practitioner profile from backend
  const refreshCurrentUser = useCallback(async (userIdToFetch?: string) => {
    const id = userIdToFetch || (typeof window !== 'undefined' ? localStorage.getItem(ACTIVE_USER_ID_KEY) : null);
    if (!id) return;
    try {
      const res = await fetch(`/api/users/me/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          setCurrentUser(data.user);
        }
      }
    } catch {
      // Offline / transient network error
    }
  }, []);

  useEffect(() => {
    refreshCurrentUser();
  }, [refreshCurrentUser]);

  // Verify existing admin token on mount if present
  useEffect(() => {
    if (!adminToken) return;
    fetch('/api/admin/verify', {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then((res) => {
        if (!res.ok) {
          sessionStorage.removeItem(ADMIN_TOKEN_KEY);
          setAdminToken(null);
        }
      })
      .catch(() => {
        // Keep token on transient network issue
      });
  }, [adminToken]);

  const syncProgressToServer = useCallback(
    async (updatedProgress: UserProgress, userOverride?: RegisteredUser | null) => {
      const targetUser = userOverride ?? currentUser;
      if (!targetUser) return;
      try {
        const res = await fetch(`/api/users/${targetUser.id}/progress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            currentLevelId: updatedProgress.currentLevelId,
            currentDayNumber: updatedProgress.currentDayNumber,
            totalMinutesPracticed: updatedProgress.totalMinutesPracticed,
            streak: updatedProgress.streak,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setCurrentUser(data.user);
          }
        }
      } catch {
        // Ignore transient sync failures
      }
    },
    [currentUser]
  );

  // Determine unlocked levels for active view
  const hasFullAccess = currentUser?.hasFullAccess ?? false;
  const unlockedLevels = currentUser?.unlockedLevels ?? [1];

  const isLevelAccessible = (levelId: number) =>
    levelId === 1 || hasFullAccess || unlockedLevels.includes(levelId);

  // Guard currentLevelId if user's access was revoked
  const effectiveLevelId = isLevelAccessible(progress.currentLevelId) ? progress.currentLevelId : 1;
  const currentLevel = LEVELS_DATA.find((l) => l.id === effectiveLevelId) || LEVELS_DATA[0];
  const currentSession = getDailySession(currentLevel.id, progress.currentDayNumber);
  const currentJournalKey = `${currentLevel.id}-${progress.currentDayNumber}`;
  const savedJournalNote = progress.journalNotes[currentJournalKey] || '';

  const handleSelectLevel = (levelId: number) => {
    if (!isLevelAccessible(levelId)) {
      setRequestedUnlockLevelId(levelId);
      setIsUserModalOpen(true);
      return;
    }
    const updated: UserProgress = {
      ...progress,
      currentLevelId: levelId,
      currentDayNumber: 1, // start at day 1 of selected level
    };
    setProgress(updated);
    saveUserProgress(updated);
    syncProgressToServer(updated);
    setCurrentTab('practice');
  };

  const handleSelectDay = (dayNumber: number) => {
    const updated: UserProgress = {
      ...progress,
      currentDayNumber: dayNumber,
    };
    setProgress(updated);
    saveUserProgress(updated);
    syncProgressToServer(updated);
    setCurrentTab('practice');
  };

  const handleChangeAgeGroup = (group: AgeGroup) => {
    const updated: UserProgress = {
      ...progress,
      agePreference: group,
    };
    setProgress(updated);
    saveUserProgress(updated);
  };

  const handleToggleVoice = () => {
    const nextVal = !progress.voiceEnabled;
    const updated: UserProgress = {
      ...progress,
      voiceEnabled: nextVal,
    };
    setProgress(updated);
    saveUserProgress(updated);
    voiceEngine.setEnabled(nextVal);
  };

  const handleCompleteSession = (minutesPracticed: number, note?: string) => {
    const updated = markDayCompleted(
      progress,
      currentLevel.id,
      progress.currentDayNumber,
      minutesPracticed,
      note
    );
    // Keep user on an accessible level if next level isn't unlocked yet
    if (!isLevelAccessible(updated.currentLevelId)) {
      updated.currentLevelId = currentLevel.id;
    }
    setProgress(updated);
    saveUserProgress(updated);
    syncProgressToServer(updated);
    setIsCompletionModalOpen(true);
  };

  const handleSaveJournalNote = (note: string) => {
    const updated: UserProgress = {
      ...progress,
      journalNotes: {
        ...progress.journalNotes,
        [currentJournalKey]: note,
      },
    };
    setProgress(updated);
    saveUserProgress(updated);
  };

  const handleNextDay = () => {
    let nextDay = progress.currentDayNumber + 1;
    let nextLevel = currentLevel.id;
    if (nextDay > 30) {
      nextDay = 1;
      const candidateLevel = Math.min(12, currentLevel.id + 1);
      if (isLevelAccessible(candidateLevel)) {
        nextLevel = candidateLevel;
      }
    }
    const updated: UserProgress = {
      ...progress,
      currentLevelId: nextLevel,
      currentDayNumber: nextDay,
    };
    setProgress(updated);
    saveUserProgress(updated);
    syncProgressToServer(updated);
  };

  const handleUserAuthSuccess = (user: RegisteredUser) => {
    setCurrentUser(user);
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACTIVE_USER_ID_KEY, user.id);
    }
  };

  const handleSignOutUser = () => {
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACTIVE_USER_ID_KEY);
    }
  };

  const handleAdminLoginSuccess = (token: string) => {
    setAdminToken(token);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    }
  };

  const handleAdminLogout = () => {
    setAdminToken(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    }
    refreshCurrentUser();
  };

  // When logged in as Admin, switch exclusively to the dedicated Admin Dashboard
  if (adminToken) {
    return (
      <AdminDashboard
        adminToken={adminToken}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onLogoutToApp={handleAdminLogout}
        onUserRecordUpdated={(updatedUser) => {
          if (currentUser && updatedUser.id === currentUser.id) {
            setCurrentUser(updatedUser);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070e17] text-slate-900 dark:text-slate-100 transition-colors">
      {/* 3-Zone Compliant Top Navigation Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onQuickStart={() => setCurrentTab('practice')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        voiceEnabled={progress.voiceEnabled}
        onToggleVoice={handleToggleVoice}
        currentUser={currentUser}
        onOpenUserModal={() => {
          setRequestedUnlockLevelId(null);
          setIsUserModalOpen(true);
        }}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome / Landing Screen Banner with Prominent Official Logo */}
        <section className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-white via-amber-50/40 to-emerald-50/30 dark:from-[#0d1826] dark:via-[#0a1420] dark:to-[#0d1c1b] border border-amber-200/70 dark:border-amber-900/40 shadow-sm">
          {/* Subtle logo-inspired background aura */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-sky-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 lg:gap-8">
            {/* Prominent Official Logo */}
            <div className="relative shrink-0 group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-600 via-amber-500 to-pink-500 shadow-lg shadow-amber-500/20 glow-solar">
                <img
                  src="/assets/aistudio/Yogi_meditating_on_lotus_flower_20260929160250_9487d332.jpg"
                  alt="VidyaTech Darshan by Manoj YogaWala Official Logo"
                  className="w-full h-full object-cover rounded-full bg-white dark:bg-[#0c1624]"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-serif-display font-bold shadow-md border-2 border-white dark:border-[#0c1624]">
                ॐ
              </div>
            </div>

            {/* Title, Subtitle, and Vedic Greeting */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                <span>Ancient Wisdom × Modern Vitality</span>
                <span aria-hidden="true">·</span>
                <span className="font-serif-display italic">12-Level Transformation</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-emerald-400">For All Age Groups</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif-display font-bold tracking-tight text-slate-900 dark:text-white">
                VidyaTech Darshan <span className="font-normal text-amber-600 dark:text-amber-400">by Manoj YogaWala</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                A progressive 12-month sanctuary harmonizing body, breath, and stillness. Each daily practice guides you through four complete stages: Theory, Pranayama breathwork, SVG-illustrated body poses, and restorative meditation.
              </p>

              {/* Quick Status / Quick Tabs */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono-numbers text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{currentLevel.name}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{progress.streak} Day Streak</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  <span>{currentLevel.dailyMinutes} mins today</span>
                </div>
                <span>·</span>
                <button
                  onClick={() => {
                    setRequestedUnlockLevelId(null);
                    setIsUserModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-sans font-semibold hover:underline"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>
                    {currentUser
                      ? hasFullAccess
                        ? 'Full Access Active (L1–12)'
                        : 'Redeem Unlock Code'
                      : 'Sign Up & Sync Progress'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Status Strip & Practice Mode Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0c1624] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 dark:text-slate-400 font-mono-numbers">
            {/* Level indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500" />
              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {currentLevel.name}
              </span>
              <span>·</span>
              <span>Month {currentLevel.month} of 12</span>
            </div>

            {/* Daily Minutes */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentLevel.dailyMinutes} mins daily</span>
            </div>

            {/* Total practice */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-sky-500" />
              <span>{progress.totalMinutesPracticed} Total Mins Practiced</span>
            </div>
          </div>

          {/* Age Group Selector for All Ages Customization */}
          <div className="shrink-0 w-full lg:w-auto">
            <AgeGroupSelector
              currentAgeGroup={progress.agePreference}
              onChangeAgeGroup={handleChangeAgeGroup}
            />
          </div>
        </div>

        {/* Tab 1: Daily Practice Session Player */}
        {currentTab === 'practice' && (
          <SessionPlayer
            level={currentLevel}
            session={currentSession}
            ageGroup={progress.agePreference}
            voiceEnabled={progress.voiceEnabled}
            onToggleVoice={handleToggleVoice}
            onCompleteSession={handleCompleteSession}
            savedJournalNote={savedJournalNote}
            onSaveJournalNote={handleSaveJournalNote}
          />
        )}

        {/* Tab 2: 12 Levels & 30-Day Calendar Roadmap */}
        {currentTab === 'roadmap' && (
          <LevelSelector
            levels={LEVELS_DATA}
            selectedLevelId={currentLevel.id}
            onSelectLevel={handleSelectLevel}
            selectedDayNumber={progress.currentDayNumber}
            onSelectDay={handleSelectDay}
            completedDays={progress.completedDays}
            unlockedLevels={unlockedLevels}
            hasFullAccess={hasFullAccess}
            onRequestUnlock={(lvlId) => {
              setRequestedUnlockLevelId(lvlId || null);
              setIsUserModalOpen(true);
            }}
          />
        )}

        {/* Tab 3: Manoj YogaWala Wisdom & Guides */}
        {currentTab === 'wisdom' && <WisdomLibrary />}

        {/* Tab 4: Soundscape & Voice Guidance Studio */}
        {currentTab === 'sound' && (
          <SoundStudio
            voiceEnabled={progress.voiceEnabled}
            onToggleVoice={handleToggleVoice}
          />
        )}
      </main>

      {/* Completion Celebration Modal */}
      <CompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        level={currentLevel}
        session={currentSession}
        streak={progress.streak}
        totalMinutes={progress.totalMinutesPracticed}
        initialNote={savedJournalNote}
        onSaveNote={handleSaveJournalNote}
        onNextDay={handleNextDay}
      />

      {/* Practitioner Sign Up / Voucher Redemption Modal */}
      <UserAuthModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        currentUser={currentUser}
        progress={progress}
        requestedLevelId={requestedUnlockLevelId}
        onAuthSuccess={handleUserAuthSuccess}
        onSignOutUser={handleSignOutUser}
      />

      {/* Admin Portal Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Editorial Footer */}
      <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-100/70 dark:bg-[#070e17] py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/Yogi_meditating_on_lotus_flower_20260929160250_9487d332.jpg"
              alt="VidyaTech Darshan Logo"
              className="w-6 h-6 rounded-full object-cover border border-amber-500/40"
            />
            <span className="font-serif-display font-semibold text-slate-800 dark:text-slate-200">
              VidyaTech Darshan by Manoj YogaWala
            </span>
            <span className="text-slate-400">·</span>
            <span>12-Level Comprehensive Yoga & Meditation for All Ages</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentTab('roadmap')}
              className="hover:text-amber-500 transition-colors"
            >
              12 Levels
            </button>
            <button
              onClick={() => setCurrentTab('wisdom')}
              className="hover:text-amber-500 transition-colors"
            >
              Wisdom
            </button>
            <button
              onClick={() => setCurrentTab('sound')}
              className="hover:text-amber-500 transition-colors"
            >
              Sound Studio
            </button>
            <button
              onClick={() => setIsAdminLoginOpen(true)}
              className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium hover:underline"
            >
              <Shield className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
            <span>·</span>
            <span className="italic text-amber-600/80 dark:text-amber-400/80">Om Shanti Shanti Shanti</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
