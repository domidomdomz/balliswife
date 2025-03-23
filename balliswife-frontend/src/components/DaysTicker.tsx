import React, { useRef } from 'react';
import DatePicker from 'react-datepicker';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, subWeeks, addWeeks } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface DaysTickerProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const DaysTicker: React.FC<DaysTickerProps> = ({ selectedDate, onDateChange }) => {
    // Get the start and end of the current week (Sunday to Saturday)
    const startOfCurrentWeek = startOfWeek(selectedDate, { weekStartsOn: 0 });
    const endOfCurrentWeek = endOfWeek(selectedDate, { weekStartsOn: 0 });

    // Generate all dates of the current week
    const daysOfWeek = eachDayOfInterval({ start: startOfCurrentWeek, end: endOfCurrentWeek });

    // Handle the click for the previous week
    const handlePreviousWeek = () => {
        const previousWeek = subWeeks(selectedDate, 1); // Go back 1 week
        const previousSunday = startOfWeek(previousWeek, { weekStartsOn: 0 }); // Move to the Sunday of that week
        onDateChange(previousSunday); // Update the selected date to the Sunday
    };

    // Handle the click for the next week
    const handleNextWeek = () => {
        const nextWeek = addWeeks(selectedDate, 1); // Go forward 1 week
        const nextSunday = startOfWeek(nextWeek, { weekStartsOn: 0 }); // Move to the Sunday of that week
        onDateChange(nextSunday); // Update the selected date to the Sunday
    };

    // Handle individual day click
    const handleDayClick = (day: Date) => {
        onDateChange(day);
    };

    // Reference to control DatePicker
    const datePickerRef = useRef<any>(null);

    return (
        <div className="days-ticker">
            {/* Month and Year Row with Calendar Icon */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <button
                    className="btn btn-light btn-sm d-inline-flex align-items-center"
                    onClick={handlePreviousWeek}
                    aria-label="Previous Week"
                >
                    <i className="bi bi-arrow-left"></i> {/* Left Arrow Icon */}
                </button>
                <div className="month-year-label text-center flex-grow-1">
                    {format(selectedDate, 'MMMM yyyy')} {/* Month and Year */}
                </div>
                <div className="position-relative">
                    <button
                        className="btn btn-light btn-sm d-inline-flex align-items-center"
                        onClick={() => datePickerRef.current?.setOpen(true)} // Open DatePicker
                        aria-label="Open Calendar"
                    >
                        <i className="bi bi-calendar3"></i> {/* Calendar Icon */}
                    </button>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => date && onDateChange(date)} // Handle Date Change
                        dateFormat="yyyy-MM-dd"
                        ref={datePickerRef} // Attach ref to DatePicker
                        popperPlacement="bottom" // Align calendar
                        popperModifiers={[]}
                        className="invisible-date-picker" // Custom style to hide the default input
                    />
                </div>
                <button
                    className="btn btn-light btn-sm d-inline-flex align-items-center"
                    onClick={handleNextWeek}
                    aria-label="Next Week"
                >
                    <i className="bi bi-arrow-right"></i> {/* Right Arrow Icon */}
                </button>
            </div>

            {/* Days of the Week */}
            <div className="d-flex justify-content-center">
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
        </div>
    );
};

export default DaysTicker;