import { useEffect, useState } from "react";
import { getAllTasksAPI } from "./api/tasks";
import { Task } from "./types/tasks";
import { deleteTask } from "./utils/deleteTask";
import { completedTask } from "./utils/completedTask";
import { addTask } from "./utils/addTask";
import "./App.css";
import checkmark from "./misc/Checkmark.png";
import xMark from "./misc/X-Mark.png";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const [text, setText] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

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
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleButtonClick(id: string | undefined): Promise<void> {
    if (!id) return;
    try {
      await deleteTask(id);
      console.log("Task deleted:", id);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  async function handleImageClick(
    id: string | undefined,
    isCompleted: boolean | undefined
  ): Promise<void> {
    if (!id || typeof isCompleted !== "boolean") return;
    try {
      await completedTask(id, isCompleted);
      console.log("Task completed/uncompleted:", id);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  const handleTabChange = (category: number) => {
    setSelectedCategory(category);
  };

  const filteredTasks = selectedCategory === 0 
    ? tasks 
    : tasks?.filter(task => task.category === selectedCategory);

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
        <div className="tabs">
          <button onClick={() => handleTabChange(0)}>All</button>
          <button onClick={() => handleTabChange(1)}>Work</button>
          <button onClick={() => handleTabChange(2)}>Chores</button>
          <button onClick={() => handleTabChange(3)}>Leisure</button>
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
              {filteredTasks?.map((task) => (
                <tr key={task.id}>
                  <td className="table-cell">{task.text}</td>
                  <td className="table-cell">{task.deadline || "-"}</td>
                  <td className="table-cell">
                    <img
                      src={task.isCompleted ? checkmark : xMark}
                      alt="logo"
                      style={{
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                      }}
                      onClick={
                        () => handleImageClick(task.id, !task.isCompleted) //Changes to the opposite of what it currently is
                      }
                    />
                  </td>
                  <td className="table-cell">
                    <button
                      style={{
                        backgroundColor: "red",
                        marginBottom: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleButtonClick(task.id)}
                    >
                      Delete
                    </button>
                  </td>
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
