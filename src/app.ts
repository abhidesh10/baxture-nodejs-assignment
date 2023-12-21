import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
