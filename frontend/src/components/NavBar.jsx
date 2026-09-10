import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Blog Management System
      </Link>
      <div className="nav-links">
        {user ? (
          <>
            <span>Hi, {user.username}</span>
            {user.is_staff && <Link to="/admin/create-user">Create user</Link>}
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <Link to="/login">Log in</Link>
        )}
      </div>
    </nav>
  );
}
