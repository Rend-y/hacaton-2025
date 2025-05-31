from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Profile, Project
from .serializers import (
    UserSerializer,
    ProfileSerializer,
    ProjectSerializer,
    RegisterSerializer
)

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'list':
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        queryset = Project.objects.all()
        if not self.request.user.is_staff:
            queryset = queryset.filter(owner=self.request.user)
        user = self.request.query_params.get('user', None)
        if user is not None:
            queryset = queryset.filter(owner__username=user)
        return queryset
