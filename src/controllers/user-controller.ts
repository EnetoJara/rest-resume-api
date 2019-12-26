/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */
import { Request, Response } from "express";
import { BAD_REQUEST, CREATED, getStatusText, GONE, NOT_FOUND, OK } from "http-status-codes";
import { PoolConnection } from "mysql";
import { LoginCredentials, UserExists } from "resume-app";
import { beginTransaction, commitTransaction, getConnection } from "../db/mysqls";
import { UserModel } from "../models/user-model";
import { UserService } from "../services";
import { logger } from "../utils/logger";
import { createToken, encriptPassword, isEqualsPassword } from "../utils/password";

/**
 * UserController class resolves the endpoints related to the user.
 *
 * @class UserController
 * @author Ernesto Jara Olveda
 */
export class UserController {
    private userService: UserService;

    /**
     * Creates an instance of user controller.
     *
     * @param {UserService} userService - instanse of the class UserService.
     */
    public constructor () {
        this.userService = new UserService();

        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
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
        let connection: PoolConnection;
        try {
            connection = await getConnection();

            connection = await beginTransaction(connection);
            const credentials = req.body as LoginCredentials;
            const auxUser = (await this.userService.getUserByEmail(connection, credentials.email)) as UserExists;
            if (typeof auxUser === "undefined") {
                await commitTransaction(connection);
                return res
                    .status(NOT_FOUND)
                    .send({ success: false, message: "incorrect email or password", credentials });
            }

            const user = new UserModel(auxUser);
            console.log("user: ", user);
            const validPassword = await isEqualsPassword(user.password, credentials.password);

            if (!validPassword) {
                await commitTransaction(connection);
                return res
                    .status(NOT_FOUND)
                    .send({ success: false, message: "incorrect email or password", credentials });
            }

            const toSend = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                secondName: user.secondName,
                lastName: user.lastName,
                secondLastName: user.secondLastName
            };

            const token = createToken({ ...toSend });

            return res.status(OK).send({ success: true, message: getStatusText(OK), user: { ...toSend, token } });
        } catch (error) {
            return res.status(GONE).send({ success: true, message: getStatusText(GONE) });
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
        let connection: PoolConnection;
        try {
            logger.debug("-------------------------------------");
            logger.debug("Register user");

            connection = await getConnection();

            connection = await beginTransaction(connection);
            const user = new UserModel(req.body);
            const stored = (await this.userService.getUserByEmail(connection, user.email)) as UserExists;

            logger.debug(`stored: ${typeof stored}`);
            if (typeof stored !== "undefined") {
                logger.debug(`${stored.email} is already in use`);
                await commitTransaction(connection);
                return res
                    .status(BAD_REQUEST)
                    .send({ success: false, message: "There is already a user with the given email" });
            }

            user.password = await encriptPassword(user.password, 10);

            await this.userService.save(connection, user);

            await commitTransaction(connection);

            return res.status(CREATED).send({ success: true, message: getStatusText(CREATED) });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Internal Server Error" });
        }
    }
}
