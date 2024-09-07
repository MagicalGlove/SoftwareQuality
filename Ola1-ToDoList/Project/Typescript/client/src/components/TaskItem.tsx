import React from 'react';
import { Task } from "../types/tasks";


interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <div style={{ border: "1px solid black", backgroundColor: "powderblue", padding: "10px", margin: "10px", borderRadius: "5px" }}>
      <h2>{task.text}</h2>
      <p>{task.id}</p>
      <button style={{ backgroundColor: 'red' }} onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
