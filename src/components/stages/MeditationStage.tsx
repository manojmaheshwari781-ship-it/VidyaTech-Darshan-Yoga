import React, { useState } from 'react';
import { DailySessionData, AgeGroup } from '../../types/yoga';
import { Volume2, Sparkles, Bell, Music2, Waves, CloudRain, PenTool } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import { voiceEngine } from '../../utils/voiceEngine';

interface MeditationStageProps {
  session: DailySessionData;
  ageGroup: AgeGroup;
  voiceEnabled: boolean;
  journalNote: string;
  onSaveJournalNote: (note: string) => void;
}

export const MeditationStage: React.FC<MeditationStageProps> = ({
  session,
  ageGroup,
  voiceEnabled,
  journalNote,
  onSaveJournalNote,
}) => {
  const { meditation } = session;
  const [ambientSetting, setAmbientSetting] = useState<'sunrise' | 'sanctuary'>('sunrise');
  const [activeSound, setActiveSound] = useState<'none' | 'om' | 'stream' | 'rain'>('none');
  const [localNote, setLocalNote] = useState<string>(journalNote || '');
  const [noteSaved, setNoteSaved] = useState<boolean>(false);

  const heroImageSrc = ambientSetting === 'sunrise'
    ? '/src/assets/images/darshan_hero_meditation_1794476699349.jpg'
    : '/src/assets/images/yoga_ashram_sanctuary_1794476698779.jpg';

  const handleReadMeditation = () => {
    const textToRead = `${meditation.title}. ${meditation.guidanceText}. ${
      meditation.mantraOrSeedSound ? `Inner vibration: ${meditation.mantraOrSeedSound}.` : ''
    } Contemplation: ${meditation.reflectionPrompt}`;
    audioEngine.playSingingBowl(216, 6);
    voiceEngine.speak(textToRead);
  };

  const handleSoundToggle = (sound: 'om' | 'stream' | 'rain') => {
    if (activeSound === sound) {
      audioEngine.stopAllAmbience();
      setActiveSound('none');
    } else {
      audioEngine.stopAllAmbience();
      if (sound === 'om') {
        audioEngine.startOmDrone();
      } else if (sound === 'stream') {
        audioEngine.startNatureSound('stream');
      } else if (sound === 'rain') {
        audioEngine.startNatureSound('rain');
      }
      setActiveSound(sound);
    }
  };

  const handleSaveNote = () => {
    onSaveJournalNote(localNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Stage Header */}
      <div className="bg-[#0b1522] text-slate-100 rounded-2xl p-5 md:p-6 border border-slate-800 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 uppercase tracking-wider mb-1">
              <span>Stage 4 of 4: Deep Meditation (Dhyāna)</span>
              <span>·</span>
              <span className="capitalize">{meditation.focusType} Focus</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif-display font-semibold text-white">
              {meditation.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReadMeditation}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-amber-200 bg-amber-950/70 hover:bg-amber-900/90 rounded-xl transition-colors border border-amber-500/40"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>Begin Guided Voice</span>
            </button>

            <button
              onClick={() => audioEngine.playSingingBowl(216, 8)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-[#16273c] hover:bg-[#1e3450] rounded-xl transition-colors border border-slate-700"
              title="Strike Tibetan Singing Bowl"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Strike Bowl</span>
            </button>
          </div>
        </div>
      </div>

      {/* Atmospheric Visual & Contemplation Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Atmospheric Visual Background Frame */}
        <div className="lg:col-span-7 rounded-2xl overflow-hidden relative min-h-[380px] flex flex-col justify-between border border-slate-200/80 dark:border-slate-800 shadow-sm bg-slate-950">
          <img
            src={heroImageSrc}
            alt="Serene meditation backdrop"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-700"
          />
          {/* Measured Scrim for WCAG readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e17]/95 via-[#070e17]/40 to-[#070e17]/30" />

          {/* Top Setting Switcher */}
          <div className="relative z-10 p-4 flex items-center justify-between">
            <div className="flex items-center gap-1 p-1 bg-[#0b1522]/90 backdrop-blur-md rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setAmbientSetting('sunrise')}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${ambientSetting === 'sunrise' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
              >
                Himalayan Sunrise
              </button>
              <button
                onClick={() => setAmbientSetting('sanctuary')}
                className={`px-3 py-1 rounded-lg transition-colors font-medium ${ambientSetting === 'sanctuary' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
              >
                Ashram Sanctuary
              </button>
            </div>

            {meditation.mantraOrSeedSound && (
              <span className="text-xs font-mono px-3 py-1 bg-amber-500/20 text-amber-300 rounded-xl backdrop-blur-md border border-amber-400/40">
                Mantra: {meditation.mantraOrSeedSound}
              </span>
            )}
          </div>

          {/* Bottom Guidance Prose */}
          <div className="relative z-10 p-6 text-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contemplation Guidance</span>
            </div>
            <p className="text-sm md:text-base text-slate-100 font-serif-display italic leading-relaxed">
              "{meditation.guidanceText}"
            </p>
          </div>
        </div>

        {/* Right: Soundscape Engine & Reflection Journal */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Soundscape Control Deck */}
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-3">
              Web Audio Soundscape (Zero Latency)
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSoundToggle('om')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  activeSound === 'om'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#111f32] border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <Music2 className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                <span className="text-xs font-medium block">432Hz Om Drone</span>
              </button>

              <button
                onClick={() => handleSoundToggle('stream')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  activeSound === 'stream'
                    ? 'bg-sky-500/15 border-sky-500 text-sky-700 dark:text-sky-300 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#111f32] border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <Waves className="w-5 h-5 mx-auto mb-1 text-sky-500" />
                <span className="text-xs font-medium block">Sacred Stream</span>
              </button>

              <button
                onClick={() => handleSoundToggle('rain')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  activeSound === 'rain'
                    ? 'bg-pink-500/15 border-pink-500 text-pink-700 dark:text-pink-300 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#111f32] border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <CloudRain className="w-5 h-5 mx-auto mb-1 text-pink-500" />
                <span className="text-xs font-medium block">Gentle Rain</span>
              </button>
            </div>
          </div>

          {/* Daily Reflection Journal Note */}
          <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                <PenTool className="w-3.5 h-3.5 text-amber-500" />
                <span>Daily Practice Reflection</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 italic">
                "{meditation.reflectionPrompt}"
              </p>
              <textarea
                value={localNote}
                onChange={(e) => setLocalNote(e.target.value)}
                rows={3}
                placeholder="Write your brief feeling, breakthrough, or sensation here..."
                className="w-full text-xs md:text-sm p-3 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">
                {noteSaved ? 'Saved to your journal!' : 'Saved in local storage'}
              </span>
              <button
                onClick={handleSaveNote}
                className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 rounded-xl transition-all shadow-sm shadow-amber-500/20"
              >
                Save Reflection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
