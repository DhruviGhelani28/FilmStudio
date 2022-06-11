import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default DatePicker = props => {

    const [value, setValue] = React.useState(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                disablefuture
                label="Date"
                openTo="year"
                views={['year', 'month', 'day']}
                value={value}
                onChange={
                    (newValue) => { setValue(newValue); }
                }
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}