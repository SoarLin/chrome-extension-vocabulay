import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Options: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // 載入已儲存的 API Key
    chrome.storage.local.get(['openaiApiKey'], (result) => {
      if (result.openaiApiKey) {
        setApiKey(result.openaiApiKey);
      }
    });
  }, []);

  const handleSave = () => {
    chrome.storage.local.set(
      { openaiApiKey: apiKey },
      () => {
        setStatus('已儲存');
        setTimeout(() => setStatus(''), 2000);
      }
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        設定
      </Typography>
      <TextField
        fullWidth
        label="OpenAI API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        margin="normal"
        type="password"
      />
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{ mt: 2 }}
      >
        儲存
      </Button>
      {status && (
        <Typography color="success.main" sx={{ mt: 2 }}>
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default Options;