from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

router = DefaultRouter()
router.register('units', views.UnitViewSet)
router.register('tasks', views.TaskViewSet)
router.register('vocabulary', views.VocabularyViewSet)
router.register('idioms', views.MedicalIdiomViewSet)
router.register('phrasal-verbs', views.PhrasalVerbViewSet)
router.register('badges', views.BadgeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', views.RegisterView.as_view()),
    path('auth/login/', TokenObtainPairView.as_view()),
    path('auth/refresh/', TokenRefreshView.as_view()),
    path('profile/', views.ProfileView.as_view()),
    path('dashboard/', views.DashboardView.as_view()),
    path('leaderboard/', views.LeaderboardView.as_view()),
    path('my-badges/', views.UserBadgesView.as_view()),
    path('quiz/', views.QuizView.as_view()),
    path('quiz/results/', views.QuizResultsView.as_view()),
    path('certificate/<int:result_id>/', views.CertificateView.as_view()),
    path('verify/<str:cert_id>/', views.CertificateVerifyView.as_view()),
    path('universities/', views.UniversityListView.as_view()),
    path('students/', views.StudentListView.as_view()),
    path('universities/<int:pk>/stats/', views.UniversityStatsView.as_view()),
]
