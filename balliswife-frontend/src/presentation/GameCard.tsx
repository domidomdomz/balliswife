import React from 'react';
import { format } from 'date-fns';

const GameCard = ({ game }: { game: any }) => {
    // Check if the game has not started
    const isNotStarted = game.homeTeamScore === 0 && game.visitorTeamScore === 0 && game.period === 0;

    // Check if the game is finished
    const isFinal = game.status === "Final" || game.status === "Final/OT";

    // Determine overtime label
    const getOvertimeLabel = (period: number): string => {
        if (period === 5) return "OT"; // Only display "OT" for one overtime
        if (period > 5) return `OT${period - 4}`; // OT2, OT3, etc., for additional overtimes
        return ""; // Not in overtime
    };

    // Highlight the winning score
    const highlightWinner = (homeScore: number, visitorScore: number) => {
        if (homeScore > visitorScore) {
            return { homeScore: "fw-bold", visitorScore: "text-muted" }; // Home team wins
        } else if (visitorScore > homeScore) {
            return { visitorScore: "fw-bold", homeScore: "text-muted" }; // Visitor team wins
        }
        return { homeScore: "text-muted", visitorScore: "text-muted" }; // Tie case
    };

    const { homeScore: homeScoreClass, visitorScore: visitorScoreClass } = highlightWinner(
        game.homeTeamScore,
        game.visitorTeamScore
    );

    // Convert and format the start time to the local timezone
    const startTimeLocal = isNotStarted
        ? format(new Date(game.status), 'EEE, MMM d - hh:mm a') // Format: Day, Month Date - Time (AM/PM)
        : null;

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
                {/* Visitor Team */}
                <div className="team-card text-center flex-grow-1">
                    <img
                        src={game.visitorTeam.logoUrl}
                        alt={game.visitorTeam.fullName}
                        className="img-fluid mb-2"
                        style={{ height: '50px' }}
                    />
                    <p className="fw-bold">{game.visitorTeam.fullName}</p>
                    {isFinal ? (
                        <p className={`fs-4 ${visitorScoreClass}`}>{game.visitorTeamScore}</p>
                    ) : (
                        <p className="fs-4 fw-bold text-primary">{game.visitorTeamScore}</p>
                    )}
                </div>

                {/* Game Details */}
                <div className="game-details text-center my-3 my-md-0">
                    {isNotStarted ? (
                        <p className="text-muted">{startTimeLocal}</p>
                    ) : isFinal ? (
                        <p className="text-muted">{game.status} {getOvertimeLabel(game.period)}</p>
                    ) : (
                        <p className="text-muted">
                            {game.period >= 5 ? getOvertimeLabel(game.period) : `Quarter: ${game.period}`} | Time Remaining: {game.time || 'N/A'}
                        </p>
                    )}
                </div>

                {/* Home Team */}
                <div className="team-card text-center flex-grow-1">
                    <img
                        src={game.homeTeam.logoUrl}
                        alt={game.homeTeam.fullName}
                        className="img-fluid mb-2"
                        style={{ height: '50px' }}
                    />
                    <p className="fw-bold">{game.homeTeam.fullName}</p>
                    {isFinal ? (
                        <p className={`fs-4 ${homeScoreClass}`}>{game.homeTeamScore}</p>
                    ) : (
                        <p className="fs-4 fw-bold text-primary">{game.homeTeamScore}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameCard;