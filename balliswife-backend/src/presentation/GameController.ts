import { Request, Response } from 'express';
import { GetAllGames } from '../usecases/GetAllGames';
import { BallDontLieRepository } from '../data/BallDontLieRepository';

const repository = new BallDontLieRepository();
const getAllGamesUseCase = new GetAllGames(repository);

export const getAllGames = async (req: Request, res: Response) => {
    const { startDate, endDate, page } = req.query as { startDate?: string; endDate?: string; page?: string };
    try {
        const games = await getAllGamesUseCase.execute(startDate, endDate, page ? parseInt(page) : undefined);
        res.status(200).json(games);
    } catch (error) {
        res.status(500).send('Error fetching games');
    }
};
