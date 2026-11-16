import React, { useState, useEffect } from 'react';
import { YogaPose, AgeGroup } from '../../types/yoga';
import { SvgPoseIllustration } from '../SvgPoseIllustrations';
import { AiPostureCoach } from '../AiPostureCoach';
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Volume2, CheckCircle2, ShieldAlert, Camera, Sparkles } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import { voiceEngine } from '../../utils/voiceEngine';

interface PosesStageProps {
  poses: YogaPose[];
  ageGroup: AgeGroup;
  voiceEnabled: boolean;
  isSessionRunning: boolean;
}

export const PosesStage: React.FC<PosesStageProps> = ({
  poses,
  ageGroup,
  voiceEnabled,
  isSessionRunning,
}) => {
  const [currentPoseIndex, setCurrentPoseIndex] = useState<number>(0);
  const currentPose = poses[currentPoseIndex] || poses[0];

  const [poseTimerSeconds, setPoseTimerSeconds] = useState<number>(currentPose.durationSeconds);
  const [isPoseTimerRunning, setIsPoseTimerRunning] = useState<boolean>(true);
  const [completedAlignmentChecks, setCompletedAlignmentChecks] = useState<Record<string, boolean>>({});
  const [showCameraCoach, setShowCameraCoach] = useState<boolean>(false);

  // Sync with session running state
  useEffect(() => {
    setIsPoseTimerRunning(isSessionRunning);
  }, [isSessionRunning]);

  // When switching pose, reset timer
  useEffect(() => {
    setPoseTimerSeconds(currentPose.durationSeconds);
    setCompletedAlignmentChecks({});
    if (voiceEnabled) {
      announcePose(currentPose);
    }
  }, [currentPoseIndex, currentPose]);

  const announcePose = (pose: YogaPose) => {
    audioEngine.playChime(528);
    const spokenText = `Now coming into ${pose.name}, ${pose.sanskritName}. ${pose.instructions[0]}. Remember: ${pose.ageAdaptation[ageGroup] || pose.ageAdaptation.all}`;
    voiceEngine.speak(spokenText);
  };

  // Timer tick for current pose
  useEffect(() => {
    if (!isPoseTimerRunning) return;

    const interval = setInterval(() => {
      setPoseTimerSeconds((prev) => {
        if (prev <= 1) {
          audioEngine.playSingingBowl(216, 4);
          // Auto-advance to next pose if available
          if (currentPoseIndex < poses.length - 1) {
            setCurrentPoseIndex((i) => i + 1);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPoseTimerRunning, currentPoseIndex, poses.length]);

  const handleNextPose = () => {
    if (currentPoseIndex < poses.length - 1) {
      setCurrentPoseIndex(currentPoseIndex + 1);
    }
  };

  const handlePrevPose = () => {
    if (currentPoseIndex > 0) {
      setCurrentPoseIndex(currentPoseIndex - 1);
    }
  };

  const toggleCheck = (idx: number) => {
    const key = `${currentPose.id}-${idx}`;
    setCompletedAlignmentChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      {/* Stage Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-pink-500/5 dark:from-[#112033] dark:via-[#151c2d] dark:to-[#0c1624] border border-amber-500/30 dark:border-amber-500/20 rounded-2xl p-5 md:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <span>Stage 3 of 4: Body Poses (Asanas)</span>
              <span>·</span>
              <span>Pose {currentPoseIndex + 1} of {poses.length}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-slate-900 dark:text-white">
              {currentPose.name}{' '}
              <span className="text-base font-normal text-amber-600 dark:text-amber-400 font-serif-display italic">
                ({currentPose.sanskritName})
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* AI Camera Posture Check Toggle Button */}
            <button
              onClick={() => setShowCameraCoach(!showCameraCoach)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                showCameraCoach
                  ? 'bg-amber-600 text-white shadow-md glow-solar'
                  : 'bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-pink-500/10 text-amber-800 dark:text-amber-200 border border-amber-500/40 hover:border-amber-500 shadow-sm'
              }`}
              title="Toggle Webcam Posture Check & Encouragement"
            >
              <Camera className="w-4 h-4 text-amber-500" />
              <span>{showCameraCoach ? 'Close Camera Coach' : 'AI Camera Posture Check'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            {/* Pose Timer Countdown */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white dark:bg-[#111f32] rounded-xl border border-slate-200 dark:border-slate-700 font-mono-numbers shadow-sm">
              <span className="text-xs text-slate-500">Hold Duration:</span>
              <span className="text-base font-bold text-amber-600 dark:text-amber-400">
                {formatSeconds(poseTimerSeconds)}
              </span>
            </div>

            <button
              onClick={() => setIsPoseTimerRunning(!isPoseTimerRunning)}
              className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-sm shadow-amber-500/20 transition-all"
              title={isPoseTimerRunning ? 'Pause pose timer' : 'Resume pose timer'}
            >
              {isPoseTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setPoseTimerSeconds(currentPose.durationSeconds)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-[#152438] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Reset pose timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => announcePose(currentPose)}
              className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 hover:bg-amber-200 border border-amber-300/50 dark:border-amber-700/50 transition-colors"
              title="Speak pose cues"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pose Sequence Strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-3 mt-2 border-t border-amber-500/20 dark:border-amber-500/15">
          {poses.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentPoseIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                idx === currentPoseIndex
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm shadow-amber-500/20'
                  : 'bg-white/80 dark:bg-[#111f32] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800'
              }`}
            >
              <span className="font-mono-numbers">{idx + 1}.</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Optional AI Posture Coach Mirror View */}
      {showCameraCoach && (
        <AiPostureCoach
          currentPose={currentPose}
          ageGroup={ageGroup}
          voiceEnabled={voiceEnabled}
          onClose={() => setShowCameraCoach(false)}
        />
      )}

      {/* Main Two-Column Split: Visual Instruction & Alignment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Visual Pose Illustration & Navigation */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>Visual Posture Model</span>
              <span className="font-mono-numbers">{currentPoseIndex + 1} / {poses.length}</span>
            </div>

            <SvgPoseIllustration
              type={currentPose.svgType}
              className="w-full h-64 md:h-72"
            />

            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/60">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-0.5">
                Targeted Anatomical Focus
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {currentPose.targetFocus}
              </p>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800">
            <button
              onClick={handlePrevPose}
              disabled={currentPoseIndex === 0}
              className="flex items-center gap-1 px-3.5 py-2 text-xs font-medium rounded-xl text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#152438] disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Pose</span>
            </button>

            <span className="text-xs text-slate-400 font-mono-numbers">
              {currentPoseIndex + 1} of {poses.length}
            </span>

            <button
              onClick={handleNextPose}
              disabled={currentPoseIndex === poses.length - 1}
              className="flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-40 transition-colors shadow-sm shadow-amber-500/20"
            >
              <span>Next Pose</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Step-by-Step Instructions & Age Group Adaptations */}
        <div className="lg:col-span-7 space-y-4">
          {/* Step-by-Step Instructions */}
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Step-by-Step Movement Instructions
            </h3>
            <ol className="space-y-2.5">
              {currentPose.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono-numbers text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Interactive Alignment Checklist */}
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Self-Check Alignment Points</span>
            </h3>
            <div className="space-y-2">
              {currentPose.alignmentCues.map((cue, idx) => {
                const isChecked = Boolean(completedAlignmentChecks[`${currentPose.id}-${idx}`]);
                return (
                  <label
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200/80 dark:border-slate-700/50 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-[#16273d] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                    />
                    <span className={`text-xs md:text-sm transition-colors ${isChecked ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {cue}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Age Group Adaptation Card */}
          <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-[#0f1d2e] border border-slate-200/80 dark:border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>
                Safety & Variation for {ageGroup === 'seniors' ? 'Seniors & Gentle Chairs' : ageGroup === 'kids' ? 'Kids & Playful Stories' : ageGroup === 'adults' ? 'Adults & Alignment' : 'All Practitioners'}
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentPose.ageAdaptation[ageGroup] || currentPose.ageAdaptation.all}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
