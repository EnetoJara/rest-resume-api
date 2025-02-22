import { ExecException } from 'child_process';
import * as winston from "winston";

const { colorize, combine, timestamp, label, printf, json } = winston.format;
const custom = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        http: 5
    },
    colors: {
        error: "red",
        warn: "orange",
        info: "white bold yellow",
        verbose: "blue",
        debug: "green",
        http: "pink"
    }
};
const { NODE_ENV } = process.env;

winston.addColors(custom.colors);
export const myFormat = printf((info) => `[${info.timestamp}] [${info.level}] [38;5;13m[1m=>[22m[39m ${info.message}`);

export const logger = winston.createLogger({
    levels: custom.levels,
    level: NODE_ENV === "production" ? "error" : "debug",
    format: combine(
        label({ label: "order-api errors" }),
        timestamp(),
        colorize({ colors: custom.colors }),

        json(),
        myFormat
    ),

    transports: [
        new winston.transports.File({ filename: "info.log", level: "debug" }),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.Console({ level: NODE_ENV === "production" ? "error" : "debug" })
    ]
});

export function displayError (error: ExecException): void {
    Object.keys(error).forEach((key) => logger.debug(`${error[key]}`));
}
