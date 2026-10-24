"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";


export default function Home() {
  // State lưu trang hiện tại và từ khóa tìm kiếm
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  // fetch posts từ BE
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", page, search],
    queryFn: () => getPosts(page, limit,search),
  });

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Tất cả bài viết
      </h1>

      <SearchBar onSearch={(keyword) => {
        setSearch(keyword);
        setPage(1); //Khi tìm kiếm, reset về trang 1
      }} />

      
      {isLoading && (
        <div className="text-center text-gray-500 py-8">
          Đang tải bài viết...
        </div>
      )}

      
      {isError && (
        <div className="text-center text-red-500 py-8">
          Có lỗi xảy ra. Vui lòng thử lại sau.
        </div>
      )}

      {data && (
        <>
          
          {data.data.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Không tìm thấy bài viết nào.
            </div>
          ) : (
            <div className="space-y-4">
              {data.data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          
          <Pagination
            currentPage={page}
            totalPages={data.pagination.totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </main>
  );
}