import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:userId', taskController.getTasksByUser);
router.post('/tasks', taskController.createTask);

export default router;
