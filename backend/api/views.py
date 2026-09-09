from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from django.utils import timezone
import unicodedata
import re

from .models import Badge, UserBadge, Unit, Task, TaskQuestion, UserProgress, Vocabulary, MedicalIdiom, PhrasalVerb, University
from .serializers import (
    UserSerializer, RegisterSerializer, BadgeSerializer, UserBadgeSerializer,
    UnitSerializer, UnitListSerializer, TaskSerializer, TaskListSerializer,
    UserProgressSerializer, VocabularySerializer, MedicalIdiomSerializer, PhrasalVerbSerializer, LeaderboardSerializer, UniversitySerializer, StudentListSerializer
)
from .services import AIService

User = get_user_model()


def normalize_answer(text):
    """Normalize text for comparison - handles apostrophes, quotes, spaces, case-insensitive"""
    if not text:
        return ''
    
    # Convert to string and lowercase
    text = str(text).lower().strip()
    
    # Normalize unicode characters
    text = unicodedata.normalize('NFKC', text)
    
    # Replace ALL apostrophe/quote variants with standard ASCII apostrophe (0x27)
    # Using unicode code points for reliability
    apostrophe_chars = [
        '\u0027',  # ' APOSTROPHE (standard)
        '\u0060',  # ` GRAVE ACCENT (backtick)
        '\u00b4',  # ´ ACUTE ACCENT
        '\u2018',  # ' LEFT SINGLE QUOTATION MARK
        '\u2019',  # ' RIGHT SINGLE QUOTATION MARK (most common issue!)
        '\u201a',  # ‚ SINGLE LOW-9 QUOTATION MARK
        '\u201b',  # ‛ SINGLE HIGH-REVERSED-9 QUOTATION MARK
        '\u2032',  # ′ PRIME
        '\u2035',  # ‵ REVERSED PRIME
        '\u02b9',  # ʹ MODIFIER LETTER PRIME
        '\u02bb',  # ʻ MODIFIER LETTER TURNED COMMA (O'zbek)
        '\u02bc',  # ʼ MODIFIER LETTER APOSTROPHE
        '\u02bd',  # ʽ MODIFIER LETTER REVERSED COMMA
        '\u02c8',  # ˈ MODIFIER LETTER VERTICAL LINE
        '\u02ca',  # ˊ MODIFIER LETTER ACUTE ACCENT
        '\u02cb',  # ˋ MODIFIER LETTER GRAVE ACCENT
        '\u0022',  # " QUOTATION MARK
        '\u201c',  # " LEFT DOUBLE QUOTATION MARK
        '\u201d',  # " RIGHT DOUBLE QUOTATION MARK
        '\u00ab',  # « LEFT GUILLEMET
        '\u00bb',  # » RIGHT GUILLEMET
    ]
    
    for ap in apostrophe_chars:
        text = text.replace(ap, "'")
    
    # O'zbek tilidagi o' va g' uchun turli variantlar
    text = text.replace("o'", "o'")
    text = text.replace("g'", "g'")
    
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Remove leading/trailing punctuation that might cause issues
    text = text.strip('.,;:!?')
    
    return text


def answers_match(user_answer, correct_answer):
    """Check if user answer matches correct answer with flexible comparison"""
    user_norm = normalize_answer(user_answer)
    correct_norm = normalize_answer(correct_answer)
    
    # Direct match
    if user_norm == correct_norm:
        return True
    
    # Try without apostrophes at all
    user_no_apos = user_norm.replace("'", "").replace("'", "")
    correct_no_apos = correct_norm.replace("'", "").replace("'", "")
    if user_no_apos == correct_no_apos:
        return True
    
    return False


class RegisterView(generics.CreateAPIView):
    """User registration"""
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


class ProfileView(generics.RetrieveUpdateAPIView):
    """User profile"""
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class DashboardView(APIView):
    """Dashboard stats"""
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        
        # Calculate stats
        total_tasks = Task.objects.count()
        completed = UserProgress.objects.filter(user=user, completed=True).count()
        
        # Recent activity
        recent = UserProgress.objects.filter(
            user=user, completed=True
        ).select_related('task').order_by('-completed_at')[:5]
        
        return Response({
            'user': UserSerializer(user).data,
            'stats': {
                'total_tasks': total_tasks,
                'completed_tasks': completed,
                'progress_percent': round((completed / total_tasks * 100) if total_tasks else 0),
            },
            'recent_activity': [
                {
                    'task': p.task.title,
                    'score': p.score,
                    'date': p.completed_at
                } for p in recent
            ]
        })


