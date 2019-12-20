import { MysqlError, PoolConnection } from "mysql";
import { logger } from "../utils/logger";

export class BaseController {
    private conn: PoolConnection;
    public constructor (conn: PoolConnection) {
        this.conn = conn;
    }


    public startTransaction (): Promise<void> {
        return new Promise((resolve, reject) => {
            this.conn.beginTransaction((err: MysqlError) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            })
        });
    }

    public commitChanges (): Promise<void> {
        logger.debug("COMMINT CHANGES: ");

        return new Promise((resolve, reject) => this.conn.commit((error: MysqlError) => {
            if (error === null) {

                return resolve();
            }
            logger.error(`code: ${error.code}`);
            logger.error(`errno: ${error.errno}`);
            logger.error(`fatal: ${error.fatal}`);

            return this.conn.rollback((err: MysqlError) => {
                logger.error("ERROR comminting");

                if (err) {
                    return reject({ errorRollBack: err, errorCommint: error });
                }
            });

        }));
    }

}
