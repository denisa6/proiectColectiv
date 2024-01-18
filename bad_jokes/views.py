import random

from django.shortcuts import render

from rest_framework import viewsets, generics
from django.shortcuts import render

from bad_jokes.models import BadJokes
from bad_jokes.serializers import BadJokesSerializers


class BadJokesList(generics.ListCreateAPIView):
    serializer_class = BadJokesSerializers

    def get_queryset(self):
        queryset = BadJokes.objects.all()
        number = queryset.count()
        random_index = random.randint(0, number - 1)
        print(random_index)

        return [queryset[random_index]]


class BadJokesViewSet(viewsets.ModelViewSet):
    queryset = BadJokes.objects.all()
    serializer_class = BadJokesSerializers

