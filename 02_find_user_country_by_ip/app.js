import express from "express";
import { createInstance } from "./utils.js";

const PORT = 3000;

let getLocationByIp;

const app = express();

app.get("/myip", function (req, res) {
  const ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  const ip =
    ipAddress.split(",")[0].trim() === "::1"
      ? "127.0.0.1"
      : ipAddress.split(",")[0].trim();

  if (getLocationByIp) {
    res.send({ message: getLocationByIp(ip) });
  } else {
    res.send({ message: ipAddress });
  }
});

app.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});

try {
  getLocationByIp = await createInstance();
  await app.listen(PORT);
  console.log(`Server is up and running`);
} catch (error) {
  console.log(error.message);
}
