
import { UserAttributes } from "resume-app";
export class UserModel {
        public id: number;
        public name: string;
        public email: string;
        public password: string;
        public middleName: string;
        public lastName: string;
        public secondLastName: string;
        public active: boolean;
        public createdAt?: Date;
        public constructor (user: UserAttributes) {
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
            this.password = user.password;
            this.middleName = user.middleName;
            this.lastName = user.lastName;
            this.secondLastName = user.secondLastName;
            this.active = user.active;
            this.createdAt = user.createdAt;

        }
}
