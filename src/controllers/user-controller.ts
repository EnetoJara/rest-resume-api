/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 */
import { Request, Response } from "express";
import { PoolConnection } from "mysql";
import { UserService } from "../services";
import { BaseController } from "./base-controller";
/**
 * UserController class resolves the endpoints related to the user.
 *
 * @class UserController
 * @author Ernesto Jara Olveda
 */
export class UserController extends BaseController {
  private userService: UserService;
  /**
   * Creates an instance of user controller.
   *
   * @param {UserService} userService - instanse of the class UserService.
   */
  public constructor (conn: PoolConnection) {
      super(conn);

      this.userService = new UserService();
      this.login = this.login.bind(this);
  }

  /**
   * Logins user controller.
   *
   * @POST `/api/v1/login`
   * @param {Request} req - `HTTP Request`.
   * @param {Response} res - `HTTP Response`.
   * @returns {LoginResponse} login - object storing the user info along with a token.
   */
  public async login (req: Request, res: Response) {
      console.log(this.userService);


      /* Try {
          logger.info(`login ${req.body.email}`);
          const loginCredentials = <LoginCredentials>req.body;
          const stored = await this.userService.getUserByEmail(loginCredentials.email);

          if (stored === null) {
              logger.warn(`user not found: ${loginCredentials.email}`);

              return apiResponse<string>(res, "user not found", NOT_FOUND);
          }
          const samePassword = await isEqualsPassword(stored.password, loginCredentials.password);

          if (!samePassword) {
              logger.warn("wrong password");

              return apiResponse<string>(res, "user not found", NOT_FOUND);
          }
          const toSend: LoginResponse = {
              id: stored.id,
              email: stored.email,
              name: stored.name,
              middleName: stored.middleName,
              lastName: stored.lastName,
              secondLastName: stored.secondLastName,
              success: false,
              token: ""
          };
          const token = createToken(toSend);

          return apiResponse<LoginResponse>(
              res,
              {
                  ...toSend,
                  success: true,
                  token: `Bearer ${token}`
              },
              OK
          );
      } catch (error) {
          logger.error("error while register", { meta: { ...error } });

          return apiResponse<string>(res, getStatusText(INTERNAL_SERVER_ERROR), INTERNAL_SERVER_ERROR);
      }*/
  }

}
