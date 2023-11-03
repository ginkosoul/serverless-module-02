import pg from "pg";
const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER.trim(),
  password: process.env.DB_PASSWORD.trim(),
  host: process.env.DB_HOST.trim(),
  port: process.env.DB_PORT.trim(),
  database: process.env.DB_DATABASE.trim(),
});
