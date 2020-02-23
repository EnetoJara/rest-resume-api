import { SkillAtttributes } from "resume-app";

export class SkillsModel implements SkillAtttributes {
    public id: number;
    public skill: string;
    public percentage: number;
    public years: number;
    public idUsers: number;

    public constructor (skill: SkillAtttributes) {
        this.id = skill.id;
        this.skill = skill.skill;
        this.percentage = skill.percentage;
        this.years = skill.years;
        this.idUsers = skill.idUsers;
    }
}