class UnitViewSet(viewsets.ReadOnlyModelViewSet):
    """Units API"""
    queryset = Unit.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return UnitListSerializer
        return UnitSerializer
    
    def get_serializer_context(self):
        return {'request': self.request}


class TaskViewSet(viewsets.ReadOnlyModelViewSet):
    """Tasks API"""
    queryset = Task.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'list':
            return TaskListSerializer
        return TaskSerializer
    
    def get_serializer_context(self):
        return {'request': self.request}
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def submit(self, request, pk=None):
        """Submit task answers"""
        task = self.get_object()
        answers = request.data.get('answers', {})
        
        # AI-evaluated tasks
        if task.is_ai_evaluated:
            result = AIService.evaluate(task, answers)
            score = result['score']
            feedback = result['feedback']
        else:
            # Manual evaluation with flexible comparison
            correct = 0
            total = task.questions.count()
            
            for question in task.questions.all():
                user_answer = answers.get(str(question.id), '')
                # Support multiple correct answers separated by comma
                correct_answers = [a.strip() for a in question.correct_answer.split(',')]
                
                # Check if user answer matches any correct answer
                for correct_ans in correct_answers:
                    if answers_match(user_answer, correct_ans):
                        correct += 1
                        break
            
            score = round((correct / total * 100) if total else 0)
            feedback = f"To'g'ri javoblar: {correct}/{total}"
        
        # Update progress
        progress, _ = UserProgress.objects.get_or_create(user=request.user, task=task)
        progress.score = max(progress.score, score)
        progress.attempts += 1
        
        if score >= 60:
            if not progress.completed:
                request.user.add_points(task.points)
            progress.completed = True
            progress.completed_at = timezone.now()
        
        progress.save()
        
        # Update streak
        user = request.user
        today = timezone.now().date()
        if user.last_activity != today:
            if user.last_activity == today - timezone.timedelta(days=1):
                user.streak += 1
            else:
                user.streak = 1
            user.last_activity = today
            user.save()
        
        return Response({
            'score': score,
            'feedback': feedback,
            'passed': score >= 60,
            'points_earned': task.points if score >= 60 and progress.attempts == 1 else 0
        })


class VocabularyViewSet(viewsets.ReadOnlyModelViewSet):
    """Vocabulary API"""
    queryset = Vocabulary.objects.all()
    serializer_class = VocabularySerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        unit = self.request.query_params.get('unit')
        if unit:
            queryset = queryset.filter(unit_id=unit)
        return queryset


class MedicalIdiomViewSet(viewsets.ReadOnlyModelViewSet):
    """Medical idioms API"""
    queryset = MedicalIdiom.objects.all()
    serializer_class = MedicalIdiomSerializer


class PhrasalVerbViewSet(viewsets.ReadOnlyModelViewSet):
    """Phrasal verbs API"""
    queryset = PhrasalVerb.objects.all()
    serializer_class = PhrasalVerbSerializer


class LeaderboardView(generics.ListAPIView):
    """Top users by quiz score"""
    serializer_class = LeaderboardSerializer
    def get_queryset(self):
        from django.db.models import Max
        return User.objects.filter(is_staff=False).annotate(
            best=Max('quiz_results__percentage')
        ).order_by('-best')[:50]


class BadgeViewSet(viewsets.ReadOnlyModelViewSet):
    """Badges API"""
    queryset = Badge.objects.all()
    serializer_class = BadgeSerializer


class UserBadgesView(generics.ListAPIView):
    """User's earned badges"""
    serializer_class = UserBadgeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserBadge.objects.filter(user=self.request.user)
import io
import qrcode
from reportlab.lib.colors import HexColor, white
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

TEMPLATE = '/home/medicalenglish/medicalenglish/backend/static/cert/cert_template.jpg'
PW = 640
PH = 426.5
NAVY = HexColor('#0c2340')

def get_grade(pct):
    if pct >= 90: return 5, 'A (Excellent)'
    elif pct >= 71: return 4, 'B (Good)'
    elif pct >= 60: return 3, 'C (Satisfactory)'
    return 0, 'F (Failed)'

