import 'date-fns';
import React, { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DatePicker(props) {

  const [selectedDate, setSelectedDate] = React.useState(Date.now());

  useEffect(() => {
    setSelectedDate(props.vacationDate)
  },[props.vacationDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
    props.changeDate(date)
  };


  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        minDate={props.minimalDate || Date.now()}
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={props.dateLabel}
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
