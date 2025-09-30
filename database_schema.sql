-- ===================================================================
-- Simple PostgreSQL Database Schema for AI Demo Task Management
-- Based on GitHub Issues from oamk-git-demo/aidemo repository
-- Created: September 30, 2025
-- ===================================================================

-- ===================================================================
-- USERS TABLE
-- Supports: #1 (User registration), #2 (User login)
-- ===================================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================================================================
-- TASKS TABLE  
-- Supports: #3 (Complete tasks), #5 (Edit tasks), #6 (Delete tasks), 
--           #7 (View tasks), #8 (Create tasks)
-- ===================================================================

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================================================================
-- BASIC INDEXES
-- ===================================================================

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_is_completed ON tasks(is_completed);

-- ===================================================================
-- SAMPLE DATA
-- ===================================================================

-- Sample users
INSERT INTO users (username, email, password_hash) VALUES
('testuser', 'test@example.com', '$2b$12$sample_hash_here'),
('demo', 'demo@example.com', '$2b$12$sample_hash_here');

-- Sample tasks
INSERT INTO tasks (user_id, title, description, is_completed) VALUES
(1, 'First task', 'This is my first task', FALSE),
(1, 'Completed task', 'This task is done', TRUE),
(2, 'Demo task', 'Demo user task', FALSE);