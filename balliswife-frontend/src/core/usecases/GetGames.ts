import { Game } from '../entities/Game';
import { IRepository } from './IRepository';

export class GetGames {
    constructor(private repository: IRepository) {}

    async execute(startDate: string, endDate: string): Promise<Game[]> {
        return this.repository.getGames(startDate, endDate);
    }
}
