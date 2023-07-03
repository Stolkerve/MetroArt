import { useState } from 'react';
import Calendar from 'react-calendar';

export const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  }

  return (
    <div className="flex justify-center min-h-screen min-w-screen mt-10 h-full w-full">
      <h2>Selecciona una fecha:</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}