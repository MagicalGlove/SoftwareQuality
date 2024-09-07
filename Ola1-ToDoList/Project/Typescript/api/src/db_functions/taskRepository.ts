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

async function editTask(id: string, _task: Task) {
  const task = await taskRepository.findOne({ where: { id: id } });
  if (!task) {
    throw new Error('Task not found');


  } else {
    task.text = _task.text;
    await taskRepository.save(task);
    console.log('Task has been updated:', task);
    return task;
  }
}


export {createTask, getAllTasks}
