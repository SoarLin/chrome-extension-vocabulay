import React from 'react';
import SearchIcon from '@mui/icons-material/Search'
import WarningIcon from '@mui/icons-material/Warning'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import LinearProgress from '@mui/material/LinearProgress'
import FormHelperText from '@mui/material/FormHelperText'

import { lookUpWord } from '../apis/dictionary'
import { AsyncState } from '../types';

const AddVocabulary: React.FC = () => {
  const [word, setWord] = React.useState('')
  const [state, setState] = React.useState<AsyncState>('complete')
  const [errMsg, setErrMsg] = React.useState('')
  const [explan, setExplan] = React.useState('本能；直覺')
  const [sentence, setSentence] = React.useState(`The mother's instinct told her that something was wrong with her child. (母親的本能告訴她，孩子有些問題。)`)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
  }

  const errorHandle = (errorMessage: string, throwError = false) => {
    setState('error')
    setErrMsg(errorMessage)
    if (throwError) {
      throw new Error(errorMessage)
    }
    return
  }

  const hasFind = (content: string) => {
    const regex = /"explan":.*(?="sentence":)/
    return regex.test(content)
  }

  const extractContent = (content: string) => {
    // 使用正則表達式擷取 'explan' 的內容
    const explanRegex = /"explan":\s*"(.+?)"/
    const explanMatch = content.match(explanRegex)
    const explan = explanMatch ? explanMatch[1] : ''
    setExplan(explan)

    // 使用正則表達式擷取 'sentence' 的內容
    const sentenceRegex = /"sentence":\s*"(.+?)"/
    const sentenceMatch = content.match(sentenceRegex)
    const sentence = sentenceMatch ? sentenceMatch[1] : ''
    setSentence(sentence)
  }

  const handleClickAdd = async () => {
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
      if ('explan' in content) setExplan(content.explan)
      if ('sentence' in content) setSentence(content.sentence)
    } catch {
      extractContent(answer)
    }
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
          onChange={handleInputChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: '5px' }}
          aria-label="add"
          size="small"
          onClick={handleClickAdd}
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
        <Card sx={{ marginTop: '10px' }}>
          <p>explan: {explan}</p>
          <p>sentence: {sentence}</p>
        </Card>
      )}
    </div>
  );
};

export default AddVocabulary;
