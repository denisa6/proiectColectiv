# Generated by Django 4.2.3 on 2023-11-10 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0002_alter_recipe_difficulty_alter_recipe_time_max_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='total_calories',
            field=models.FloatField(),
        ),
    ]
