from django.contrib import admin

from allergen.models import Allergen

@admin.register(Allergen)
class AllergenAdmin(admin.ModelAdmin):
    list_display = ['name']