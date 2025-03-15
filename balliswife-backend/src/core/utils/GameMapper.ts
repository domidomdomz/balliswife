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
        gameData.home_team.abbreviation
    );

    // Map visitor team
    const visitorTeam = new Team(
        gameData.visitor_team.id,
        gameData.visitor_team.conference,
        gameData.visitor_team.division,
        gameData.visitor_team.city,
        gameData.visitor_team.name,
        gameData.visitor_team.full_name,
        gameData.visitor_team.abbreviation
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
        homeTeam,
        visitorTeam
    );
};
