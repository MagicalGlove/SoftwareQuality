import { addTask } from '../utils/addTask';
import * as api from '../api/tasks';    
import { Task } from '../types/tasks';

jest.mock('../api/tasks', () => ({
    addTaskAPI: jest.fn(),
  }));
  
  describe('addTask', () => {
    it('should return the newly added task', async () => {
      
      const mockTask: Task = { id: 2, text: 'Second Task' };
      (api.addTaskAPI as jest.Mock).mockResolvedValue(mockTask);
  
      const newTaskText = 'Second Task';
      
      const returnedTask = await addTask(newTaskText);
      
      expect(returnedTask).toEqual(mockTask);
      expect(api.addTaskAPI).toHaveBeenCalledWith(newTaskText);
    });
  
    it('should handle API failure gracefully', async () => {

      (api.addTaskAPI as jest.Mock).mockRejectedValue(new Error('Failed to add task'));
  
      const newTaskText = 'Failed Task';
      
      await expect(addTask(newTaskText)).rejects.toThrow('Failed to add task');
      expect(api.addTaskAPI).toHaveBeenCalledWith(newTaskText);
    });
  });