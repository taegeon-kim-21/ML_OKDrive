"""
URL configuration for Algo_NIC project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from main import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from main.views import ImageWithCaptionViewSet

router = DefaultRouter()
router.register(r'images', ImageWithCaptionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    #path ('', views.index, name='index'),
    #path('index/', views.index, name='index'),
    path('', TemplateView.as_view(template_name='main/index.html')),
  
    path('', include('main.urls')), 

     path('api/', include(router.urls)),
    
    #127.0.0.1:8000/NIC/
    path('NIC/', include('main.urls')), 
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

