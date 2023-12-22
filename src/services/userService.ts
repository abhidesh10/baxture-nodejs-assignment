import { v4 as uuidv4 } from "uuid";

import { User } from "../models/user";

const users: User[] = [];

export class UserService {
  static getAllUsers(): User[] {
    return users;
  }

  static createUser(user: Omit<User, "id">): User {
    try {
      const newUser: User = { id: uuidv4(), ...user };
      users.push(newUser);

      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user.");
    }
  }
}
