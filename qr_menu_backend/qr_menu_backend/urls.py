"""qr_menu_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.urls import path, include
from core import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('api/places', view=views.PlaceListView.as_view()),
    path('api/places/<pk>', view=views.PlaceDetail.as_view()),

    path('api/categories', view=views.CategoryList.as_view()),
    path('api/categories/<pk>', view=views.CategoryDetail.as_view()),

    path('api/menu-items', view=views.MenuItemList.as_view()),
    path('api/menu-items/<pk>', view=views.MenuItemDetail.as_view()),

    path('api/create_payment_intent', view=views.create_payment_intent),
]
