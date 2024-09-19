import {Task} from '../entities/Task';

function checkAddTaskBoundary(text: string, deadline: string | undefined | null, isCompleted: boolean | undefined) {
    if (text.length < 3 || text.length > 100) {
        throw new Error("Text must be between 3 and 100 characters " + text.length.toString());
    }
    if (deadline === null) {
        throw new Error("Deadline is required");
    }
    if  (isCompleted === null) {
        throw new Error("Text is required");
    }
}


export {checkAddTaskBoundary};