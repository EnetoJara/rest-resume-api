/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */
import { Request, Response } from "express";
import { BAD_REQUEST, CREATED, getStatusText, GONE, NOT_FOUND, OK } from "http-status-codes";
import { PoolConnection } from "mysql";
import { LoginCredentials, LoginResponse, UserByEmail } from "resume-app";
import { GET_USER_BY_EMAIL, SAVE_USER } from "../db/queries";
import { UserModel } from "../models/user-model";
import { displayError, logger } from "../utils/logger";
import { createToken, encriptPassword, isEqualsPassword } from "../utils/password";
import { apiResponse } from "../utils/response";
import { BaseController } from "./base-controller";

/**
 * UserController class resolves the endpoints related to the user.
 *
 * @class UserController
 * @author Ernesto Jara Olveda
 */
export class UserController extends BaseController {
    /**
     * Creates an instance of user controller.
     *
     * @param {UserService} userService - instanse of the class UserService.
     */
    public constructor () {
        super();

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.getLogin = this.getLogin.bind(this);
        this.getRegister = this.getRegister.bind(this);
    }

    /**
     * Register user controller.
     *
     * @param {import("express").Request} req - `HTTP Request`.
     * @param {import("express").Response} res - `HTTP Response`.
     * @returns {import("express").Response} register - object storing the user info along with a token.
     */
    public getRegister (req: Request, res: Response): Response {
        return apiResponse(res, "success", OK);
    }
    /**
     * Logins user controller.
     *
     * @param {import("express").Request} req - `HTTP Request`.
     * @param {import("express").Response} res - `HTTP Response`.
     * @returns {import("express").Response} login - object storing the user info along with a token.
     */
    public getLogin (req: Request, res: Response): Response {
        return apiResponse(res, "success", OK);
    }
    /**
     * Logins user controller.
     *
     * @param {Request} req - `HTTP Request`.
     * @param {Response} res - `HTTP Response`.
     * @returns {LoginResponse} login - object storing the user info along with a token.
     */
    public async login (req: Request, res: Response): Promise<Response> {
        logger.debug("-------------------------------------");
        logger.debug("login user");
        let connection!: PoolConnection;
        console.log('req: ', req);
        try {
            connection = await this.getDBConnection();

            const credentials = req.body as LoginCredentials;
            const user = await this.query<UserByEmail>(connection, GET_USER_BY_EMAIL, [credentials.email]);

            if (typeof user === "undefined") {
                return res
                    .status(NOT_FOUND)
                    .send({ success: false, message: "incorrect email or password", credentials });
            }

            const validPassword = await isEqualsPassword(user.password, credentials.password);

            logger.debug(`is valid Password: ${validPassword}`)
            if (!validPassword) {
                return res
                    .status(NOT_FOUND)
                    .send({ success: false, message: "incorrect email or password", credentials });
            }

            const toSend: LoginResponse = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                secondName: user.secondName,
                lastName: user.lastName,
                secondLastName: user.lastSecondName
            };

            logger.debug("creating token");
            const token = createToken(toSend);

            logger.debug(`TOKEN: ${token}`)
            return apiResponse(res, {...toSend, token: `Bearer ${token}`}, OK)
        } catch (error) {
            displayError(error);
            return res.status(GONE).send({ success: true, message: getStatusText(GONE) });
        } finally {
            this.releaseConnection(connection);
        }
    }

    /**
     * `HTTP Request handler`. Handles or manages the
     *
     * @param {import('express').Request} req - HTTP Request Object.
     * @param {import('express').Response} res - HTTP Response Object.
     * @returns {import('es6-promise').Promise<Response>} res - a promise.
     */
    public async register (req: Request, res: Response): Promise<Response> {
        let connection!: PoolConnection;
        try {
            logger.debug("-------------------------------------");
            logger.debug("Register user");

            connection = await this.getDBConnection();

            connection = await this.startTransaction(connection);
            const user = new UserModel(req.body);
            const stored = await this.query<UserByEmail>(connection, GET_USER_BY_EMAIL, user.email);

            logger.debug(`stored: ${typeof stored}`);
            if (stored !== undefined) {
                logger.debug(`${stored.email} is already in use`);
                await this.finishTransaction(connection);
                return res
                    .status(BAD_REQUEST)
                    .send({ success: false, message: "There is already a user with the given email" });
            }

            user.password = await encriptPassword(user.password, 10);
            logger.debug("saving");
            const id = await this.query<number>(connection, SAVE_USER, [
                user.email,
                user.password,
                user.firstName,
                user.secondName,
                user.lastName,
                user.secondLastName,
                user.idRole
            ]);

            logger.debug("new id"+id);

            this.finishTransaction(connection);

            return apiResponse(res, getStatusText(CREATED), CREATED);
        } catch (error) {
            displayError(error);
            this.releaseConnection(connection);
            return res.status(500).send({ success: false, message: "Internal Server Error" });
        }
    }
}
