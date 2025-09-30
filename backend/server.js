import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', taskRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Demo Backend is running' });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Centralized error handler:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`View all tasks: http://localhost:${PORT}/api/tasks`);
});