import {
  DataTypes,
  Model,
} from 'sequelize';
import db from '.';

export interface TeamsAttributes {
  id: number;
  teamName: string;
}

class Team extends Model<TeamsAttributes> {
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
  // underscored: true,
  modelName: 'teams',
  timestamps: false,
});

export default Team;
