import { Request, Response } from "express";

import { UserService } from "../services/userService";

export class UserController {
  static getAllUsers(req: Request, res: Response): void {
    console.log("inside getAll");

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

  static async getUserById(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
}
