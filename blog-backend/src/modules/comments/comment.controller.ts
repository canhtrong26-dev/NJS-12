import { Request, Response } from "express";
import Comment from "./comment.model";
import Post from "../posts/post.model";


export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByPk(postId as string);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Comment.findAndCountAll({
      where: { postId },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};



export const createComment = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { author, content } = req.body;

    const post = await Post.findByPk(postId as string);
    if (!post) {
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }

    if (!content) {
      return res.status(400).json({ message: "Nội dung bình luận là bắt buộc" });
    }

    const comment = await Comment.create({ postId, author, content });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findByPk(req.params.id as string);

    if (!comment) {
      return res.status(404).json({ message: "Không tìm thấy bình luận" });
    }

    await comment.destroy();
    res.json({ message: "Xóa bình luận thành công" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};