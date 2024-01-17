import random

from django.db import models
from rest_framework.exceptions import ValidationError
from ingredient.models import Ingredient
from user.models import RegularUser


def validate_difficulty(value):
    if value > 5 or value < 0:
        raise ValidationError("The difficulty level is invalid. The value must be between 0 and 5.")
    else:
        return value


def validate_time(time):
    if time < 0:
        raise ValidationError("The time cannot be a negative number.")
    else:
        return time


class RecipeTypeChoices(models.TextChoices):
    REGULAR = 'regular'
    BREAKFAST = 'breakfast'
    LUNCH = 'lunch'
    DINNER = 'dinner'
    DESSERT = 'dessert'
    SNACK = 'snack'


def get_random_photo_filename():
    random_photo_number = random.randint(1, 5)
    file1 = open(f'media\photos\{random_photo_number}.txt', "r")
    print(random_photo_number)
    img = file1.read()
    return img


class Recipe(models.Model):
    difficulty = models.IntegerField(validators=[validate_difficulty])
    name = models.CharField(max_length=100)
    description = models.TextField()
    ingredients = models.ManyToManyField(Ingredient)
    time_min = models.FloatField(validators=[validate_time])
    time_max = models.FloatField(validators=[validate_time])
    number_people = models.IntegerField()
    type_recipe = models.CharField(max_length=50, choices=RecipeTypeChoices.choices, default=RecipeTypeChoices.REGULAR)
    estimated_price = models.IntegerField()
    total_calories = models.FloatField()
    photo = models.TextField(default=get_random_photo_filename())
    creator = models.ForeignKey(RegularUser, on_delete=models.CASCADE, null=True)

    class Meta:
        app_label = 'recipe'
