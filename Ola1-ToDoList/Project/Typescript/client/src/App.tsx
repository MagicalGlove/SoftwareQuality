import { useEffect, useState } from "react";
import { getAllTasksAPI } from "./api/tasks";
import { Task } from "./types/tasks";
import { deleteTask } from "./utils/deleteTask";
import TaskItem from "./components/TaskItem";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>();

  const fetchTasks = async () => {
    try {
      const tasks = await getAllTasksAPI();
      console.log("Tasks:", tasks);
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleButtonClick(id: number): Promise<void> {
    try {
      await deleteTask(id);
      console.log("Task deleted:", id);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  return (
    <div className="App">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          padding: "20px",
        }}
      >
        {tasks?.map((task, index) => (
          <TaskItem key={index} task={task} onDelete={handleButtonClick} />
        ))}
      </div>
    </div>
  );
};

export default App;
