export interface Vocabulary {
  word: string,
  explan: string,
  sentence: string,
}

export type AsyncState = null | 'loading' | 'error' | 'complete';
