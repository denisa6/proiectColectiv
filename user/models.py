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


    def __str__(self):
        return f"{self.username}"

    def save(self, *args, **kwargs):
        if self.role == UserStatus.ADMIN:
            self.is_staff = True
            self.is_superuser = True
        super().save(*args, **kwargs)
