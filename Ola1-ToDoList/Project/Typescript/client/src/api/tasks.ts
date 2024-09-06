import { Task } from "../types/tasks";

export const addTaskToAPI = async (taskText: string): Promise<Task> => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: taskText }),
    });
    if (!response.ok) {
      throw new Error('Failed to add task');
    }
    return response.json();
  };