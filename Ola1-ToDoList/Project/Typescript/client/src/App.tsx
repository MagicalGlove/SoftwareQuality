import { useEffect, useState } from "react";
import { getAllTasksAPI } from "./api/tasks";
import { Task } from "./types/tasks";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>()
  const fetchTasks = async () => {
    try {
      const tasks = await getAllTasksAPI();
      console.log('Tasks:', tasks);
      setTasks(tasks)
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks()
  }, []);

  return (
    <div className="App">
    {tasks?.map((task) => <>{task.text}</>)}
    </div>
  );
}

export default App;
