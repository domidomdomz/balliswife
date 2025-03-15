import { IRepository } from '../core/interfaces/IRepository';

export class GetAllGames {
    constructor(private repository: IRepository) { }

    async execute(startDate?: string, endDate?: string, page?: number): Promise<any> {
        return this.repository.getAllGames({ startDate, endDate, page });
    }
}
