export interface Vocabulary {
  word: string,
  meaning: string,
  sentence: string,
  timestamp?: number,
}

export type AsyncState = null | 'loading' | 'error' | 'complete';
