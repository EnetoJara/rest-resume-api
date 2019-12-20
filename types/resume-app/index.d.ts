/// <reference types="mysql" />


declare module "resume-app" {

    interface FieldPacket {
        catalog: string;
        db: string;
        table: string;
        orgTable: string;
        name: string;
        orgName: string;
        charsetNr: number;
        length: number;
        type: number;
        flags: number;
        decimals: number;
        default: undefined;
        zeroFill: boolean;
        protocol41: boolean;
    }

    interface Roles {
        id: number,
        role: string,
        created_at: Date
    }

    interface OkPacket {
        fieldCount: number,
        affectedRows: number,
        insertId: number,
        serverStatus: number,
        warningCount: number,
        message: string,
        protocol41: boolean,
        changedRows: number
    }

    type Rows<T> = [T[], OkPacket]


    import PoolConnection, { PoolConfig } from "mysql";
    import { BuildOptions, Model, Sequelize } from "sequelize";

    interface ErrorArray {
        [x: string]: string;
    }

    interface JwtError {
        name: string;
        message: string;
        expireAt: Date;
    }

    interface UserRegister {
        id?: number;
        email: string;
        password: string;
        password2: string;
        name: string;
        middleName: string;
        lastName: string;
        secondLastName: string;
    }

    interface LoginCredentials {
        email: string;
        password: string;
    }

    interface LoginResponse {
        id: number;
        email: string;
        name: string;
        middleName: string;
        lastName: string;
        secondLastName: string;
        success: boolean;
        token: string;
    }

    interface UserAttributes {
        id?: number;
        firstName: string;
        email: string;
        password: string;
        secondName: string;
        lastName: string;
        secondLastName: string;
        active: boolean;
        createdAt?: Date;
    }
    interface UserModel extends Model<UserAttributes>, UserAttributes { }
    class User extends Model<UserModel, UserAttributes> { }

    type UserStatic = typeof Model & {
        new(values?: object, options?: BuildOptions): UserModel;
    };


    interface CourseAttributes {
        giver: string;
        name: string;
        from: Date;
        to: Date;
        certificationId: string;
    }

    interface CourseModel
        extends Model<CourseAttributes>,
        CourseAttributes { }

    type CourseStatic = typeof Model & {
        new(values?: object, options?: BuildOptions): CourseModel;
    };

    interface DBPool extends PoolConnection { };
    type PoolConnector = typeof PoolConnection & {
        new(opts: PoolConfig): DBPool;
    }

    interface EducationAttributes {
        id: number;
        subject: string;
        institute: string;
        description: string;
        createdAt?: Date;
        updatedAt?: Date;
    }
    interface EducationModel
        extends Model<EducationAttributes>,
        EducationAttributes { }

    type EducationStatic = typeof Model & {
        new(values?: object, options?: BuildOptions): EducationModel;
    };


    interface ExperienceAttributes {
        id: number;
        role: string;
        project: string;
        description: string;
        directBossName: string;
        directBossEmail: string;
        directBossPhone: string;
        createdAt?: Date;
        updatedAt?: Date;
    }
    interface ExperienceModel
        extends Model<ExperienceAttributes>,
        ExperienceAttributes { }

    type ExperienceStatic = typeof Model & {
        new(values?: object, options?: BuildOptions): ExperienceModel;
    };


    interface FieldsAttributes {
        field: string;
    }

    interface FieldsModel
        extends Model<FieldsAttributes>,
        FieldsAttributes { }

    type FieldsStatic = typeof Model & {
        new(values?: object, options?: BuildOptions): FieldsModel;
    };

    interface GeneralAttributes {
        id: number;
        about: string;
        hasCar: boolean;
        isTraveler: boolean;
        from: string;
        birth: Date;
        children: number;
        city: string;
        state: string;
        gender: string;
        angaged: boolean;
        createdAt?: Date;
        updatedAt?: Date;
    }

    interface GeneralModel
        extends Model<GeneralAttributes>,
        GeneralAttributes { }

    type GeneralStatic = typeof Model & {
        new(values?: object, options?: BuildOptions): GeneralModel;
    };


    interface SkillsTypeAttributes {
        name: string;
    }

    interface SkillsTypeModel
        extends Model<SkillsTypeAttributes>,
        SkillsTypeAttributes { }

    type SkillsTypeStatic = typeof Model & {
        new(values?: object, options?: BuildOptions): SkillsTypeModel;
    };


    interface SkillsAttributes {
        skill: string;
    }

    interface SkillsModel
        extends Model<SkillsAttributes>,
        SkillsAttributes { }

    type SkillsStatic = typeof Model & {
        new(values?: object, options?: BuildOptions): SkillsModel;
    };
    interface SocialMediaAttributes {
        name: string;
        url: string;
        icon: string;
    }

    interface SocialMediaModel
        extends Model<SocialMediaAttributes>,
        SocialMediaAttributes { }

    type SocialMediaStatic = typeof Model & {
        new(values?: object, options?: BuildOptions): SocialMediaModel;
    };
    interface DB {
        sequelize: Sequelize;
        User: UserStatic;
        Skills: SkillsStatic;
        SkillsType: SkillsTypeStatic;
        Experience: ExperienceStatic;
        Education: EducationStatic;
        Course: CourseStatic;
        General: GeneralStatic;
        SocialMedia: SocialMediaStatic;
        FieldsOfInterest: FieldsStatic;
    }

}
