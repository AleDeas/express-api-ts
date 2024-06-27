import { Sequelize } from 'sequelize';
import config from '../src/config/config.json';

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;
