from django.urls import path
from .views import AdminCreateUserView, MeView

urlpatterns = [
    path("create-user/", AdminCreateUserView.as_view(), name="admin-create-user"),
    path("me/", MeView.as_view(), name="me"),
]
