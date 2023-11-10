from rest_framework import serializers

from user.models import RegularUser


class RegularUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegularUser
        fields = ['id', 'username', 'email', 'password', 'role']