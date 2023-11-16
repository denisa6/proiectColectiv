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
    calorie = models.FloatField()
    tags = models.ManyToManyField(Tag)
    allergens = models.ManyToManyField(Allergen)
