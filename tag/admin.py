from django.contrib import admin

from tag.models import Tag


# Register your models here.

@admin.register(Tag)
class AllergenAdmin(admin.ModelAdmin):
    list_display = ['name']
