from django.shortcuts import render

from allergen.models import Allergen

from allergen.serializers import AllergenSerializers
from rest_framework import viewsets


# Create your views here.

class AllergenViewSet(viewsets.ModelViewSet):
    queryset = Allergen.objects.all()
    serializer_class = AllergenSerializers