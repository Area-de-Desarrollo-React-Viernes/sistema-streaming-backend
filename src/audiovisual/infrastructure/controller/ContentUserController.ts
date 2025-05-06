import { Request, Response } from "express";
import { HandlerException } from "../../../shared/domain/HandlerException";
import { responseException } from "../../../shared/utils/ResponseException";
import { ContentUserContainer } from "../../../shared/infrastructure/container/ContentUserContainer";

export class ContentUserController {
    async popularContent(req: Request, res: Response): Promise<void> {
        try {
            const data = await ContentUserContainer.popularContent.run();
            res.status(200).json({
                success: true,
                data
            });
        } catch (error: HandlerException | any) {
            responseException(res, error);
        }
    }
    async randomPopular(req: Request, res: Response): Promise<void> {
        try {
            const data = await ContentUserContainer.randomPopular.run();
            res.status(200).json({
                success: true,
                data
            });
        } catch (error: HandlerException | any) {
            responseException(res, error);
        }
    }
    async filterContentPaginate(req: Request, res: Response): Promise<void> {
        try {
            const gener = (req.query.gener as string) ?? null;
            const format = (req.query.format as string) ?? null;
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const title = (req.query.title as string) ?? null;
            const data = await ContentUserContainer.filterContentPaginate.run(gener, format, title, limit, page);
            res.status(200).json({
                success: true,
                data
            });
        } catch (error: HandlerException | any) {
            responseException(res, error);
        }
    }
    async getContent(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            const data = await ContentUserContainer.getContent.run(id);
            res.status(200).json({
                success: true,
                data
            });
        } catch (error: HandlerException | any) {
            responseException(res, error);
        }
    }
    async getFranchise(req: Request, res: Response): Promise<void> {
        try{
            const id = parseInt(req.params.id);
            const data = await ContentUserContainer.getFranchiseConetents.run(id);
            res.status(200).json({
                success: true,
                data
            });
        }catch(error: HandlerException | any) {
            responseException(res, error);
        }
    }
}