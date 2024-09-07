import express, { Request, Response } from 'express';
import { AppDataSource } from './ormconfig';
import { getAllTasks } from './db_functions/taskRepository';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    app.get('/tasks', async (req: Request, res: Response) => {
        try {
          const tasks = await getAllTasks();
          res.json(tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          res.status(500).json({ error: 'An error occurred while fetching tasks' });
        }
      });
      
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

