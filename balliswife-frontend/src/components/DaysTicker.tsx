import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';

const DaysTicker = ({ selectedDate, onDateChange }: { selectedDate: Date; onDateChange: (date: Date) => void }) => {
    const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
        addDays(startOfWeek(selectedDate, { weekStartsOn: 1 }), i) // Week starts on Monday
    );

    return (
        <div className="d-flex justify-content-center ml-3">
            {daysOfWeek.map(day => (
                <button
                    key={day.toISOString()}
                    className={`btn btn-sm mx-1 ${format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => onDateChange(day)}
                >
                    {format(day, 'EEE')} <br /> {format(day, 'MMM d')}
                </button>
            ))}
        </div>
    );
};

export default DaysTicker;
