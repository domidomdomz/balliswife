import axios from 'axios';
import { IRepository } from '../core/usecases/IRepository';
import { Game } from '../core/entities/Game';

export class BallDontLieRepository implements IRepository {
    private BASE_URL = 'http://localhost:5000/api';

    async getGames(startDate: string, endDate: string): Promise<Game[]> {
        const response = await axios.get(`${this.BASE_URL}/games`, {
            params: { startDate, endDate },
        });

        // Map API data to Game entity
        return response.data.map((gameData: any) => {
            return new Game(
                gameData.id,
                gameData.date,
                gameData.status,
                gameData.period,
                gameData.time,
                gameData.homeTeamScore,
                gameData.visitorTeamScore,
                gameData.homeTeam,
                gameData.visitorTeam
            );
        });
    }
}
