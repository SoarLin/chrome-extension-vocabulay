export interface Vocabulary {
  id: string;
  word: string;
  meaning: string;
  sentence: string;
  timestamp: number;
}

export type AsyncState = null | 'loading' | 'error' | 'complete';

export type LookupMode = null | 'OpenAI' | 'Manual' | 'EditRow'
