import bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { LoginResponse, UserModel } from "resume-app";
import { privateKey, publicKEY } from "../index";
/**
 * Generates an encripted password for the user.
 *
 * @param {string} password - string of characters given by the user.
 * @param {number} salt - The cost of proccessing the data.
 * @returns {Promise<string>} encripted - password encripted.
 */
export function encriptPassword (password: string, salt: number): Promise<string> {
    return bcrypt
        .genSalt(salt)
        .then((salted: string) => bcrypt.hash(password, salted))
        .then((encripted: string) => encripted)
        .catch((error: Error) => {
            throw error;
        });
}
/**
 * Compares the encrypted password from db with the one gived by the client.
 *
 * @param {string} encrypted - encrypted password from db.
 * @param {string} text - password in plain text.
 * @returns {Promise<boolean>} true if both passwords match.
 */
export function isEqualsPassword (encrypted: string, text: string): Promise<boolean> {
    return bcrypt.compare(text, encrypted);
}
/**
 * Creates a new token for the user that just had login.
 *
 * @param {TokenModel} userData - user's information.
 * @returns {string} token - user's encrypted information.
 */
export function createToken (userData: LoginResponse): string {
    return sign(userData, privateKey, { algorithm: "HS512", expiresIn: "1d" });
}
/**
 * Verifies if the given token is valid.
 *
 * @param {string} token - user's encrypted info.
 * @returns {(UserModel | string)} token - user's encrypted information.
 */
export function validateToken (token: string): UserModel | string {
    return <UserModel>verify(token, publicKEY, { algorithms: ["HS512"]});
}
