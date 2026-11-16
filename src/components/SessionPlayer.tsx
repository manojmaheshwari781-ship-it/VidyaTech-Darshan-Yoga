import React, { useState, useEffect, useRef } from 'react';
import { LevelInfo, DailySessionData, StageType, AgeGroup } from '../types/yoga';
import { TheoryStage } from './stages/TheoryStage';
import { BreathworkStage } from './stages/BreathworkStage';
import { PosesStage } from './stages/PosesStage';
import { MeditationStage } from './stages/MeditationStage';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  CheckCircle,
  Timer as TimerIcon,
  BookOpen,
  Wind,
  Activity,
  Heart,
  Sparkles,
  Zap,
  Globe
} from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { voiceEngine } from '../utils/voiceEngine';

interface SessionPlayerProps {
  level: LevelInfo;
  session: DailySessionData;
  ageGroup: AgeGroup;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  onCompleteSession: (minutesPracticed: number, note?: string) => void;
  savedJournalNote?: string;
  onSaveJournalNote: (note: string) => void;
}

const STAGES: { type: StageType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { type: 'theory', label: '1. Theory', icon: BookOpen },
  { type: 'breathwork', label: '2. Breathwork', icon: Wind },
  { type: 'poses', label: '3. Body Poses', icon: Activity },
  { type: 'meditation', label: '4. Meditation', icon: Heart },
];

