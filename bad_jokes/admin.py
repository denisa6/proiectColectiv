from django.contrib import admin

from bad_jokes.models import BadJokes


# Register your models here.
@admin.register(BadJokes)
class BadJokesAdmin(admin.ModelAdmin):
    list_display = ['joke']