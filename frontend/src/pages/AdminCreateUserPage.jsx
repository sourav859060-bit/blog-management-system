import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("That username or password doesn't match our records.");
    }
  }

  return (
    <div className="auth-screen">
      <aside className="auth-masthead">
        <div className="auth-masthead-inner">
          <p className="auth-kicker">Vol. I</p>
          <h1>
            The
            <br />
            Ledger
          </h1>
          <p className="auth-tagline">
            Write it down. Publish it. Let the room argue about it.
          </p>
        </div>
      </aside>

      <main className="auth-form-side">
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <h2>Sign in</h2>
          <p className="auth-sub">Pick up where you left off.</p>

          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit">Sign in</button>
        </form>
      </main>
    </div>
  );
}