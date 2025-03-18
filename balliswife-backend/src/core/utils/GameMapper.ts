import { Game } from '../entities/Game';
import { Team } from '../entities/Team';

export const mapGameData = (gameData: any): Game => {
    // Map home team
    const homeTeam = new Team(
        gameData.home_team.id,
        gameData.home_team.conference,
        gameData.home_team.division,
        gameData.home_team.city,
        gameData.home_team.name,
        gameData.home_team.full_name,
        gameData.home_team.abbreviation,
        getTeamLogoById(gameData.home_team.id)
    );

    // Map visitor team
    const visitorTeam = new Team(
        gameData.visitor_team.id,
        gameData.visitor_team.conference,
        gameData.visitor_team.division,
        gameData.visitor_team.city,
        gameData.visitor_team.name,
        gameData.visitor_team.full_name,
        gameData.visitor_team.abbreviation,
        getTeamLogoById(gameData.visitor_team.id)
    );

    // Map the game entity
    return new Game(
        gameData.id,
        gameData.date,
        gameData.season,
        gameData.status,
        gameData.period,
        gameData.time,
        gameData.postseason,
        gameData.home_team_score,
        gameData.visitor_team_score,
        new Date(gameData.datetime),
        homeTeam,
        visitorTeam
    );
};

export const getTeamLogoById = (id: number): string => {
    return teamLogos[id] || "https://via.placeholder.com/50"; // Default placeholder if team ID is not found
};


export const teamLogos: { [id: number]: string } = {
    1: "https://cdn.nba.com/logos/nba/1610612737/global/L/logo.svg", // Atlanta Hawks
    2: "https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg", // Boston Celtics
    3: "https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg", // Brooklyn Nets
    4: "https://cdn.nba.com/logos/nba/1610612766/global/L/logo.svg", // Charlotte Hornets
    5: "https://cdn.nba.com/logos/nba/1610612741/global/L/logo.svg", // Chicago Bulls
    6: "https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg", // Cleveland Cavaliers
    7: "https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg", // Dallas Mavericks
    8: "https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg", // Denver Nuggets
    9: "https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg", // Detroit Pistons
    10: "https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg", // Golden State Warriors
    11: "https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg", // Houston Rockets
    12: "https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg", // Indiana Pacers
    13: "https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg", // Los Angeles Clippers
    14: "https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg", // Los Angeles Lakers
    15: "https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg", // Memphis Grizzlies
    16: "https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg", // Miami Heat
    17: "https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg", // Milwaukee Bucks
    18: "https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg", // Minnesota Timberwolves
    19: "https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg", // New Orleans Pelicans
    20: "https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg", // New York Knicks
    21: "https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg", // Oklahoma City Thunder
    22: "https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg", // Orlando Magic
    23: "https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg", // Philadelphia 76ers
    24: "https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg", // Phoenix Suns
    25: "https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg", // Portland Trail Blazers
    26: "https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg", // Sacramento Kings
    27: "https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg", // San Antonio Spurs
    28: "https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg", // Toronto Raptors
    29: "https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg", // Utah Jazz
    30: "https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg", // Washington Wizards
};
