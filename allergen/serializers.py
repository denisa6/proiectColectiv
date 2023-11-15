from rest_framework import serializers

from allergen.models import Allergen


class AllergenSerializers(serializers.ModelSerializer):
    class Meta:
        model = Allergen
        fields = ["name"]