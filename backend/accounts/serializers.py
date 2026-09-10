from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """Read-only-ish representation of a user (never exposes password)."""

    class Meta:
        model = User
        fields = ["id", "username", "email", "is_staff", "date_joined"]
        read_only_fields = fields


class AdminCreateUserSerializer(serializers.ModelSerializer):
    """
    Used ONLY by the admin-only 'create user' endpoint.
    Requirement: "An administrator should be able to create users."
    """
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "is_staff"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
