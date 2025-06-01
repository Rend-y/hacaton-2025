from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class TaskRequest(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новая'),
        ('in_review', 'На рассмотрении'),
        ('approved', 'Одобрена'),
        ('rejected', 'Отклонена'),
        ('in_progress', 'В работе'),
    ]

    APPLICATION_TYPE_CHOICES = [
        ('web', 'Веб-приложение'),
        ('mobile', 'Мобильное приложение'),
        ('desktop', 'Десктопное приложение'),
    ]

    COMPLEXITY_CHOICES = [
        ('simple', 'Простая'),
        ('medium', 'Средняя'),
        ('hard', 'Сложная'),
    ]

    project_name = models.CharField(max_length=200)
    description = models.TextField()
    complexity = models.CharField(max_length=10, choices=COMPLEXITY_CHOICES)
    features_count = models.IntegerField()
    need_design = models.BooleanField(default=False)
    need_integration = models.BooleanField(default=False)
    has_spec = models.BooleanField(default=False)
    application_type = models.CharField(max_length=10, choices=APPLICATION_TYPE_CHOICES)
    estimated_time = models.IntegerField()  # в месяцах
    estimated_budget = models.DecimalField(max_digits=10, decimal_places=2)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.project_name} - {self.get_status_display()}"

class Team(models.Model):
    name = models.CharField(max_length=100)
    leader = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='led_teams')
    members = models.ManyToManyField(User, related_name='teams')
    projects = models.ManyToManyField(Project, related_name='teams')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
