import { User } from "../models/user";

const users: User[] = [];

export class UserService {
  static getAllUsers(): User[] {
    return users;
  }
}
