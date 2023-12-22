import express from "express";

import { UserController } from "../controllers/userController";
import { validateRequestBody } from "../middleware/userValidationMiddleware";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.post("/", validateRequestBody, UserController.createUser);

export default router;
