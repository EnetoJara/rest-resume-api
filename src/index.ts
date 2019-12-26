require("../tools/env")();
import { start } from "./express";

const { NODE_ENV, ENETO_PORT = 5000 } = process.env;
const app = start(NODE_ENV || "development");

app.listen(Number(ENETO_PORT) || 5000, () => {
    console.log("starting");
    console.log(`running server at: http:localhost:${ENETO_PORT}`);
});
