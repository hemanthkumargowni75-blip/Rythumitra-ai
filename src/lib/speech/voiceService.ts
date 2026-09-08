import { Language } from '@/types';
import { getLanguageMeta } from '@/data/languages';

export type VoiceState =
  | 'idle'
  | 'requesting_permission'
  | 'listening'
  | 'processing'
  | 'success'
  | 'error'
  | 'unsupported'
  | 'permission_denied';

export interface VoiceProviderResult {
  transcript: string;
  isFinal: boolean;
  confidence?: number;
}

export interface IVoiceProvider {
  name: string;
  isSupported(): boolean;
  start(
    lang: Language,
    onResult: (result: VoiceProviderResult) => void,
    onStateChange: (state: VoiceState, message?: string) => void
  ): Promise<void>;
  stop(): void;
}

/**
 * 1. BrowserSpeechProvider:
 * Uses HTML5 SpeechRecognition / webkitSpeechRecognition API
 */
export class BrowserSpeechProvider implements IVoiceProvider {
  public name = 'BrowserSpeechProvider';
  private recognition: any = null;
  private isListening = false;

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  public async start(
    lang: Language,
    onResult: (result: VoiceProviderResult) => void,
    onStateChange: (state: VoiceState, message?: string) => void
  ): Promise<void> {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      onStateChange('unsupported', 'Browser speech recognition is unavailable.');
      return;
    }

    this.stop();

    try {
      onStateChange('requesting_permission');
      this.recognition = new SpeechRecognitionAPI();

      const meta = getLanguageMeta(lang);
      // Map standard Indian speech locales
      const localeMap: Record<string, string> = {
        te: 'te-IN',
        hi: 'hi-IN',
        en: 'en-IN',
        ta: 'ta-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        mr: 'mr-IN',
      };
      this.recognition.lang = localeMap[lang] || meta.speechCode || 'en-IN';
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      let finalTranscript = '';

      this.recognition.onstart = () => {
        this.isListening = true;
        onStateChange('listening');
      };

      this.recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          const text = item[0].transcript;
          if (item.isFinal) {
            finalTranscript += text;
          } else {
            interim += text;
          }
        }

        const combined = (finalTranscript || interim).trim();
        if (combined) {
          onResult({
            transcript: combined,
            isFinal: !!finalTranscript,
            confidence: event.results[event.results.length - 1]?.[0]?.confidence || 0.9,
          });
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        const err = event.error;

        if (err === 'not-allowed' || err === 'service-not-allowed') {
          onStateChange('permission_denied', 'Microphone access was denied. You can type instead.');
        } else if (err === 'no-speech') {
          onStateChange('idle', 'No speech detected. Please press and speak again.');
        } else if (err === 'network') {
          onStateChange('error', 'Network error during speech recognition.');
        } else {
          onStateChange('error', `Speech recognition error: ${err || 'Unknown error'}`);
        }
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          this.isListening = false;
          onStateChange('success');
          setTimeout(() => onStateChange('idle'), 1200);
        }
      };

      this.recognition.start();
    } catch (err: any) {
      this.isListening = false;
      onStateChange('error', err?.message || 'Failed to initialize speech recognition');
    }
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.isListening = false;
    }
  }
}

/**
 * 2. ProductionSpeechToTextProvider:
 * Server-backed fallback using MediaRecorder + /api/v1/voice/transcribe
 */
