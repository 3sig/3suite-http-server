import config from "3lib-config";
import fs from "fs";
import cors from "cors";
import process from "process";
import express from "express";

config.init();

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const app = express();

app.use(express.json({ limit: "500mb" })); // for parsing application/json
app.use(express.urlencoded({ limit: "500mb" }));
app.use(cors());
let directory = config.get("directory", "./");
app.use(express.static(directory));

let port = config.get("port", 1237);
app.listen(port, () => {
  console.log(
    `3suite-http-server listening on port ${port} on directory ${directory}`,
  );
});
