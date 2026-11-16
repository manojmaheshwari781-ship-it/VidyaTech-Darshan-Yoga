/**
 * Generative Web Audio API engine for VidyaTech Darshan
 * Zero external audio files required - 100% reliable, zero network latency.
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private currentDroneNodes: { oscs: OscillatorNode[]; gain: GainNode } | null = null;
  private currentNatureNodes: { noise: AudioNode; filter: BiquadFilterNode; gain: GainNode } | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.5, this.ctx.currentTime, 0.05);
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, vol));
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : clamped, this.ctx.currentTime, 0.05);
    }
  }

  /**
   * Plays a Tibetan Singing Bowl strike with authentic harmonic resonance
   */
  public playSingingBowl(fundamental: number = 216, duration: number = 6) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      // Harmonics for a metal singing bowl (f0, 2.76*f0, 5.4*f0)
      const harmonics = [
        { ratio: 1.0, gain: 0.5, decay: duration },
        { ratio: 2.76, gain: 0.25, decay: duration * 0.7 },
        { ratio: 5.40, gain: 0.12, decay: duration * 0.5 },
        { ratio: 8.93, gain: 0.05, decay: duration * 0.3 }
      ];

      harmonics.forEach(({ ratio, gain: partGain, decay }) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * ratio, now);

        // Subtle slow pitch waver (vibrato) typical of singing bowls
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(4.2, now);
        lfoGain.gain.setValueAtTime(1.5, now);
        lfo.connect(osc.frequency);
        lfo.start(now);
        lfo.stop(now + decay);

        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.exponentialRampToValueAtTime(partGain * 0.4, now + 0.08); // soft mallet attack
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gainNode);
        gainNode.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + decay);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Plays a gentle wooden temple chime for stage transition or breath tick
   */
  public playChime(freq: number = 528) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain || this.isMuted) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 2.5);
    } catch {
      // Fallback
    }
  }

  /**
   * Continuous sacred 432Hz Om Drone
   */
  public startOmDrone() {
    this.stopDrone();
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const now = this.ctx.currentTime;
      const droneGain = this.ctx.createGain();
      droneGain.gain.setValueAtTime(0.001, now);
      droneGain.gain.linearRampToValueAtTime(0.18, now + 3);

      const baseFreq = 108; // 108 Hz (Sub-harmonic of 432Hz)
      const freqs = [baseFreq, baseFreq * 2, baseFreq * 3, baseFreq * 4];
      const oscs: OscillatorNode[] = [];

      freqs.forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f + (Math.random() * 0.4 - 0.2), now);

        // Slow warm chorus
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.setValueAtTime(0.2 + i * 0.05, now);
        lfoGain.gain.setValueAtTime(0.8, now);
        lfo.connect(osc.frequency);
        lfo.start(now);

        osc.connect(droneGain);
        osc.start(now);
        oscs.push(osc);
      });

      droneGain.connect(this.masterGain);
      this.currentDroneNodes = { oscs, gain: droneGain };
    } catch {
      // Audio fallback
    }
  }

  public stopDrone() {
    if (this.currentDroneNodes && this.ctx) {
      const { oscs, gain } = this.currentDroneNodes;
      const now = this.ctx.currentTime;
      try {
        gain.gain.linearRampToValueAtTime(0.0001, now + 1.5);
        setTimeout(() => {
          oscs.forEach(o => {
            try { o.stop(); o.disconnect(); } catch {}
          });
          gain.disconnect();
        }, 1600);
      } catch {
        oscs.forEach(o => { try { o.stop(); } catch {} });
      }
      this.currentDroneNodes = null;
    }
  }

  /**
   * Generates organic stream or gentle rain with colored noise & filtering
   */
  public startNatureSound(type: 'stream' | 'rain') {
    this.stopNatureSound();
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      // Generate soft pink/brownian noise
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      if (type === 'stream') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(750, this.ctx.currentTime);
        filter.Q.setValueAtTime(1.8, this.ctx.currentTime);
      } else {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
        filter.Q.setValueAtTime(0.7, this.ctx.currentTime);
      }

      const natureGain = this.ctx.createGain();
      natureGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      natureGain.gain.linearRampToValueAtTime(type === 'stream' ? 0.22 : 0.15, this.ctx.currentTime + 2);

      noise.connect(filter);
      filter.connect(natureGain);
      natureGain.connect(this.masterGain);

      noise.start();
      this.currentNatureNodes = { noise, filter, gain: natureGain };
    } catch {
      // Audio fallback
    }
  }

  public stopNatureSound() {
    if (this.currentNatureNodes && this.ctx) {
      const { noise, filter, gain } = this.currentNatureNodes;
      const now = this.ctx.currentTime;
      try {
        gain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          try {
            (noise as AudioScheduledSourceNode).stop();
            noise.disconnect();
            filter.disconnect();
            gain.disconnect();
          } catch {}
        }, 1300);
      } catch {
        try { (noise as AudioScheduledSourceNode).stop(); } catch {}
      }
      this.currentNatureNodes = null;
    }
  }

  public stopAllAmbience() {
    this.stopDrone();
    this.stopNatureSound();
  }
}

export const audioEngine = new SoundscapeEngine();
