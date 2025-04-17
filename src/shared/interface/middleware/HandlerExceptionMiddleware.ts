import { HandlerException } from "../../domain/HandlerException";
import { NextFunction, Request, Response } from "express";

export const exceptionMiddleware = (error: HandlerException, req: Request, res: Response, next: NextFunction) => {
    res.status(error.errorCode).json({
        error: {
            message: error.message,
            code: error.errorCode
        }
    });
    next();
};