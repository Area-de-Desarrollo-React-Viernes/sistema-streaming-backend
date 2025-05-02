import { Router } from "express";
import { ContentUserController } from "../infrastructure/controller/ContentUserController";
import { saveImageFromUrlSupabase } from "../../shared/infrastructure/images/SaveImageUrlSupabase";

const contentUserRouter = Router();
const contentUserController = new ContentUserController()

contentUserRouter.get('/popular', (req, res) => {
    contentUserController.popularContent(req, res);
});
contentUserRouter.get('/random-popular', (req, res) => {
    contentUserController.randomPopular(req, res);
});
contentUserRouter.get('', (req, res) => {
    contentUserController.filterContentPaginate(req, res);
});
export default contentUserRouter;