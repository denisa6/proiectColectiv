from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=50)

    class Price(models.TextChoices):
        LOW = "L"
        HIGH = "H"

    calorie = models.FloatField()
