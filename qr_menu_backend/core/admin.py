from django.contrib import admin
from .models import Place, MenuItem, Category, Order

# Register your models here.

admin.site.register(Place)
admin.site.register(MenuItem)
admin.site.register(Category)
admin.site.register(Order)
