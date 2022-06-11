# Generated by Django 4.0.3 on 2022-06-10 16:28

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0032_alter_premise_timeduration'),
    ]

    operations = [
        migrations.RenameField(
            model_name='garment',
            old_name='orderstatus',
            new_name='orderStatus',
        ),
        migrations.RemoveField(
            model_name='premise',
            name='orderstatus',
        ),
        migrations.AddField(
            model_name='premise',
            name='orderStatus',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.orderstatus'),
        ),
        migrations.AlterField(
            model_name='garment',
            name='timeDuration',
            field=models.CharField(blank=True, max_length=100, null=True, validators=[django.core.validators.RegexValidator(message='Enter Valid TimeDuration', regex='^([0-30]+)Days ([0-12]+)Months$')]),
        ),
        migrations.AlterField(
            model_name='premise',
            name='timeDuration',
            field=models.CharField(blank=True, max_length=100, null=True, validators=[django.core.validators.RegexValidator(message='Enter Valid TimeDuration', regex='^([0-30]+)Days ([0-12]+)Months$')]),
        ),
    ]
