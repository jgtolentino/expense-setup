import React from 'react';
import { Grid, TextField, MenuItem, InputAdornment } from '@mui/material';

interface ExpenseDetailsProps {
  values: {
    particulars: string;
    client: string;
    ceNumber: string;
    category: string;
    amount: number;
  };
  onChange: (e: React.ChangeEvent<any>) => void;
  errors: {
    particulars?: string;
    client?: string;
    ceNumber?: string;
    category?: string;
    amount?: string;
  };
  disabled?: boolean;
}

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({
  values,
  onChange,
  errors,
  disabled = false
}) => {
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Particulars"
          name="particulars"
          value={values.particulars}
          onChange={onChange}
          error={Boolean(errors.particulars)}
          helperText={errors.particulars}
          multiline
          rows={3}
          disabled={disabled}
          placeholder="Describe the expense in detail..."
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Client"
          name="client"
          value={values.client}
          onChange={onChange}
          error={Boolean(errors.client)}
          helperText={errors.client}
          disabled={disabled}
          placeholder="Enter client name"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="CE Number"
          name="ceNumber"
          value={values.ceNumber}
          onChange={onChange}
          error={Boolean(errors.ceNumber)}
          helperText={errors.ceNumber}
          disabled={disabled}
          placeholder="e.g., CE-2024-001"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          select
          label="Category"
          name="category"
          value={values.category}
          onChange={onChange}
          error={Boolean(errors.category)}
          helperText={errors.category}
          disabled={disabled}
        >
          <MenuItem value="Meals">Meals</MenuItem>
          <MenuItem value="Transpo">Transportation</MenuItem>
          <MenuItem value="Miscellaneous">Miscellaneous</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="number"
          label="Amount"
          name="amount"
          value={values.amount}
          onChange={onChange}
          error={Boolean(errors.amount)}
          helperText={errors.amount}
          disabled={disabled}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">₱</InputAdornment>
            ),
          }}
        />
      </Grid>
    </>
  );
};

export default ExpenseDetails;