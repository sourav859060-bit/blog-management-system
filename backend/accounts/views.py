from rest_framework import generics, permissions
from django.contrib.auth import get_user_model

from .serializers import UserSerializer, AdminCreateUserSerializer
from .permissions import IsAdminUser

User = get_user_model()


class AdminCreateUserView(generics.CreateAPIView):
    """
    POST /api/accounts/create-user/
    Admin-only endpoint to create new user accounts.
    Requirement: "An administrator should be able to create users."
    """
    queryset = User.objects.all()
    serializer_class = AdminCreateUserSerializer
    permission_classes = [IsAdminUser]


class MeView(generics.RetrieveAPIView):
    """GET /api/accounts/me/  -- returns the logged-in user's own profile."""
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
