import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paper, Typography, Box, CircularProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReceiptPreview from './ReceiptPreview';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  onExtractData: (data: { date?: Date; amount?: number }) => void;
  error?: string;
  value?: File | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, onExtractData, error, value }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const processReceipt = async (file: File) => {
    // Simulate OCR processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a mock receipt data extractor
    const extractReceiptData = () => {
      // Generate a random date within the last 30 days
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      
      // Generate a realistic amount (between 100 and 5000)
      const amount = parseFloat((Math.random() * 4900 + 100).toFixed(2));
      
      return { date, amount };
    };

    const extractedData = extractReceiptData();
    console.log('Extracted data:', extractedData);
    onExtractData(extractedData);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setIsLoading(true);
    setUploadError('');

    try {
      await processReceipt(file);
      onFileSelect(file);
    } catch (err) {
      setUploadError('Failed to process receipt');
      onFileSelect(null);
    } finally {
      setIsLoading(false);
    }
  }, [onFileSelect, onExtractData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    multiple: false,
    disabled: isLoading
  });

  const handleRemoveFile = () => {
    onFileSelect(null);
    setUploadError('');
  };

  if (value) {
    return <ReceiptPreview file={value} onRemove={handleRemoveFile} />;
  }

  return (
    <Box>
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          border: '2px dashed',
          borderColor: error ? 'error.main' : isDragActive ? 'primary.main' : 'grey.300',
          bgcolor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: isLoading ? 'default' : 'pointer',
          '&:hover': {
            bgcolor: isLoading ? 'background.paper' : 'action.hover'
          }
        }}
      >
        <input {...getInputProps()} disabled={isLoading} />
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          {isLoading ? (
            <Box display="flex" alignItems="center" gap={2}>
              <CircularProgress size={24} />
              <Typography>Processing receipt...</Typography>
            </Box>
          ) : (
            <>
              <CloudUploadIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography align="center" color="textSecondary">
                {isDragActive ? 'Drop the receipt here' : 'Drag and drop a receipt, or click to select'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Upload receipt to auto-fill date and amount
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Supported formats: JPG, PNG, PDF (max 5MB)
              </Typography>
            </>
          )}
        </Box>
      </Paper>
      {(error || uploadError) && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error || uploadError}
        </Alert>
      )}
    </Box>
  );
};

export default FileUpload;