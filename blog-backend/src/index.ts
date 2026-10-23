import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database";
import "./modules/posts/post.model";
import postRoutes from "./modules/posts/post.route";
import "./modules/comments/comment.model";

import { commentsOnPost, commentRouter } from "./modules/comments/comment.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);

app.use("/posts/:id/comments", commentsOnPost);
app.use("/posts", postRoutes);
app.use("/comments", commentRouter);

app.get("/", (req, res) => {
  res.json({ message: "Blog API is running" });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");

    await sequelize.sync();
    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
};

startServer();