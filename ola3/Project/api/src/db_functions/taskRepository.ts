import {AppDataSource} from '../ormconfig';
import {Task} from '../entities/Task';
import {ObjectId} from "mongodb";
import {checkAddTaskBoundary} from './logicChecks';

const taskRepository = AppDataSource.getMongoRepository(Task);

async function createTask(
    text: string,
    deadline: string | undefined | null,
    isCompleted: boolean | undefined
) {

    checkAddTaskBoundary(text, deadline, isCompleted);

    const newTask = taskRepository.create({
        text: text,
        deadline: deadline,
        isCompleted: isCompleted,
    });

    const task = await taskRepository.save(newTask);
    console.log("Task has been saved:", newTask);
    return task;
}


async function getAllTasks() {
    const tasks = await taskRepository.find();
    console.log("Found tasks:", tasks);
    return tasks;
}

async function editTask(id: string | undefined, _task: Task) {
    const objectId = new ObjectId(id);
    const task = await taskRepository.findOne({where: {_id: objectId}});
    if (!task) {
        throw new Error('Task not found');
    } else {
        task.text = _task.text;
        task.category = _task.category;
        task.deadline = _task.deadline;
        task.isCompleted = _task.isCompleted;
        await taskRepository.save(task);
        console.log("Task has been updated:", task);
        return task;
    }
}

async function deleteTask(id: string) {
    const objectId = new ObjectId(id);

    const task = await taskRepository.findOne({where: {_id: objectId}});

    if (!task) {
        throw new Error("Task not found");
    } else {
        await taskRepository.remove(task);
        console.log("Task has been deleted:", task);
        return task;
    }
}

async function changeCompleteStateTask(id: string, isCompleted: boolean) {
    const objectId = new ObjectId(id);

    const task = await taskRepository.findOne({where: {_id: objectId}});
    if (!task) {
        throw new Error("Task not found");
    } else {
        task.isCompleted = isCompleted;
        await taskRepository.save(task);
        console.log("Complete state has been updated:", task);
        return task;
    }
}

export {createTask, getAllTasks, deleteTask, editTask, changeCompleteStateTask, taskRepository};
