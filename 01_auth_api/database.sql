CREATE DATABASE serverless;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    access_token VARCHAR(255),
    created_at TIMESTAMP,
)