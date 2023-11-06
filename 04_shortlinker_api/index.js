const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST.trim();
const PORT = process.env.PORT.trim() || 3000;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
