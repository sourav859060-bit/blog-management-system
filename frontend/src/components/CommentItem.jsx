import { useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function CommentItem({ comment, onChanged }) {
  const { user } = useAuth();
  const isOwner = user && comment.author === user.id;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.content);

  async function save() {
    await api.updateComment(comment.id, { content: text });
    setEditing(false);
    onChanged();
  }

  async function remove() {
    if (!confirm("Delete this comment?")) return;
    await api.deleteComment(comment.id);
    onChanged();
  }

  return (
    <li className="comment">
      <p className="meta">
        {comment.author_username} · {new Date(comment.created_at).toLocaleString()}
      </p>
      {editing ? (
        <div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} />
          <button onClick={save}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <p>{comment.content}</p>
      )}
      {isOwner && !editing && (
        <div className="comment-actions">
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={remove}>Delete</button>
        </div>
      )}
    </li>
  );
}
