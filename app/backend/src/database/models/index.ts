import { Sequelize } from 'sequelize';
import * as config from '../config/database';
import Team from './TeamsModel';

const sequelize = new Sequelize(config)

export {
    Team
}

export default sequelize;
