import React from 'react'
import AddTaskIcon from '@mui/icons-material/AddTask'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import {
  Button,
  Card, Grid, TextField
} from '@mui/material'
import { LookupMode, Vocabulary } from '../types'

type Props = {
  mode: LookupMode
  word?: string
  meaning: string
  sentence: string
  onWordingChange: React.ChangeEventHandler<HTMLInputElement>
  onMeaningChange: React.ChangeEventHandler<HTMLInputElement>
  onSentenceChange: React.ChangeEventHandler<HTMLInputElement>
  onHandleGiveUp: () => void
  onHandleAddToBook: () => void
  onHandleUpdate: (_value: Vocabulary) => void
}

const ExampleEditForm: React.FC<Props> = ({
  mode, word, meaning, sentence,
  onWordingChange,
  onMeaningChange,
  onSentenceChange,
  onHandleGiveUp,
  onHandleAddToBook,
  onHandleUpdate,
}) => {
  const disabledBtn = () => {
    const isValid = meaning !== '' && sentence !== ''
    return mode === 'Manual' ? !(isValid && word !== '') : !isValid
  }

  const updateExample = () => {
    if (word && word !== '') {
      const vocabulary: Vocabulary = {
        id: '',
        timestamp: new Date().getTime(),
        word, meaning, sentence,
      }
      onHandleUpdate(vocabulary)
    }
  }

  return (
    <Card sx={{ marginTop: '10px', width: '100%' }}>
      { mode === 'Manual' || mode === 'EditRow' ? (
        <Grid sx={{ margin: '5px', padding: '5px' }}>
          <TextField
            label="Word"
            variant="standard"
            value={word}
            fullWidth
            autoFocus
            onChange={ onWordingChange }
          />
        </Grid>) : null
      }
      <Grid sx={{ margin: '5px', padding: '5px' }}>
        <TextField
          label="Meaning"
          variant="standard"
          value={meaning}
          fullWidth
          onChange={ onMeaningChange }
        />
      </Grid>
      <Grid sx={{ margin: '5px', padding: '5px' }}>
        <TextField
          label="Sentence"
          variant="standard"
          value={sentence}
          fullWidth
          multiline
          maxRows={4}
          onChange={ onSentenceChange }
        />
      </Grid>
      <Grid sx={{ margin: '5px', padding: '5px' }}>
        <Button variant="contained" color="error" onClick={onHandleGiveUp}>
          Give Up
        </Button>
        {mode === 'EditRow' ? (
            <Button
              variant="contained"
              color="success"
              startIcon={<SaveAsIcon />}
              sx={{ float: 'right' }}
              onClick={updateExample}
              disabled={disabledBtn()}
            >
              Update Example
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              startIcon={<AddTaskIcon />}
              sx={{ float: 'right' }}
              onClick={onHandleAddToBook}
              disabled={disabledBtn()}
            >
              Add to Word Book
            </Button>
          )
        }
      </Grid>
    </Card>
  )
}

export default ExampleEditForm