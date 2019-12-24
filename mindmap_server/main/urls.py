from django.urls import path, include
from . import views

urlpatterns = [
    path('get_graph_data', views.get_graph_data, name='get_graph_data')
]
