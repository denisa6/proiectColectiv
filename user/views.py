from django.shortcuts import render
from rest_framework import generics, viewsets

from user.models import RegularUser
from user.serialisers import RegularUserSerializer


# Create your views here.
# TODO a better view for the user

class RegularUserListView(viewsets.ModelViewSet):
    queryset = RegularUser.objects.all()
    serializer_class = RegularUserSerializer