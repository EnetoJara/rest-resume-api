import { ErrorArray, JwtError, LoginCredentials, UserRegister } from "resume-app";
import { isAlpha, isAlphanumeric, isEmail, isEmpty, isLength } from "validator";
import { logger } from "./logger";
/**
 * Middleware that validates the login credentials of a user.
 *
 * @param {LoginCredentials} credentials - email and password of the user.
 * @returns {Array} array of errors found
 */

export function validateLogin (credentials: LoginCredentials): Array<ErrorArray> {
    logger.info("validateLogin");
    const errors = new Array<ErrorArray>();
    const { email = "", password = "" } = credentials;

    if (isEmpty(email)) {
        errors.push({ email: "email is required" });
    } else if (!isEmail(email)) {
        errors.push({ email: "please provide a valid email" });
    }
    if (isEmpty(password)) {
        errors.push({ password: "password is required" });
    } else if (!isLength(password, { min: 5, max: 15 })) {
        errors.push({ password: "passwords must be from 5 to 15 characters" });
    }

    return errors;
}
/**
 * Validates if the client input to save a new user is valid.
 *
 * @param {UserRegister} user - User Model.
 * @returns {Array} array - of errors found.
 */
export function validateUserRegistration (user: UserRegister): Array<ErrorArray> {
    const errors = new Array<ErrorArray>();
    const {
        email = "",
        password = "",
        password2 = "",
        name = "",
        middleName = "",
        lastName = "",
        secondLastName = ""
    } = user;

    if (isEmpty(email)) {
        errors.push({ email: "email is required" });
    } else if (!isEmail(email)) {
        errors.push({ email: "invalid format" });
    }
    if (isEmpty(password)) {
        errors.push({ password: "password is required" });
    } else if (!isLength(password, { min: 5, max: 15 })) {
        errors.push({
            password: "password should be from 5 to 15 characters long"
        });
    } else if (!isAlphanumeric(password)) {
        errors.push({ password: "password should be alphanumeric" });
    } else if (password !== password2) {
        errors.push({ password2: "passwords  must match" });
    }
    if (isEmpty(name)) {
        errors.push({ name: "name is Required" });
    } else if (!isAlpha(name)) {
        errors.push({
            name: "is you a rotob, how come you dont have an standard name"
        });
    } else if (!isLength(name, { min: 1, max: 50 })) {
        errors.push({ name: "name must be less than 50 chars" });
    }
    if (!isEmpty(middleName) && !isAlpha(middleName)) {
        errors.push({
            middleName: "middlename should be valid"
        });
    } else if (!isEmpty(middleName) && !isLength(middleName, { min: 1, max: 50 })) {
        errors.push({
            middleName: "middlename should not be greater than 50 characters"
        });
    }
    if (isEmpty(lastName)) {
        errors.push({ lastName: "lastName is Required" });
    } else if (!isAlpha(lastName)) {
        errors.push({
            lastName: "is you a rotob, how come you dont have an standard lastName"
        });
    } else if (!isLength(lastName, { min: 1, max: 50 })) {
        errors.push({ lastName: "name must be less than 50 chars" });
    }
    if (!isEmpty(secondLastName) && !isAlpha(secondLastName)) {
        errors.push({
            secondLastName: "is you a rotob, how come you dont have an standard lastName"
        });
    } else if (!isEmpty(secondLastName) && !isLength(secondLastName, { min: 1, max: 50 })) {
        errors.push({ secondLastName: "must be less than 50 chars" });
    }

    return errors;
}
/**
 * Determines whether token expired.
 *
 * @param {JwtError} error - object that migth contain the properties of jwt.
 * @returns {boolean} true if token died.
 */
export function isTokenExpired (error: JwtError): boolean {
    return ((error || {}).name || "") === "TokenExpiredError";
}
/**
 * Checks if the given input is a number.
 *
 * @param {*} param - input value.
 * @returns {boolean} `true` if the input is number.
 */
export function isNumber (param: number): boolean {
    return Number(param) === Number(param);
}
