import json
from locale import currency
import stripe
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import  settings
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView
from .serializers import CategorySerializer, MenuItemSerializer, PlaceSerializer, PlaceDetailSerializer
from .models import Category, Place, MenuItem, Order
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

stripe.api_key = settings.STRIPE_API_SECRET_KEY

@csrf_exempt
def create_payment_intent(request):
    try:
        data = json.loads(request.body)
        intent = stripe.payment_intent.create(
            amount = int(data['amount']) * 100,
            currency = "usd",
            payment_method = data['payment_method']['id'],
            off_session = True,
            confirm = True
        )
        order = Order.objects.create(place_id=data['place'], 
        table=data['table'], 
        details=json.dumps(data['detail']), 
        amount=data['amount'],
        payment_intent = intent['id']
        )
        return JsonResponse({
            "success":True,
            "order":order.id,
            "message":"Payment intent created successfully",
        })
    except Exception as e:
        return JsonResponse({
            "success":False,
            "order":order.id,
        })