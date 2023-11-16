from django.shortcuts import render
from rest_framework import viewsets

from ingredient.models import Ingredient

from ingredient.serializers import IngredientSerializers


# Create your views here.

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializers