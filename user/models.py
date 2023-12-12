from django.contrib.auth.models import AbstractUser
from django.db import models


class UserStatus(models.TextChoices):
    ADMIN = 'admin'
    REGULAR = 'regular'


class RegularUser(AbstractUser):
    role = models.CharField(
        max_length=50,
        choices=UserStatus.choices,
        default=UserStatus.REGULAR
    )
    # TODO: ENCRYPTION FOR PASSWORD

    class Meta:
        app_label = 'user'

    def __str__(self):
        return f"{self.username}"

