import React, { useEffect, useState, useRef } from 'react';
import GameList from './presentation/GameList';
import { BallDontLieRepository } from './infrastructure/BallDontLieRepository';
import { Game } from './core/entities/Game';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import DaysTicker from './components/DaysTicker';
import './App.css'; // Add any custom styles here
import 'bootstrap-icons/font/bootstrap-icons.css';

const App = () => {
    const [games, setGames] = useState<Game[]>([]); // Explicitly set the type to Game[]
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default to today

    const repository = new BallDontLieRepository();

    // Ref for controlling the DatePicker
    const datePickerRef = useRef<any>(null);

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);

            const formattedDate = format(selectedDate, 'yyyy-MM-dd'); // Format the date as 'yyyy-MM-dd'
            try {
                const data = await repository.getGames(formattedDate, formattedDate);
                setGames(data); // Now TypeScript knows that data matches the type Game[]
            } catch (error) {
                console.error('Error fetching games:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [selectedDate]); // Re-fetch games when the selected date changes

    return (
        <div className="bg-light min-vh-100">
            <header className="bg-primary text-white text-center py-4">
                {/* NBA Logo */}
                <img
                    src="https://cdn.nba.com/logos/leagues/logo-nba.svg"
                    alt="NBA Logo"
                    style={{ height: '60px' }}
                />
                <h1 className="fw-bold">Games & Scores</h1>
            </header>

            {/* Date Picker and Days Ticker */}
            <div className="d-flex justify-content-center align-items-center mb-4">
                {/* Minimal Date Picker */}
                <div className="position-relative">
                    <button
                        className="btn btn-light border rounded-circle calendar-icon-btn"
                        type="button"
                        onClick={() => datePickerRef.current?.setOpen(true)} // Trigger DatePicker popup
                    >
                        <i className="bi bi-calendar3"></i> {/* Using Bootstrap Icons */}
                    </button>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date: Date | null) => date && setSelectedDate(date)}
                        dateFormat="yyyy-MM-dd"
                        ref={datePickerRef} // Attach the ref to DatePicker
                        className="invisible-date-picker" // Custom class to hide the textbox
                        popperPlacement="bottom" // Ensure calendar popup is correctly placed
                    />
                </div>

                {/* Days of the Week Ticker */}
                <DaysTicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </div>

            {/* Display Games */}
            {loading ? (
                <p className="text-center">Loading games...</p>
            ) : (
                <GameList games={games} />
            )}
        </div>
    );
};

export default App;