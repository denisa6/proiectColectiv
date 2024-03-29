"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from dj_rest_auth.views import LogoutView
from django.contrib import admin
from django.urls import path, include

from bad_jokes.views import BadJokesList
from user.views import AuthentificationView, RegularUserRegisterView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('user.urls')),
    path('recipe/', include('recipe.urls')),
    path('tag/', include('tag.urls')),
    path('allergen/', include('allergen.urls')),
    path('bad_jokes/', BadJokesList.as_view(), name='bad_jokes'),
    path('ingredient/', include('ingredient.urls')),
    path('dj-rest-auth/login/', AuthentificationView.as_view(), name='rest_login'),
    path('dj-rest-auth/registration/', RegularUserRegisterView.as_view(), name='register'),
    path('dj-rest-auth/logout/', LogoutView.as_view(), name='rest_logout'),
]
