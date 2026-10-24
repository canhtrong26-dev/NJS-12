import { PaginatedResponse, Comment, Post } from "@/types";

const API_URL = "http://localhost:5000"; //dự án thực tế thì sẽ thay thế tên miền


//Lấy danh sách bài viết (có phân trang)
export async function getPosts(
    page: number,
    limit: number,
    search: string = ""
): Promise<PaginatedResponse<Post>> {
    const res = await fetch(`${API_URL}/posts?page=${page}&limit=${limit}&search=${search}`);
    if (!res.ok) throw new Error("Không thể tải các bài đăng");
    return res.json();
}


//Lấy chi tiết 1 bài viết theo ID
export async function getPostById(id: string): Promise<Post> {
    const res = await fetch(`${API_URL}/posts/$${id}`);
    if (!res.ok) throw new Error("không thể tải bài viết");
    return res.json();
}

//Lấy danh sách bình luận của 1 bài viết (có phân trang)
export async function getCommentByPostId(
    postId: string,
    page: number,
    limit: number,
): Promise<PaginatedResponse<Comment>> {
    const res = await fetch(
        `${API_URL}/posts/${postId}/comments?page=${page}&limit=${limit}`
    );
    if (!res.ok) throw new Error("không thể tải bình luận");
    return res.json();
}




//Thêm 1 bình luận mới vào bài viết
export async function createComment(
    postId: string,
    data: { author: string; content: string }
): Promise<Comment> {
    const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create comment");
    return res.json();
}