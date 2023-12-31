import { Request, Response } from "express";

import { UserService } from "../services/userService";
import { User } from "../models/user";

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

  static async getUserById(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    const updatedUser = {
      username: req.body.username,
      age: req.body.age,
      hobbies: req.body.hobbies,
    } as User;

    const user = await UserService.updateUser(userId, updatedUser);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }

  static deleteUser(req: Request, res: Response): void {
    const { userId } = req.params;
    const success = UserService.deleteUser(userId);

    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  }
}
