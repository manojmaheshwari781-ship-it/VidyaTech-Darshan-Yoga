import { UserProgress, AgeGroup } from '../types/yoga';

const STORAGE_KEY = 'vidyatech_darshan_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  currentLevelId: 1,
  currentDayNumber: 1,
  completedDays: {},
  streak: 1,
  totalMinutesPracticed: 0,
  lastCompletedDate: null,
  journalNotes: {},
  agePreference: 'all',
  voiceEnabled: true,
  soundscapeEnabled: true,
  selectedSoundscape: 'singingBowl',
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // LocalStorage full or private browsing
  }
}

export function markDayCompleted(
  current: UserProgress,
  levelId: number,
  dayNumber: number,
  minutesAdded: number,
  note?: string
): UserProgress {
  const key = `${levelId}-${dayNumber}`;
  const now = new Date().toISOString().split('T')[0];
  
  const wasAlreadyCompleted = Boolean(current.completedDays[key]);
  const newCompleted = { ...current.completedDays, [key]: true };
  const newNotes = { ...current.journalNotes };
  if (note && note.trim()) {
    newNotes[key] = note.trim();
  }

  // Calculate streak
  let newStreak = current.streak;
  if (!wasAlreadyCompleted) {
    if (current.lastCompletedDate) {
      const lastDate = new Date(current.lastCompletedDate);
      const today = new Date(now);
      const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }
  }

  // Next recommended day
  let nextDay = dayNumber + 1;
  let nextLevel = levelId;
  if (nextDay > 30) {
    nextDay = 1;
    nextLevel = Math.min(12, levelId + 1);
  }

  const updated: UserProgress = {
    ...current,
    currentLevelId: nextLevel,
    currentDayNumber: nextDay,
    completedDays: newCompleted,
    streak: newStreak,
    totalMinutesPracticed: current.totalMinutesPracticed + (wasAlreadyCompleted ? 0 : minutesAdded),
    lastCompletedDate: now,
    journalNotes: newNotes,
  };

  saveUserProgress(updated);
  return updated;
}
