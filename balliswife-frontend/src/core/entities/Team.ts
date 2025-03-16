export class Team {
    constructor(
        public id: number,
        public name: string,
        public abbreviation: string,
        public fullName: string,
        public conference: string,
        public division: string,
        public logoUrl: string // URL for the team logo
    ) {}
}
