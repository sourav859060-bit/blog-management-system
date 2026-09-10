import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import RequireAuth from "./components/RequireAuth";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostFormPage from "./pages/PostFormPage";
import AdminCreateUserPage from "./pages/AdminCreateUserPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <PostListPage />
                </RequireAuth>
              }
            />
            <Route
              path="/posts/new"
              element={
                <RequireAuth>
                  <PostFormPage />
                </RequireAuth>
              }
            />
            <Route
              path="/posts/:id"
              element={
                <RequireAuth>
                  <PostDetailPage />
                </RequireAuth>
              }
            />
            <Route
              path="/posts/:id/edit"
              element={
                <RequireAuth>
                  <PostFormPage />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/create-user"
              element={
                <RequireAuth>
                  <AdminCreateUserPage />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
