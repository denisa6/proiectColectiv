from django.shortcuts import render
from rest_framework import viewsets

from recipe.models import Recipe
from recipe.serializers import RecipeSerializer


# Create your views here.

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
