import { Team } from './Team';

export class Game {
    constructor(
        public id: number,
        public date: string,
        public season: number,
        public status: string,
        public period: number,
        public time: string,
        public postseason: boolean,
        public homeTeamScore: number,
        public visitorTeamScore: number,
        public homeTeam: Team, // Nested Team entity
        public visitorTeam: Team // Nested Team entity
    ) { }
}
