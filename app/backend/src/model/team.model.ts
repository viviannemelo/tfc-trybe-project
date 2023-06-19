import Team from '../database/models/TeamsModel';
// import TeamsModelInterface from '../Interfaces/teams/TeamsModelInterface';
import ITeams from '../Interfaces/teams/ITeams';

class TeamsModel {
  private model = Team;
  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: ITeams = dbData;
    return { id, teamName };
  }
}
export default TeamsModel;
