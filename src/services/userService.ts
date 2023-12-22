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

  static async getUserById(userId: string): Promise<User | undefined> {
    try {
      const user = await users.find((user) => user.id === userId);

      return user;
    } catch (error) {
      console.error(`Error fetching user by ID: ${userId}`, error);
      throw new Error("Failed to fetch user by ID.");
    }
  }

  static async updateUser(
    userId: string,
    updatedUser: User
  ): Promise<User | null> {
    try {
      const index = await users.findIndex((user) => user.id === userId);

      let userData: User | null = null;

      if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        userData = users[index];
      }

      return userData;
    } catch (error) {
      console.error(`Error updating user by ID: ${userId}`, error);
      throw new Error("Failed to update user by ID.");
    }
  }

  static deleteUser(userId: string): boolean {
    try {
      const index = users.findIndex((user) => user.id === userId);

      let result: boolean = false;

      if (index !== -1) {
        users.splice(index, 1);
        result = true;
      }

      return result;
    } catch (error) {
      console.error(`Error while deleting user ID: ${userId}`, error);
      throw new Error("Failed to delete user by ID.");
    }
  }
}
