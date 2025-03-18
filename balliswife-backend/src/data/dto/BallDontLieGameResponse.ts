import { Game } from '../../core/entities/Game';

export interface BallDontLieGameResponse {
    data: Game[];
    meta: {
        total_pages: number;
        current_page: number;
        [key: string]: any; // Add this for other optional meta fields
    };
}