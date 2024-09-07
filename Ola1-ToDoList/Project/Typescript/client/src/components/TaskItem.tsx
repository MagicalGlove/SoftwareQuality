import React from "react";
import { Task } from "../types/tasks";
import checkmark from "../misc/Checkmark.png";
import XMark from "../misc/X-Mark.png";

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  console.log(task);

  return (
    <div
      style={{
        border: "1px solid black",
        backgroundColor: "#ced1de",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "200px",
      }}
    >
      <h2>{task.text}</h2>
      <p>{task.id}</p>
      <button
        style={{ backgroundColor: "red", marginBottom: "10px" }}
        onClick={() => onDelete(task.id)}
      >
        Delete
      </button>

      <img
        src={task.isCompleted ? checkmark : XMark}
        alt="logo"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "30px",
          height: "30px",
        }}
      />
    </div>
  );
};

export default TaskItem;