export class ProductionSpeechToTextProvider implements IVoiceProvider {
  public name = 'ProductionSpeechToTextProvider';
  private mediaRecorder: MediaRecorder | null = null;
  private audioStream: MediaStream | null = null;
  private audioChunks: Blob[] = [];
  private isRecording = false;

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      typeof navigator !== 'undefined' &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      typeof window.MediaRecorder !== 'undefined'
    );
  }

  public async start(
    lang: Language,
    onResult: (result: VoiceProviderResult) => void,
    onStateChange: (state: VoiceState, message?: string) => void
  ): Promise<void> {
    if (!this.isSupported()) {
      onStateChange('unsupported', 'Audio recording is not supported in this browser.');
      return;
    }

    this.stop();

    try {
      onStateChange('requesting_permission');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioStream = stream;
      this.audioChunks = [];
      this.isRecording = true;

      const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
      this.mediaRecorder = new MediaRecorder(stream, { mimeType });

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        onStateChange('processing');
        const audioBlob = new Blob(this.audioChunks, { type: mimeType });

        try {
          const formData = new FormData();
          formData.append('audio', audioBlob, 'speech.webm');
          formData.append('language', lang);

          const res = await fetch('/api/v1/voice/transcribe', {
            method: 'POST',
            body: formData,
          });

          if (res.ok) {
            const data = await res.json();
            if (data.success && data.transcript) {
              onResult({
                transcript: data.transcript,
                isFinal: true,
                confidence: data.confidence || 0.95,
              });
              onStateChange('success');
            } else {
              onStateChange('error', data.error || 'Speech transcription failed');
            }
          } else {
            onStateChange(
              'error',
              'Voice input is currently unavailable. Please type your question instead.'
            );
          }
        } catch {
          onStateChange(
            'error',
            'Voice input is currently unavailable. Please type your question instead.'
          );
        } finally {
          this.cleanupTracks();
          setTimeout(() => onStateChange('idle'), 1500);
        }
      };

      this.mediaRecorder.start();
      onStateChange('listening');
    } catch (err: any) {
      this.cleanupTracks();
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        onStateChange('permission_denied', 'Microphone permission was denied.');
      } else {
        onStateChange('error', err?.message || 'Could not access microphone.');
      }
    }
  }

  public stop(): void {
    if (this.mediaRecorder && this.isRecording) {
      this.isRecording = false;
      if (this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      }
    }
  }

  private cleanupTracks(): void {
    if (this.audioStream) {
      this.audioStream.getTracks().forEach((track) => track.stop());
      this.audioStream = null;
    }
  }
}

/**
 * 3. FallbackProvider:
 * Polite text-based fallback when no audio API is available
 */
export class FallbackProvider implements IVoiceProvider {
  public name = 'FallbackProvider';

  public isSupported(): boolean {
    return true;
  }

  public async start(
    _lang: Language,
    _onResult: (result: VoiceProviderResult) => void,
    onStateChange: (state: VoiceState, message?: string) => void
  ): Promise<void> {
    onStateChange(
      'unsupported',
      'Voice input is currently unavailable. Please type your question instead.'
    );
    setTimeout(() => onStateChange('idle'), 4000);
  }

  public stop(): void {
    // no-op
  }
}

/**
 * Unified VoiceService:
 * Cascade orchestrator: BrowserSpeech -> ProductionSpeechToText -> Fallback
 */
export class VoiceService {
  private browserProvider: BrowserSpeechProvider;
  private productionProvider: ProductionSpeechToTextProvider;
  private fallbackProvider: FallbackProvider;
  private activeProvider: IVoiceProvider | null = null;
  private isRunning = false;

  constructor() {
    this.browserProvider = new BrowserSpeechProvider();
    this.productionProvider = new ProductionSpeechToTextProvider();
    this.fallbackProvider = new FallbackProvider();
  }

  public isSupported(): boolean {
    return this.browserProvider.isSupported() || this.productionProvider.isSupported();
  }

  public async startListening(
    lang: Language,
    onResult: (result: VoiceProviderResult) => void,
    onStateChange: (state: VoiceState, message?: string) => void
  ): Promise<void> {
    // Prevent duplicate concurrent sessions
    if (this.isRunning) {
      this.stopListening();
    }

    this.isRunning = true;

    // Prefer BrowserSpeechProvider (instant interim results)
    if (this.browserProvider.isSupported()) {
      this.activeProvider = this.browserProvider;
      await this.browserProvider.start(lang, onResult, (state, msg) => {
        if (state === 'idle' || state === 'success' || state === 'error' || state === 'permission_denied') {
          this.isRunning = false;
        }
        onStateChange(state, msg);
      });
      return;
    }

    // Secondary fallback: Server-backed speech recognition
    if (this.productionProvider.isSupported()) {
      this.activeProvider = this.productionProvider;
      await this.productionProvider.start(lang, onResult, (state, msg) => {
        if (state === 'idle' || state === 'success' || state === 'error' || state === 'permission_denied') {
          this.isRunning = false;
        }
        onStateChange(state, msg);
      });
      return;
    }

    // Final fallback
    this.activeProvider = this.fallbackProvider;
    await this.fallbackProvider.start(lang, onResult, onStateChange);
    this.isRunning = false;
  }

  public stopListening(): void {
    if (this.activeProvider) {
      this.activeProvider.stop();
      this.activeProvider = null;
    }
    this.isRunning = false;
  }
}

// Singleton instance
let voiceServiceInstance: VoiceService | null = null;

export function getVoiceService(): VoiceService {
  if (!voiceServiceInstance) {
    voiceServiceInstance = new VoiceService();
  }
  return voiceServiceInstance;
}