def generate_certificate_pdf(result):
    user = result.user
    full_name = f"{user.first_name} {user.last_name}".strip() or user.username
    grade_num, grade_text = get_grade(result.percentage)
    date_str = result.created_at.strftime('%d.%m.%Y')
    cert_id = f"ME-{result.id:06d}"
    verify_url = f"https://medicalenglishhub.uz/verify/{cert_id}"

    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(PW, PH))
    cx = PW / 2

    c.drawImage(TEMPLATE, 0, 0, PW, PH)

    # NAME - centered at (320, 211.5)
    fs = 24 if len(full_name) <= 22 else (20 if len(full_name) <= 30 else 16)
    c.setFillColor(NAVY)
    c.setFont('Helvetica-Bold', fs)
    c.drawCentredString(320, 213.5, full_name)

    # SCORE - at (360, 174) - right of "with a score of"
    c.setFont('Helvetica-BoldOblique', 10)
    c.drawString(325, 172, f'{result.score}/{result.total} ({result.percentage}%)')

    # GRADE - at (350, 141.5) - inside ribbon right of "Grade:"
    c.setFillColor(white)
    c.setFont('Helvetica-BoldOblique', 12)
    c.drawString(290, 136.5, f'{grade_num} \u2014 {grade_text}')

    # DATE - at (137.5, 104)
    c.setFillColor(HexColor('#333333'))
    c.setFont('Helvetica', 8)
    c.drawString(112.5, 94, date_str)

    # CERT ID - at (137.5, 82.5)
    c.drawString(112.5, 73.5, cert_id)

    # VERIFY - at (137.5, 62.5)
    c.setFont('Helvetica', 6)
    c.drawString(112.5, 52.5, verify_url)

    # QR CODE - center at (562.5, 86.5), size ~50x50
    qr = qrcode.make(verify_url, box_size=3, border=1)
    qr_buf = io.BytesIO()
    qr.save(qr_buf, format='PNG')
    qr_buf.seek(0)
    qs = 50
    c.drawImage(ImageReader(qr_buf), 541.5 - qs/2, 83.5 - qs/2, qs, qs)

    c.save()
    buf.seek(0)
    return buf


class CertificateView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self, request, result_id):
        from .models import QuizResult
        try:
            result = QuizResult.objects.select_related('user').get(id=result_id)
        except QuizResult.DoesNotExist:
            return HttpResponse('Not found', status=404)
        if result.percentage < 60:
            return HttpResponse('Score too low', status=403)
        buf = generate_certificate_pdf(result)
        resp = HttpResponse(buf.read(), content_type='application/pdf')
        resp['Content-Disposition'] = f'inline; filename=certificate_ME-{result.id:06d}.pdf'
        return resp


class CertificateVerifyView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def get(self, request, cert_id):
        from .models import QuizResult
        try:
            rid = int(cert_id.replace('ME-', ''))
            r = QuizResult.objects.select_related('user').get(id=rid)
            if r.percentage < 60:
                return HttpResponse('Invalid', status=404)
            gn, gt = get_grade(r.percentage)
            from rest_framework.response import Response
            return Response({
                'valid': True,
                'name': f"{r.user.first_name} {r.user.last_name}".strip() or r.user.username,
                'score': f"{r.score}/{r.total}",
                'percentage': r.percentage,
                'grade': f"{gn} \u2014 {gt}",
                'date': r.created_at.strftime('%d.%m.%Y'),
                'cert_id': cert_id,
            })
        except:
            return HttpResponse('Not found', status=404)


import random as _random

