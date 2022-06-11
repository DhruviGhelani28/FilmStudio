# Generated by Django 4.0.3 on 2022-06-07 12:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_alter_supplier_mobileno'),
    ]

    operations = [
        migrations.AlterField(
            model_name='actor',
            name='mobileNo',
            field=models.IntegerField(blank=True, max_length=13, null=True, validators=[django.core.validators.RegexValidator(message='Enter Valid Mobile No', regex='^(05)\\d{9}$')]),
        ),
        migrations.AlterField(
            model_name='agency',
            name='mobileNo',
            field=models.IntegerField(max_length=13, null=True, validators=[django.core.validators.RegexValidator(message='Enter Valid Mobile No', regex='^(05)\\d{9}$')]),
        ),
        migrations.AlterField(
            model_name='customer',
            name='mobileNo',
            field=models.IntegerField(max_length=13, null=True, validators=[django.core.validators.RegexValidator(message='Enter Valid Mobile No', regex='^(05)\\d{9}$')]),
        ),
        migrations.AlterField(
            model_name='worker',
            name='mobileNo',
            field=models.IntegerField(blank=True, max_length=13, null=True, validators=[django.core.validators.RegexValidator(message='Enter Valid Mobile No', regex='^(05)\\d{9}$')]),
        ),
    ]
