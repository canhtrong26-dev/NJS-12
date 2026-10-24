"use client";

import { useState } from "react";


interface CommentFormProps {
  onSubmit: (data: { author: string; content: string }) => void;
  isSubmitting: boolean;
}

export default function CommentForm({ onSubmit, isSubmitting }: CommentFormProps) {

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  // Hàm xử lý submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Chặn trình duyệt tự reload

    if (!author.trim() || !content.trim()) {
      alert("Vui lòng nhập đầy đủ tên và nội dung");
      return;
    }

    // Gọi onSubmit truyền từ cha xuống (truyền data lên)
    onSubmit({ author: author.trim(), content: content.trim() });

    
    setAuthor("");
    setContent("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Thêm bình luận</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Tên của bạn"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

     
        <textarea
          placeholder="Viết bình luận..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

       
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi bình luận"}
          </button>
        </div>
      </form>
    </div>
  );
}