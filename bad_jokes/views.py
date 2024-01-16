from django.shortcuts import render

from rest_framework import viewsets

from bad_jokes.models import BadJokes
from bad_jokes.serializers import BadJokesSerializers


# Create your views here.

class BadJokesViewSet(viewsets.ModelViewSet):
    queryset = BadJokes.objects.all()
    serializer_class = BadJokesSerializers