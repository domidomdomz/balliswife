import { Team } from './Team';

export class Game {
    constructor(
        public id: number,
        public date: string,
        public season: number,
        public status: string, // Status like "Final" or "In Progress"
        public period: number, // Current quarter or period
        public time: string, // Time remaining or "Final"
        public postseason: boolean,
        public homeTeamScore: number,
        public visitorTeamScore: number,
        public dateTime: Date, // Date and time of the game
        public homeTeam: Team, // Reference to home team
        public visitorTeam: Team // Reference to visitor team
    ) { }
}
