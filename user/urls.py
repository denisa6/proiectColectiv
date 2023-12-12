from django.urls import path, include
from rest_framework.routers import DefaultRouter

from user.views import RegularUserListView, AuthentificationView, RegularUserRegisterView

router = DefaultRouter()
router.register('', RegularUserListView, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('dj-rest-auth/login/', AuthentificationView.as_view(), name='rest_login'),
    path('dj-rest-auth/registration/', RegularUserRegisterView.as_view(), name='register'),
]
