## 이미지 업로드 폼 생성

from django import forms

class ImageUploadForm(forms.Form):
    image = forms.ImageField()
