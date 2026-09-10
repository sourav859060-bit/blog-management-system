import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    api.listPosts().then(setPosts).catch((e) => setError(e.message));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>All posts</h1>
        <Link to="/posts/new" className="button">
          + New post
        </Link>
      </div>
      {error && <p className="error">{error}</p>}
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
            <p className="meta">
              by {post.author_username}
              {user && post.author === user.id ? " (you)" : ""} ·{" "}
              {new Date(post.created_at).toLocaleString()}
            </p>
            <p>{post.content.slice(0, 140)}{post.content.length > 140 ? "..." : ""}</p>
          </li>
        ))}
        {posts.length === 0 && !error && <p>No posts yet. Be the first to write one!</p>}
      </ul>
    </div>
  );
}
