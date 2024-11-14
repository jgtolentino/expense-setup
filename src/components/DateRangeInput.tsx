import React from 'react';
import { Grid, TextField } from '@mui/material';
import { format } from 'date-fns';

interface DateRangeInputProps {
  fromDate: Date;
  toDate: Date;
  onFromDateChange: (date: Date) => void;
  onToDateChange: (date: Date) => void;
  errors?: {
    from?: string;
    to?: string;
  };
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  errors
}) => {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="date"
          label="From Date"
          value={format(fromDate, 'yyyy-MM-dd')}
          onChange={(e) => onFromDateChange(new Date(e.target.value))}
          error={Boolean(errors?.from)}
          helperText={errors?.from}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          type="date"
          label="To Date"
          value={format(toDate, 'yyyy-MM-dd')}
          onChange={(e) => onToDateChange(new Date(e.target.value))}
          error={Boolean(errors?.to)}
          helperText={errors?.to}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default DateRangeInput;