import jwt from "jsonwebtoken";
import { getUserById } from "../queries/users.js";
import { HttpError } from "../utils/HttpError.js";

const SECRET_KEY = process.env.SECRET_KEY;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const [user] = await getUserById({ id });
    if (!user || !user.accessToken || user.accessToken !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};
