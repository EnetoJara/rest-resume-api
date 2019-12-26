import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import { routes } from "./routes";
import { logger } from "./utils/logger";

/**
 * Creates an express instance.
 *
 * @param {string} env - environment in which the app will run.
 * @returns {Application} express instance.
 */
export function start (env: string): express.Application {
    logger.debug(`App running as ${env}`);
    const app: express.Application = express();

    if (env === "production") {
        app.use(helmet());
        app.disable("x-powered-by");
        app.use(compression());
    } else {
        app.use(cors());
    }
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use("/api", routes());

    return app;
}
