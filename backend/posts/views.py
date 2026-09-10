from rest_framework import viewsets, permissions

from .models import BlogPost
from .serializers import BlogPostSerializer
from .permissions import IsOwnerOrReadOnly


class BlogPostViewSet(viewsets.ModelViewSet):
    """
    /api/posts/            GET (list all), POST (create - sets author = request.user)
    /api/posts/<id>/        GET, PUT/PATCH, DELETE (only if you're the author)
    """
    queryset = BlogPost.objects.select_related("author").all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
