export type Task = {
  id?: string;
  text: string;

  deadline?: string | null;
  isCompleted?: boolean;
  category?: number;
};

export enum TASK_CATEGORIES {
  WORK = 1,
  CHORES = 2,
  LEISURE = 3
}