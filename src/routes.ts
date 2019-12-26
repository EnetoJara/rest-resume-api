import { NextFunction, Request, Response, Router } from "express";
import { BAD_REQUEST, getStatusText } from "http-status-codes";
import { LoginCredentials, RegisterCredentials } from "resume-app";
import { UserController } from "./controllers";
import { logger } from "./utils/logger";
import { validateLogin, validateUserRegistration } from "./utils/validator";

function log (req: Request, res: Response, next: NextFunction): void {
  const {method} = req;
    logger.debug("-------------------------------------");
    logger.debug("-------------------------------------");
    logger.debug("-------------------------------------");
    logger.debug(`Timestamp: ${new Date().toISOString()}`);
    logger.debug(`IP: ${req.ip}`);
    logger.debug(`Method: ${method}`);
    logger.debug(`Url: ${req.url}`);
    logger.debug("-------------------------------------");
    logger.debug("-------------------------------------");
    logger.debug("-------------------------------------");

    next();
}

/**
 * Validates the clients login credentials.
 * If the credentials had an error on them, the middleware will send a `BAD_REQUEST`
 * back to the client, other wise it will call the login handler.
 *
 * @param {import("express").Request} req - Request Object.
 * @param {import("express").Response} res - Response Object.
 * @param {import("express").NextFunction} next - NextFunction middleware.
 * @returns login
 */
function validLogin (req: Request, res: Response, next: NextFunction): void | Response {
  logger.debug("-------------------------------------");
    logger.debug("Loggin validator Middleware");
    const err = validateLogin(req.body as LoginCredentials);

    if (err.length > 0) {
        return res.sendStatus(BAD_REQUEST);
    }

    return next();
}

/**
 * Validates the clients login credentials.
 * If the credentials had an error on them, the middleware will send a `BAD_REQUEST`
 * back to the client, other wise it will call the login handler.
 *
 * @param {import("express").Request} req - Request Object.
 * @param {import("express").Response} res - Response Object.
 * @param {import("express").NextFunction} next - NextFunction middleware.
 * @returns login
 */
function validRegister (req: Request, res: Response, next: NextFunction): void | Response {
  logger.debug("-------------------------------------");
  logger.debug("register validator Middleware");

    const errors = validateUserRegistration(req.body as RegisterCredentials);

    logger.debug(`errors found while validating the registration inputs ${errors.length}`);

    return errors.length > 0
        ? res.status(BAD_REQUEST).send({ success: false, message: getStatusText(BAD_REQUEST), errors })
        : next();
}

/**
 * Sets the controllers with there corresponding url.
 *
 * @returns {Router} api - endpoints of the app.
 */
export function routes (): Router {
  logger.debug("-------------------------------------");
  logger.debug("routes");

    const api: Router = Router();
    const userController = new UserController();

    const { login, register } = userController;

    api.post("/v1/login", [log, validLogin], login);

    api.post("/v1/register", [log, validRegister], register);

    return api;
}
