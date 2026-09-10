from rest_framework import viewsets, permissions

from .models import Comment
from .serializers import CommentSerializer
from .permissions import IsCommentOwnerOrReadOnly


class CommentViewSet(viewsets.ModelViewSet):
    """
    /api/comments/?post=<id>   GET (list comments, optionally filtered by post), POST (create)
    /api/comments/<id>/         GET, PUT/PATCH, DELETE (only if you're the author)
    """
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated, IsCommentOwnerOrReadOnly]

    def get_queryset(self):
        qs = Comment.objects.select_related("author", "post").all()
        post_id = self.request.query_params.get("post")
        if post_id:
            qs = qs.filter(post_id=post_id)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
