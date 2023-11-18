from django.contrib import admin

from user.models import RegularUser


# Register your models here.

@admin.register(RegularUser)
class AllergenAdmin(admin.ModelAdmin):
    list_display = ['role', 'username', 'email', 'password']
