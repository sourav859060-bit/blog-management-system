import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(username, password, remember);
      navigate("/");
    } catch (err) {
      setError("That username or password doesn't match our records.");
    }
  }

  return (
    <div className="glass-screen">
      <form onSubmit={handleSubmit} className="glass-card" noValidate>
        <h1>Login</h1>

        <label className="glass-field">
          <span>Username</span>
          <div className="glass-input">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            <User size={18} strokeWidth={1.75} />
          </div>
        </label>

        <label className="glass-field">
          <span>Password</span>
          <div className="glass-input">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <Lock size={18} strokeWidth={1.75} />
          </div>
        </label>

        <label className="glass-remember">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>

        {error && (
          <p className="glass-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}