import { Request, Response } from "express";
import Post from "./post.model";
import { Op } from "sequelize";

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const search = (req.query.search as string) || "";


        // Tạo điều kiện where
        const where = search
            ? { title: { [Op.like]: `%${search}%` } } //search đã được fe truyền xuống từ khóa để tìm
            : {};


        const { count, rows } = await Post.findAndCountAll({
            where,
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });


        res.json({
            data: rows,
            pagination: {
                total: count,
                page: page,
                limit: limit,
                totalPages: Math.ceil(count / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByPk(req.params.id as string);

        if (!post) {
            return res.status(404).json({ message: "Không tìm thấy bài viết" })
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Tiêu đề và nội dung là bắt buộc" });
        }
        const post = await Post.create({ title, content, author });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByPk(req.params.id as string);
        if (!post) {
            return res.status(404).json({ message: "không tìm thấy bài viết" });
        }
        await post.update(req.body);
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findByPk(req.params.id as string);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        await post.destroy();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};