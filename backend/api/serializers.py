from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Badge, UserBadge, Unit, Task, TaskQuestion, UserProgress, Vocabulary, MedicalIdiom, PhrasalVerb, University

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    badges_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'avatar', 'points', 'level', 'streak', 'badges_count', 'is_staff']
        read_only_fields = ['points', 'level', 'streak']
    
    def get_badges_count(self, obj):
        return obj.user_badges.count()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name']
    
    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError({'password_confirm': 'Parollar mos kelmadi'})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = '__all__'


class UserBadgeSerializer(serializers.ModelSerializer):
    badge = BadgeSerializer()
    
    class Meta:
        model = UserBadge
        fields = ['id', 'badge', 'earned_at']


class TaskQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskQuestion
        fields = ['id', 'question_text', 'options', 'order']


class TaskSerializer(serializers.ModelSerializer):
    questions = TaskQuestionSerializer(many=True, read_only=True)
    matching_options = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = ['id', 'unit', 'number', 'task_type', 'title', 'instruction', 
                  'content', 'points', 'is_ai_evaluated', 'questions', 'matching_options']
    
    def get_matching_options(self, obj):
        """Return shuffled list of correct answers for matching tasks"""
        if obj.task_type == 'matching':
            import random
            answers = list(obj.questions.values_list('correct_answer', flat=True))
            random.shuffle(answers)
            return answers
        return []


class TaskListSerializer(serializers.ModelSerializer):
    is_completed = serializers.SerializerMethodField()
    user_score = serializers.SerializerMethodField()
    is_locked = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = ['id', 'number', 'task_type', 'title', 'points', 
                  'is_ai_evaluated', 'is_completed', 'user_score', 'is_locked']
    
    def get_is_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return UserProgress.objects.filter(
                user=request.user, task=obj, completed=True
            ).exists()
        return False
    
    def get_user_score(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            progress = UserProgress.objects.filter(user=request.user, task=obj).first()
            return progress.score if progress else 0
        return 0
    
    def get_is_locked(self, obj):
        """Task is locked if previous task in same unit is not completed with 60%+"""
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return obj.number > 1  # First task open for guests, rest locked
        
        # First task is always unlocked
        if obj.number == 1:
            return False
        
        # Check if previous task is completed with 60%+
        prev_task = Task.objects.filter(unit=obj.unit, number=obj.number - 1).first()
        if prev_task:
            progress = UserProgress.objects.filter(
                user=request.user, task=prev_task, completed=True
            ).first()
            if not progress or progress.score < 60:
                return True
        return False


class UnitSerializer(serializers.ModelSerializer):
    tasks = TaskListSerializer(many=True, read_only=True)
    progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Unit
        fields = ['id', 'number', 'title', 'description', 'reading_text', 'reading_pdf', 'tasks', 'progress']
    
    def get_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            total = obj.tasks.count()
            completed = UserProgress.objects.filter(
                user=request.user, task__unit=obj, completed=True
            ).count()
            return {'total': total, 'completed': completed}
        return {'total': obj.tasks.count(), 'completed': 0}


class UnitListSerializer(serializers.ModelSerializer):
    tasks_count = serializers.SerializerMethodField()
    completed_count = serializers.SerializerMethodField()
    is_locked = serializers.SerializerMethodField()
    
    class Meta:
        model = Unit
        fields = ['id', 'number', 'title', 'description', 'tasks_count', 'completed_count', 'is_locked']
    
    def get_tasks_count(self, obj):
        return obj.tasks.count()
    
    def get_completed_count(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return UserProgress.objects.filter(
                user=request.user, task__unit=obj, completed=True
            ).count()
        return 0
    
    def get_is_locked(self, obj):
        """Unit is locked if previous unit is not fully completed with 60%+ on all tasks"""
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return obj.number > 1  # First unit open for guests
        
        # First unit is always unlocked
        if obj.number == 1:
            return False
        
        # Check if previous unit exists and all its tasks are completed with 60%+
        prev_unit = Unit.objects.filter(number=obj.number - 1).first()
        if prev_unit:
            total_tasks = prev_unit.tasks.count()
            completed_tasks = UserProgress.objects.filter(
                user=request.user, 
                task__unit=prev_unit, 
                completed=True,
                score__gte=60
            ).count()
            if completed_tasks < total_tasks:
                return True
        return False


class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = '__all__'


class VocabularySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vocabulary
        fields = '__all__'


class MedicalIdiomSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalIdiom
        fields = '__all__'


class PhrasalVerbSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhrasalVerb
        fields = '__all__'


class LeaderboardSerializer(serializers.ModelSerializer):
    best_score = serializers.SerializerMethodField()
    best_percentage = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar', 'points', 'level', 'best_score', 'best_percentage']
    def get_best_score(self, obj):
        from .models import QuizResult
        r = QuizResult.objects.filter(user=obj).order_by('-percentage').first()
        return r.percentage if r else 0
    def get_best_percentage(self, obj):
        from .models import QuizResult
        r = QuizResult.objects.filter(user=obj).order_by('-percentage').first()
        return f'{r.score}/{r.total}' if r else '0/0'


class UniversitySerializer(serializers.ModelSerializer):
    class Meta:
        model = University
        fields = ['id', 'name', 'short_name', 'student_count', 'logo', 'order']


class StudentListSerializer(serializers.ModelSerializer):
    university_name = serializers.CharField(source='university.name', read_only=True)
    university_short = serializers.CharField(source='university.short_name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'plain_password', 'university', 'university_name', 'university_short', 'points', 'level', 'streak']
