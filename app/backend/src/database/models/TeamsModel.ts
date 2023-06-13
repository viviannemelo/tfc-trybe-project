import {
    DataTypes,
    Model,
} from 'sequelize';
  import db from '.';

export interface TeamsAttributes {
  id: number;
  teamName: string;
}
  
class Team extends Model<TeamsAttributes>{
declare id: number;
declare teamName: string;
}
  
Team.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize: db,
    underscored: true,
    timestamps: false,
    modelName: 'Team',
  });
  
  /**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */
  
  // OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
  // OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
  
  // Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
  // Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
  
  export default Team;
  