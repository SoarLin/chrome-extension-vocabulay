import React, { useCallback, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import AddVocabulary from './components/AddVocabulary'
import Dictionary from './components/Dictionary'

import dayjs from 'dayjs'
import { Vocabulary } from './types'
import { readAllWords } from './apis/vocabulary'

const useStyles = makeStyles(() => ({
  wrapper: {
    minHeight: '350px',
    width: '100%',
  }
}));

const App: React.FC = () => {
  const classes = useStyles();
  const [dictionary, setDictionary] = React.useState<Vocabulary[]>([])
  const [filterData, setFilterData] = React.useState<Vocabulary[]>([])
  const [editVocabulary, setEditVocabulary] = React.useState<Vocabulary>()
  const today = dayjs().format('YYYY-MM-DD')
  const key = 'Vocabulary_' + today

  const getAllData = useCallback(async () => {
    const dictionaries = await readAllWords()
    localStorage.setItem(key, JSON.stringify(dictionaries))
    setDictionary(dictionaries)
    setFilterData(dictionaries)
  }, [key])

  const updateWordBook = () => {
    localStorage.removeItem(key)
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

  useEffect(() => {
    const cache = localStorage.getItem(key)
    if (cache) {
      const dataFromCache = JSON.parse(cache)
      setDictionary(dataFromCache)
      setFilterData(dataFromCache)
    } else {
      getAllData()
    }
  }, [key, getAllData])

  return (
    <div className={classes.wrapper}>
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