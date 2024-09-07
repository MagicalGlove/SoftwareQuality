import { addTaskAPI } from '../api/tasks';
import { Task } from '../types/tasks';

export const addTask = async (newTaskText: string): Promise<Task> => {
    try {
      return await addTaskAPI(newTaskText);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };