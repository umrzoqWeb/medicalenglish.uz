from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse, FileResponse, HttpResponseRedirect
from django.views.static import serve
import mimetypes
import os

# Ensure proper MIME types
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')

def serve_asset(request, path):
    """Serve static assets from staticfiles/assets folder"""
    frontend_dir = settings.FRONTEND_DIR
    file_path = frontend_dir / 'assets' / path
    
    if file_path.exists() and file_path.is_file():
        content_type, _ = mimetypes.guess_type(str(file_path))
        return FileResponse(open(file_path, 'rb'), content_type=content_type)
    
    return HttpResponse('Asset not found', status=404)

def serve_frontend(request, path=''):
    """Serve React frontend - index.html for SPA routing"""
    # Don't serve frontend for admin URLs
    if request.path.startswith('/d-admin/') or request.path == '/d-admin':
        return HttpResponseRedirect('/d-admin/')
    
    frontend_dir = settings.FRONTEND_DIR
    index_path = frontend_dir / 'index.html'
    
    # Serve index.html for all SPA routes
    if index_path.exists():
        with open(index_path, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read(), content_type='text/html')
    return HttpResponse('Frontend not built. Please build the frontend first.', status=404)

urlpatterns = [
    # Admin URLs - with and without trailing slash
    path('d-admin/', admin.site.urls),
    path('d-admin', lambda r: HttpResponseRedirect('/d-admin/')),  # Redirect /admin to /admin/
    
    # API URLs
    path('api/', include('api.urls')),
    path('api/admin-panel/', include('api.admin_urls')),
    
    # Assets
    re_path(r'^assets/(?P<path>.+)$', serve_asset),
]

# Serve static files
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Serve media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# SPA catch-all - must be LAST
urlpatterns += [
    re_path(r'^.*$', serve_frontend),
]
