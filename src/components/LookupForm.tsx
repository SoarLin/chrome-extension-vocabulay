import React from 'react'
import AddTaskIcon from '@mui/icons-material/AddTask'
import {
  Button,
  Card, Grid, TextField
} from '@mui/material'

type Props = {
  meaning: string
  sentence: string
  onMeaningChange: React.ChangeEventHandler<HTMLInputElement>
  onSentenceChange: React.ChangeEventHandler<HTMLInputElement>
  onHandleGiveUp: () => void
  onHandleAddToBook: () => void
}

const LookupForm: React.FC<Props> = ({
  meaning, sentence,
  onMeaningChange, onSentenceChange,
  onHandleGiveUp, onHandleAddToBook
}) => {
  return (
    <Card sx={{ marginTop: '10px', width: '100%' }}>
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
        <Button variant="outlined" color="error" onClick={onHandleGiveUp}>
          Give Up
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddTaskIcon />}
          sx={{ float: 'right' }}
          onClick={onHandleAddToBook}
        >
          Add to Word Book
        </Button>
      </Grid>
    </Card>
  )
}

export default LookupForm