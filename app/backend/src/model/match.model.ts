// import MatchModel from '../database/models/MatchModel';
// import { MatchModelInterface } from '../Interfaces/matches/MatchModelInterface';
// import { IMatch } from '../Interfaces/matches/IMatch';
// import TeamsModels from '../database/models/TeamsModel';

// const homeTeam = { as: 'homeTeam', attributes: ['teamName'] };
// const awayTeam = { as: 'awayTeam', attributes: ['teamName'] };

// export default class MatchesModel implements MatchModelInterface {
//   private model = MatchModel;

//   async findAll(inProgress?: boolean): Promise<IMatch[]> {
//     if (inProgress === undefined) {
//       const matches = await this.model.findAll({
//         include: [
//           { model: TeamsModels, ...homeTeam },
//           { model: TeamsModels, ...awayTeam },
//         ],
//       });
//       return matches;
//     }

//     const matches = await this.model.findAll({
//       where: { inProgress },
//       include: [
//         { model: TeamsModels, ...homeTeam },
//         { model: TeamsModels, ...awayTeam },
//       ],
//     });

//     return matches;
//   }
// }
