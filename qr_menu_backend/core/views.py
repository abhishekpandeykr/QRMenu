from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from .serializers import CategorySerializer, MenuItemSerializer, PlaceSerializer
from .models import Category, Place, MenuItem

# Create your views here.
class PlaceListView(ListCreateAPIView):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        return Place.objects.filter(owner_id=self.request.user.id)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user) 


class PlaceDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = PlaceSerializer
    query_set = Place.objects.all()


class CategoryList(CreateAPIView):
    serializer_class = CategorySerializer


class CategoryDetail(UpdateAPIView, DestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class MenuItemList(CreateAPIView):
    serializer_class = MenuItemSerializer


class MenuItemDetail(UpdateAPIView, DestroyAPIView):
    serializer_class = MenuItemSerializer
    queryset = MenuItem.objects.all()
