from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Profile, Project, TaskRequest, Team

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name')

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

class TaskRequestSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = TaskRequest
        fields = (
            'id', 'project_name', 'description', 'complexity', 'features_count',
            'need_design', 'need_integration', 'has_spec', 'application_type',
            'estimated_time', 'estimated_budget', 'email', 'phone', 'status',
            'status_display', 'created_at', 'updated_at'
        )

class TeamSerializer(serializers.ModelSerializer):
    leader = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)
    projects = ProjectSerializer(many=True, read_only=True)

    class Meta:
        model = Team
        fields = ('id', 'name', 'leader', 'members', 'projects', 'created_at', 'updated_at')

    def create(self, validated_data):
        members_data = self.context.get('members', [])
        projects_data = self.context.get('projects', [])
        team = Team.objects.create(**validated_data)
        
        if members_data:
            team.members.set(members_data)
        if projects_data:
            team.projects.set(projects_data)
            
        return team 