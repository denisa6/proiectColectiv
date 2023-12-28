from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response

from recipe.models import Recipe
from recipe.serializers import RecipeSerializer


# Create your views here.

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def update(self, request, *args, **kwargs):
        # Get the instance of the recipe
        instance = self.get_object()

        # Check if the current user is the creator of the recipe
        if request.user != instance.creator:
            return Response({'detail': 'You are not allowed to update this recipe.'}, status=status.HTTP_403_FORBIDDEN)

        super().update(request) 
        
    def get_queryset(self):
        recipes = Recipe.objects.all()
        request_data = self.request.GET
        if 'difficulty' in request_data:
            recipes = recipes.filter(difficulty=int(request_data['difficulty']))
        if 'name' in request_data:
            recipes = recipes.filter(name__icontains=request_data['name'])
        if 'ingredients' in request_data:
            recipes = Recipe.objects.filter(ingredients__id=int(request_data['ingredients']))
        if 'time' in request_data:
            recipes = Recipe.objects.filter(time_min__lte=int(request_data['time']), time_max__gte=int(request_data['time']))
        if 'number_people' in request_data:
            recipes = Recipe.objects.filter(number_people=request_data['number_people'])
        if 'type_recipe' in request_data:
            recipes = Recipe.objects.filter(type_recipe=request_data['type_recipe'])
        if 'estimated_price_min' in request_data:
            if 'estimated_price_max' in request_data:
                recipes = Recipe.objects.filter(estimated_price__gte=int(request_data['estimated_price_min']),
                                                estimated_price__lte=int(request_data['estimated_price_max']))
            else:
                recipes = Recipe.objects.filter(estimated_price__gte=int(request_data['estimated_price_min']))
        elif 'estimated_price_max' in request_data:
            recipes = Recipe.objects.filter(estimated_price__lte=int(request_data['estimated_price_max']))
        if 'total_calories_min' in request_data:
            if 'total_calories_max' in request_data:
                recipes = Recipe.objects.filter(total_calories__gte=int(request_data['total_calories_min']),
                                                total_calories__lte=int(request_data['total_calories_max']))
            else:
                recipes = Recipe.objects.filter(total_calories__gte=int(request_data['total_calories_min']))
        elif 'total_calories_max' in request_data:
            recipes = Recipe.objects.filter(total_calories__lte=int(request_data['total_calories_max']))
        return recipes
