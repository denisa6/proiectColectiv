# Generated by Django 4.2.3 on 2023-11-10 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RegularUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(choices=[('admin', 'Admin'), ('regular', 'Regular')], default='regular', max_length=50)),
                ('username', models.CharField(max_length=100)),
                ('email', models.EmailField(blank=True, max_length=254)),
                ('password', models.CharField(max_length=100)),
            ],
        ),
    ]
