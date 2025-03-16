import { compareAsc } from 'date-fns';

interface Game {
    id: number;
    period: number;
    status: string;
    time: string | null;
}

// Helper to parse remaining time (e.g., "10:23") into numeric seconds
const parseRemainingTime = (time: string | null): number => {
    if (!time) return Infinity; // Treat games with no remaining time as lowest priority
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds; // Convert to seconds
};

// Sorting function
export const sortGames = (games: Game[]): Game[] => {
    // Separate games into categories
    const ongoingGames = games.filter(game => game.period > 0 && game.status !== "Final" && game.status !== "Final/OT");
    const notStartedGames = games.filter(game => game.period === 0 && game.status !== "Final" && game.status !== "Final/OT");
    const finishedGames = games.filter(game => game.status === "Final" || game.status === "Final/OT");

    // Sort ongoing games by least time remaining
    ongoingGames.sort((a, b) => {
        const timeA = parseRemainingTime(a.time);
        const timeB = parseRemainingTime(b.time);
        return timeA - timeB;
    });

    // Sort not started games by their start schedule (ISO datetime in `status`)
    notStartedGames.sort((a, b) => new Date(a.status).getTime() - new Date(b.status).getTime());

    finishedGames.sort((a, b) => a.id - b.id);

    // Combine sorted categories
    return [...ongoingGames, ...notStartedGames, ...finishedGames];
};
