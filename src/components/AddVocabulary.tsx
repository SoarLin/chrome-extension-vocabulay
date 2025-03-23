import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import {
  AutoFixHigh as AutoFixHighIcon,
  Create as CreateIcon,
  Warning as WarningIcon
} from '@mui/icons-material'
import {
  Box, Button, Container,
  Divider, FormHelperText,
  IconButton, InputBase,
  LinearProgress, Paper
} from '@mui/material'
import { ButtonProps } from '@mui/material/Button'
import ExampleEditForm from './ExampleEditForm'
import { lookUpWord } from '../apis/dictionary'
import { writeWord, updateWord } from '../apis/vocabulary'
import { AsyncState, LookupMode, Vocabulary } from '../types';

type Props = {
  editVocabulary?: Vocabulary,
  onUpdateWordBook: () => void,
  onInputChange: (_word: string) => void,
}

const useStyles = makeStyles(() => ({
  container: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
  searchBlock: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 10,
  },
}))

const WhiteButton = styled(Button)<ButtonProps>(() => ({
  color: '#1976d2',
  backgroundColor: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#FFFFFF',
  },
  padding: '6px',
  minWidth: '44px',
}))

const AddVocabulary: React.FC<Props> = ({
  editVocabulary,
  onUpdateWordBook,
  onInputChange
}) => {
  const classes = useStyles();
  const [mode, setMode] = React.useState<LookupMode>(null)
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

  const isEditMode = () => {
    return mode === 'Manual' || mode === 'EditRow'
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
    onInputChange('')
    setErrMsg('')
    setMeaning('')
    setSentence('')
    setState(null)
    setMode(null)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value
    onInputChange(type)
    setWord(type)
  }

  const handleAddToBook = () => {
    writeWord(word, meaning, sentence)
    resetForm()
    onUpdateWordBook()
  }

  const handleUpdateData = async (data: Vocabulary) => {
    const updated: Vocabulary = {
      ...editVocabulary,
      word: data.word,
      meaning: data.meaning,
      sentence: data.sentence,
      id: editVocabulary?.id || '',
      timestamp: editVocabulary?.timestamp || Date.now()
    }
    await updateWord(updated)
    resetForm()
    onUpdateWordBook()
  }

  useEffect(() => {
    if (editVocabulary) {
      console.log('edit vocabulary', editVocabulary)
      setWord(editVocabulary.word)
      setMeaning(editVocabulary.meaning)
      setSentence(editVocabulary.sentence)
      setMode('EditRow')
    }
  }, [editVocabulary])

  return (
    <Container className={classes.container}>
      { isEditMode() ? null :
        <div className={classes.searchBlock}>
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
              onChange={ handleInputChange }
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              color="primary"
              sx={{ p: '5px' }}
              aria-label="add"
              size="small"
              onClick={handleLookup}
            >
              <AutoFixHighIcon />
            </IconButton>
          </Paper>
          <WhiteButton variant="contained" onClick={ () => setMode('Manual')}>
            <CreateIcon />
          </WhiteButton>
        </div>
      }
      { state === 'loading' && <Box sx={{ width: '100%' }}><LinearProgress /></Box> }
      { state === 'error' && (
        <FormHelperText error className="error-hint">
          <WarningIcon sx={{ fontSize: 16 }} />ERROR! {errMsg}
        </FormHelperText>
      )}
      { (state === 'complete' || isEditMode()) && (
        <ExampleEditForm
          mode={mode}
          word={word}
          meaning={meaning}
          sentence={sentence}
          onWordingChange={ (event) => setWord(event.target.value) }
          onMeaningChange={ (event) => setMeaning(event.target.value) }
          onSentenceChange={ (event) => setSentence(event.target.value) }
          onHandleGiveUp={resetForm}
          onHandleAddToBook={handleAddToBook}
          onHandleUpdate={handleUpdateData}
        />
      )}
    </Container>
  );
};

export default AddVocabulary
