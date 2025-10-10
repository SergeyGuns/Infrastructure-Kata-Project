-- Initial database schema for infrastructure kata

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(512) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on sessions for user_id
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- Create index on sessions for token
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);

-- Create index on users for email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);