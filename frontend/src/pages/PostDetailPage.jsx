import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import CommentItem from "../components/CommentItem";

export default function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  function loadComments() {
    api.listComments(id).then(setComments).catch((e) => setError(e.message));
  }

  useEffect(() => {
    api.getPost(id).then(setPost).catch((e) => setError(e.message));
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleDeletePost() {
    if (!confirm("Delete this post?")) return;
    await api.deletePost(id);
    navigate("/");
  }

  async function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    await api.createComment({ post: Number(id), content: newComment });
    setNewComment("");
    loadComments();
  }

  if (error) return <p className="error">{error}</p>;
  if (!post) return <p>Loading...</p>;

  const isOwner = user && post.author === user.id;

  return (
    <div>
      <h1>{post.title}</h1>
      <p className="meta">
        by {post.author_username} · {new Date(post.created_at).toLocaleString()}
      </p>
      <p className="post-content">{post.content}</p>

      {isOwner && (
        <div className="post-actions">
          <Link to={`/posts/${id}/edit`} className="button">
            Edit
          </Link>
          <button onClick={handleDeletePost}>Delete</button>
        </div>
      )}

      <h2>Comments</h2>
      <ul className="comment-list">
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} onChanged={loadComments} />
        ))}
        {comments.length === 0 && <p>No comments yet.</p>}
      </ul>

      <form onSubmit={handleAddComment} className="comment-form">
        <textarea
          rows={3}
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}
