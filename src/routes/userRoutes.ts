import express from "express";

import { UserController } from "../controllers/userController";
import {
  validateRequestBody,
  validateUserRequest,
} from "../middleware/userValidationMiddleware";

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.post("/", validateRequestBody, UserController.createUser);
router.get("/:userId", validateUserRequest, UserController.getUserById);
router.put(
  "/:userId",
  validateUserRequest,
  validateRequestBody,
  UserController.updateUser
);
router.delete("/:userId", validateUserRequest, UserController.deleteUser);

export default router;
