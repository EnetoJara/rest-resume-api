import * as express from "express";
import { getStatusText, GONE, OK } from "http-status-codes";
import * as mysql from "mysql";
import { UserSkills } from "resume-app";
import { GET_USER_SKILLS } from "../db/queries";
import { logger } from "../utils/logger";
import { apiResponse } from "../utils/response";
import { BaseController } from "./base-controller";

export class SkillsController extends BaseController {
    public constructor () {
        super();

        this.getSkillsByUserId = this.getSkillsByUserId.bind(this);
    }

    public async getSkillsByUserId (req: express.Request, res: express.Response): Promise<express.Response> {
        logger.debug("getSkillsByUserId");
        let connection!: mysql.PoolConnection;
        try {
            const { userId = "0" } = req.params;

            connection = await this.getDBConnection();
            const userSkills = await this.query<UserSkills[]>(connection, GET_USER_SKILLS, [Number(userId)]);

            return apiResponse(res, userSkills, OK);
        } catch (error) {
            this.releaseConnection(connection);
            return res.status(GONE).send({ success: true, message: getStatusText(GONE) });
        }
    }
}
