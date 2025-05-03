import { Router } from "express";
import { FormatGenerController } from "../infrastructure/controller/FormatGenerController";

const formatRouter = Router();
const formatController = new FormatGenerController();

formatRouter.get('/', (req, res) => {
    formatController.getFormats(req, res);
});

export default formatRouter;