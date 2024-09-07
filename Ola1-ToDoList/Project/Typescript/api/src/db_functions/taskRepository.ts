import { AppDataSource } from '../ormconfig';
import { Task } from '../entities/Task';

const taskRepository = AppDataSource.getMongoRepository(Task);

async function createTask(text: string) {
  const newTask = taskRepository.create({
    text: text,  
  });

  await taskRepository.save(newTask);
  console.log('Task has been saved:', newTask);
}

async function getAllTasks() {
  const tasks = await taskRepository.find();
  console.log('Found tasks:', tasks);
  return tasks
}

export {createTask, getAllTasks}
