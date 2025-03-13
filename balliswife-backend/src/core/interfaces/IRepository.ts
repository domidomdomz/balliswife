export interface IRepository {
    getGamesByDate(date: string): Promise<any>;
    getTeams(): Promise<any>;
    getPlayers(page: number, perPage: number): Promise<any>;
}
