import React, { useState, useEffect, useRef } from 'react';
import { BreathPattern, AgeGroup } from '../../types/yoga';
import { Play, Pause, RotateCcw, Volume2, ShieldCheck, Wind } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import { voiceEngine } from '../../utils/voiceEngine';

interface BreathworkStageProps {
  breathwork: BreathPattern;
  ageGroup: AgeGroup;
  voiceEnabled: boolean;
  isSessionRunning: boolean;
}

type BreathPhase = 'inhale' | 'holdIn' | 'exhale' | 'holdOut';

export const BreathworkStage: React.FC<BreathworkStageProps> = ({
  breathwork,
  ageGroup,
  voiceEnabled,
  isSessionRunning,
}) => {
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [secondsRemainingInPhase, setSecondsRemainingInPhase] = useState<number>(breathwork.inhale);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  const phaseRef = useRef<BreathPhase>('inhale');
  const secondsRef = useRef<number>(breathwork.inhale);

  // Sync active state with session
  useEffect(() => {
    setIsActive(isSessionRunning);
  }, [isSessionRunning]);

  // Adjust timing if seniors/kids prefer no breath holding
  const getPhaseDuration = (p: BreathPhase): number => {
    if (ageGroup === 'seniors' || ageGroup === 'kids') {
      if (p === 'holdIn' || p === 'holdOut') return 1; // Minimal gentle pause
    }
    switch (p) {
      case 'inhale': return breathwork.inhale;
      case 'holdIn': return Math.max(1, breathwork.holdIn);
      case 'exhale': return breathwork.exhale;
      case 'holdOut': return Math.max(1, breathwork.holdOut);
    }
  };

  const getNextPhase = (current: BreathPhase): BreathPhase => {
    switch (current) {
      case 'inhale':
        return breathwork.holdIn > 0 ? 'holdIn' : 'exhale';
      case 'holdIn':
        return 'exhale';
      case 'exhale':
        return breathwork.holdOut > 0 ? 'holdOut' : 'inhale';
      case 'holdOut':
        return 'inhale';
    }
  };

  const announcePhase = (newPhase: BreathPhase) => {
    if (!voiceEnabled) return;
    switch (newPhase) {
      case 'inhale':
        audioEngine.playChime(440);
        voiceEngine.speak('Inhale gently through the nose');
        break;
      case 'holdIn':
        audioEngine.playChime(528);
        voiceEngine.speak('Hold with soft awareness');
        break;
      case 'exhale':
        audioEngine.playChime(396);
        voiceEngine.speak('Exhale slowly and let go');
        break;
      case 'holdOut':
        audioEngine.playChime(330);
        voiceEngine.speak('Rest in empty stillness');
        break;
    }
  };

  // Breath cycle timer tick
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSecondsRemainingInPhase((prev) => {
        if (prev <= 1) {
          const next = getNextPhase(phaseRef.current);
          phaseRef.current = next;
          setPhase(next);

          if (next === 'inhale') {
            setCycleCount((c) => c + 1);
          }

          announcePhase(next);
          const nextDur = getPhaseDuration(next);
          secondsRef.current = nextDur;
          return nextDur;
        }
        secondsRef.current = prev - 1;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, ageGroup, breathwork]);

  const handleReset = () => {
    phaseRef.current = 'inhale';
    setPhase('inhale');
    setSecondsRemainingInPhase(breathwork.inhale);
    setCycleCount(0);
    announcePhase('inhale');
  };

  const phaseTitle = {
    inhale: 'Inhale (Pūraka)',
    holdIn: 'Internal Hold (Antara Kumbhaka)',
    exhale: 'Exhale (Recaka)',
    holdOut: 'External Pause (Bāhya Kumbhaka)',
  }[phase];

  const phaseColor = {
    inhale: 'text-amber-600 dark:text-amber-400',
    holdIn: 'text-indigo-600 dark:text-indigo-400',
    exhale: 'text-emerald-600 dark:text-emerald-400',
    holdOut: 'text-purple-600 dark:text-purple-400',
  }[phase];

  // Visual scale for breathing orb
  const orbScale = phase === 'inhale' ? 'scale-110 md:scale-125' : phase === 'exhale' ? 'scale-85 md:scale-90' : 'scale-100';

  return (
    <div className="space-y-6">
      {/* Stage Header */}
      <div className="bg-gradient-to-r from-sky-500/10 via-amber-500/5 to-pink-500/5 dark:from-[#0e1d2e] dark:via-[#131b2c] dark:to-[#0c1624] border border-sky-500/30 dark:border-sky-500/20 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
              <span>Stage 2 of 4: Conscious Pranayama</span>
              <span>·</span>
              <span className="font-serif-display italic">{breathwork.sanskritName}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-slate-900 dark:text-white">
              {breathwork.name}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-numbers px-3 py-1.5 bg-white dark:bg-[#111f32] rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="text-slate-500">Completed Cycles:</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400 text-sm">{cycleCount}</span>
          </div>
        </div>

        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-2">
          {breathwork.instructions}
        </p>
      </div>

      {/* Interactive Breathing Orb Sandbox */}
      <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden min-h-[380px] shadow-sm">
        {/* Subtle Sacred Circuit & Mandala background rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 dark:opacity-10">
          <div className="w-96 h-96 rounded-full border border-amber-500/40" />
          <div className="w-72 h-72 rounded-full border border-pink-500/40 absolute" />
          <div className="w-48 h-48 rounded-full border border-sky-500/40 absolute" />
        </div>

        {/* Dynamic Animated Breathing Orb */}
        <div className="relative my-4 flex items-center justify-center">
          <div
            className={`w-52 h-52 md:w-60 md:h-60 rounded-full transition-transform duration-1000 ease-in-out flex flex-col items-center justify-center shadow-lg border-2 ${orbScale} ${
              phase === 'inhale'
                ? 'bg-gradient-to-tr from-amber-100 via-amber-50 to-orange-100 border-amber-400 dark:from-amber-950/60 dark:via-orange-950/40 dark:to-[#171324] dark:border-amber-500/70 shadow-amber-500/20'
                : phase === 'exhale'
                ? 'bg-gradient-to-tr from-pink-100 via-rose-50 to-pink-50 border-pink-400 dark:from-pink-950/60 dark:via-rose-950/40 dark:to-[#101b2a] dark:border-pink-500/70 shadow-pink-500/20'
                : phase === 'holdIn'
                ? 'bg-gradient-to-tr from-sky-100 via-cyan-50 to-indigo-50 border-sky-400 dark:from-sky-950/60 dark:via-indigo-950/40 dark:to-[#0e1929] dark:border-sky-500/70 shadow-sky-500/20'
                : 'bg-gradient-to-tr from-slate-100 via-indigo-50 to-slate-200 border-indigo-400 dark:from-slate-900 dark:via-indigo-950/40 dark:to-[#0a121c] dark:border-indigo-500/70'
            }`}
          >
            <Wind className={`w-6 h-6 mb-1 ${phaseColor} opacity-80`} />
            <span className={`text-4xl md:text-5xl font-mono-numbers font-bold ${phaseColor}`}>
              {secondsRemainingInPhase}s
            </span>
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-1">
              {phase === 'inhale' ? 'Inhaling' : phase === 'exhale' ? 'Exhaling' : 'Holding'}
            </span>
          </div>
        </div>

        {/* Phase Label & Instruction Banner */}
        <div className="text-center z-10 mt-2">
          <h3 className={`text-lg md:text-xl font-serif-display font-medium ${phaseColor}`}>
            {phaseTitle}
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md">
            {phase === 'inhale'
              ? 'Draw breath deep into low belly, expand ribs, lift chest softly.'
              : phase === 'holdIn'
              ? 'Relax the tongue, jaw, and eyes. Rest in fullness without tension.'
              : phase === 'exhale'
              ? 'Empty ribs and navel toward spine smoothly like water pouring.'
              : 'Feel the natural silence before the next breath arrives.'}
          </p>
        </div>

        {/* Interactive Affordance Controls */}
        <div className="flex items-center gap-3 mt-6 z-10">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl transition-all shadow-sm shadow-amber-500/20"
          >
            {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isActive ? 'Pause Rhythm' : 'Resume Rhythm'}</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100 dark:bg-[#152438] rounded-xl transition-colors"
            title="Reset breath cycles"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playSingingBowl(216, 5);
              announcePhase(phase);
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 rounded-xl transition-colors"
            title="Test chime tone"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-500" />
            <span>Bowl Bell</span>
          </button>
        </div>
      </div>

      {/* Benefits & Age Adaptations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0c1624] border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Physiological Benefits</span>
          </div>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {breathwork.benefits}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0c1624] border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
            <Wind className="w-4 h-4 text-amber-500" />
            <span>Adaptation for {ageGroup === 'seniors' ? 'Seniors' : ageGroup === 'kids' ? 'Kids' : ageGroup === 'adults' ? 'Adults' : 'All Ages'}</span>
          </div>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {breathwork.ageAdaptation[ageGroup] || breathwork.ageAdaptation.all}
          </p>
        </div>
      </div>
    </div>
  );
};
