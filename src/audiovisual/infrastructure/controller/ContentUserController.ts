import { Request, Response } from "express";
import { HandlerException } from "../../../shared/domain/HandlerException";
import { responseException } from "../../../shared/utils/ResponseException";
import { ContentUserContainer } from "../../../shared/infrastructure/container/ContentUserContainer";

export class ContentUserController {
    async popularContent(req: Request, res: Response): Promise<void> {
        try{
            const data = await ContentUserContainer.popularContent.run();
            res.status(200).json({
                success: true,
                data
            });
        }catch(error: HandlerException | any){
            responseException(res, error);
        }
    }
}