import json
from locale import currency
import stripe
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import  settings
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, CreateAPIView, UpdateAPIView, DestroyAPIView, ListAPIView
from .serializers import CategorySerializer, MenuItemSerializer, OrderSerializer, PlaceSerializer, PlaceDetailSerializer
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
        intent = stripe.PaymentIntent.create(
            amount = int(data['amount']) * 100,
            currency = "inr",
            payment_method = data['payment_method']['id'],
            off_session = True,
            confirm = True,
            description="Payment for order this"
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
            "message":str(e)
        })


class OrderList(ListAPIView):
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(place__owner_id=self.request.user.id, place_id=self.kwargs['pk'])
    

class OrderDetail(UpdateAPIView):
    permission_classes = [IsPlaceOwnerOrReadOnly]
    def get_serializer_class(self):
        print("Self", self.request.method)
        return OrderSerializer

    queryset = Order.objects.all()