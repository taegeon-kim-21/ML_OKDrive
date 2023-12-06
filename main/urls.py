from django.urls import path
from . import views



app_name = 'main'

urlpatterns = [
      
   
    
    ## caption_view 경로 추가
    path('caption_view/', views.caption_view, name='caption_view'),
    
    path("api/upload", views.caption_view, name="caption_view"), ## react에서 사용할 api
    
    path('api/sortimages/', views.gallery_api_view, name='gallery_api'), ## react에서 사용할 api
    
    path('api/delete_image/<int:image_id>/', views.delete_api_image, name='api_delete_image'), # react에서 사용할 api
    
    path('gallery/', views.gallery_view, name='gallery'),  # gallery_view 함수에 대한 URL 경로 추가
    
    path('delete_page/', views.delete_page, name='delete_page'),  # 삭제 페이지 URL
    
    path('delete_image/<int:image_id>/', views.delete_image, name='delete_image'),  # 이미지 삭제 처리 URL
    
    path('search_image/', views.search_image, name='search_image'),  ## 이미지 검ㅐ
    
    path('findjson', views.get_image_with_caption_data, name='findjson'),

]




