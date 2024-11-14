import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ReceiptPreviewProps {
  file: File;
  onRemove: () => void;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ file, onRemove }) => {
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const isPDF = file.type === 'application/pdf';

  return (
    <Paper
      sx={{
        position: 'relative',
        mt: 2,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <IconButton
        size="small"
        onClick={onRemove}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          bgcolor: 'background.paper',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box sx={{ mt: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          {file.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </Typography>
      </Box>

      {!isPDF && preview && (
        <Box
          sx={{
            mt: 2,
            maxHeight: 200,
            overflow: 'hidden',
            borderRadius: 1,
          }}
        >
          <img
            src={preview}
            alt="Receipt preview"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      )}

      {isPDF && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: 1,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            PDF document
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ReceiptPreview;