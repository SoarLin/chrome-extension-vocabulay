// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = import.meta.env.VITE_FIREBASE_API_KEK

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'chrome-extension-vocabulary.firebaseapp.com',
  databaseURL: 'https://chrome-extension-vocabulary-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chrome-extension-vocabulary',
  storageBucket: 'chrome-extension-vocabulary.appspot.com',
  messagingSenderId: '198515381620',
  appId: '1:198515381620:web:613a3f79789c0762eb0821',
  measurementId: 'G-E7S0PQH1CF'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export const getAllDataBase = async () => {
  const querySnapshot = await getDocs(collection(db, 'Dictionary'))
  querySnapshot.forEach((doc) => {
    console.log(doc.id + ' => ', doc.data())
  })
}

const initData = [
  {
    word: 'dividend',
    explan: '股息；紅利',
    sentence: 'The company distributed a dividend to its shareholders. (公司向股東發放了股息。)',
  },
  {
    word: 'reimbursement',
    explan: '償還；補償',
    sentence: 'I submitted the expense report for reimbursement. (我提交了費用報銷申請。)',
  },
  {
    word: 'beneficiaries',
    explan: '受益人；受惠者',
    sentence: 'The insurance policy provides financial support to the beneficiaries. (該保險政策為受益人提供財務支援。)',
  },
  {
    word: 'instinct',
    explan:	'本能；直覺',
    sentence: 'The mother\'s instinct told her that something was wrong with her child. (母親的本能告訴她，孩子有些問題。)',
  },
  {
    word: 'fulfill',
    explan: '實現；履行',
    sentence: 'He worked hard to fulfill his dream of becoming a professional athlete. (他努力實現成為職業運動員的夢想。)',
  },
  {
    word: 'tariff',
    explan: '關稅',
    sentence: 'The government increased the tariff on imported goods. (政府提高了進口商品的關稅。)',
  },
  {
    word: 'multinational',
    explan: '跨國的；多國的',
    sentence: 'The multinational company has branches in over 50 countries. (這家跨國公司在50多個國家設有分公司。)',
  },
  {
    word: 'prestige',
    explan: '聲望；威望',
    sentence: 'The luxury brand is known for its prestige and exclusivity. (這個奢侈品牌以其聲望和獨特性而聞名。)'
  },
  {
    word: 'veteran',
    explan: '老手；經驗豐富的人',
    sentence:'The company hired a veteran to train new employees. (公司聘請了一位老手來培訓新員工。)'
  },
  {
    word: 'profitability',
    explan:	'獲利性；盈利能力',
    sentence: 'The company\'s profitability has increased significantly this year. (該公司的盈利能力今年顯著提高。)'
  },
  {
    word: 'constitute',
    explan:	'構成；組成',
    sentence: 'These elements constitute the basic structure of the theory. (這些元素構成了該理論的基本結構。)'
  }
]

export const writeWord = async (idx = 0) => {
  const data = initData[idx]
  try {
    const docRef = await addDoc(collection(db, 'Dictionary'), data)

    console.log("Document written with ID: ", docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}