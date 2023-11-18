from django.contrib import admin

from ingredient.models import Ingredient


# Register your models here.

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ['price', 'name', 'calorie']
