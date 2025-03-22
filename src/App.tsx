import React, { FC, useCallback, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import AddVocabulary from './components/AddVocabulary'
import Dictionary from './components/Dictionary'

import dayjs from 'dayjs'
import { Vocabulary } from './types'
import { readAllWords } from './apis/vocabulary'
import { CACHE_PREFIX, MILLSECOND_OF_DAY, NORMAL_DATE_FORMAT } from './constant'

const useStyles = makeStyles(() => ({
  wrapper: {
    minHeight: '350px',
    width: '100%',
  }
}));

const App: FC = () => {
  const classes = useStyles();
  const [dictionary, setDictionary] = React.useState<Vocabulary[]>([])
  const [filterData, setFilterData] = React.useState<Vocabulary[]>([])
  const [editVocabulary, setEditVocabulary] = React.useState<Vocabulary>()
  const today = dayjs().format(NORMAL_DATE_FORMAT)
  const key = CACHE_PREFIX + today

  const cleanOldCache = (range = 30) => {
    const today = new Date();
    for (let i = range; i > 0; i--) {
      const pastDate = new Date(today.getTime() - i * MILLSECOND_OF_DAY);
      const pastKey = CACHE_PREFIX + dayjs(pastDate).format(NORMAL_DATE_FORMAT)
      if (localStorage.getItem(pastKey)) {
        localStorage.removeItem(pastKey)
      }
    }
  }

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
    cleanOldCache();
  }, [])

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