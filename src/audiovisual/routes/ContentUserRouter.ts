import { Router } from "express";
import { ContentUserController } from "../infrastructure/controller/ContentUserController";

const contentUserRouter = Router();
const contentUserController = new ContentUserController()

contentUserRouter.get('/popular', (req, res) => {
    contentUserController.popularContent(req, res);
});

export default contentUserRouter;