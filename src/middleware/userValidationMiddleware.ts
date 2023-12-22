import { Request, Response, NextFunction } from "express";

import { User } from "../models/user";

export function validateRequestBody(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { username, age, hobbies } = req.body as User;

  if (
    typeof username === "string" &&
    typeof age === "number" &&
    Array.isArray(hobbies) &&
    hobbies.every((hobby) => typeof hobby === "string")
  ) {
    next();
    return;
  }

  res.status(400).json({
    error:
      "Invalid data body. Ensure all fields are present and have correct types.",
  });
}
