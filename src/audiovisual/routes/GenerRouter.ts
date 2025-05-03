import { Router } from "express";
import { FormatGenerController } from "../infrastructure/controller/FormatGenerController";

const generRouter = Router();
const generController = new FormatGenerController();

generRouter.get('/', (req, res) => {
    generController.getGeners(req, res);
});

export default generRouter;