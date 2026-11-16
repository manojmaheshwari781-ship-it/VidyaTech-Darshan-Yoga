import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Bell, Music2, Waves, CloudRain, Sliders, Check } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { voiceEngine } from '../utils/voiceEngine';

interface SoundStudioProps {
  voiceEnabled: boolean;
  onToggleVoice: () => void;
}

export const SoundStudio: React.FC<SoundStudioProps> = ({
  voiceEnabled,
  onToggleVoice,
}) => {
  const [activeSound, setActiveSound] = useState<'none' | 'om' | 'stream' | 'rain'>('none');
  const [volume, setVolume] = useState<number>(0.5);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [voiceSpeechSpeed, setVoiceSpeechSpeed] = useState<number>(0.9);

  useEffect(() => {
    const voices = voiceEngine.getVoices();
    setAvailableVoices(voices);
    if (voices.length > 0) {
      setSelectedVoiceURI(voices[0].voiceURI);
    }
  }, []);

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

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol);
  };

  const handleVoiceChange = (uri: string) => {
    setSelectedVoiceURI(uri);
    voiceEngine.setVoice(uri);
    voiceEngine.speak('Namaste. Voice guidance tuned for VidyaTech Darshan.');
  };

  const handleSpeedChange = (speed: number) => {
    setVoiceSpeechSpeed(speed);
    voiceEngine.setRate(speed);
  };

  const handleTestChime = () => {
    audioEngine.playSingingBowl(216, 7);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-pink-500/5 to-sky-500/5 dark:from-[#0e1d2e] dark:via-[#131b2c] dark:to-[#0c1624] border border-amber-500/30 dark:border-amber-500/20 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
          <Music2 className="w-4 h-4 text-amber-500" />
          <span>Acoustic Sanctuary</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif-display font-semibold text-slate-900 dark:text-white">
          Soundscape & Voice Guidance Studio
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          Harness the healing power of sound. All audio is synthesized in real-time with Web Audio API—pure frequencies with zero external buffering.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ambient Soundscape Synthesizer */}
        <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white">
              Harmonic Soundscapes
            </h2>
            <button
              onClick={handleTestChime}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/60 rounded-xl hover:bg-amber-200 border border-amber-300/50 dark:border-amber-700/50 transition-colors"
            >
              <Bell className="w-3.5 h-3.5 text-amber-500" />
              <span>Strike Singing Bowl</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleSoundToggle('om')}
              className={`p-4 rounded-xl border text-center transition-all ${
                activeSound === 'om'
                  ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300 shadow-sm'
                  : 'bg-slate-50 dark:bg-[#111f32] border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Music2 className="w-6 h-6 mx-auto mb-2 text-amber-500" />
              <span className="text-xs font-semibold block">432Hz Om Drone</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Vedic harmony</span>
            </button>

            <button
              onClick={() => handleSoundToggle('stream')}
              className={`p-4 rounded-xl border text-center transition-all ${
                activeSound === 'stream'
                  ? 'bg-sky-500/15 border-sky-500 text-sky-700 dark:text-sky-300 shadow-sm'
                  : 'bg-slate-50 dark:bg-[#111f32] border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Waves className="w-6 h-6 mx-auto mb-2 text-sky-500" />
              <span className="text-xs font-semibold block">Himalayan Stream</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Gentle flow</span>
            </button>

            <button
              onClick={() => handleSoundToggle('rain')}
              className={`p-4 rounded-xl border text-center transition-all ${
                activeSound === 'rain'
                  ? 'bg-pink-500/15 border-pink-500 text-pink-700 dark:text-pink-300 shadow-sm'
                  : 'bg-slate-50 dark:bg-[#111f32] border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <CloudRain className="w-6 h-6 mx-auto mb-2 text-pink-500" />
              <span className="text-xs font-semibold block">Ashram Rain</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Soothing drizzle</span>
            </button>
          </div>

          {/* Volume Slider */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                <span>Ambient Master Volume</span>
              </span>
              <span className="font-mono-numbers">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Voice Guidance Settings */}
        <div className="bg-white dark:bg-[#0c1624] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif-display font-semibold text-slate-900 dark:text-white">
              Spoken Voice Guidance
            </h2>
            <button
              onClick={onToggleVoice}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                voiceEnabled
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{voiceEnabled ? 'Voice Enabled' : 'Voice Muted'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Spoken guidance recites philosophy teachings, announces breath phases ("Inhale... Hold... Exhale"), and delivers alignment cues for postures and meditation.
          </p>

          {/* Voice Selector */}
          {availableVoices.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                Speech Synthesis Voice
              </label>
              <select
                value={selectedVoiceURI}
                onChange={(e) => handleVoiceChange(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-[#111f32] border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {availableVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Speech Rate */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Cadence Pacing (Slow for meditation)</span>
              <span className="font-mono-numbers">{voiceSpeechSpeed}x</span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.15"
              step="0.05"
              value={voiceSpeechSpeed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <button
            onClick={() => {
              voiceEngine.speak(
                'Namaste. Welcome to VidyaTech Darshan by Manoj YogaWala. Breathe deeply, ground your awareness, and let us begin.'
              );
            }}
            className="w-full py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 text-amber-500" />
            <span>Test Voice Announcement</span>
          </button>
        </div>
      </div>
    </div>
  );
};
