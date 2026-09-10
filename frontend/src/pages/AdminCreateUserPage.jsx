import { useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminCreateUserPage() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!user) return null;
  if (!user.is_staff) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const created = await api.adminCreateUser({ username, email, password });
      setMessage(`User "${created.username}" created.`);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h1>Create a new user (admin only)</h1>
      <form onSubmit={handleSubmit} className="post-form">
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit">Create user</button>
      </form>
    </div>
  );
}
