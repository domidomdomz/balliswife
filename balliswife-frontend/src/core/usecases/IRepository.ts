import { Game } from '../entities/Game';

export interface IRepository {
    getGames(startDate: string, endDate: string): Promise<Game[]>;
}
