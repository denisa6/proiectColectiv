from django.test import TestCase

# Create your tests here.
from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from recipe.models import Recipe
from recipe.serializers import RecipeSerializer
from user.models import RegularUser


class RecipeUpdateTestCase(TestCase):
    def setUp(self):
        self.user1 = RegularUser.objects.create(username='user1', password='password')
        self.user2 = RegularUser.objects.create(username='user2', password='password')

        print(self.user1)
        # Create a recipe with user1 as the creator
        self.recipe = Recipe.objects.create(
            difficulty=1,
            name='Test Recipe',
            description='Test description',
            time_min=30,
            time_max=60,
            number_people=4,
            type_recipe='regular',
            estimated_price=10,
            total_calories=500,
            creator=self.user1
        )

        print(self.recipe)

        self.client_user1 = APIClient()
        self.client_user1.force_authenticate(user=self.user1)

        self.client_user2 = APIClient()
        self.client_user2.force_authenticate(user=self.user2)

    def test_update_recipe_by_creator(self):
        self.assertEqual(self.user2.username, "user2")
        # Ensure that the creator of the recipe can update it
        # updated_data = {'name': 'Updated Recipe Name'}
        # response = self.client_user1.patch(f'/your-update-endpoint/{self.recipe.id}/', updated_data)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Retrieve the updated recipe from the database
        # updated_recipe = Recipe.objects.get(id=self.recipe.id)
        # serializer = RecipeSerializer(updated_recipe)

        # Check if the data has been updated correctly
        # self.assertEqual(response.data, serializer.data)
        # self.assertEqual(updated_recipe.name, updated_data['name'])

    def test_update_recipe_by_non_creator(self):
        # Ensure that a non-creator of the recipe cannot update it
        updated_data = {'name': 'Updated Recipe Name'}
        response = self.client_user2.patch(f'/your-update-endpoint/{self.recipe.id}/', updated_data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
