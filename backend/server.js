const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'aidemo',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to PostgreSQL database');
    release();
  }
});

// Routes

// Get all tasks for a user (Issue #7: View tasks)
app.get('/api/tasks/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all tasks (for demo purposes)
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, u.username 
       FROM tasks t 
       JOIN users u ON t.user_id = u.id 
       ORDER BY t.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching all tasks:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users (for demo purposes)
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, created_at FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  // Add new task (Issue #8: Create tasks)
  app.post('/api/tasks', async (req, res) => {
    try {
      const { user_id, title, description } = req.body;
      if (!user_id || !title) {
        return res.status(400).json({ error: 'user_id and title are required' });
      }
      const result = await pool.query(
        'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
        [user_id, title, description || null]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error creating task:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Demo Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`View all tasks: http://localhost:${PORT}/api/tasks`);
});

module.exports = app;