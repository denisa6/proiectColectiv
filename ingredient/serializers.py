from rest_framework import serializers

from ingredient.models import Ingredient


class IngredientSerializers(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'price', 'calorie', 'tags', 'allergens']