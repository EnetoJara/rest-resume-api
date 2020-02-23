import { UserAttributes } from "resume-app";

export class UserModel implements UserAttributes {
    public id?: number;
    public firstName: string;
    public email: string;
    public password: string;
    public secondName: string;
    public lastName: string;
    public secondLastName: string;
    public active: boolean;
    public createdAt?: Date;
    public idRole: number;

    public constructor (user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.email = user.email;
        this.password = user.password;
        this.secondName = user.secondName;
        this.lastName = user.lastName;
        this.secondLastName = user.secondLastName;
        this.active = user.active;
        this.idRole = user.idRole;
        this.createdAt = user.createdAt;
    }
}
