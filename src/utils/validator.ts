import { ErrorArray, JwtError, LoginCredentials, RegisterCredentials, ToValidate } from "resume-app";
import { isAlpha, isAlphanumeric, isEmail, isEmpty, isLength, isNumeric } from "validator";
import { logger } from "./logger";
import { loginMap, registerMap } from "./utility";

/**
 * Checks the payloads received from the client to see if there are some, unknown props.
 *
 * @param {ToValidate} fromClient - Object received from client.
 * @param {ToValidate} valids - Expected and only props.
 * @returns {ErrorArray[]} array with errors if any found.
 */
function notRequested (fromClient: ToValidate, valids: ToValidate): ErrorArray[] {
    return Object.keys(fromClient)
        .filter((key: string) => !valids[key])
        .map((i: string) => ({ [i]: "unknown property, please limit your self to send just the needed fields" }));
}

/**
 * Middleware that validates the login credentials of a user.
 *
 * @param {LoginCredentials} credentials - email and password of the user.
 * @returns {Array} array of errors found
 */
export function validateLogin (credentials: LoginCredentials): ErrorArray[] {
    const errors = notRequested(credentials, loginMap);

    if (errors.length > 0) {
        return errors;
    }

    const { email = "", password = "" } = credentials;

    logger.debug(`EMAIL: ${email}`);
    logger.debug(`PASSWORD: ${password}`);
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
 * @param {RegisterCredentials
 * } user - User Model.
 * @returns {Array} array - of errors found.
 */
export function validateUserRegistration (user: RegisterCredentials): ErrorArray[] {
    const errors = notRequested(user, registerMap);

    if (errors.length > 0) {
        return errors;
    }
    const {
        email = "",
        password = "",
        password2 = "",
        firstName = "",
        secondName = "",
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
    if (isEmpty(firstName)) {
        errors.push({ firstName: "name is Required" });
    } else if (!isAlpha(firstName)) {
        errors.push({
            firstName: "is you a rotob, how come you dont have an standard firstName"
        });
    } else if (!isLength(firstName, { min: 1, max: 50 })) {
        errors.push({ firstName: "name must be less than 50 chars" });
    }
    if (!isEmpty(secondName) && !isAlpha(secondName)) {
        errors.push({
            secondName: "secondName should be valid"
        });
    } else if (!isEmpty(secondName) && !isLength(secondName, { min: 1, max: 50 })) {
        errors.push({
            secondName: "secondName should not be greater than 50 characters"
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
export function isNumber (param): boolean {
    return isNumeric(param);
}
