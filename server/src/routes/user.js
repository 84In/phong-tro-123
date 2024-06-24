import express from "express";
import * as userController from "../controllers/user";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.use(verifyToken);
router.get("/get-current", userController.getCurrent);

export default router;
