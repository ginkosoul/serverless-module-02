import { pool } from "../db.js";

export const createUser = async ({ email, passwordHash }) => {
  const snapshot = await pool.query(
    "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id",
    [email, passwordHash]
  );
  return snapshot.rows;
};

export const getUserByEmail = async ({ email }) => {
  const snapshot = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return mapUsers(snapshot.rows);
};

export const getUserById = async ({ id }) => {
  const snapshot = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return mapUsers(snapshot.rows);
};

export const updateTokensById = async ({ id, accessToken, refreshToken }) => {
  return await pool.query(
    "UPDATE users SET access_token = $1, refresh_token = $2 WHERE id = $3",
    [accessToken, refreshToken, id]
  );
};

function mapUsers(arr) {
  return arr.map(
    ({ id, email, password_hash, refresh_token, access_token }) => ({
      id,
      email,
      passwordHash: password_hash,
      refreshToken: refresh_token,
      accessToken: access_token,
    })
  );
}
