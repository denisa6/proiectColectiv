from django.db import models

from allergen.models import Allergen
from tag.models import Tag


# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=50)

    class Price(models.TextChoices):
        LOW = "L"
        HIGH = "H"

    calorie = models.FloatField()
    tags = models.ManyToManyField(Tag)
    allergens = models.ManyToManyField(Allergen)
