from .models import h5p_contents
from django.views.generic.edit import UpdateView
from rest_framework import viewsets
from rest_framework import serializers
from .serializers import h5pcontentSerializer


# Create your views here.

#this is a rest api serializer class for accessing h5p_content models
class h5pcontentViewSet(viewsets.ModelViewSet):
	queryset = h5p_contents.objects.all().order_by('-content_id')
	serializer_class = h5pcontentSerializer
