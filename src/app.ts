import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";

// Load environment variables from .env file
dotenv.config({ path: `.env.${process.env.NODE_ENV || "example"}` });

const app = express();

// Log worker ID and requested URL for each incoming request
app.use((req, res, next) => {
  console.log(
    `Worker ${process.pid} handling request for ${req.method} ${req.url}`
  );
  next();
});
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    error: "Sorry, the page you requested could not be found.",
  });
});

// Handle 500 errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Sorry, something went wrong on our end. Please try again later.",
  });
});

export default app;
