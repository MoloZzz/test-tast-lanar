require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASS),
    database: process.env.POSTGRES_DB_NAME,
    port: Number(process.env.POSTGRES_PORT),
    models: [path.resolve(__dirname, 'src/common/sequelize/models/**/*.model.ts')],
    migrations: [path.resolve(__dirname, 'src/common/sequelize/migrations/*.ts')],
  },
};