class QuizView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        from .models import QuizQuestion, QuizSettings, QuizResult
        settings = QuizSettings.objects.first()
        qcount = settings.questions_count if settings else 30
        time_limit = settings.time_limit if settings else 0
        max_attempts = settings.max_attempts if settings else 0
        if max_attempts > 0:
            used = QuizResult.objects.filter(user=request.user).count()
            if used >= max_attempts:
                return Response({'error':'attempts_exceeded','message':f'Urinishlar soni tugadi ({max_attempts})'}, status=403)
        all_ids = list(QuizQuestion.objects.values_list('id', flat=True))
        selected = _random.sample(all_ids, min(qcount, len(all_ids)))
        questions = QuizQuestion.objects.filter(id__in=selected)
        data = []
        for q in questions:
            opts = list(enumerate(q.options))
            _random.shuffle(opts)
            data.append({'id':q.id,'question':q.question,'options':[o[1] for o in opts],'mapping':[o[0] for o in opts]})
        return Response({'questions':data,'settings':{'questions_count':qcount,'time_limit':time_limit,'max_attempts':max_attempts,'attempts_used':QuizResult.objects.filter(user=request.user).count(),'total_questions':QuizQuestion.objects.count()}})
    def post(self, request):
        from .models import QuizQuestion, QuizResult, QuizSettings
        settings = QuizSettings.objects.first()
        max_attempts = settings.max_attempts if settings else 0
        if max_attempts > 0:
            used = QuizResult.objects.filter(user=request.user).count()
            if used >= max_attempts:
                return Response({'error':'attempts_exceeded'}, status=403)
        answers = request.data.get('answers', {})
        score = 0; total = 0; details = []
        for qid_str, selected_idx in answers.items():
            try:
                q = QuizQuestion.objects.get(id=int(qid_str))
                total += 1
                is_correct = selected_idx == q.correct
                if is_correct: score += 1
                details.append({'question_id':q.id,'selected':selected_idx,'correct':q.correct,'is_correct':is_correct})
            except: pass
        pct = round(score / total * 100) if total else 0
        result = QuizResult.objects.create(user=request.user, score=score, total=total, percentage=pct, answers=details)
        return Response({'id':result.id,'score':score,'total':total,'percentage':pct})

class QuizResultsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        from .models import QuizResult
        results = QuizResult.objects.filter(user=request.user)[:20]
        return Response([{'id':r.id,'score':r.score,'total':r.total,'percentage':r.percentage,'created_at':r.created_at} for r in results])


class UniversityListView(generics.ListAPIView):
    queryset = University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]


class StudentListView(generics.ListAPIView):
    serializer_class = StudentListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = User.objects.filter(university__isnull=False).select_related('university').order_by('university__order', 'username')
        uni_id = self.request.query_params.get('university')
        if uni_id:
            qs = qs.filter(university_id=uni_id)
        return qs


class UniversityStatsView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    
    def get(self, request, pk):
        from .models import University, QuizResult, UserProgress, Task
        uni = University.objects.get(pk=pk)
        students = User.objects.filter(university=uni).order_by('username')
        total_tasks = Task.objects.count()
        results = QuizResult.objects.filter(user__university=uni)
        
        g5 = results.filter(percentage__gte=90).count()
        g4 = results.filter(percentage__gte=75, percentage__lt=90).count()
        g3 = results.filter(percentage__gte=60, percentage__lt=75).count()
        g2 = results.filter(percentage__lt=60).count()
        avg_pct = round(sum(r.percentage for r in results) / results.count()) if results.exists() else 0
        
        student_data = []
        for s in students:
            quiz = QuizResult.objects.filter(user=s).order_by('-created_at').first()
            test_pct = quiz.percentage if quiz else 0
            grade = 5 if test_pct >= 90 else 4 if test_pct >= 75 else 3 if test_pct >= 60 else 2
            
            ups = UserProgress.objects.filter(user=s, completed=True)
            done = ups.count()
            scores = list(ups.values_list('score', flat=True))
            avg_score = min(100, round(sum(scores)*10/len(scores))) if scores else 0
            
            student_data.append({
                'id': s.id, 'username': s.username,
                'name': f'{s.first_name} {s.last_name}'.strip(),
                'plain_password': s.plain_password,
                'completed': done, 'total': total_tasks,
                'avg_score': avg_score, 'test_pct': test_pct, 'grade': grade,
                'points': s.points, 'streak': s.streak,
            })
        
        student_data.sort(key=lambda x: (-x['grade'], -x['test_pct']))
        
        return Response({
            'university': {'id': uni.id, 'name': uni.name, 'short_name': uni.short_name, 'student_count': uni.student_count},
            'grades': {'g5': g5, 'g4': g4, 'g3': g3, 'g2': g2},
            'avg_percentage': avg_pct,
            'total_tasks': total_tasks,
            'students': student_data,
        })
