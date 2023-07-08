import React from 'react';
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

import { lookUpWord } from '../apis/dictionary'
import { AsyncState } from '../types';

const AddVocabulary: React.FC = () => {
  const [word, setWord] = React.useState('')
  const [state, setState] = React.useState<AsyncState>(null)
  const [explan, setExplan] = React.useState('')
  const [sentence, setSentence] = React.useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
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
        throw new Error('Invalid AI response');
      }
      setState('complete')
      answer = result.choices[0].message?.content
      if (!answer) return
    } catch (err) {
      setState('error')
      throw new Error('OpenAI occur errors')
    }

    try {
      const content = JSON.parse(answer)
      if ('explan' in content) setExplan(content.explan)
      if ('sentence' in content) setSentence(content.sentence)
    } catch {
      extractContent(answer)
    }
  }

  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginBottom: '10px' }}
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
          <AddIcon />
        </IconButton>
      </Paper>
      {
        state === 'loading'
          ? <Box sx={{ width: '100%' }}><LinearProgress /></Box>
          : state === 'complete'
            ?
            <div>
              <p>explan: {explan}</p>
              <p>sentence: {sentence}</p>
            </div>
            : null
      }
    </>
  );
};

export default AddVocabulary;
