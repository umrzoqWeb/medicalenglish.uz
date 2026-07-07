from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Unit, Task, TaskQuestion, Vocabulary, MedicalIdiom, PhrasalVerb, Badge
User = get_user_model()

class AdminTaskQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskQuestion
        fields = '__all__'

class AdminTaskSerializer(serializers.ModelSerializer):
    questions = AdminTaskQuestionSerializer(many=True, read_only=True)
    unit_title = serializers.CharField(source='unit.title', read_only=True)
    questions_count = serializers.SerializerMethodField()
    class Meta:
        model = Task
        fields = '__all__'
    def get_questions_count(self, obj):
        return obj.questions.count()

class AdminTaskListSerializer(serializers.ModelSerializer):
    unit_title = serializers.CharField(source='unit.title', read_only=True)
    unit_number = serializers.IntegerField(source='unit.number', read_only=True)
    questions_count = serializers.SerializerMethodField()
    class Meta:
        model = Task
        fields = ['id','unit','unit_title','unit_number','number','task_type','title','points','is_ai_evaluated','questions_count']
    def get_questions_count(self, obj):
        return obj.questions.count()

class AdminUnitSerializer(serializers.ModelSerializer):
    tasks = AdminTaskListSerializer(many=True, read_only=True)
    class Meta:
        model = Unit
        fields = '__all__'

class AdminUnitListSerializer(serializers.ModelSerializer):
    tasks_count = serializers.SerializerMethodField()
    questions_count = serializers.SerializerMethodField()
    class Meta:
        model = Unit
        fields = ['id','number','title','description','tasks_count','questions_count']
    def get_tasks_count(self, obj):
        return obj.tasks.count()
    def get_questions_count(self, obj):
        return TaskQuestion.objects.filter(task__unit=obj).count()

class AdminVocabularySerializer(serializers.ModelSerializer):
    unit_title = serializers.CharField(source='unit.title', read_only=True)
    class Meta:
        model = Vocabulary
        fields = '__all__'

class AdminMedicalIdiomSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalIdiom
        fields = '__all__'

class AdminPhrasalVerbSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhrasalVerb
        fields = '__all__'

class AdminUserSerializer(serializers.ModelSerializer):
    completed_tasks = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id','username','email','first_name','last_name','points','level','streak','last_activity','date_joined','is_active','completed_tasks']
    def get_completed_tasks(self, obj):
        from .models import UserProgress
        return UserProgress.objects.filter(user=obj, completed=True).count()

class AdminBadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = '__all__'
