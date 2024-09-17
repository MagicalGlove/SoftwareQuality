import request from 'supertest';
import app from '../index';
import {Task} from "../entities/Task";
import {ObjectId} from "mongodb";
import * as taskRepository from '../db_functions/taskRepository';
import {AppDataSource} from '../ormconfig';


describe('API Integration Tests', () => {


    const dummyTask: Task = {
        id: new ObjectId("66dd91c906cded5f17cc8cfe"),
        text: 'Another dummy task',
        deadline: null,
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


    it('should return correct data for GET ', async () => {
        const response = await request(app)
            .get('/tasks')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body[0].text).toEqual(dummyTask.text);
        expect(response.body[0].deadline).toEqual(dummyTask.deadline);
        expect(response.body[0].isCompleted).toEqual(dummyTask.isCompleted);
        expect(response.body[0].category).toEqual(dummyTask.category);

        expect(response.body.length).toEqual(1);
    });

    it('should return correct data for POST', async () => {
        const task: Task = {
            id: new ObjectId("55dd91c906cded5f17cc8cfe"),
            text: 'Test add Task',
            deadline: "now",
            isCompleted: true,
            category: 1
        };

        const response = await request(app)
            .post('/tasks')
            .send(task)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.text).toEqual(task.text);
        expect(response.body.deadline).toEqual(task.deadline);
        expect(response.body.isCompleted).toEqual(task.isCompleted);
        expect(response.body.category).toEqual(task.category);


    });


})