import express, { Request, Response } from 'express';
import { AppDataSource } from './ormconfig';
import { createTask, deleteTask, getAllTasks } from './db_functions/taskRepository';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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

      app.post('/tasks', async (req: Request, res: Response) => {
        try {
          const { text } = req.body;
          const tasks = await createTask(text);
          res.json(tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          res.status(500).json({ error: 'An error occurred while fetching tasks' });
        }
      });

      app.delete('/tasks', async (req: Request, res: Response) => {
        console.log(0);
        try {
          console.log(1);
          
          const { id } = req.body;
          console.log(id);
          const tasks = await deleteTask(id);
          console.log(3);
          res.json(tasks);
        } catch (error) {
          console.error('Error deleting task:', error);
          console.log(4);
          res.status(500).json({ error: 'An error occurred while deleting task' });
        }
      });
      
      
      app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
      });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

