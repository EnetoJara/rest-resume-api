import fs from "fs";
import http from "http";
import path from "path";
import { start } from "./express";
export const privateKey = fs.readFileSync(path.join(__dirname, "../private.key"), "utf8");
export const publicKEY = fs.readFileSync(path.join(__dirname, "../public.key"), "utf8");

const { NODE_ENV, PORT = 5000 } = process.env;
const app = start(NODE_ENV || "development");
const server = http.createServer(app);

server.listen(Number(PORT)||5000, () => {
    console.log("starting");
    console.log(`running server at: http:localhost:${PORT}`);
});
