from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .serializers import PlaceSerializer
from .models import Place

# Create your views here.
class PlaceListView(ListCreateAPIView):
    serializer_class = PlaceSerializer

    def get_queryset(self):
        print(self)
        return Place.objects.filter(owner_id=self.request.user.id)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user) 

