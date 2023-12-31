from django.db import models

from allergen.models import Allergen
from tag.models import Tag


class PriceType(models.TextChoices):
    LOW = "L"
    HIGH = "H"


class Ingredient(models.Model):
    price = models.CharField(
        max_length=10,
        choices=PriceType.choices,
        default=PriceType.LOW
    )

    name = models.CharField(max_length=50)
    calories = models.FloatField()
    tags = models.ManyToManyField(Tag, blank=True)
    allergens = models.ManyToManyField(Allergen, blank=True)

    class Meta:
        app_label = 'ingredient'
