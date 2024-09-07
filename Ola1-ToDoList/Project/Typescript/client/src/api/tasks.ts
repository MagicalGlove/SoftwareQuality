import { Task } from "../types/tasks";

const baseUrl = 'http://localhost:3001'

export const getAllTasksAPI = async (): Promise<Task[]> => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Failed to get tasks');
  }
  return response.json();
};

export const addTaskAPI = async (newTask: Task): Promise<Task> => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    return response.json();
  };

export const editTaskAPI = async (task: Task): Promise<Task> => {
    const response = await fetch(`${baseUrl}/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error('Failed to edit task');
    }
    return response.json();
  };