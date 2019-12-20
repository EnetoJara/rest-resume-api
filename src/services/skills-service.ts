import Bluebird from "bluebird";
import { DB, SkillsModel, SkillsTypeModel } from "resume-app";
/**
 *
 *
 * @export
 * @class SkillsService
 */
export class SkillsService {
  private db: DB;

  /**
   *Creates an instance of SkillsService.
   *
   * @param {DB} db
   * @memberof SkillsService
   */
  public constructor (db: DB) {
      this.db = db;
      this.getSkillsByType = this.getSkillsByType.bind(this);
      this.getAll = this.getAll.bind(this);
  }

  /**
   * Gets skills
   *
   * @public
   * @method SkillsService#getSkillsByType
   * @returns {SkillsTypeModel[]} skills by type
   */
  public getAll (): Bluebird<SkillsModel[]> {
      return this.db.Skills.findAll({ attributes: ["id", "skill"]}).then((res: SkillsModel[]) => res);
  }

  /**
   * Gets all skills type by skills id.
   *
   * @public
   * @method SkillsService#getSkillsByType
   * @author Ernesto Jara Olveda
   * @param {number} idSkills - identifier.
   * @returns {SkillsTypeModel[]} skills by type.
   */
  public getSkillsByType (idSkills: number): Bluebird<SkillsTypeModel[]> {
      return this.db.SkillsType.findAll({
          attributes: ["id", "name"],
          where: { skillId: idSkills }
      }).then((skills: SkillsTypeModel[]) => skills);
  }
}
