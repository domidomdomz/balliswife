export class Team {
    constructor(
        public id: number,
        public conference: string,
        public division: string,
        public city: string,
        public name: string,
        public fullName: string,
        public abbreviation: string
    ) { }
}
