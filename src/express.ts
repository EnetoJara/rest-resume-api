import { json, urlencoded } from "body-parser";
import { Application, default as express } from "express";
import { MySQL } from "./db/mysqls";
import { routes } from "./routes";
/**
 * Creates an express instance.
 *
 * @param {string} env - environment in which the app will run.
 * @returns {Application} express instance.
 */
export function start (env: string): Application {
    const app: Application = express();
    const db: MySQL = new MySQL();

    if (env === "production") {
        app.use(require("helmet")());
        app.disable("x-powered-by");
        app.use(require("csrf")());
        app.use(require("compression")());
    } else {
        app.use(require("cors")());
    }
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use("/api", routes(db));

    return app;
}
