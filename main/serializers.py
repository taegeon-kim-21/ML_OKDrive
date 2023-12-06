

from rest_framework import serializers
from .models import ImageWithCaption

class ImageWithCaptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageWithCaption
        fields = ['id', 'image', 'caption', 'translated_caption', 'created_at']
