import React from 'react';
import GameCard from './GameCard';

const GameList = ({ games }: { games: any[] }) => (
    <div className="container py-4">
        {games.map((game) => (
            <GameCard key={game.id} game={game} />
        ))}
    </div>
);

export default GameList;