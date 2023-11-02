import { app } from "./app.js";

const { DB_HOST, PORT = 3000 } = process.env;

app.listen(PORT);
