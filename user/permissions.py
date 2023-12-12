from rest_framework import permissions

from user.models import UserStatus


class IsSelfOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.user == obj:
                return True
            if request.user.role == UserStatus.ADMIN:
                return True
        return False

