import {Task} from '../entities/Task';

function checkAddTaskBoundary(text: string, deadline: string | undefined | null, isCompleted: boolean | undefined) {
    if (text.length < 3 || text.length > 100) {
        throw new Error("Text must be between 3 and 100 characters");
    }
    if (deadline === null) {
        throw new Error("Deadline is required");
    }
    if  (isCompleted === null) {
        throw new Error("Text is required");
    }
}

function checkTaskBoundary(task: Task) {
    if (task.text.length < 3 || task.text.length > 100) {
        throw new Error("Text must be between 3 and 100 characters");
    }

    if (task.deadline === null) {
        throw new Error("Deadline is required");
    }

    if  (task.isCompleted === null) {
        throw new Error("Text is required");
    }

    if (task.category < 0 || task.category > 3) {
        throw new Error("Category must be between 0 and 3");
    }

    if (task.category){
        if (task.category < 0) {
            throw new Error("Category must be more than 0");
        }
    }
}

export {checkAddTaskBoundary, checkTaskBoundary};