import { Promise } from "es6-promise";
import mysql, { MysqlError, Pool, PoolConnection } from "mysql";
import { logger } from "../utils/logger";

var pool: Pool;
function getPool(): Pool {
    if (pool) {
        return pool;
    }

    pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: "password",
        database: "rest-resume-api",
        dateStrings: true,
        stringifyObjects: true
    });

    return pool;
}

export function getConnection() {
    return new Promise((resolve, reject) => {
        return getPool()
            .getConnection((error: MysqlError, connection: PoolConnection) => {
                if (error) {
                    return reject(error)
                }
                return resolve(connection);
            })
    })
}

export function runQuery<T> (connection: PoolConnection, sql: string, opts: any[] = []): Promise<Rows<T>> {
    logger.debug(`RunQuery ${sql}`);

    return new Promise((resolve, reject) => connection.query(sql, opts, (error: MysqlError | null, rows: Rows<T>, fields?: FieldInfo[] ) => {
        if (error !== null) {
            logger.error(`ERROR RUNNING SQL: ${sql}`);

            return reject(error);
        }

        return resolve(rows);
    }));
}
