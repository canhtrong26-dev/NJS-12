"use client";

import { useState, useEffect } from "react";


export default function SearchBar({
  onSearch,
}: {
  onSearch: (keyword: string) => void;
}) {
  // Lưu từ khóa user đang gõ
  const [keyword, setKeyword] = useState("");


  //chờ user ngừng gõ 500ms mới gọi onSearch 
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(keyword);
    }, 500);

    //hủy timer cũ khi user tiếp tục gõ mà chưa đạt tới 500ms
    return () => clearTimeout(timer);
  }, [keyword, onSearch]);

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} //setKeyword trong này đã được xử lí logic ở phía treen 
        placeholder="Tìm bài viết theo tiêu đề..."
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}