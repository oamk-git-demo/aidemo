import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export async function getAllTasks() {
  return pool.query(
    `SELECT t.*, u.username FROM tasks t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC`
  );
}

export async function getTasksByUser(userId) {
  return pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
}

export async function createTask({ user_id, title, description }) {
  return pool.query(
    'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
    [user_id, title, description || null]
  );
}
