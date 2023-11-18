from rest_framework import serializers

from recipe.models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'difficulty', 'name', 'description', 'time_min', 'time_max', 'number_people', 'type_recipe',
                  'estimated_price', 'total_calories', 'photo']
