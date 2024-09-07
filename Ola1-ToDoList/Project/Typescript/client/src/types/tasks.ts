export type Task = {
  id?: string;
  text: string;

  deadline?: string | null;
  isCompleted?: boolean;
  category?: number;
};
