export type AgeGroup = 'all' | 'seniors' | 'adults' | 'kids';

export type StageType = 'theory' | 'breathwork' | 'poses' | 'meditation';

export interface BreathPattern {
  name: string;
  sanskritName: string;
  inhale: number; // seconds
  holdIn: number;
  exhale: number;
  holdOut: number;
  instructions: string;
  benefits: string;
  ageAdaptation: Record<AgeGroup, string>;
}

export interface YogaPose {
  id: string;
  name: string;
  sanskritName: string;
  durationSeconds: number;
  targetFocus: string;
  svgType: 'tadasana' | 'vrikshasana' | 'virabhadrasana' | 'marjaryasana' | 'bhujangasana' | 'balasana' | 'setubandhasana' | 'sukhasana' | 'shavasana' | 'trikonasana' | 'adhomukha';
  instructions: string[];
  alignmentCues: string[];
  ageAdaptation: Record<AgeGroup, string>;
}

export interface DailySessionData {
  dayNumber: number; // 1 to 30
  title: string;
  sanskritTitle: string;
  sankalpa: string; // Daily intention
  
  // Stage 1: Theory
  theory: {
    philosophyTitle: string;
    darshanQuote: string;
    teaching: string;
    anatomicalInsight: string;
    practicalLifeLesson: string;
    ageGuidance: Record<AgeGroup, string>;
  };
  
  // Stage 2: Breathwork
  breathwork: BreathPattern;
  
  // Stage 3: Poses
  poses: YogaPose[];
  
  // Stage 4: Meditation
  meditation: {
    title: string;
    focusType: 'breath' | 'light' | 'om' | 'gratitude' | 'body-scan' | 'silence';
    guidanceText: string;
    mantraOrSeedSound?: string;
    reflectionPrompt: string;
    ambientSetting: 'sunrise' | 'sanctuary';
  };
}

export interface LevelInfo {
  id: number; // 1 to 12
  month: number; // 1 to 12
  name: string;
  sanskritName: string;
  dailyMinutes: 15 | 25 | 35 | 45;
  stageDurations: {
    theory: number;     // seconds
    breathwork: number; // seconds
    poses: number;      // seconds
    meditation: number; // seconds
  };
  tagline: string;
  description: string;
  chakraFocus: string;
  masterQuote: string;
  keyBenefits: string[];
  sampleSession: DailySessionData;
}

export interface UserProgress {
  currentLevelId: number;
  currentDayNumber: number;
  completedDays: Record<string, boolean>; // key: `${levelId}-${dayNumber}`
  streak: number;
  totalMinutesPracticed: number;
  lastCompletedDate: string | null;
  journalNotes: Record<string, string>; // key: `${levelId}-${dayNumber}` -> user reflection note
  agePreference: AgeGroup;
  voiceEnabled: boolean;
  soundscapeEnabled: boolean;
  selectedSoundscape: 'none' | 'singingBowl' | 'omDrone' | 'stream' | 'rain';
}

export interface RegisteredUser {
  id: string;
  name: string;
  contact: string; // Email or Phone
  registeredAt: string;
  currentLevelId: number;
  currentDayNumber: number;
  totalMinutesPracticed: number;
  streak: number;
  hasFullAccess: boolean;
  unlockedLevels: number[];
  redeemedCodes: string[];
  lastActiveAt: string;
}

export type PaymentMethod = 'Easypaisa' | 'JazzCash' | 'Bank Transfer' | 'Complimentary';

export interface UnlockVoucher {
  id: string;
  code: string;
  unlockType: 'full' | 'level';
  targetLevel?: number;
  paymentMethod: PaymentMethod;
  paymentNote: string;
  maxUses: number;
  usedCount: number;
  redeemedBy: string[];
  isActive: boolean;
  createdAt: string;
}

export interface AdminDashboardStats {
  totalUsers: number;
  fullAccessUsers: number;
  freeTierUsers: number;
  totalPracticeMinutes: number;
  activeVouchers: number;
  totalVoucherRedemptions: number;
}

