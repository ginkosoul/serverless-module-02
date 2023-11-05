import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const dataPath = path.join(__dirname, "db", "data.json");

const string = await fs.readFile(dataPath, "utf-8");
const data = JSON.parse(string);

function getDataByEndpoint(endpoint) {
  return data[endpoint];
}

export async function addDataByEndpoint(newData, endpoint) {
  data[endpoint] = newData;
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  return data[endpoint];
}

export async function get(req, res) {
  const { jsonId } = req.params;
  try {
    const data = await getDataByEndpoint(jsonId);
    if (!data) res.status(404).json({ message: `${jsonId} not found` });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function put(req, res) {
  const { jsonId } = req.params;
  const body = req.body;
  try {
    const data = await addDataByEndpoint(body, jsonId);
    res.status(201).json({ message: "created", data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export function validateEndpoint(req, res, next) {
  const { jsonId } = req.params;
  if (jsonId.match(/\s/)) {
    const e = new Error();
    e.message = "Spaces not allowed in endpoints";
    e.status = 400;
    next(e);
  } else {
    next();
  }
}
