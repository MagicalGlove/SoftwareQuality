import {checkAddTaskBoundary} from "../db_functions/logicChecks";

describe("title size equivalence", () => {
    const partition1 = [0, 2], partition2 = [3, 100], partition3 = [101, 1000];

    test("Partition 1 Invalid", () => {
        for (let i = 0; i < 3; i++) {
            const l = getRandomInt(partition1[0], partition1[1]);

            let testTitle: string = "";
            for (let j = 0; j < l; j++) {
                testTitle += "x";
            }

            expect(() => {
                checkAddTaskBoundary(testTitle, 'description', "undefined", false);
            }).toThrow(Error);
        }
    });

    test("Partition 2 Valid", () => {
        for (let i = 0; i < 3; i++) {
            const l = getRandomInt(partition2[0], partition2[1]);

            let testTitle: string = "";
            for (let j = 0; j < l; j++) {
                testTitle += "x";
            }
            expect(() => {
                checkAddTaskBoundary(testTitle, 'description', "undefined", false);
            }).not.toThrow(Error);
        }
    });

    test("Partition 3 Invalid", () => {
        for (let i = 0; i < 3; i++) {
            const l = getRandomInt(partition3[0], partition3[1]);

            let testTitle: string = "";
            for (let j = 0; j < l; j++) {
                testTitle += "x";
            }

            expect(() => {
                checkAddTaskBoundary(testTitle, 'description', "undefined", false);
            }).toThrow(Error);
        }
    });
});

describe("title size boundary", () => {
    const partition1 = [0, 2], partition2 = [3, 100], partition3 = [101, 1000];

    test("Partition 1 Invalid", () => {
        for (let i = 0; i < 2; i++) {
            let testTitle: string = "";
            for (let j = 0; j < partition1[i]; j++) {
                testTitle += "x";
            }

            expect(() => {
                checkAddTaskBoundary(testTitle, 'description', "undefined", false);
            }).toThrow(Error);
        }
    });

    test("Partition 2 Valid", () => {
        for (let i = 0; i < 2; i++) {
            let testTitle: string = "";
            for (let j = 0; j < partition2[i]; j++) {
                testTitle += "x";
            }

            expect(() => {
                checkAddTaskBoundary(testTitle, 'description', "undefined", false);
            }).not.toThrow(Error);
        }
    });

    test("Partition 3 Invalid", () => {
        for (let i = 0; i < 2; i++) {
            let testTitle: string = "";
            for (let j = 0; j < partition3[i]; j++) {
                testTitle += "x";
            }

            expect(() => {
                checkAddTaskBoundary(testTitle, 'description', "undefined", false);
            }).toThrow(Error);
        }
    });
});

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}