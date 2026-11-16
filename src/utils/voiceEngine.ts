/**
 * Voice Guidance Engine using Web Speech API (window.speechSynthesis)
 * Delivers calm, soothing spoken instructions for all 4 stages.
 */

class VoiceEngine {
  private synth: SpeechSynthesis | null = null;
  private isEnabled: boolean = true;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private rate: number = 0.9; // Slightly slower, calm cadence
  private pitch: number = 1.0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer Indian English or soothing English voices
    const indianVoice = voices.find(v => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india'));
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Serena') || v.name.includes('Samantha') || v.name.includes('Google')));
    this.selectedVoice = indianVoice || englishVoice || voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices().filter(v => v.lang.startsWith('en') || v.lang.startsWith('hi'));
  }

  public setVoice(voiceURI: string) {
    if (!this.synth) return;
    const voice = this.synth.getVoices().find(v => v.voiceURI === voiceURI);
    if (voice) this.selectedVoice = voice;
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled && this.synth) {
      this.synth.cancel();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public setRate(rate: number) {
    this.rate = Math.max(0.7, Math.min(1.3, rate));
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.synth || !this.isEnabled || !text.trim()) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel(); // Stop any pending utterance
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
      utterance.rate = this.rate;
      utterance.pitch = this.pitch;
      utterance.volume = 1.0;

      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }

      this.synth.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const voiceEngine = new VoiceEngine();
