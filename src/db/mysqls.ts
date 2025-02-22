import * as mysql from "mysql";
import { Rows } from "resume-app";
import { logger } from "../utils/logger";

let pool: mysql.Pool;

function getPool (): mysql.Pool {
    if (pool) {
        return pool;
    }
    pool = mysql.createPool({
        connectionLimit: Number(process.env.ENETO_DB_LIMIT) || 10,
        host: process.env.ENETO_DB_HOST || "localhost",
        user: process.env.ENETO_DB_USER || "root",
        password: process.env.ENETO_DB_PASSWORD || "password",
        database: process.env.ENETO_DB_DATABASE || "rest-resume-api",
        port: 3306,
        dateStrings: true,
        stringifyObjects: true
    });
    pool.on("acquire", (conn: mysql.PoolConnection) => logger.debug(`ADQUIRE: ${conn.threadId}`));

    pool.on("release", (c: mysql.PoolConnection) => logger.debug(`RELEASE ${c.threadId}`));

    pool.on("error", (err: mysql.MysqlError) =>
        Object.keys(err).forEach((key: string) => logger.error(`ERROR: ${key}: ${err[key]}`))
    );

    pool.on("enqueue", (err: mysql.MysqlError) => {
        if (err) {
            Object.entries(err).forEach(([key, value]) => {
                logger.error(`ENQUEUE: ${key}: ${value}`);
            });
        }
    });

    return pool;
}

/**
 * Returns a bd connection to perform queries or so.
 *
 * @function {getConnection} bd conection.
 * @returns {Promise<mysql.PoolConnection>} mysql.poolConnection - a db connection.
 */
export function getConnection (): Promise<mysql.PoolConnection> {
    logger.debug("getConnection");

    return new Promise<mysql.PoolConnection>((resolve, reject) =>
        getPool().getConnection((error: mysql.MysqlError, connection: mysql.PoolConnection) => {
            if (error) {
                return reject(error);
            }

            return resolve(connection);
        })
    );
}

/**
 * @description Runs the given SQL statement passed as param.
 * @template T - Type of object the function will return.
 * @param {import("mysql").PoolConnection} connection - db connection.
 * @param {string} sql - SQL statement to be exectuted.
 * @param {*} [opts] opts - array of parameters to be injected at the sql statement.
 * @returns {Rows<T>} query - data fetched from db.
 */
export function runQuery<T> (connection: mysql.PoolConnection, sql: string, opts?): Promise<Rows<T>> {
    logger.debug(`RunQuery ${sql}`);

    return new Promise((resolve, reject) =>
        connection.query(sql, opts, (error: mysql.MysqlError | null, rows: Rows<T>) => {
            if (error !== null) {
                return reject(error);
            }

            return resolve(rows);
        })
    );
}

/**
 * Begins transaction to perform queries and stuff.
 *
 * @param {import("mysql").PoolConnection} connection - db thread.
 * @returns {import("mysql").PoolConnection} transaction - db connection with a transaction started.
 */
export function beginTransaction (connection: mysql.PoolConnection): Promise<mysql.PoolConnection> {
    return new Promise<mysql.PoolConnection>((resolve, reject) =>
        connection.beginTransaction((error: mysql.MysqlError) => {
            if (error) {
                return reject(error);
            }
            logger.debug("transaction started successfully: ");
            logger.debug(`ID Thread: ${connection.threadId}`);

            return resolve(connection);
        })
    );
}

/**
 * @description Commits transaction
 *
 * @param {import("mysql").PoolConnection} connection - database connection.
 * @returns {void}
 */
export function commitTransaction (connection: mysql.PoolConnection): Promise<void> {
    return new Promise((resolve, reject) =>
        connection.commit((err: mysql.MysqlError) => {
            if (err) {
                logger.error("ERROR commiting transaction");
                logger.error(`CODDE: ${err.code}`);
                logger.error(`MESSAGE: ${err.message}`);

                return reject(err);
            }
            logger.debug(`transaction has been commited: ${connection.threadId}`);

            return resolve();
        })
    );
}
