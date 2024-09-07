import { completedTaskAPI } from "../api/tasks";
import { Task } from "../types/tasks";

export const completedTask = async (
  completedTaskId: string,
  isCompleted: boolean
): Promise<Task> => {
  try {
    return await completedTaskAPI(completedTaskId, isCompleted);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
