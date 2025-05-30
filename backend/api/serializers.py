from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Project

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'bio', 'created_at', 'updated_at')

class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'owner', 'created_at', 'updated_at') 