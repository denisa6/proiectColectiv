from django.urls import path, include

from ingredient.views import IngredientViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', IngredientViewSet, basename='recipe')


urlpatterns = [
    path('', include(router.urls)),
]