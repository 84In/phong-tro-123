import express from "express";
import * as priceController from "../controllers/area";

const router = express.Router();

router.get("/all", priceController.getAreas);

export default router;
