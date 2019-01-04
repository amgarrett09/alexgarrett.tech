"""blog_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
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

from django.urls import path
from blog import views

urlpatterns = [
    path('', views.index, name='blog-index'),
    path('article/<slug:slug>/', views.post, name='blog-post'),
    path('dashboard/', views.dashboard, name='blog-dashboard'),
    path('compose/', views.compose, name='blog-compose'),
    path('article/<slug:slug>/edit/', views.edit, name='blog-edit-post'),
    path('article/<slug:slug>/publish/', views.publish, name='blog-publish'),
    path('category/<slug:category>/', views.category, name='blog-category'),
]
