import React from 'react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, subWeeks, addWeeks } from 'date-fns';

interface DaysTickerProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const DaysTicker: React.FC<DaysTickerProps> = ({ selectedDate, onDateChange }) => {
    // Get the start and end of the current week (Sunday to Saturday)
    const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 0 }); // Week starts on Sunday
    const endOfCurrentWeek = endOfWeek(selectedDate, { weekStartsOn: 0 });

    // Generate all dates of the current week
    const daysOfWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });

    // Handle the click for the previous week
    const handlePreviousWeek = () => {
        const newDate = subWeeks(selectedDate, 1); // Subtract 1 week
        onDateChange(newDate);
    };

    // Handle the click for the next week
    const handleNextWeek = () => {
        const newDate = addWeeks(selectedDate, 1); // Add 1 week
        onDateChange(newDate);
    };

    // Handle individual day click
    const handleDayClick = (day: Date) => {
        onDateChange(day);
    };

    return (
        <div className="d-flex align-items-center">
            {/* Previous Week Arrow */}
            <button
                className="btn btn-light"
                onClick={handlePreviousWeek}
            >
                <i className="bi bi-arrow-left"></i> {/* Left Arrow Icon */}
            </button>

            {/* Days of the Current Week */}
            <div className="d-flex justify-content-center flex-grow-1">
                {daysOfWeek.map((day) => (
                    <div
                        key={day.toISOString()}
                        className={`day-box text-center mx-1 ${
                            format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') ? 'selected' : ''
                        }`}
                        onClick={() => handleDayClick(day)}
                    >
                        <div className="day">{format(day, 'EEE')}</div> {/* Day (e.g., Mon, Tue) */}
                        <div className="date">{format(day, 'd')}</div> {/* Date */}
                    </div>
                ))}
            </div>

            {/* Next Week Arrow */}
            <button
                className="btn btn-light"
                onClick={handleNextWeek}
            >
                <i className="bi bi-arrow-right"></i> {/* Right Arrow Icon */}
            </button>
        </div>
    );
};

export default DaysTicker;
