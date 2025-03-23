import React, { FC } from 'react';
import { Button, Stack, Tooltip } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Vocabulary } from '../types';

interface ImportExportProps {
  data: Vocabulary[];
  onImport: (data: Vocabulary[]) => void;
}

const ImportExport: FC<ImportExportProps> = ({ data, onImport }) => {
  const handleExport = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `vocabulary-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string) as Vocabulary[];
        onImport(importedData);
      } catch (error) {
        alert('匯入檔案格式錯誤，請確認是否為正確的 JSON 檔案');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // 重置 input 的值，允許再次匯入相同的檔案
  };

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <Tooltip title="匯出單字表">
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownloadIcon />}
          onClick={handleExport}
        >
          匯出
        </Button>
      </Tooltip>

      <Tooltip title="匯入單字表">
        <Button
          variant="outlined"
          size="small"
          component="label"
          startIcon={<FileUploadIcon />}
        >
          匯入
          <input
            type="file"
            accept=".json"
            hidden
            onChange={handleImport}
          />
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default ImportExport;
