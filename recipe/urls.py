from rest_framework.routers import DefaultRouter
from django.urls import path, include

from recipe.views import RecipeViewSet, RecipeUserView

router = DefaultRouter()
router.register('', RecipeViewSet, basename='recipe')


urlpatterns = [
    # Include the router-generated API URLs
    path('', include(router.urls)),

    # Non-API views
    path('user/<int:id>/', RecipeUserView.as_view(), name='recipe-user'),
    path('<int:id>/download/', RecipeViewSet.download_recipe_pdf, name='recipe-download-pdf'),
]