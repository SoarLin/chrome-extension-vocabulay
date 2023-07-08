import { db } from '../plugins/firebase'
import { ref, child, set, get } from 'firebase/database'

import dayjs from 'dayjs'
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
  const today = dayjs().format('YYYY-MM-DD')
  const key = 'Vocabulary_' + today
  // const todayUnix = dayjs(`${today}T00:00:00.000Z`).unix()
  // console.log(todayUnix)
  const cache = localStorage.getItem(key)
  if (cache) {
    return JSON.parse(cache)
  }

  return new Promise((resolve, reject) => {
    const dbRef = ref(db)
    get(child(dbRef, ROOT_PATH)).then((snapshot: any) => {
      if (snapshot.exists()) {
        const data: Array<Vocabulary> = Object.values(snapshot.val())
        localStorage.setItem(key, JSON.stringify(data))
        resolve(data)
      } else {
        resolve([])
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
