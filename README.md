# Blog Management System

A full-stack blog platform built with **Django + Django REST Framework** (backend) and **React** (frontend), built for the Delemon Technology Python Django Developer Trainee assignment.

## Features implemented

- Admin (staff) can create new user accounts via an admin-only API endpoint and the React UI.
- Users log in with a username/password and receive a JWT access/refresh token pair.
- Logged-in users can create, view, update, and delete **their own** blog posts.
- All logged-in users can view posts created by anyone.
- Users can add comments to any post, and edit/delete **their own** comments.
- Access control is enforced server-side (DRF permission classes), not just hidden in the UI — e.g. trying to delete someone else's post via the API returns `403 Forbidden`.

## Tech stack

- **Backend:** Django 6, Django REST Framework, `djangorestframework-simplejwt` for JWT auth, SQLite (zero-setup, easy to switch to Postgres/MySQL for production)
- **Frontend:** React (Vite), React Router

## Project structure

```
blog_management_system/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── seed.py
│   ├── blogproject/       # settings, urls, wsgi
│   ├── accounts/          # custom User model, admin-only create-user endpoint
│   ├── posts/             # BlogPost model + CRUD API
│   └── comments/          # Comment model + CRUD API
└── frontend/
    └── src/
        ├── api/client.js       # fetch wrapper + JWT header injection
        ├── context/AuthContext.jsx
        ├── components/         # NavBar, RequireAuth, CommentItem
        └── pages/              # Login, PostList, PostDetail, PostForm, AdminCreateUser
```

## Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # venv\Scripts\activate on Windows
pip install -r requirements.txt

python manage.py migrate
python manage.py shell < seed.py   # creates demo users + a sample post/comment
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000/`.

### Demo accounts (created by seed.py)

| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | admin    | admin123  |
| User  | alice    | alice123  |
| User  | bob      | bob123    |

The Django admin site is available at `/admin/` using the `admin` account.

## Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://127.0.0.1:5173/` and talks to the backend at `http://127.0.0.1:8000/api`. If you run the backend on a different host/port, update `API_BASE` in `frontend/src/api/client.js`.

## API overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/login/` | Log in, returns JWT access + refresh tokens |
| POST | `/api/login/refresh/` | Refresh an expired access token |
| POST | `/api/accounts/create-user/` | **Admin only** — create a new user |
| GET | `/api/accounts/me/` | Get the logged-in user's own profile |
| GET | `/api/posts/` | List all posts |
| POST | `/api/posts/` | Create a post (author = logged-in user) |
| GET/PATCH/DELETE | `/api/posts/<id>/` | View any post; edit/delete only your own |
| GET | `/api/comments/?post=<id>` | List comments on a post |
| POST | `/api/comments/` | Add a comment |
| PATCH/DELETE | `/api/comments/<id>/` | Edit/delete only your own comment |

## Key design decisions

1. **JWT over session auth** — since the frontend is a separate React SPA calling the API from a different origin/port during development, stateless JWT tokens avoid CSRF/cookie complications that session auth would introduce across origins.
2. **Object-level permissions (`IsOwnerOrReadOnly`)** rather than filtering querysets to "my posts only" — every user can *read* every post/comment (a requirement), but write access is checked per-object so ownership is enforced at the point of mutation, not just in the list view.
3. **`is_staff` doubles as "administrator"** rather than introducing a separate role field — Django's built-in staff flag already gates the Django admin site, so reusing it for the "admin can create users" API requirement keeps one source of truth for who counts as an admin.
4. **SQLite for the assignment submission** — zero setup for whoever reviews this; swapping the `DATABASES` block in `settings.py` for Postgres/MySQL is a one-time config change with no code changes elsewhere.

## What I'd add with more time

- Automated tests for the permission boundaries (owner vs non-owner edit/delete)
- Pagination on the post list and comment list
- Refresh-token rotation/auto-refresh on the frontend instead of just failing when the access token expires
- Rich text or markdown support for post content
