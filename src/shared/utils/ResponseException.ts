import { Response } from "express";
import { HandlerException } from "../domain/HandlerException";

export const responseException = (res: Response, error: HandlerException) => {
    res.status(error.errorCode || 500).json({
        error: {
            message: error.message,
            code: error.errorCode
        }
    });
}