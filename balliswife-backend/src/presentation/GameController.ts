import { Request, Response } from 'express';
import { GetAllGames } from '../usecases/GetAllGames';
import { BallDontLieRepository } from '../data/repositories/BallDontLieRepository';
import { mapGameData } from '../core/utils/GameMapper';
import { sortGames } from '../core/utils/GameSorter';

const repository = new BallDontLieRepository();
const getAllGamesUseCase = new GetAllGames(repository);

export const getAllGames = async (req: Request, res: Response) => {
    const { startDate, endDate, page } = req.query as { startDate?: string; endDate?: string; page?: string };

    try {
        // Fetch cached and ongoing games
        const { cacheableGames, ongoingGames } = await getAllGamesUseCase.execute(
            startDate,
            endDate,
            page ? parseInt(page) : undefined
        );

        // Map raw game data into structured Game entities
        const allGames = sortGames([
            ...cacheableGames.map(mapGameData),
            ...ongoingGames.map(mapGameData),
        ]);

        // Send the mapped games to the client
        res.status(200).json(allGames);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Error fetching games');
    }
};
