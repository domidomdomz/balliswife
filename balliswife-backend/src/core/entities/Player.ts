import { Team } from './Team';

export class Player {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public position: string,
        public height: string,
        public weight: number,
        public jerseyNumber: string,
        public college: string,
        public country: string,
        public draftYear: number,
        public draftRound: number,
        public draftNumber: number,
        public team: Team // Nested Team entity
    ) { }
}
