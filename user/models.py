from django.contrib.auth.models import AbstractUser
from django.db import models


class UserStatus(models.TextChoices):
    ADMIN = 'admin'
    REGULAR = 'regular'


class RegularUser(models.Model):
    role = models.CharField(
        max_length=50,
        choices=UserStatus.choices,
        default=UserStatus.REGULAR
    )
    username = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    password = models.CharField(max_length=100)
    # TODO: ENCRYPTION FOR PASSWORD

    class Meta:
        app_label = 'user'

    def __str__(self):
        return f"{self.username}"

