import { db } from '../plugins/firebase'
import { ref, child, set, get } from 'firebase/database'

import { Vocabulary } from '../types'

const ROOT_PATH = 'Dictionary/'

export const writeData = (word: string, explain: string, sentence: string) => {
  const vocabulary = { word, explain, sentence }
  set(ref(db, ROOT_PATH + word), vocabulary)
}
export const writeWord = (data: Vocabulary) => {
  set(ref(db, ROOT_PATH + data.word), data)
}
export const readAllWords = async (): Promise<Vocabulary[]> => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(db)
    get(child(dbRef, ROOT_PATH)).then((snapshot: any) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        const data: Array<Vocabulary> = Object.values(snapshot.val())
        resolve(data)
      } else {
        resolve([])
      }
    }).catch((error) => {
      reject(error)
    })
  })
}