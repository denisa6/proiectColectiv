from django.contrib import admin

from recipe.models import Recipe


# Register your models here.

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ['difficulty', 'name', 'description', 'time_min', 'time_max', 'number_people', 'type_recipe',
                    'estimated_price', 'total_calories']
