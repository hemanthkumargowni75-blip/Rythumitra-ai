import { ISpeechProvider } from './speechService';
import { Language, SpeechServiceState } from '@/types';
import { getLanguageMeta } from '@/data/languages';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export class BrowserSpeechProvider implements ISpeechProvider {
  private recognition: any = null;
  private isListening = false;

  public isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  public startListening(
    language: Language,
    onResult: (text: string) => void,
    onError: (error: string, isPermissionDenied?: boolean) => void,
    onStateChange?: (state: SpeechServiceState) => void
  ): void {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      onError('Browser does not support SpeechRecognition API', false);
      onStateChange?.('error');
      return;
    }

    // Stop any existing session
    this.stopListening();

    try {
      this.recognition = new SpeechRecognitionAPI();
      const meta = getLanguageMeta(language);
      this.recognition.lang = meta.speechCode; // e.g. te-IN, hi-IN, ta-IN, en-IN
      this.recognition.continuous = false; // Only record single spoken utterance per press
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;

      onStateChange?.('listening');
      this.isListening = true;

      let finalTranscript = '';

      this.recognition.onstart = () => {
        onStateChange?.('listening');
      };

      this.recognition.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interim += transcript;
          }
        }
        const combined = (finalTranscript || interim).trim();
        if (combined) {
          onResult(combined);
        }
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          onStateChange?.('permission_denied');
          onError('Microphone permission denied', true);
        } else if (event.error === 'no-speech') {
          onStateChange?.('idle');
          onError('No speech detected', false);
        } else {
          onStateChange?.('error');
          onError(event.error || 'Speech recognition failed', false);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onStateChange?.('success');
        setTimeout(() => {
          onStateChange?.('idle');
        }, 1200);
      };

      this.recognition.start();
    } catch (err: any) {
      this.isListening = false;
      onStateChange?.('error');
      onError(err?.message || 'Failed to start speech recognition', false);
    }
  }

  public stopListening(): void {
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
