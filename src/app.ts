import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/users", userRoutes);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    error: "Sorry, the page you requested could not be found.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
