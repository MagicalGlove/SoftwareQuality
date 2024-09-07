import express, { Request, Response } from "express";
import { AppDataSource } from "./ormconfig";
import {
  changeCompleteStateTask,
  createTask,
  deleteTask,
  getAllTasks,
} from "./db_functions/taskRepository";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.get("/tasks", async (req: Request, res: Response) => {
      try {
        const tasks = await getAllTasks();
        res.json(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching tasks" });
      }
    });

    app.post("/tasks", async (req: Request, res: Response) => {
      try {
        const { text, deadline, isCompleted } = req.body;
        const task = await createTask(text, deadline, isCompleted);
        res.json(task);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res
          .status(500)
          .json({ error: "An error occurred while fetching tasks" });
      }
    });

    app.delete("/tasks", async (req: Request, res: Response) => {
      try {
        const { id } = req.body;
        const tasks = await deleteTask(id);
        res.json(tasks);
      } catch (error) {
        console.error("Error deleting task:", error);

        res
          .status(500)
          .json({ error: "An error occurred while deleting task" });
      }
    });

    app.patch("/tasks", async (req: Request, res: Response) => {
      try {
        const { id, isCompleted } = req.body;
        const tasks = await changeCompleteStateTask(id, isCompleted);
        res.json(tasks);
      } catch (error) {
        console.error("Error deleting task:", error);

        res
          .status(500)
          .json({ error: "An error occurred while deleting task" });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
