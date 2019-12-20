import { NextFunction, Request, Response, Router } from "express";
import { BAD_REQUEST, getStatusText, INTERNAL_SERVER_ERROR } from "http-status-codes";
import { PoolConnection } from "mysql";
import { LoginCredentials } from "resume-app";
import { UserController } from "./controllers";
import { MySQL } from "./db/mysqls";
import { UserService } from "./services";
import { logger } from "./utils/logger";
import { validateLogin } from "./utils/validator";

function log (req: Request, res: Response, next: NextFunction): void {
    logger.debug("-------------------------------------");
    logger.debug("-------------------------------------");
    logger.debug("-------------------------------------");
    logger.debug(`Timestamp: ${new Date().toISOString()}`);
    logger.debug(`IP: ${req.ip}`);
    logger.debug(`Method: ${req.method}`);
    logger.debug(`Url: ${req.url}`);
    logger.debug("-------------------------------------");
    logger.debug("-------------------------------------");
    logger.debug("-------------------------------------");
    next();
}

function openConnection (pool: MySQL, endPoint: (req: Request, res: Response, connection: PoolConnection)=>void) {
    return async function api (req: Request, res: Response) {
        return pool.getNewConnection().then((conn: PoolConnection) => {
            return endPoint(req, res, conn);
        }).catch((error: any) => {
            logger.error(`ERROR MIDDLEWARE OPEN CONNECTION`);
            Object.keys(error).map((i: string) => logger.error(`${error[i]}`));

            return res.status(INTERNAL_SERVER_ERROR).send({success: false, message: getStatusText(INTERNAL_SERVER_ERROR)});
        })
    }
}
function validLogin (req: Request, res: Response, next: NextFunction): void | Response {
    const err = validateLogin(<LoginCredentials>req.body);

    if (err.length < 0) {
        return res.status(BAD_REQUEST).send({ success: false, message: getStatusText(BAD_REQUEST), errors: err });
    }

    return next();
}
/**
 * Sets the controllers with there corresponding url.
 *
 * @returns {Router} api - endpoints of the app.
 */
export function routes (db: MySQL): Router {
    const api: Router = Router();
    const userController = new UserController(new UserService(db));

    api.get("/v1/login", [log, validLogin], openConnection(db, userController.login));

    return api;
}
