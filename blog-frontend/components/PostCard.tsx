import Link from "next/link";
import { Post } from "@/types";

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2">
          {post.title}
        </h2>
      </Link>

      
      <div className="text-sm text-gray-500 mb-3">
        <span className="font-medium">{post.author}</span>
        <span className="mx-2">·</span>
        <span>{new Date(post.createdAt).toLocaleDateString("vi-VN")}</span>
      </div>

     
      <p className="text-gray-700 mb-4 line-clamp-3">
        {post.content}
      </p>

    
      <Link
        href={`/posts/${post.id}`}
        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        Xem chi tiết →
      </Link>
    </article>
  );
}