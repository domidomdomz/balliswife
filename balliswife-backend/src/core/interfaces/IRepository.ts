export interface IRepository {
    getAllGames(params: { startDate?: string; endDate?: string; page?: number }): Promise<any>;
    //getGamesByDate(date: string): Promise<any>;
    getTeams(): Promise<any>;
    getPlayers(page: number, perPage: number): Promise<any>;
}
