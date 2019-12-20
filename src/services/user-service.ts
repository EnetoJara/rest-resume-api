import { PoolConnection } from "mysql";
import { Rows, UserAttributes } from "resume-app";
import { getUserByEmail, MySQL } from "../db";
/**
 * UserService class handles the logic needed to work with the users data.
 *
 * @class UserService
 * @public
 * @author Ernesto Jara Olveda
 */
export class UserService {
    private pool: MySQL;

    /**
     * Creates an instance of UserService.
     *
     * @param {MySQL} pool
     * @memberof UserService
     */
    public constructor () {
        this.getUserByEmail = this.getUserByEmail.bind(this);
    }

    public getUserByEmail (email: string): Promise<UserAttributes> {
        let connection: PoolConnection;

        return this.pool.getNewConnection()
            .then((conn: PoolConnection) => {
                connection = conn;

                return this.pool.runQuery<UserAttributes>(connection, getUserByEmail, [email]);
            })
            .then(() => {


            })
            .tnen((result: Rows<UserAttributes>) => result[0]);
    }
}
