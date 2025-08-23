import config from "3lib-config";
import fs from "fs";
import cors from "cors";
import process from "process";
import express from "express";
const { stringReplace } = require('string-replace-middleware');
const serveStatic = require('serve-static');
import path from 'path';

config.init();

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const app = express();
let replacements = config.get("replacements", {});
let verbose = config.get("verbose", false);

console.log("Initializing 3suite-http-server");
if (verbose) {
  console.log("Replacements configuration:", JSON.stringify(replacements, null, 2));
}

app.use(stringReplace(replacements));

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb" }));
app.use(cors());

let directory = config.get("directory", "./");
console.log(`Serving static files from: ${directory}`);
if (verbose) {
  console.log("Directory absolute path:", path.resolve(directory));
  console.log("Directory exists:", fs.existsSync(directory));
}

app.use(serveStatic(directory));

let port = config.get("port", 1237);

app.listen(port, () => {
  console.log(`3suite-http-server listening on port ${port} serving ${directory}`);
  if (verbose) {
    console.log("Server configuration:", {
      port: port,
      directory: directory,
      replacements: replacements,
      jsonLimit: "500mb",
      corsEnabled: true
    });
  }
});
