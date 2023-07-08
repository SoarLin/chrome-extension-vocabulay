import React from 'react';
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import {chatCompletion} from '../apis/vocabulary'

const AddVocabulary: React.FC = () => {
  const [word, setWord] = React.useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value)
  }

  const handleClickAdd = async () => {
    const data = await chatCompletion()
    console.log(data)
  }

  return (
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
  );
};

export default AddVocabulary;
