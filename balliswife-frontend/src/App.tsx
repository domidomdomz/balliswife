import React, { useEffect, useState } from 'react';
import GameList from './presentation/GameList';
import { BallDontLieRepository } from './infrastructure/BallDontLieRepository';
import { Game } from './core/entities/Game';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import DaysTicker from './components/DaysTicker';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const EST_TIMEZONE = 'America/New_York';

const App = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date>(() => {
        const now = new Date();
        return toZonedTime(now, EST_TIMEZONE);
    });

    const repository = new BallDontLieRepository();

    useEffect(() => {
        document.title = 'Ball is Wife';
        const fetchGames = async () => {
            setLoading(true);
            const formattedDateInEST = formatInTimeZone(selectedDate, EST_TIMEZONE, 'yyyy-MM-dd');
            try {
                const data = await repository.getGames(formattedDateInEST, formattedDateInEST);
                setGames(data);
            } catch (error) {
                console.error('Error fetching games:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [selectedDate]);

    return (
        <div className="bg-light min-vh-100">
            <header className="bg-primary text-white text-center py-4">
                <img
                    src="https://cdn.nba.com/logos/leagues/logo-nba.svg"
                    alt="NBA Logo"
                    style={{ height: '60px' }}
                />
                <h1 className="fw-bold">Games & Scores</h1>
            </header>

            {/* Days Ticker */}
            <DaysTicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

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