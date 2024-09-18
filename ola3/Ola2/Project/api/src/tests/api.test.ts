import {describe} from "node:test";
import request from "supertest";
import app from "../index";
import {Task} from "../entities/Task";
import {ObjectId} from "mongodb";
import {AppDataSource} from "../ormconfig";
import * as taskRepository from '../db_functions/taskRepository';

describe("API get", () => {



    test("Get", async () => {
        const res = await request(app).get("/tasks");
        console.log(res.statusCode);
        expect(res.statusCode).toEqual(200);
    });
});

describe("API post", () => {
    let dummyTask: Task = {
        id: new ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Test Task',
        deadline: undefined,
        isCompleted: false,
        category: 0
    };

    test("Post", async () => {
        const res = await request(app).post("/tasks").send(dummyTask);
        console.log(res.statusCode);
        expect(res.statusCode).toEqual(200);
    });


});

describe("API put", () => {
    let dummyTask: Task = {
        id: new ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Test Task',
        deadline: undefined,
        isCompleted: false,
        category: 0
    };

    beforeAll(async () => {
        await AppDataSource.initialize();
        await taskRepository.taskRepository.save(dummyTask);
    });

    // After all tests, close the connection
    afterAll(async () => {
        await taskRepository.taskRepository.clear()
        await AppDataSource.destroy();
    });

    test("Put", async () => {
        const res = await request(app).put("/tasks/" + dummyTask.id);
        console.log(res.statusCode);
        expect(res.statusCode).toEqual(200);
    });
});
