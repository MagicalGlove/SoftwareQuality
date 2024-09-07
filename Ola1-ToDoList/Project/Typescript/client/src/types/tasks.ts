export type Task = {
    id?: number;
    text: string;

    deadline?: string | null;
    isCompleted?: boolean;
    category?: number;
  };