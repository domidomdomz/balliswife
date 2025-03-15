import axios from 'axios';
import { IRepository } from '../core/interfaces/IRepository';

const BASE_URL = 'https://api.balldontlie.io/v1';

export class BallDontLieRepository implements IRepository {
    async getAllGames(params: { startDate?: string; endDate?: string; page?: number } = {}): Promise<any> {
        try {
            console.log('Query Parameters:', {
                start_date: params.startDate,
                end_date: params.endDate,
                page: params.page,
            });
            console.log('BALLDONTLIE_API_KEY:', process.env.BALLDONTLIE_API_KEY);
            const response = await axios.get(`${BASE_URL}/games`, {
                params: {
                    start_date: params.startDate,
                    end_date: params.endDate
                },
                headers: {
                    'Authorization': `${process.env.BALLDONTLIE_API_KEY}`,
                },
            });

            if (response.status === 404 || response.data.data.length === 0) {
                console.warn('No games found for the specified date range.');
                return { data: [], message: 'No games found.' };
            }

            return response.data;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    }

    //async getGamesByDate(date: string): Promise<any> {
    //    const response = await axios.get(`${BASE_URL}/games`, { params: { dates: [date] } });
    //    return response.data;
    //}

    async getTeams(): Promise<any> {
        const response = await axios.get(`${BASE_URL}/teams`);
        return response.data;
    }

    async getPlayers(page: number, perPage: number): Promise<any> {
        const response = await axios.get(`${BASE_URL}/players`, { params: { page, per_page: perPage } });
        return response.data;
    }
}
