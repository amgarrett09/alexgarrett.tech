# Generated by Django 2.1 on 2018-10-10 18:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20181010_1825'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='foo',
            new_name='slug',
        ),
    ]
