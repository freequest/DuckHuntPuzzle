# Generated by Django 2.2 on 2020-02-16 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('huntserver', '0048_auto_20200215_1743'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='playtest_end_date',
            field=models.DateTimeField(blank=True, help_text='The date/time at which a hunt will be archived and available to the public', null=True),
        ),
        migrations.AddField(
            model_name='team',
            name='playtest_start_date',
            field=models.DateTimeField(blank=True, help_text='The date/time at which a hunt will become visible to registered users', null=True),
        ),
    ]