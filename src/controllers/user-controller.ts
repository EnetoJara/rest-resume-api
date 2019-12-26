/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */
import { Request, Response } from "express";
import { BAD_REQUEST, CREATED, getStatusText, GONE, OK } from "http-status-codes";
import { PoolConnection } from "mysql";
import { LoginCredentials } from "resume-app";
import { beginTransaction, commitTransaction, getConnection } from "../db/mysqls";
import { UserModel } from "../models/user-model";
import { UserService } from "../services";
import { logger } from "../utils/logger";
import { encriptPassword } from "../utils/password";

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
      logger.debug("login user");
      try {
          let connection: PoolConnection = await getConnection();

          connection = await beginTransaction(connection);
          const credentials = <LoginCredentials>req.body;
          const user = await this.userService.getUserByEmail(connection, credentials.email);

          return res.status(OK).send({ success: true, message: getStatusText(OK), user });
      } catch (error) {
          console.debug({ ...error });

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
      try {
          logger.debug("Register");

          let connection = await getConnection();

          connection = await beginTransaction(connection);
          const user = new UserModel(req.body);
          const stored = await this.userService.getUserByEmail(connection, user.email);

          logger.debug(`stored: ${typeof stored}`);
          if (typeof stored !== "undefined") {
              logger.debug(`${stored.email} is already in use`);

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
