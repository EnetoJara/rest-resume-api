import { Response } from "express";

import { getStatusText, NOT_ACCEPTABLE } from "http-status-codes";

/**
 * @description Apis response
 *
 * @template {*} T - type of data.
 * @param {Response} res - HTTP Response.
 * @param {T} data - payload of data requested by the client.
 * @param {number} statusCode - number that tells the client what was the result of its petition.
 * @returns response
 */
export function apiResponse<T> (res: Response, data: T, statusCode: number): Response {
    return res.format({
        json: () => {
            res.type("application/json");
            res.status(statusCode).send(data);
        },
        default: () => {
            res.status(NOT_ACCEPTABLE).send(getStatusText(NOT_ACCEPTABLE));
        }
    });
}
