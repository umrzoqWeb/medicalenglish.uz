from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .admin_views import *

router = DefaultRouter()
router.register('units', AdminUnitViewSet)
router.register('tasks', AdminTaskViewSet)
router.register('questions', AdminTaskQuestionViewSet)
router.register('vocabulary', AdminVocabularyViewSet)
router.register('idioms', AdminIdiomViewSet)
router.register('phrasal-verbs', AdminPhrasalVerbViewSet)
router.register('users', AdminUserViewSet)
router.register('badges', AdminBadgeViewSet)

urlpatterns = [
    path('dashboard/', AdminDashboardView.as_view()),
    path('quiz-import/', AdminQuizImportView.as_view()),
    path('quiz-results/', AdminQuizResultsView.as_view()),
    path('quiz-settings/', AdminQuizSettingsView.as_view()),
    path('progress/', AdminProgressView.as_view()),
    path('', include(router.urls)),
]
