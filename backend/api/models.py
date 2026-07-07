from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user with progress tracking"""
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    points = models.IntegerField(default=0)
    level = models.IntegerField(default=1)
    streak = models.IntegerField(default=0)
    last_activity = models.DateField(null=True, blank=True)
    
    def add_points(self, amount):
        self.points += amount
        # Level up every 500 points
        self.level = (self.points // 500) + 1
        self.save()


class Badge(models.Model):
    """Achievement badges"""
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50)  # emoji or icon name
    requirement = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class UserBadge(models.Model):
    """User's earned badges"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_badges')
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'badge']


class Unit(models.Model):
    """Course units (15 units total)"""
    number = models.IntegerField(unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    class Meta:
        ordering = ['number']
    
    def __str__(self):
        return f"Unit {self.number}: {self.title}"


class Task(models.Model):
    """Tasks within units (13 tasks per unit)"""
    TASK_TYPES = [
        ('fill_blank', 'Fill in the blanks'),
        ('identify_tense', 'Identify the tense'),
        ('matching', 'Match the words'),
        ('verb_form', 'Verb forms'),
        ('vocabulary', 'Vocabulary test'),
        ('crossword', 'Crossword puzzle'),
        ('insert_words', 'Insert words'),
        ('translation', 'Translation'),
        ('synonyms', 'Find synonyms'),
        ('conversation', 'Conversation'),
        ('speaking', 'Speaking'),
        ('writing', 'Writing'),
        ('video', 'Video retelling'),
    ]
    
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='tasks')
    number = models.IntegerField()
    task_type = models.CharField(max_length=20, choices=TASK_TYPES)
    title = models.CharField(max_length=200)
    instruction = models.TextField()
    content = models.JSONField(null=True, blank=True)  # For AI tasks
    points = models.IntegerField(default=10)
    is_ai_evaluated = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['unit', 'number']
        unique_together = ['unit', 'number']
    
    def __str__(self):
        return f"Task {self.number}: {self.title}"


class TaskQuestion(models.Model):
    """Questions within tasks"""
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    correct_answer = models.CharField(max_length=500)
    options = models.JSONField(null=True, blank=True)  # For multiple choice
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']


class UserProgress(models.Model):
    """Track user progress on tasks"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='progress')
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    score = models.IntegerField(default=0)
    attempts = models.IntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ['user', 'task']


class Vocabulary(models.Model):
    """Medical vocabulary"""
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='vocabulary', null=True)
    word = models.CharField(max_length=100)
    translation = models.CharField(max_length=100)
    definition = models.TextField(blank=True)
    example = models.TextField(blank=True)
    audio = models.FileField(upload_to='audio/', null=True, blank=True)
    
    class Meta:
        verbose_name_plural = 'Vocabulary'
    
    def __str__(self):
        return self.word


class MedicalIdiom(models.Model):
    """Medical idioms and expressions"""
    idiom = models.CharField(max_length=200)
    meaning = models.TextField()
    example = models.TextField()
    
    def __str__(self):
        return self.idiom


class PhrasalVerb(models.Model):
    """Medicine related phrasal verbs"""
    verb = models.CharField(max_length=200)
    meaning = models.TextField()
    example = models.TextField()
    
    def __str__(self):
        return self.verb
    
    class Meta:
        ordering = ['verb']


class QuizQuestion(models.Model):
    question = models.TextField()
    options = models.JSONField()
    correct = models.IntegerField()
    def __str__(self):
        return self.question[:80]


class QuizResult(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quiz_results')
    score = models.IntegerField()
    total = models.IntegerField(default=30)
    percentage = models.IntegerField()
    answers = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        ordering = ['-created_at']


class QuizSettings(models.Model):
    questions_count = models.IntegerField(default=30)
    time_limit = models.IntegerField(default=0)
    max_attempts = models.IntegerField(default=0)
