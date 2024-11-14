import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, Paper, Typography, Box, Alert, CircularProgress, TextField } from '@mui/material';
import { ExpenseFormData } from '../types/expense';
import FileUpload from './FileUpload';
import ExpenseDetails from './ExpenseDetails';
import { format } from 'date-fns';

const validationSchema = Yup.object({
  date: Yup.date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future'),
  particulars: Yup.string()
    .required('Particulars are required')
    .min(10, 'Please provide more details (minimum 10 characters)'),
  client: Yup.string()
    .required('Client is required')
    .min(2, 'Client name is too short'),
  ceNumber: Yup.string()
    .required('CE Number is required')
    .matches(/^[A-Z0-9-]+$/, 'CE Number must contain only uppercase letters, numbers, and hyphens'),
  category: Yup.string()
    .oneOf(['Meals', 'Transpo', 'Miscellaneous'], 'Invalid category')
    .required('Category is required'),
  amount: Yup.number()
    .positive('Amount must be positive')
    .max(100000, 'Amount exceeds maximum limit')
    .required('Amount is required'),
  receipt: Yup.mixed().required('Receipt is required'),
});

interface ExpenseFormProps {
  onSubmit: (values: ExpenseFormData) => Promise<void>;
  initialValues?: Partial<ExpenseFormData>;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, initialValues }) => {
  const [submitError, setSubmitError] = useState<string>('');

  const formik = useFormik({
    initialValues: {
      date: new Date(),
      particulars: '',
      client: '',
      ceNumber: '',
      category: 'Meals' as const,
      amount: 0,
      receipt: null as File | null,
      ...initialValues,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitError('');
        await onSubmit(values);
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Failed to submit expense');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleReceiptData = (data: { date?: Date; amount?: number }) => {
    console.log('Received OCR data:', data);
    if (data.date) {
      formik.setFieldValue('date', data.date);
    }
    if (typeof data.amount === 'number' && !isNaN(data.amount)) {
      formik.setFieldValue('amount', data.amount);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Expense Submission
      </Typography>
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Receipt Upload
              </Typography>
              <FileUpload
                onFileSelect={(file) => formik.setFieldValue('receipt', file)}
                onExtractData={handleReceiptData}
                error={formik.errors.receipt as string}
                value={formik.values.receipt}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              label="Date"
              name="date"
              value={format(formik.values.date, 'yyyy-MM-dd')}
              onChange={(e) => formik.setFieldValue('date', new Date(e.target.value))}
              error={Boolean(formik.errors.date)}
              helperText={formik.errors.date}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <ExpenseDetails
            values={{
              particulars: formik.values.particulars,
              client: formik.values.client,
              ceNumber: formik.values.ceNumber,
              category: formik.values.category,
              amount: formik.values.amount,
            }}
            onChange={formik.handleChange}
            errors={formik.errors}
            disabled={formik.isSubmitting}
          />
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={formik.isSubmitting}
              startIcon={formik.isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit Expense'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ExpenseForm;