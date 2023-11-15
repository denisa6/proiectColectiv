from rest_framework import serializers

from ingredient.models import Ingredient


class IngredientSerializers(serializers.ModelSerializer):
    price = serializers.CharField(source='get_price_display')

    class Meta:
        model = Ingredient
        fields = ['id', 'name', 'price', 'calorie', 'tags', 'allergens']