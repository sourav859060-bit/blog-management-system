from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model. is_staff (Django built-in) marks an account as
    'admin' for this system, satisfying:
        "An administrator should be able to create users."
    Regular users can log in and manage their own posts/comments.
    """

    def __str__(self):
        return self.username