export const SessionPlayer: React.FC<SessionPlayerProps> = ({
  level,
  session,
  ageGroup,
  voiceEnabled,
  onToggleVoice,
  onCompleteSession,
  savedJournalNote = '',
  onSaveJournalNote,
}) => {
  const [activeStage, setActiveStage] = useState<StageType>('theory');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Automatic Timer & Voice Guidance State
  const [autoFlowActive, setAutoFlowActive] = useState<boolean>(true);
  const [voiceLanguageMode, setVoiceLanguageMode] = useState<'hinglish_urdu' | 'english'>('hinglish_urdu');

  // Track if 10-second warning was spoken for current stage
  const [warned10Sec, setWarned10Sec] = useState<boolean>(false);

  // Total session countdown in seconds
  const totalSessionSeconds = level.dailyMinutes * 60;
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState<number>(totalSessionSeconds);

  // Stage countdown in seconds
  const [stageSecondsLeft, setStageSecondsLeft] = useState<number>(level.stageDurations.theory);
  const stageDurationTotal = level.stageDurations[activeStage];

  const stageRef = useRef<StageType>(activeStage);
  stageRef.current = activeStage;

  const autoFlowRef = useRef<boolean>(autoFlowActive);
  autoFlowRef.current = autoFlowActive;

  const voiceLangRef = useRef<'hinglish_urdu' | 'english'>(voiceLanguageMode);
  voiceLangRef.current = voiceLanguageMode;

  const voiceEnabledRef = useRef<boolean>(voiceEnabled);
  voiceEnabledRef.current = voiceEnabled;

  // Reset timers on level or session change
  useEffect(() => {
    setSessionSecondsLeft(level.dailyMinutes * 60);
    setStageSecondsLeft(level.stageDurations[activeStage]);
    setWarned10Sec(false);
  }, [level, session]);

  // Reset 10-second warning flag whenever stage changes
  useEffect(() => {
    setWarned10Sec(false);
  }, [activeStage]);

  // Master Timer Tick: Drives total session countdown & stage auto-advancement
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      // Decrement total session timer
      setSessionSecondsLeft((prev) => {
        if (prev <= 1) {
          audioEngine.playSingingBowl(216, 7);
          return 0;
        }
        return prev - 1;
      });

      // Decrement current stage timer
      setStageSecondsLeft((prev) => {
        // 10-second warning check for automatic voice guidance
        if (prev === 11 && !warned10Sec && autoFlowRef.current && voiceEnabledRef.current) {
          trigger10SecWarning(stageRef.current);
          setWarned10Sec(true);
        }

        // Stage Completion
        if (prev <= 1) {
          handleStageTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, activeStage, level, warned10Sec]);

  // 10 Seconds warning announcement before transition
  const trigger10SecWarning = (currentStage: StageType) => {
    audioEngine.playChime(660);
    const lang = voiceLangRef.current;

    let warningText = '';
    if (lang === 'hinglish_urdu') {
      if (currentStage === 'theory') {
        warningText = 'Theory das second mein mukammal ho rahi hai. Agla marhala Pranayama Breathwork shuru hone wala hai.';
      } else if (currentStage === 'breathwork') {
        warningText = 'Pranayama das second mein mukammal ho raha hai. Agla marhala Body Poses yaani Asanas hai.';
      } else if (currentStage === 'poses') {
        warningText = 'Asanas das second mein mukammal ho rahe hain. Agla marhala Meditation shuru hone wala hai.';
      } else if (currentStage === 'meditation') {
        warningText = 'Meditation ke aakhri das second. Sukoon aur taazgi ko mehsoos karein.';
      }
    } else {
      if (currentStage === 'theory') {
        warningText = 'Theory concluding in 10 seconds. Preparing for Stage 2: Breathwork Pranayama.';
      } else if (currentStage === 'breathwork') {
        warningText = 'Breathwork concluding in 10 seconds. Preparing for Stage 3: Body Poses.';
      } else if (currentStage === 'poses') {
        warningText = 'Postures concluding in 10 seconds. Settle down for Stage 4: Meditation.';
      } else if (currentStage === 'meditation') {
        warningText = 'Meditation concluding in 10 seconds. Deepen your breath and awaken slowly.';
      }
    }

    if (warningText) {
      voiceEngine.speak(warningText);
    }
  };

  // Called when stage countdown hits 0 seconds
  const handleStageTimeExpired = () => {
    audioEngine.playSingingBowl(216, 5);
    const currentIndex = STAGES.findIndex((s) => s.type === stageRef.current);

    if (currentIndex < STAGES.length - 1) {
      if (autoFlowRef.current) {
        // Automatic advance to next stage with spoken guidance
        const nextStage = STAGES[currentIndex + 1].type;
        setActiveStage(nextStage);
        setStageSecondsLeft(level.stageDurations[nextStage]);
        speakStageIntroduction(nextStage);
      }
    } else {
      // Final Meditation stage finished!
      speakSessionCompletion();
      onCompleteSession(level.dailyMinutes, savedJournalNote);
    }
  };

  // Spoken introduction for each stage
  const speakStageIntroduction = (stage: StageType) => {
    if (!voiceEnabledRef.current) return;
    const lang = voiceLangRef.current;

    let speech = '';
    if (lang === 'hinglish_urdu') {
      switch (stage) {
        case 'theory':
          speech = `Day ${session.dayNumber} Theory: ${session.title}. Apne zehen ko shant karein aur is sabaq par ghaur karein.`;
          break;
        case 'breathwork':
          speech = `Agla marhala Pranayama shuru ho raha hai: ${session.breathwork.name}. Reerh ki haddi seedhi rakhein aur saans ke sath taalmel banayein.`;
          break;
        case 'poses':
          speech = `Agla marhala Body Poses shuru ho raha hai. Hum ${session.poses.length} asanas karenge. Camera Posture Check se apna posture dekh sakte hain.`;
          break;
        case 'meditation':
          speech = `Aakhri marhala Meditation shuru ho raha hai: ${session.meditation.title}. Aankhein band karein aur andar ki roshni mein theher jayein.`;
          break;
      }
    } else {
      switch (stage) {
        case 'theory':
          speech = `Beginning Stage 1: Theory. ${session.title}. Listen and absorb the philosophical foundation of today's practice.`;
          break;
        case 'breathwork':
          speech = `Beginning Stage 2: Breathwork. Practicing ${session.breathwork.name}. Sit tall and synchronize with the breathing orb.`;
          break;
        case 'poses':
          speech = `Beginning Stage 3: Body Poses. Flowing through ${session.poses.length} postures. AI Camera Posture Check is active for your alignment.`;
          break;
        case 'meditation':
          speech = `Beginning Stage 4: Meditation. Focusing on ${session.meditation.title}. Close your eyes and embrace transcendent stillness.`;
          break;
      }
    }

    if (speech) {
      voiceEngine.speak(speech);
    }
  };

  const speakSessionCompletion = () => {
    audioEngine.playSingingBowl(216, 7);
    if (!voiceEnabledRef.current) return;
    const lang = voiceLangRef.current;

    const completionText =
      lang === 'hinglish_urdu'
        ? `Namaste! Aapka Day ${session.dayNumber} ka sadhana mukammal hua. Bohat khoob. Is sukoon ko din bhar apne sath rakhein.`
        : `Namaste! Your daily sadhana for Day ${session.dayNumber} is successfully completed. Carry this radiant peace into your day.`;

    voiceEngine.speak(completionText);
  };

  const handleSelectStage = (stage: StageType) => {
    setActiveStage(stage);
    setStageSecondsLeft(level.stageDurations[stage]);
    audioEngine.playChime(528);
    speakStageIntroduction(stage);
  };

  const handleNextStage = () => {
    const currentIndex = STAGES.findIndex((s) => s.type === activeStage);
    if (currentIndex < STAGES.length - 1) {
      handleSelectStage(STAGES[currentIndex + 1].type);
    }
  };

  const handlePrevStage = () => {
    const currentIndex = STAGES.findIndex((s) => s.type === activeStage);
    if (currentIndex > 0) {
      handleSelectStage(STAGES[currentIndex - 1].type);
    }
  };

  const handleResetSession = () => {
    setSessionSecondsLeft(level.dailyMinutes * 60);
    setActiveStage('theory');
    setStageSecondsLeft(level.stageDurations.theory);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const sessionProgressPercent = Math.min(
    100,
    Math.round(((totalSessionSeconds - sessionSecondsLeft) / totalSessionSeconds) * 100)
  );

  const currentStageIndex = STAGES.findIndex((s) => s.type === activeStage);
  const nextStageObj = currentStageIndex < STAGES.length - 1 ? STAGES[currentStageIndex + 1] : null;

  return (
    <div className="space-y-5">
      {/* Session Master Bar & Timers */}
      <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-4 md:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Level & Day Title */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-0.5">
              <span>{level.name}</span>
              <span>·</span>
              <span>Day {session.dayNumber} of 30</span>
              <span>·</span>
              <span className="text-pink-600 dark:text-pink-400">{level.dailyMinutes} mins daily</span>
            </div>
            <h1 className="text-xl md:text-2xl font-serif-display font-semibold text-slate-900 dark:text-white">
              {session.title}
            </h1>
          </div>

          {/* Master Timers & Playback Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Session Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700">
              <TimerIcon className="w-4 h-4 text-sky-500" />
              <div className="text-left font-mono-numbers">
                <span className="text-[10px] text-slate-400 block leading-none">Session Total</span>
                <span className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">
                  {formatTime(sessionSecondsLeft)}
                </span>
              </div>
            </div>

            {/* Stage Timer with Logo-inspired Solar Amber */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 font-mono-numbers">
              <div className="text-left">
                <span className="text-[10px] text-amber-600 dark:text-amber-400 block leading-none">Stage Countdown</span>
                <span className="text-sm md:text-base font-bold text-amber-600 dark:text-amber-400">
                  {formatTime(stageSecondsLeft)}
                </span>
              </div>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all shadow-sm shadow-amber-500/20"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Resume'}</span>
            </button>

            {/* Voice toggle */}
            <button
              onClick={onToggleVoice}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                voiceEnabled
                  ? 'bg-slate-100 dark:bg-[#152438] text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700'
                  : 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 border-slate-200 dark:border-slate-800'
              }`}
              title={voiceEnabled ? 'Voice Guidance Active (Click to mute)' : 'Voice Guidance Muted (Click to enable)'}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 text-amber-500" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset */}
            <button
              onClick={handleResetSession}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#152438] text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Reset session timers"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Master Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono-numbers">
            <span>Overall Session Progress</span>
            <span>{sessionProgressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-pink-500 to-sky-400 transition-all duration-300"
              style={{ width: `${sessionProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Automatic Flow Timer & Voice Transition Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-pink-500/10 dark:from-[#112033] dark:via-[#131b2e] dark:to-[#0c1624] border border-amber-500/35 rounded-2xl p-3.5 md:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-sm glow-solar shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Automatic Stage Flow Timer</span>
                {autoFlowActive && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                {autoFlowActive ? 'Auto Transitions ON' : 'Manual Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              {nextStageObj ? (
                <>
                  Next Step in <span className="font-mono-numbers font-bold text-amber-600 dark:text-amber-400">{formatTime(stageSecondsLeft)}</span>: {nextStageObj.label} (Spoken automatically)
                </>
              ) : (
                <>Meditation is final stage · Complete session will celebrate automatically</>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Spoken Language Mode Selector */}
          <button
            onClick={() => {
              const nextMode = voiceLanguageMode === 'hinglish_urdu' ? 'english' : 'hinglish_urdu';
              setVoiceLanguageMode(nextMode);
              if (voiceEnabled) {
                voiceEngine.speak(
                  nextMode === 'hinglish_urdu'
                    ? 'Manoj YogaWala Voice: Hinglish aur Urdu guide shuru hai.'
                    : 'Manoj YogaWala Voice: English guidance active.'
                );
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-[#152438] border border-amber-500/30 text-slate-700 dark:text-slate-300 hover:border-amber-500 transition-colors shadow-sm"
            title="Switch Voice Language Guidance"
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>{voiceLanguageMode === 'hinglish_urdu' ? 'Urdu / Hinglish Voice' : 'English Voice'}</span>
          </button>

          {/* Auto-Flow Toggle */}
          <button
            onClick={() => setAutoFlowActive(!autoFlowActive)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all shadow-sm ${
              autoFlowActive
                ? 'bg-amber-600 text-white glow-solar'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            {autoFlowActive ? 'Auto Advance Active' : 'Enable Auto-Flow'}
          </button>

          {/* Skip to Next Step Now */}
          {nextStageObj && (
            <button
              onClick={handleNextStage}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/40 hover:bg-amber-200 rounded-xl transition-colors"
              title="Skip immediately to next stage"
            >
              <span>Next Step</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4 Interactive Stages Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {STAGES.map((s) => {
          const Icon = s.icon;
          const isActive = activeStage === s.type;
          const stageDurationMin = Math.round(level.stageDurations[s.type] / 60);

          return (
            <button
              key={s.type}
              onClick={() => handleSelectStage(s.type)}
              className={`p-3 md:p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-[#0c1624] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#122033]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold tracking-wide">
                  {s.label}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-100' : 'text-slate-400'}`} />
              </div>
              <span className={`text-[11px] font-mono-numbers ${isActive ? 'text-amber-100' : 'text-slate-400'}`}>
                {stageDurationMin} mins
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Container */}
      <div className="min-h-[460px]">
        {activeStage === 'theory' && (
          <TheoryStage
            session={session}
            ageGroup={ageGroup}
            voiceEnabled={voiceEnabled}
            onToggleVoice={onToggleVoice}
          />
        )}

        {activeStage === 'breathwork' && (
          <BreathworkStage
            breathwork={session.breathwork}
            ageGroup={ageGroup}
            voiceEnabled={voiceEnabled}
            isSessionRunning={isPlaying}
          />
        )}

        {activeStage === 'poses' && (
          <PosesStage
            poses={session.poses}
            ageGroup={ageGroup}
            voiceEnabled={voiceEnabled}
            isSessionRunning={isPlaying}
          />
        )}

        {activeStage === 'meditation' && (
          <MeditationStage
            session={session}
            ageGroup={ageGroup}
            voiceEnabled={voiceEnabled}
            journalNote={savedJournalNote}
            onSaveJournalNote={onSaveJournalNote}
          />
        )}
      </div>

      {/* Bottom Stage Navigation & Completion Bar */}
      <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevStage}
            disabled={activeStage === 'theory'}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#152438] rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
          >
            <SkipBack className="w-3.5 h-3.5" />
            <span>Previous Stage</span>
          </button>

          <button
            onClick={handleNextStage}
            disabled={activeStage === 'meditation'}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#152438] rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
          >
            <span>Next Stage</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onCompleteSession(level.dailyMinutes, savedJournalNote)}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 active:scale-95 rounded-xl transition-all shadow-sm shadow-emerald-600/20"
          >
            <CheckCircle className="w-4 h-4 text-emerald-100" />
            <span>Complete Today's Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};
