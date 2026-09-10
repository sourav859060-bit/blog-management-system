from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source="author.username")

    class Meta:
        model = Comment
        fields = [
            "id", "post", "content", "author", "author_username",
            "created_at", "updated_at",
        ]
        read_only_fields = ["id", "author", "created_at", "updated_at"]
