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
        id: number;
        role: string;
        createdAt: Date;
    }

    interface OkPacket {
        fieldCount: number;
        affectedRows: number;
        insertId: number;
        serverStatus: number;
        warningCount: number;
        message: string;
        protocol41: boolean;
        changedRows: number;
    }

    type Rows<T> = [T, OkPacket]



    interface ErrorArray {
        [x: string]: string;
    }

    interface JwtError {
        name: string;
        message: string;
        expireAt: Date;
    }

    interface RegisterCredentials {
        email: string;
        password: string;
        password2: string;
        firstName: string;
        secondName: string;
        lastName: string;
        secondLastName: string;
        idRole: number;
    }

    interface LoginResponse {
        id?: number;
        email: string;
        firstName: string;
        secondName: string;
        lastName: string;
        secondLastName: string;
        token?: string;
    }

    interface UserExists {
        id: number;
        email: string;
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
        idRole: number;
    }

    type ToValidate = LoginCredentials | RegisterCredentials;

    interface SkillAtttributes {
        id: number;
        skill: string;
        percentage: number;
        years: number;
        idUsers: number;
    }

    interface UserSkills {
        id: number;
        skill: string;
        idUsers: number;
    }

    interface LoginCredentials {
        email: string;
        password: string;
    }

    interface UserByEmail {
        id: number;
        email: string;
        password: string;
        firstName: string;
        secondName: string;
        lastName: string;
        lastSecondName: string;
        role: number;
    }
}
