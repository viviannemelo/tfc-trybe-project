import {
  DataTypes,
  Model,
} from 'sequelize';
import db from '.';

export interface UserAttributes {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> {
  declare id: number;
  declare teamName: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  timestamps: false,
  modelName: 'users',
  sequelize: db,
});

export default User;
