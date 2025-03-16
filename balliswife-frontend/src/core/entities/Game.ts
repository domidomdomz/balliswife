import { Team } from './Team';

export class Game {
    constructor(
        public id: number,
        public date: string,
        public status: string, // e.g., "Final"
        public period: number, // Current quarter
        public time: string, // Remaining time or "Final"
        public homeTeamScore: number,
        public visitorTeamScore: number,
        public homeTeam: Team,
        public visitorTeam: Team
    ) {}
}
