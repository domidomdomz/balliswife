import axios from 'axios';
import NodeCache from 'node-cache';
import { IRepository } from '../core/interfaces/IRepository';
import { Game } from '../core/entities/Game';

const BASE_URL = 'https://api.balldontlie.io/v1';
const cache = new NodeCache({ stdTTL: 600 }); // Cache valid for 10 minutes

export interface BallDontLieGameResponse {
    data: Game[];
    meta: {
        total_pages: number;
        current_page: number;
        [key: string]: any; // Add this for other optional meta fields
    };
}

export class BallDontLieRepository implements IRepository {
    async getAllGames(params: { startDate?: string; endDate?: string; page?: number } = {}): Promise<any> {
        const cacheKey = `games-${params.startDate}-${params.endDate}`; // Unique cache key

        // Check if cached games exist (only cacheable games)
        const cachedGames = cache.get<Game[]>(cacheKey);

        let cacheableGames = [];
        if (cachedGames) {
            console.log('Cache hit:', cacheKey);
            cacheableGames = cachedGames; // Retrieve cached games
        } else {
            console.log('Cache miss:', cacheKey);
            try {
                const response = await axios.get<BallDontLieGameResponse>(`${BASE_URL}/games`, {
                    params: {
                        start_date: params.startDate,
                        end_date: params.endDate,
                    },
                    headers: {
                        'Authorization': `${process.env.BALLDONTLIE_API_KEY}`,
                    },
                });

                // Validate and parse response
                if (response.status === 404 || !response.data || response.data === null) {
                    console.warn('No games found for the specified date range.');
                    return { cacheableGames: [], ongoingGames: [] };
                }

                const games: Game[] = response.data.data;

                // Separate cacheable and ongoing games
                cacheableGames = games.filter(game => game.status === "Final" || game.period === 0);
                cache.set(cacheKey, cacheableGames); // Cache only cacheable games
            } catch (error) {
                console.error('Error fetching games:', error);
                throw error;
            }
        }

        // Fetch and refresh ongoing games
        const ongoingGames = await this.refreshOngoingGames(params);

        // Return both cached games and refreshed ongoing games
        return {
            cacheableGames,
            ongoingGames,
        };
    }

    /**
     * Refresh ongoing games (those not cached).
     */
    private async refreshOngoingGames(params: { startDate?: string; endDate?: string }): Promise<Game[]> {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

        // Skip API call if the date is not today
        if (params.startDate !== today && params.endDate !== today) {
            console.log('Skipping API call for ongoing games because the date is not today');
            return []; // Return an empty array or cached ongoing games if needed
        }

        console.log('Fetching ongoing games for today...');
        try {
            const response = await axios.get<BallDontLieGameResponse>(`${BASE_URL}/games`, {
                params: {
                    start_date: params.startDate,
                    end_date: params.endDate,
                },
                headers: {
                    'Authorization': `${process.env.BALLDONTLIE_API_KEY}`,
                },
            });

            const games: Game[] = response.data.data;
            const ongoingGames = games.filter(game => game.period > 0 && game.status !== "Final");

            console.log('Refreshed ongoing games:', ongoingGames);
            return ongoingGames;
        } catch (error) {
            console.error('Error refreshing ongoing games:', error);
            return [];
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
