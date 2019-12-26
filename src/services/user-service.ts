import { PoolConnection } from "mysql";
import { Rows } from "resume-app";
import { runQuery } from "../db/mysqls";
import { UserModel } from "../models/user-model";
import { logger } from "../utils/logger";
/**
 * UserService class handles the logic needed to work with the users data.
 *
 * @class UserService
 * @public
 * @author Ernesto Jara Olveda
 */
export class UserService {
    /**
   * Gets the user by email.
   *
   * @param {PoolConnection} connection - db connection.
   * @param {String} email - email the user identifier.
   * @returns {UserModel} user or empty array.
   */
    public getUserByEmail (connection: PoolConnection, email: string): Promise<UserModel | undefined> {
        logger.debug(`email to search for: ${email}`);

        return runQuery<UserModel>(connection, "select * from `v_userByEmail` where email = ;", email).then((res) => {
            if (res.length > 0) {
                return res[0];
            }

            return undefined;
        });
    }

    /**
   * Save
   */
    public save (connection: PoolConnection, user: UserModel): Promise<Rows<number>> {
        const { email, password, firstName, secondName, lastName, secondLastName, idRole } = user;

        return runQuery<number>(connection, "CALL sp_saveUser(?,?,?,?,?,?,?);", [
            email,
            password,
            firstName,
            secondName,
            lastName,
            secondLastName,
            idRole
        ]).then((row) => row);
    }
}
