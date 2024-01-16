from django.urls import include, path
from rest_framework.routers import DefaultRouter

from bad_jokes.views import BadJokesViewSet

router = DefaultRouter()
router.register('', BadJokesViewSet, basename='bad_jokes')

urlpatterns = [
    path('', include(router.urls)),
]