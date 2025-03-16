import { Request, Response } from 'express';
import { GetAllGames } from '../usecases/GetAllGames';
import { BallDontLieRepository } from '../data/BallDontLieRepository';
import { mapGameData } from '../core/utils/GameMapper';
import { sortGames } from '../core/utils/GameSorter';

const repository = new BallDontLieRepository();
const getAllGamesUseCase = new GetAllGames(repository);

export const getAllGames = async (req: Request, res: Response) => {
    const { startDate, endDate, page } = req.query as { startDate?: string; endDate?: string; page?: string };

    try {
        // Execute the use case to fetch raw game data
        const rawGames = await getAllGamesUseCase.execute(
            startDate,
            endDate,
            page ? parseInt(page) : undefined
        );

        // Map raw game data into structured Game entities
        const games = sortGames(rawGames.data.map(mapGameData));

        // Send the mapped games to the client
        res.status(200).json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Error fetching games');
    }
};
