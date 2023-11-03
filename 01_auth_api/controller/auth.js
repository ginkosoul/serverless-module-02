import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserByEmail,
  updateTokensById,
} from "../queries/users.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { HttpError } from "../utils/HttpError.js";

const SALT = 10;
const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_REFRESH_KEY = process.env.SECRET_KEY_REFRESH;

const _signIn = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await getUserByEmail({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: user.id,
  };

  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  const refreshToken = jwt.sign(payload, SECRET_REFRESH_KEY);

  await updateTokensById({
    id: user.id,
    accessToken,
    refreshToken,
  });

  res.status(200).json({
    id: user.id,
    accessToken,
    refreshToken,
  });
};

const _signUp = async (req, res) => {
  const { email, password } = req.body;

  const [user] = await getUserByEmail({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const passwordHash = await bcrypt.hash(password, SALT);
  const [{ id }] = await createUser({ email, passwordHash });

  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, SECRET_REFRESH_KEY);

  await updateTokensById({
    id,
    accessToken,
    refreshToken,
  });

  res.status(201).json({
    id,
    accessToken,
    refreshToken,
  });
};

const _currentUser = async (req, res) => {
  const { email, id } = req.user;

  res.status(200).json({
    id,
    email,
  });
};

export const signUp = ctrlWrapper(_signUp);
export const signIn = ctrlWrapper(_signIn);
export const currentUser = ctrlWrapper(_currentUser);
