import { Request, Response } from "express";

import { UserService } from "../services/userService";

export class UserController {
  static getAllUsers(req: Request, res: Response): void {
    res.status(200).json(UserService.getAllUsers());
  }

  static createUser(req: Request, res: Response): void {
    const user = {
      username: req.body.username,
      age: req.body.age,
      hobbies: req.body.hobbies,
    };

    const newUser = UserService.createUser(user);

    res.status(201).json(newUser);
  }
}
