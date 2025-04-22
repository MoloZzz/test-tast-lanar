import { Sequelize } from 'sequelize-typescript';
import { readdirSync } from 'fs';
import { join } from 'path';

const modelsPath = join(__dirname);
const modelFiles = readdirSync(modelsPath).filter((file) => file.endsWith('.model.ts'));

const models = modelFiles.map((file) => require(join(modelsPath, file)).default);

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DB_NAME,
    models,
});
