import { useState } from 'react';
import Calendar from 'react-calendar';

export const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  return (
    <div>
      <h2>Selecciona una fecha:</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}