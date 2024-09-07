export type Task = {
    id: number;
    text: string;

    deadline?: Date | null;
    isCompleted?: boolean;
  };