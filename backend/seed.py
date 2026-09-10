"""
Run with: python manage.py shell < seed.py
Creates one admin and two regular demo users, plus a sample post/comment,
so an evaluator can log in and see the app already populated.
"""
from accounts.models import User
from posts.models import BlogPost
from comments.models import Comment

if not User.objects.filter(username="admin").exists():
    admin = User.objects.create_superuser("admin", "admin@example.com", "admin123")
    print("Created admin / admin123")
else:
    admin = User.objects.get(username="admin")

if not User.objects.filter(username="alice").exists():
    alice = User.objects.create_user("alice", "alice@example.com", "alice123")
    print("Created alice / alice123")
else:
    alice = User.objects.get(username="alice")

if not User.objects.filter(username="bob").exists():
    bob = User.objects.create_user("bob", "bob@example.com", "bob123")
    print("Created bob / bob123")
else:
    bob = User.objects.get(username="bob")

post, created = BlogPost.objects.get_or_create(
    author=alice, title="Hello World",
    defaults={"content": "This is Alice's first blog post."},
)
if created:
    print("Created sample post")

Comment.objects.get_or_create(
    post=post, author=bob, defaults={"content": "Nice post, Alice!"}
)

print("Seed complete.")
