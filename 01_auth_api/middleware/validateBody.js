import { HttpError } from "../utils/HttpError.js";

export const validateBody = (validate) => (req, res, next) => {
  const { error } = validate(req.body);
  if (error) next(HttpError(400, error.message));
  next();
};
