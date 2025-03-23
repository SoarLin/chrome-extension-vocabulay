import { STORAGE_KEY } from '../constant';
import { storage } from '../shared/storage'
import { Vocabulary } from '../types';

// 讀取所有單字
export const readAllWords = async (): Promise<Vocabulary[]> => {
  const words = await storage.getItem(STORAGE_KEY)
  if (!words) return []

  // 確保資料格式相容性
  return Array.isArray(words)
    ? words.sort((a, b) => b.timestamp - a.timestamp)
    : []
}

// 新增單字
export const writeWord = async (word: string, meaning: string, sentence: string) => {
  const vocabulary: Vocabulary = {
    id: crypto.randomUUID(),
    word,
    meaning,
    sentence,
    timestamp: Date.now()
  }
  const existingWords = await readAllWords()
  await storage.setItem(STORAGE_KEY, [vocabulary, ...existingWords])
}

// 更新單字
export const updateWord = async (data: Vocabulary) => {
  const words = await readAllWords()
  const updatedWords = words.map(word =>
    word.id === data.id ? data : word
  )
  await storage.setItem(STORAGE_KEY, updatedWords)
}

// 刪除單字
export const deleteWord = async (id: string) => {
  const words = await readAllWords()
  const filteredWords = words.filter(word => word.id !== id)
  await storage.setItem(STORAGE_KEY, filteredWords)
}
