from django.db import models


# Create your models here.
class Allergen(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        app_label = 'allergen'
