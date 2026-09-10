from django.conf import settings
from django.db import models


class BlogPost(models.Model):
    """
    A blog post. Requirements covered:
      - Users should be able to create, view, update, delete their own posts.
      - Users should be able to view posts created by other users.
      - Users should only be able to modify content they have created.
    """
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posts"
    )
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.author})"
