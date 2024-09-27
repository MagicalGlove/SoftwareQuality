function checkAddTaskBoundary(text: string, description: string, deadline: string | undefined | null, isCompleted: boolean | undefined) {
    if (text.length < 3 || text.length > 100) {
        throw new Error("Text must be between 3 and 100 characters ");
    }
    if (description.length < 5) {
        throw new Error("Description must be at least 5 characters");
    }
    if (deadline === null || deadline == undefined) {
        throw new Error("Deadline is required");
    }

    let deadlineTime = new Date(deadline);
    let currentTime = new Date();
    let diff = deadlineTime.valueOf() - currentTime.valueOf();
    diff /= 86400000 ;
    diff = Math.round(diff)
    if (diff < 0) {
        throw new Error("Deadline must be greater than or equal to current date | " + diff)
    }
    if (diff > 100) {
        throw new Error("Deadline must be within a realistic time limit | " + diff)
    }

    if (isCompleted === undefined) {
        throw new Error("Is Complete is required");
    }
}


export {checkAddTaskBoundary};