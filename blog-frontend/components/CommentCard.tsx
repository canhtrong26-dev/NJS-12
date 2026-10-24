"use client";

import { Comment } from "@/types";

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">

      <div className="text-sm text-gray-500 mb-2">
        <span className="font-medium text-gray-700">{comment.author}</span>
        <span className="mx-2">·</span>
        <span>{new Date(comment.createdAt).toLocaleDateString("vi-VN")}</span>
      </div>

     
      <div className="text-gray-700 whitespace-pre-wrap">
        {comment.content}
      </div>
    </div>
  );
}