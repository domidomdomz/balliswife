import { IRepository } from '../core/interfaces/IRepository';

export class GetGamesByDate {
    constructor(private repository: IRepository) { }

    async execute(date: string): Promise<any> {
        return this.repository.getGamesByDate(date);
    }
}
