import { Vocabulary } from "../types";

const isDevelopment = import.meta.env.VITE_ENV === 'development';

interface StorageAPI {
  setItem: (key: string, value: Vocabulary[]) => Promise<void>;  // 改為回傳 Promise
  getItem: (key: string) => Promise<Vocabulary[]>;
  removeItem: (key: string) => Promise<void>;
}

class LocalStorageAPI implements StorageAPI {
  async setItem(key: string, value: Vocabulary[]) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorage 儲存失敗:', error);
      throw error;
    }
  }

  async getItem(key: string): Promise<Vocabulary[]> {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('LocalStorage 讀取失敗:', error);
      return [];
    }
  }

  async removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('LocalStorage 刪除失敗:', error);
      throw error;
    }
  }
}

class ChromeStorageAPI implements StorageAPI {
  async setItem(key: string, value: Vocabulary[]): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) {
          console.error('Chrome storage 儲存失敗:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }

  async getItem(key: string): Promise<Vocabulary[]> {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        if (chrome.runtime.lastError) {
          console.error('Chrome storage 讀取失敗:', chrome.runtime.lastError);
          resolve([]);
        } else {
          resolve(result[key] || []);
        }
      });
    });
  }

  async removeItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      chrome.storage.local.remove(key, () => {
        if (chrome.runtime.lastError) {
          console.error('Chrome storage 刪除失敗:', chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else {
          resolve();
        }
      });
    });
  }
}

export const storage: StorageAPI = isDevelopment
  ? new LocalStorageAPI()
  : new ChromeStorageAPI();