from django.urls import path, include
from rest_framework.routers import DefaultRouter

from user.views import RegularUserListView

router = DefaultRouter()
router.register('', RegularUserListView, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]
