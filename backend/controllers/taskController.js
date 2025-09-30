import * as Task from '../models/taskModel.js';

console.log("TaskController")

export async function getAllTasks(req, res, next) {
  try {
    const result = await Task.getAllTasks();
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function getTasksByUser(req, res, next) {
  try {
    const { userId } = req.params;
    const result = await Task.getTasksByUser(userId);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const { user_id, title, description } = req.body;
    if (!user_id || !title) {
      const error = new Error('user_id and title are required');
      error.status = 400;
      return next(error);
    }
    const result = await Task.createTask({ user_id, title, description });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}
