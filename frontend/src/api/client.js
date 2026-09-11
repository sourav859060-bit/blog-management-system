const API_BASE = "http://127.0.0.1:8000/api";


function getTokens() {
  const local = localStorage.getItem("tokens");
  if (local) return JSON.parse(local);
  const session = sessionStorage.getItem("tokens");
  return session ? JSON.parse(session) : null;
}

export function setTokens(tokens, remember = true) {
  if (remember) {
    localStorage.setItem("tokens", JSON.stringify(tokens));
    sessionStorage.removeItem("tokens");
  } else {
    sessionStorage.setItem("tokens", JSON.stringify(tokens));
    localStorage.removeItem("tokens");
  }
}

export function clearTokens() {
  localStorage.removeItem("tokens");
  sessionStorage.removeItem("tokens");
}

async function request(path, options = {}) {
  const tokens = getTokens();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (tokens?.access) {
    headers["Authorization"] = `Bearer ${tokens.access}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.detail || JSON.stringify(data) || res.statusText;
    throw new Error(message);
  }
  return data;
}

export const api = {
  login: (username, password) =>
    request("/login/", { method: "POST", body: JSON.stringify({ username, password }) }),

  me: () => request("/accounts/me/"),

  adminCreateUser: (payload) =>
    request("/accounts/create-user/", { method: "POST", body: JSON.stringify(payload) }),

  listPosts: () => request("/posts/"),
  getPost: (id) => request(`/posts/${id}/`),
  createPost: (payload) => request("/posts/", { method: "POST", body: JSON.stringify(payload) }),
  updatePost: (id, payload) =>
    request(`/posts/${id}/`, { method: "PATCH", body: JSON.stringify(payload) }),
  deletePost: (id) => request(`/posts/${id}/`, { method: "DELETE" }),

  listComments: (postId) => request(`/comments/?post=${postId}`),
  createComment: (payload) =>
    request("/comments/", { method: "POST", body: JSON.stringify(payload) }),
  updateComment: (id, payload) =>
    request(`/comments/${id}/`, { method: "PATCH", body: JSON.stringify(payload) }),
  deleteComment: (id) => request(`/comments/${id}/`, { method: "DELETE" }),
};