import React from 'react';
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'

import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'

// type Props = {
//   name: string;
//   age: number;
// };

const AddVocabulary: React.FC = (/*{ name, age }*/) => {
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
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '5px' }} aria-label="add" size="small">
        <AddIcon />
      </IconButton>
    </Paper>
  );
};

export default AddVocabulary;
