import * as mysql from "mysql";
import { Rows } from "resume-app";
import { beginTransaction, commitTransaction, getConnection, runQuery } from "../db/mysqls";

export class BaseController {
    public constructor () {
        this.getDBConnection = this.getDBConnection.bind(this);
        this.startTransaction = this.startTransaction.bind(this);
        this.finishTransaction = this.finishTransaction.bind(this);
        this.query = this.query.bind(this);
    }

    protected query<Entity> (connection: mysql.PoolConnection, sql: string, opts?): Promise<Entity> {
        return runQuery<Entity>(connection, sql, opts).then((rows: Rows<Entity>) => rows[0]);
    }

    protected getDBConnection (): Promise<mysql.PoolConnection> {
        return getConnection();
    }

    protected startTransaction (connection: mysql.PoolConnection): Promise<mysql.PoolConnection> {
        return beginTransaction(connection);
    }

    protected finishTransaction (connection: mysql.PoolConnection): Promise<void> {
        return commitTransaction(connection);
    }

    protected releaseConnection (connection: mysql.PoolConnection): mysql.PoolConnection | undefined {
        if (connection) {
            connection.release();

            return connection;
        }
        return undefined;
    }
}
