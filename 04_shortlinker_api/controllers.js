const { HttpError } = require("./helpers/HttpError");
const { Link, linkRegex } = require("./models/links");
const { isValidObjectId } = require("mongoose");

const BASE_URL =
  `${process.env.BASE_URL.trim()}:${process.env.PORT.trim()}` ||
  "localhost:3000";

const getShortURI = async (req, res) => {
  const _id = req.params.shortUrlId;
  const link = await Link.findOne({ _id });
  if (!link) {
    throw HttpError();
  }
  res.redirect(link.url);
};

const createShortLink = async (req, res) => {
  const { url } = req.body;
  const link = await Link.findOne({ url });
  if (link) {
    res.json({ url, sortURL: `${BASE_URL}/${link._id}` });
    return;
  }
  const newLink = await Link.create({ url });
  res.json({ url, sortURL: `${BASE_URL}/${newLink._id}` });
};

const validateBody = async (req, res, next) => {
  const { url } = req.body;
  if (url && url.match(linkRegex)) {
    try {
      const resp = await fetch(url);
      if (resp.status === 200) {
        next();
        return;
      }
    } catch (error) {
      next(HttpError(401, "invalid link"));
      return;
    }
  }
  next(HttpError(401, "invalid link"));
};

const isValidId = (req, res, next) => {
  const { shortUrlId } = req.params;
  if (!isValidObjectId(shortUrlId)) {
    next(HttpError(400, `${shortUrlId} is not valid id`));
  }
  next();
};

module.exports = { getShortURI, validateBody, isValidId, createShortLink };
