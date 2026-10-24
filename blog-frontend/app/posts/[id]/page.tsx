"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { getPostById, getCommentByPostId,createComment  } from "@/lib/api";

import CommentCard from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import Pagination from "@/components/Pagination";

export default function PostDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Fetch chi tiết post
  const { data: post, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });


  const [commentPage, setCommentPage] = useState(1);
  const commentLimit = 5;

    const { data: commentsData } = useQuery({
        queryKey: ["comments", id, commentPage], //data thay đổi sẽ refetch lại
        queryFn: () => getCommentByPostId(id, commentPage, commentLimit),
    });


        // QueryClient dùng để refetch sau khi thêm comment
    const queryClient = useQueryClient();

    // tạo comment mới
    const createCommentMutation = useMutation({
    mutationFn: (data: { author: string; content: string }) =>
        createComment(id, data), //tạo cmt
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", id] });
        // Nhảy về trang 1 để thấy comment mới
        setCommentPage(1);
    },
    });

  //loading
  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">Đang tải...</div>
      </main>
    );
  }

  // Trạng thái lỗi
  if (isError || !post) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          Không tìm thấy bài viết.
        </div>
        <div className="text-center mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Quay lại trang chủ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
     
      <Link
        href="/"
        className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block"
      >
        ← Quay lại trang chủ
      </Link>

     
      <article className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {post.title}
        </h1>
        <div className="text-sm text-gray-500 mb-6">
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">·</span>
          <span>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
        </div>
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      
     
<section className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
  <h2 className="text-xl font-bold text-gray-900 mb-4">
    Bình luận {commentsData && `(${commentsData.pagination.total})`}
  </h2>

  {/* Danh sách comments */}
  {commentsData && commentsData.data.length === 0 ? (
    <div className="text-center text-gray-500 py-6">
      Chưa có bình luận nào. Hãy là người đầu tiên!
    </div>
  ) : (
    <div>
      {commentsData?.data.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )}

  {/* Phân trang comments */}
  {commentsData && commentsData.pagination.totalPages > 1 && (
    <Pagination
      currentPage={commentPage}
      totalPages={commentsData.pagination.totalPages}
      onPageChange={(newPage) => setCommentPage(newPage)}
    />
  )}
</section>


<CommentForm
  onSubmit={(data) => createCommentMutation.mutate(data)}
  isSubmitting={createCommentMutation.isPending}
/>
    </main>
  );
}