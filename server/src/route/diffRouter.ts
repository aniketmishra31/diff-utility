import { Router } from "express";
import { diffController } from "../controller/diffController";
const router = Router();

router.post("/", diffController);

export default router;