const { model, Schema } = require("mongoose");
const handleMongooseError = require("../helpers/handleMongooseError");

const linkRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const linkSchema = new Schema(
  {
    url: {
      type: String,
      match: linkRegex,
      required: [true, "link is required"],
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

linkSchema.post("save", handleMongooseError);
const Link = model("link", linkSchema);

module.exports = { Link, linkRegex };
