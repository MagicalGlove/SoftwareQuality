import { DataSource } from 'typeorm';
import { Task} from './entities/Task';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../config.env') });

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  database: 'sqOla1',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: true,
  entities: [Task],
});