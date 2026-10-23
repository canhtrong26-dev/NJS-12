import { Router } from "express";
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
} from "./comment.controller";


const commentsOnPost = Router({ mergeParams: true });
commentsOnPost.get("/", getCommentsByPostId);
commentsOnPost.post("/", createComment);


const commentRouter = Router();
commentRouter.delete("/:id", deleteComment);

export { commentsOnPost, commentRouter };