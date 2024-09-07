import { useEffect, useState } from "react";
import { getAllTasksAPI } from "./api/tasks";
import { Task } from "./types/tasks";
import { deleteTask } from "./utils/deleteTask";
import { addTask } from "./utils/addTask";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [text, setText] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const tasks = await getAllTasksAPI();
      console.log("Tasks:", tasks);
      setTasks(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = () => {
    const newTask: Task = {
      text: text,
      isCompleted: false,
      ...(deadline && { deadline: deadline }),
    };
    addTask(newTask);
    setText("");
    setDeadline("");
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
      <div className="container">
        <div className="header">
          <input
            type="text"
            placeholder="Task Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            placeholder="Task Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="input-field"
          />
          <button className="add-task-button" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
        <div className="table-container">
          <table className="table-content">
            <thead>
              <tr>
                <th className="table-cell table-cell-header">Text</th>
                <th className="table-cell table-cell-header">Deadline</th>
                <th className="table-cell table-cell-header">Completed</th>
                <th className="table-cell table-cell-header">Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task) => (
                <tr key={task.id}>
                  <td className="table-cell">{task.text}</td>
                  <td className="table-cell">{task.deadline || "-"}</td>
                  <td className="table-cell">
                    {task.isCompleted ? "Yes" : "No"}
                  </td>
                  <td className="table-cell">{task.deadline || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
