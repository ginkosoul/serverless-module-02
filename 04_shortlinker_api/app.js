const express = require("express");
const cors = require("cors");
const { HttpError } = require("./helpers/HttpError");
const {
  validateBody,
  createShortLink,
  isValidId,
  getShortURI,
} = require("./controllers");

const app = express();

app.use(cors());
app.use(express.json());

app.put("/", validateBody, createShortLink);

app.get("/:shortUrlId", isValidId, getShortURI);

app.use((req, res, next) => {
  next(HttpError());
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
