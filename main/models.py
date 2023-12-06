

# Create your models here.
from django.db import models

class ImageWithCaption(models.Model):
    image = models.ImageField(upload_to='images/')
    caption = models.CharField(max_length=255)
    translated_caption = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)  # 생성 시간 필드 추가

    def __str__(self):
        return self.caption
