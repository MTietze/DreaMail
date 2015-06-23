# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dreamail_tracker', '0002_auto_20150620_2352'),
    ]

    operations = [
        migrations.AddField(
            model_name='journalentry',
            name='message',
            field=models.TextField(blank=True),
        ),
    ]
