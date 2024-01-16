from django.db import models

class BadJokes(models.Model):
    joke = models.TextField()

    class Meta:
        app_label = 'bad_jokes'