from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
    """Only staff/admin accounts may pass. Used to gate user creation."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
