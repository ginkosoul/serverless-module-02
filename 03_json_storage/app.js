import express from "express";
import cors from "cors";
import { get, put, validateEndpoint } from "./controllers.js";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/:jsonId", validateEndpoint, get);

app.put("/:jsonId", validateEndpoint, put);

app.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

await app.listen(PORT);
console.log("server listening on port " + PORT);
