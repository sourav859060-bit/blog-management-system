import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";

export default function PostFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      api.getPost(id).then((post) => {
        setTitle(post.title);
        setContent(post.content);
      });
    }
  }, [id, isEdit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      if (isEdit) {
        await api.updatePost(id, { title, content });
        navigate(`/posts/${id}`);
      } else {
        const post = await api.createPost({ title, content });
        navigate(`/posts/${post.id}`);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>{isEdit ? "Edit post" : "New post"}</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Content
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">{isEdit ? "Save changes" : "Publish"}</button>
      </form>
    </div>
  );
}
