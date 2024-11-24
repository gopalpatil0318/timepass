import express from "express";
import dotenv from "dotenv";
import dbConnect from "../config/database.js";
import subjectRoutes from "../routes/subjectRoutes.js";
import practicalRoutes from "../routes/practicalRoutes.js";
import userRoutes from "../routes/userRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


dbConnect();

app.use("/api/v1", subjectRoutes);
app.use("/api/v1", practicalRoutes);
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
