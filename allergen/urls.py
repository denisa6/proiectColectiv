from django.urls import include, path
from rest_framework.routers import DefaultRouter

from allergen.views import AllergenViewSet

router = DefaultRouter()
router.register('', AllergenViewSet, basename='allergen')

urlpatterns = [
    path('', include(router.urls)),
]