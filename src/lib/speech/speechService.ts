import { Language, SpeechServiceState } from '@/types';
import { getLanguageMeta } from '@/data/languages';

export interface ISpeechProvider {
  isSupported(): boolean;
  startListening(
    language: Language,
    onResult: (text: string) => void,
    onError: (error: string, isPermissionDenied?: boolean) => void,
    onStateChange?: (state: SpeechServiceState) => void
  ): void;
  stopListening(): void;
}

export class SpeechService {
  private provider: ISpeechProvider;

  constructor(provider: ISpeechProvider) {
    this.provider = provider;
  }

  public setProvider(provider: ISpeechProvider) {
    this.provider = provider;
  }

  public isSupported(): boolean {
    return this.provider.isSupported();
  }

  public startListening(
    language: Language,
    onResult: (text: string) => void,
    onError: (error: string, isPermissionDenied?: boolean) => void,
    onStateChange?: (state: SpeechServiceState) => void
  ) {
    this.provider.startListening(language, onResult, onError, onStateChange);
  }

  public stopListening() {
    this.provider.stopListening();
  }
}
