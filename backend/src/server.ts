import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/database";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use(
  "/api/users",
  userRoutes
);
app.use("/api/admin", adminRoutes);
app.use("/api/uploads", uploadRoutes);

app.get("/", (req, res) => {
  res.send("SportConnect API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
