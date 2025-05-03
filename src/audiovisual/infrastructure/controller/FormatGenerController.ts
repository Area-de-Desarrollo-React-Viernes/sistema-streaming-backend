import { Request, Response } from "express";
import { FormatContainer } from "../../../shared/infrastructure/container/FormatContainer";
import { HandlerException } from "../../../shared/domain/HandlerException";
import { responseException } from "../../../shared/utils/ResponseException";
import { GenerContainer } from "../../../shared/infrastructure/container/GenerContainer";

export class FormatGenerController {
    async getFormats(req: Request, res: Response) {
        try {
            const data = await FormatContainer.getFormats.run();
            res.status(200).json({
                success: true,
                data
            });
        } catch (error: HandlerException | any) {
            responseException(res, error);
        }
    }
    async getGeners(req: Request, res: Response) {
        try {
            const data = await GenerContainer.getGeners.run();
            res.status(200).json({
                success: true,
                data
            });
        } catch (error: HandlerException | any) {
            responseException(res, error);
        }
    }
}