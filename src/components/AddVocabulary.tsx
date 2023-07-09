import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import WarningIcon from '@mui/icons-material/Warning'
import {
  Box, Divider,
  FormHelperText,
  IconButton, InputBase,
  LinearProgress, Paper
} from '@mui/material'
import LookupForm from './LookupForm'
import { lookUpWord } from '../apis/dictionary'
import { writeData } from '../apis/vocabulary'
import { AsyncState } from '../types';

type Props = {
  onUpdateWordBook: () => void
}

const AddVocabulary: React.FC<Props> = ({ onUpdateWordBook }) => {
  const [word, setWord] = React.useState('')
  const [state, setState] = React.useState<AsyncState>(null)
  const [errMsg, setErrMsg] = React.useState('')
  const [meaning, setMeaning] = React.useState('')
  const [sentence, setSentence] = React.useState('')

  const errorHandle = (errorMessage: string, throwError = false) => {
    setState('error')
    setErrMsg(errorMessage)
    if (throwError) {
      throw new Error(errorMessage)
    }
    return
  }

  const hasFind = (content: string) => {
    const regex = /meaning.*sentence/
    return regex.test(content.replace(/\n/g,''))
  }

  const extractContent = (content: string) => {
    // 使用正則表達式擷取 'meaning' 的內容
    const meaningRegex = /"meaning":\s*"(.+?)"/
    const meaningMatch = content.match(meaningRegex)
    const meaning = meaningMatch ? meaningMatch[1] : ''
    setMeaning(meaning)

    // 使用正則表達式擷取 'sentence' 的內容
    const sentenceRegex = /"sentence":\s*"(.+?)"/
    const sentenceMatch = content.match(sentenceRegex)
    const sentence = sentenceMatch ? sentenceMatch[1] : ''
    setSentence(sentence)
  }

  const handleLookup = async () => {
    setState('loading')
    let answer
    try {
      const result = await lookUpWord(word)
      if (!result.choices || !result.usage) {
        errorHandle('Invalid AI response', true)
      }
      answer = result.choices[0].message?.content
    } catch (err) {
      errorHandle('OpenAI occur errors', true)
    }

    if (!answer) return errorHandle('No return content')
    if (!hasFind(answer)) return errorHandle(answer)

    setState('complete')
    try {
      const content = JSON.parse(answer)
      if ('meaning' in content) setMeaning(content.meaning)
      if ('sentence' in content) setSentence(content.sentence)
    } catch {
      extractContent(answer)
    }
  }

  const resetForm = () => {
    setWord('')
    setErrMsg('')
    setMeaning('')
    setSentence('')
    setState(null)
  }

  const handleAddToBook = () => {
    writeData(word, meaning, sentence)
    resetForm()
    onUpdateWordBook()
  }

  return (
    <div>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          size="small"
          placeholder="New Vocabulary"
          inputProps={{ 'aria-label': 'new vocabulary' }}
          value={word}
          onChange={ (event) => setWord(event.target.value) }
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: '5px' }}
          aria-label="add"
          size="small"
          onClick={handleLookup}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      { state === 'loading' && <Box sx={{ width: '100%' }}><LinearProgress /></Box> }
      { state === 'error' && (
        <FormHelperText error className="error-hint">
          <WarningIcon sx={{ fontSize: 16 }} />ERROR! {errMsg}
        </FormHelperText>
      )}
      { state === 'complete' && (
        <LookupForm
          meaning={meaning}
          sentence={sentence}
          onMeaningChange={ (event) => setMeaning(event.target.value) }
          onSentenceChange={ (event) => setSentence(event.target.value) }
          onHandleGiveUp={resetForm}
          onHandleAddToBook={handleAddToBook}
        />
      )}
    </div>
  );
};

export default AddVocabulary
