import { db } from '../plugins/firebase'
import { ref, push, set, update, onValue, query, orderByChild } from 'firebase/database'

import { Vocabulary } from '../types'

const ROOT_PATH = 'Dictionary/'

export const writeData = (word: string, meaning: string, sentence: string) => {
  const vocabulary: Vocabulary = {
    word, meaning, sentence,
    timestamp: (new Date()).getTime()
  }
  const newWordRef = push(ref(db, ROOT_PATH))
  set(newWordRef, vocabulary)
}
export const writeWord = (data: Vocabulary) => {
  set(ref(db, ROOT_PATH + data.word), data)
}
export const updateData = (data: Vocabulary) => {
  const key = data.key
  if (!key) return

  data.key = undefined
  delete data.key

  return update(ref(db, ROOT_PATH + '/' + key), data);
}

export const readAllWords = async (): Promise<Vocabulary[]> => {
  return new Promise((resolve, reject) => {
    const dbRef = query(ref(db, ROOT_PATH), orderByChild('timestamp'))
    onValue(dbRef,
      (snapshot) => {
        const records: Array<Vocabulary> =
          Object.entries<Vocabulary>(snapshot.val())
            .reduce((acc: Vocabulary[], val) => {
              acc.unshift({ key: val[0], ...val[1]})
              return acc
            }, [])
        resolve(records)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
