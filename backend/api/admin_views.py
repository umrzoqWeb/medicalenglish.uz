import random
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.db.models import Count, Max
from django.utils import timezone
from .models import Unit, Task, TaskQuestion, UserProgress, Vocabulary, MedicalIdiom, PhrasalVerb, Badge
from .admin_serializers import *
User = get_user_model()

class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        units_stats = Unit.objects.annotate(task_count=Count('tasks'), question_count=Count('tasks__questions')).values('id','number','title','task_count','question_count').order_by('number')
        return Response({
            'total_users': User.objects.filter(is_staff=False).count(),
            'total_units': Unit.objects.count(),
            'total_tasks': Task.objects.count(),
            'total_questions': TaskQuestion.objects.count(),
            'total_vocabulary': Vocabulary.objects.count(),
            'total_idioms': MedicalIdiom.objects.count(),
            'total_phrasal_verbs': PhrasalVerb.objects.count(),
            'active_today': User.objects.filter(last_activity=timezone.now().date()).count(),
            'units_stats': list(units_stats),
        })

class AdminUnitViewSet(viewsets.ModelViewSet):
    queryset = Unit.objects.all().order_by('number')
    permission_classes = [IsAdminUser]
    def get_serializer_class(self):
        if self.action == 'list': return AdminUnitListSerializer
        return AdminUnitSerializer

class AdminTaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.select_related('unit').order_by('unit__number','number')
    permission_classes = [IsAdminUser]
    def get_serializer_class(self):
        if self.action == 'list': return AdminTaskListSerializer
        return AdminTaskSerializer
    def get_queryset(self):
        qs = super().get_queryset()
        unit = self.request.query_params.get('unit')
        if unit: qs = qs.filter(unit_id=unit)
        task_type = self.request.query_params.get('task_type')
        if task_type: qs = qs.filter(task_type=task_type)
        return qs
    @action(detail=True, methods=['post'])
    def add_question(self, request, pk=None):
        task = self.get_object()
        ser = AdminTaskQuestionSerializer(data=request.data)
        if ser.is_valid():
            ser.save(task=task)
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminTaskQuestionViewSet(viewsets.ModelViewSet):
    queryset = TaskQuestion.objects.select_related('task')
    serializer_class = AdminTaskQuestionSerializer
    permission_classes = [IsAdminUser]
    def get_queryset(self):
        qs = super().get_queryset()
        task = self.request.query_params.get('task')
        if task: qs = qs.filter(task_id=task)
        return qs

class AdminVocabularyViewSet(viewsets.ModelViewSet):
    queryset = Vocabulary.objects.select_related('unit')
    serializer_class = AdminVocabularySerializer
    permission_classes = [IsAdminUser]
    def get_queryset(self):
        qs = super().get_queryset()
        unit = self.request.query_params.get('unit')
        if unit: qs = qs.filter(unit_id=unit)
        return qs

class AdminIdiomViewSet(viewsets.ModelViewSet):
    queryset = MedicalIdiom.objects.all()
    serializer_class = AdminMedicalIdiomSerializer
    permission_classes = [IsAdminUser]

class AdminPhrasalVerbViewSet(viewsets.ModelViewSet):
    queryset = PhrasalVerb.objects.all()
    serializer_class = AdminPhrasalVerbSerializer
    permission_classes = [IsAdminUser]

class AdminUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser]

class AdminBadgeViewSet(viewsets.ModelViewSet):
    queryset = Badge.objects.all()
    serializer_class = AdminBadgeSerializer
    permission_classes = [IsAdminUser]

class AdminQuizImportView(APIView):
    permission_classes = [IsAdminUser]
    def post(self, request):
        from .models import QuizQuestion
        data = request.data
        if not isinstance(data, list): return Response({'error':'Expected list'}, status=400)
        QuizQuestion.objects.all().delete()
        objs = [QuizQuestion(question=q['question'], options=q['options'], correct=q['correct']) for q in data]
        QuizQuestion.objects.bulk_create(objs)
        return Response({'created': len(objs)})

class AdminQuizResultsView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        from .models import QuizResult
        results = QuizResult.objects.select_related('user').all()[:100]
        return Response([{'id':r.id,'username':r.user.username,'score':r.score,'total':r.total,'percentage':r.percentage,'created_at':r.created_at} for r in results])

class AdminQuizSettingsView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        from .models import QuizSettings, QuizQuestion
        s = QuizSettings.objects.first()
        if not s: s = QuizSettings.objects.create()
        return Response({'questions_count':s.questions_count,'time_limit':s.time_limit,'max_attempts':s.max_attempts,'total_questions':QuizQuestion.objects.count()})
    def put(self, request):
        from .models import QuizSettings
        s = QuizSettings.objects.first()
        if not s: s = QuizSettings.objects.create()
        s.questions_count = request.data.get('questions_count', s.questions_count)
        s.time_limit = request.data.get('time_limit', s.time_limit)
        s.max_attempts = request.data.get('max_attempts', s.max_attempts)
        s.save()
        return Response({'status':'ok'})

class AdminProgressView(APIView):
    permission_classes = [IsAdminUser]
    def get(self, request):
        user_id = request.query_params.get('user')
        unit_id = request.query_params.get('unit')
        qs = UserProgress.objects.select_related('user','task','task__unit').order_by('-completed_at')
        if user_id: qs = qs.filter(user_id=user_id)
        if unit_id: qs = qs.filter(task__unit_id=unit_id)
        data = [{'id':p.id,'username':p.user.username,'first_name':p.user.first_name,'unit_number':p.task.unit.number,'unit_title':p.task.unit.title,'task_number':p.task.number,'task_title':p.task.title,'task_type':p.task.task_type,'score':p.score,'completed':p.completed,'attempts':p.attempts,'completed_at':p.completed_at} for p in qs[:500]]
        users = User.objects.filter(is_staff=False)
        summary = []
        for u in users:
            ups = UserProgress.objects.filter(user=u)
            total = ups.count()
            done = ups.filter(completed=True).count()
            avg = list(ups.filter(completed=True).values_list('score', flat=True))
            avg_score = round(sum(avg)/len(avg)) if avg else 0
            if total > 0:
                summary.append({'id':u.id,'username':u.username,'name':f'{u.first_name} {u.last_name}'.strip() or u.username,'completed':done,'total':total,'avg_score':avg_score,'points':u.points})
        return Response({'progress':data,'summary':summary})
