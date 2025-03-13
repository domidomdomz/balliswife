import axios from 'axios';
import { IRepository } from '../core/interfaces/IRepository';

const BASE_URL = 'https://www.balldontlie.io/api/v1';

export class BallDontLieRepository implements IRepository {
    async getGamesByDate(date: string): Promise<any> {
        const response = await axios.get(`${BASE_URL}/games`, { params: { dates: [date] } });
        return response.data;
    }

    async getTeams(): Promise<any> {
        const response = await axios.get(`${BASE_URL}/teams`);
        return response.data;
    }

    async getPlayers(page: number, perPage: number): Promise<any> {
        const response = await axios.get(`${BASE_URL}/players`, { params: { page, per_page: perPage } });
        return response.data;
    }
}
