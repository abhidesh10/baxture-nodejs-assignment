import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  static getAllUsers(req: Request, res: Response): void {
    res.status(200).json(UserService.getAllUsers());
  }
}
