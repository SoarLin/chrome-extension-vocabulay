import React, { useCallback, useEffect } from 'react';
import AddVocabulary from './components/AddVocabulary'
import Dictionary from './components/Dictionary'
import styled from 'styled-components'

import dayjs from 'dayjs'
import { Vocabulary } from './types'
import { readAllWords } from './apis/vocabulary'

const App: React.FC = () => {
  const Wrapper = styled.section`
    align-self: flex-start;
    width: 100%;
  `;

  const [dictionary, setDictionary] = React.useState<Vocabulary[]>([])
  const today = dayjs().format('YYYY-MM-DD')
  const key = 'Vocabulary_' + today

  const getAllData = useCallback(async () => {
    const dictionaries = await readAllWords()
    localStorage.setItem(key, JSON.stringify(dictionaries))
    setDictionary(dictionaries)
  }, [key])

  useEffect(() => {
    const cache = localStorage.getItem(key)
    if (cache) {
      setDictionary(JSON.parse(cache))
    } else {
      getAllData()
    }
  }, [key, getAllData])

  const updateWordBook = () => {
    localStorage.removeItem(key)
    getAllData()
  }

  return (
    <div className="wrapper">
      <Wrapper>
        <AddVocabulary onUpdateWordBook={ updateWordBook } />
      </Wrapper>
      <Dictionary data={dictionary} />
    </div>
  );
}

export default App;