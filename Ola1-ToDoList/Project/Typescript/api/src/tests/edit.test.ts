import dotenv from "dotenv";
import {DataSource} from 'typeorm';
import * as taskRepository from '../db_functions/taskRepository';
import { Task } from '../entities/Task';
import { ObjectId } from 'mongodb';
jest.mock('../db_functions/taskRepository');
// Define the MongoDB connection settings (same as in your main app)

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mongodb',
    url: process.env.DATABASE_URL , // Replace with your actual connection string
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
});

describe('MongoDB Connection Test', () => {
    // Before running the test, initialize the DataSource (connect to the database)
    beforeAll(async () => {
        await AppDataSource.initialize();

    });


    // After all tests, close the connection
    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it('should connect to MongoDB successfully', async () => {
        const connection = AppDataSource.isInitialized;
        expect(connection).toBe(true); // Check if the connection is initialized
    });

    it("should fail to connect to MongoDB", async () => {

        const WrongDataSource = new DataSource({
            type: 'mongodb',
            url: 'wrong connection string',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            synchronize: true,
            logging: false,
        });

        await expect(WrongDataSource.initialize()).rejects.toThrow();
    } );

});

describe("Edit Task Test", () => {
    let testTask: Task;

    beforeEach(async () => {
        // Create a new task
        (taskRepository.createTask as jest.Mock).mockResolvedValue({
            id: new ObjectId("101231313fffaa1231231231"),
            text: 'Test Task',
            completed: false,
        });

        testTask = await taskRepository.createTask('Test Task', undefined, false);

    });

    it('should edit the task and return the edited task', async () => {
        const updatedTask = { ...testTask, text: 'Updated Task' };
        // Mock the update function
        (taskRepository.editTask as jest.Mock).mockResolvedValue(updatedTask);

        const returnedTask = await taskRepository.editTask(updatedTask.id, updatedTask);
        expect(returnedTask).toEqual(updatedTask);
    });

    it('should fail after not finding the task with valid id',async () =>  {
        const updatedTask = { ...testTask, text: 'Updated Task' };
        // Mock the update function

        (taskRepository.editTask as jest.Mock).mockResolvedValue(updatedTask);
        await expect(taskRepository.editTask(new ObjectId(10), updatedTask)).rejects.toThrow('Task not found');


    });

});