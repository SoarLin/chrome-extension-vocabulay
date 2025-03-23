import React, { useState, useCallback, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import AddVocabulary from './components/AddVocabulary'
import Dictionary from './components/Dictionary'
import ImportExport from './components/ImportExport'

import { storage } from './shared/storage'
import { Vocabulary } from './types'
import { readAllWords } from './apis/vocabulary'
import { STORAGE_KEY } from './constant'

const useStyles = makeStyles(() => ({
  wrapper: {
    minHeight: '350px',
    width: '100%',
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [dictionary, setDictionary] = useState<Vocabulary[]>([])
  const [filterData, setFilterData] = useState<Vocabulary[]>([])
  const [editVocabulary, setEditVocabulary] = useState<Vocabulary>()

  const getAllData = useCallback(async () => {
    const dictionaries = await readAllWords()
    setDictionary(dictionaries)
    setFilterData(dictionaries)
  }, [])

  const updateWordBook = () => {
    getAllData()
  }

  const filterWordBook = (word: string) => {
    const filterDictionary = dictionary.filter((vocabulary: Vocabulary) => {
      return vocabulary.word.toLowerCase().indexOf(word) > -1
    })
    setFilterData(filterDictionary)
  }

  const editRowData = (value: Vocabulary) => {
    setEditVocabulary(value)
  }

  const handleImport = async (importedData: Vocabulary[]) => {
    try {
      // 使用 storage API 儲存資料
      await storage.setItem(STORAGE_KEY, importedData)
      // 更新本地狀態
      setDictionary(importedData)
      setFilterData(importedData)

      // 可以選擇是否同步到後端資料庫
      // 這裡需要實現一個函數來批量更新單字到資料庫
      // 例如: saveAllWords(importedData).then(() => alert('匯入成功且已同步到資料庫'))

      alert('單字表已成功匯入');
    } catch (error) {
      console.error('Import error:', error);
      alert('匯入失敗，請確認檔案格式是否正確');
    }
  }

  useEffect(() => {
    getAllData()
  }, [getAllData])

  return (
    <div className={classes.wrapper}>
      <ImportExport data={dictionary} onImport={handleImport} />
      <AddVocabulary
        editVocabulary={editVocabulary}
        onInputChange={filterWordBook}
        onUpdateWordBook={updateWordBook}
      />
      <Dictionary data={filterData} onEditRow={editRowData} />
    </div>
  );
}

export default App;