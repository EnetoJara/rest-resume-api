import { Request, Response } from "express";
import { getStatusText, INTERNAL_SERVER_ERROR, OK } from "http-status-codes";
import { SkillsService } from "../services/skills-service";
import { logger } from "../utils/logger";
import { isNumber } from "../utils/validator";
/**
 *
 *
 * @export
 * @class SkillsController
 */
export class SkillsController {
  private skillsService: SkillsService;
  /**
   *Creates an instance of SkillsController.
   * @param {SkillsService} service
   * @memberof SkillsController
   */
  public constructor (service: SkillsService) {
      this.skillsService = service;
      this.getAllSkills = this.getAllSkills.bind(this);
      this.getSkillsByType = this.getSkillsByType.bind(this);
  }
  /**
   *
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>}
   * @memberof SkillsController
   */
  public async getAllSkills (req: Request, res: Response): Promise<Response> {
      try {
          const skills = await this.skillsService.getAll();

          return res.status(OK).send({ suucess: true, message: getStatusText(OK), skills });
      } catch (error) {
          logger.error("ERROR", { meta: error });

          return res.status(INTERNAL_SERVER_ERROR).send({ succes: false, message: getStatusText(INTERNAL_SERVER_ERROR) });
      }
  }

  /**
   *
   *
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>}
   * @memberof SkillsController
   */
  public async getSkillsByType (req: Request, res: Response): Promise<Response> {
      try {
          const { id } = req.params;
          const num = Number(id);
          const isNum = isNumber(num) ? num : 0;
          const skills = await this.skillsService.getSkillsByType(isNum);

          return res.status(OK).send({ success: true, message: getStatusText(OK), skills });
      } catch (error) {
          logger.error("ERROR", { meta: error });

          return res.status(INTERNAL_SERVER_ERROR).send({ succes: false, message: getStatusText(INTERNAL_SERVER_ERROR) });
      }
  }
}
