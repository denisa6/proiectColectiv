from rest_framework import serializers

from bad_jokes.models import BadJokes


class BadJokesSerializers(serializers.ModelSerializer):
    class Meta:
        model = BadJokes
        fields = ["joke"]