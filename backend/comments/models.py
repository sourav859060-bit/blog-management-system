from django.conf import settings
from django.db import models

from posts.models import BlogPost


class Comment(models.Model):
    """
    A comment on a blog post. Requirements covered:
      - Users should be able to add comments to blog posts.
      - Users should be able to edit/delete their own comments.
    """
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Comment by {self.author} on {self.post_id}"
