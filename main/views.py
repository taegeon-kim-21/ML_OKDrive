from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from django.conf import settings
import pandas as pd
import os

from .forms import ImageUploadForm
from .utils import generate_caption  # utils.py에서 함수 임포트
from .utils import generate_caption, model, tokenizer, max_length, vgg_model
from .utils import generate_caption, translate_with_gpt

from .models import ImageWithCaption


from rest_framework import viewsets

from .serializers import ImageWithCaptionSerializer


# Create your views here.


from .utils import translate_with_gpt


def index(request):
    return render(request, 'main/index.html')


def save_image(image_file):
    # """업로드된 이미지를 저장하고 파일 경로를 반환합니다."""
    file_path = os.path.join(settings.MEDIA_ROOT, image_file.name)
    with open(file_path, 'wb+') as destination:
        for chunk in image_file.chunks():
            destination.write(chunk)
    return file_path



def caption_view(request):
    context = {'form': ImageUploadForm()}
    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image_file = form.cleaned_data['image']
            image_path = save_image(image_file)
            caption = generate_caption(image_path, model, tokenizer, max_length, vgg_model)
            # 캡션을 번역 명령과 함께 번역 함수에 전달
            translation_request = f"Translate to Korean: {caption}"
            translated_caption = translate_with_gpt(translation_request)

            # 새 ImageWithCaption 객체를 생성하고 저장합니다.
            image_instance = ImageWithCaption(
                image=image_file,
                caption=caption,
                translated_caption=translated_caption
            )
            image_instance.save()

            context['caption'] = caption
            context['translated_caption'] = translated_caption
            context['image_url'] = image_instance.image.url

    return render(request, 'main/upload_image.html', context)

def gallery_view(request):
    images = ImageWithCaption.objects.all().order_by('-created_at')  # 최신 순으로 정렬
    return render(request, 'main/index.html', {'images': images})

def delete_page(request):
    images = ImageWithCaption.objects.all()
    return render(request, 'main/delete_page.html', {'images': images})


def delete_image(request, image_id):
    if request.method == "POST":
        # 이미지 삭제
        image = get_object_or_404(ImageWithCaption, id=image_id)
        image.delete()

        # 이미지 목록 갱신
        images = ImageWithCaption.objects.all()

        # 현재 페이지를 다시 렌더링
        return render(request, 'main/delete_page.html', {'images': images})

def search_image(request):
    query = request.GET.get('query', '')
    # 번역된 캡션에서만 검색어를 포함하는 이미지를 찾습니다.
    images = ImageWithCaption.objects.filter(translated_caption__icontains=query)
    return render(request, 'main/search_image.html', {'images': images, 'query': query})


class ImageWithCaptionViewSet(viewsets.ModelViewSet):
    queryset = ImageWithCaption.objects.all()
    serializer_class = ImageWithCaptionSerializer