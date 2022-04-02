from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from .serializers import CategorySerializer, MenuItemSerializer, PlaceSerializer, PlaceDetailSerializer
from .models import Category, Place, MenuItem
from .permissions import IsOwnerOrReadOnly, IsPlaceOwnerOrReadOnly

# Create your views here.
class PlaceListView(ListCreateAPIView):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        return Place.objects.filter(owner_id=self.request.user.id)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user) 


class PlaceDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = PlaceDetailSerializer
    def get_queryset(self):
        return Place.objects.all()


class CategoryList(CreateAPIView):
    permission_classes = [IsPlaceOwnerOrReadOnly]
    serializer_class = CategorySerializer


class CategoryDetail(UpdateAPIView, DestroyAPIView):
    permission_classes = [IsPlaceOwnerOrReadOnly]
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class MenuItemList(CreateAPIView):
    permission_classes = [IsPlaceOwnerOrReadOnly]
    serializer_class = MenuItemSerializer


class MenuItemDetail(UpdateAPIView, DestroyAPIView):
    permission_classes = [IsPlaceOwnerOrReadOnly]
    serializer_class = MenuItemSerializer
    queryset = MenuItem.objects.all()
